# Deploying Zaman Paints & Decor

**One deployment serves everything.** The ASP.NET Core app in `PainterApp.Server/` hosts the React
website (from its `wwwroot`) *and* the API at `/api`, so the site and the backend share one address
(for example `https://zaman-paints.azurewebsites.net`). No CORS setup, no second host.

| Piece | Where it runs |
|---|---|
| Website + API | **Azure App Service** (one web app) |
| Database | **Azure SQL** |

The same app also runs on any container host (see *Docker* below). SQL Server is required; the
data layer uses SQL Server specifically.

---

## 1. Deploy to Azure

Prerequisites: [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli), the .NET 10 SDK
and Node.js 20.19+ (publishing also builds the website). Run in PowerShell from the repository root
and replace the `<...>` values. Names marked *unique* must be unique worldwide.

```powershell
az login

$rg      = "painter-rg"
$loc     = "uaenorth"                 # a region near your customers (e.g. uaenorth, westeurope)
$sql     = "painter-sql-<unique>"     # SQL server name (unique)
$sqlUser = "painteradmin"
$sqlPass = "<a strong password>"      # 12+ chars, mixed case, digits, symbols
$plan    = "painter-plan"
$app     = "zaman-paints-<unique>"    # becomes https://<name>.azurewebsites.net

# Secret used to sign login tokens -- generate once and keep it safe
$jwtKey  = [Convert]::ToBase64String([Security.Cryptography.RandomNumberGenerator]::GetBytes(48))

az group create -n $rg -l $loc

# Database
az sql server create -g $rg -n $sql -l $loc -u $sqlUser -p $sqlPass
az sql server firewall-rule create -g $rg -s $sql -n AllowAzureServices --start-ip-address 0.0.0.0 --end-ip-address 0.0.0.0
az sql db create -g $rg -s $sql -n PainterApp --service-objective Basic

# Web app (Linux, .NET 10)
az appservice plan create -g $rg -n $plan --sku B1 --is-linux
az webapp create -g $rg -p $plan -n $app --runtime "DOTNETCORE:10.0"
az webapp config set -g $rg -n $app --always-on true --generic-configurations '{\"healthCheckPath\":\"/healthz\"}'

# Settings ("__" means a nested setting)
az webapp config appsettings set -g $rg -n $app --settings `
  ASPNETCORE_ENVIRONMENT=Production `
  "ConnectionStrings__Default=Server=tcp:$sql.database.windows.net,1433;Database=PainterApp;User ID=$sqlUser;Password=$sqlPass;Encrypt=True;TrustServerCertificate=False;" `
  "Jwt__Key=$jwtKey" `
  Database__AutoMigrate=true `
  Admin__Email=<your admin email> `
  "Admin__Password=<your admin password, 8+ chars>"

# Build (API + website together) and upload
dotnet publish PainterApp.Server -c Release -o publish
Compress-Archive -Path publish\* -DestinationPath publish.zip -Force
az webapp deploy -g $rg -n $app --src-path publish.zip --type zip
```

Open `https://<app>.azurewebsites.net`: the website loads, and `https://<app>.azurewebsites.net/healthz`
shows `{"status":"ok"}`.

**To release an update**, run the last three commands again (`dotnet publish`, zip, `az webapp deploy`).

What `Database__AutoMigrate=true` does on every start: creates the tables if missing, applies schema
upgrades (safe to repeat), and, only when there are **no users yet**, creates your admin account from
`Admin__Email` / `Admin__Password`. After the first successful start you can delete `Admin__Password`.

Approximate cost: App Service B1 and SQL Basic are each a few US dollars a month. Azure also has free
tiers (with limits). Check current pricing for your region.

### Docker (any other host)

`PainterApp.Server/Dockerfile` builds one image with the website and the API. Build from the
repository root:

```bash
docker build -f PainterApp.Server/Dockerfile -t painter-app .
```

It listens on port `8080` and reads the same settings as environment variables. Point
`ConnectionStrings__Default` at a SQL Server (Azure SQL works from any host if you allow the host's IP
in the SQL firewall).

---

## 2. First login and content

1. Open your site, click the palette icon (**Settings**) -> **Log in** with `Admin__Email` / `Admin__Password`.
2. **Dashboard -> Services -> Import the sample services**, then edit them.
3. Add real photos under **Projects** (images are links, so host the photos first).
4. Visitors choose a design on the Settings page; logged-in users have it saved to their account.

Public sign-up is **closed** in production (`Auth__AllowRegistration` is off), so only accounts you
create exist.

## Custom domain

In Azure: **App Service -> Custom domains -> Add custom domain**, then bind a free managed certificate.
Update `canonical`/sitemap URLs in `frontend/` if your domain is not `zamanpaints.com`.

---

## Optional: frontend on Vercel, backend elsewhere

Not needed for the setup above. If you prefer it, deploy only the API (the same steps) and host
`frontend/` on Vercel: import the repository (the root `vercel.json` already builds `frontend/`), add
the environment variable `VITE_API_URL=https://<app>.azurewebsites.net` (no trailing slash), redeploy,
and allow the Vercel address on the backend with `Cors__AllowedOrigins__0=https://<project>.vercel.app`
and `Cors__AllowedOrigins__1=https://*.vercel.app`.

---

## Configuration reference

| Setting (environment variable) | Purpose |
|---|---|
| `ConnectionStrings__Default` | SQL Server connection string. **Required.** |
| `Jwt__Key` | Secret that signs login tokens, at least 32 characters. **Required.** Keep it private. |
| `Database__AutoMigrate` | `true` = create/upgrade tables on start-up |
| `Admin__Email`, `Admin__Password` | First admin account, created only when there are no users |
| `Auth__AllowRegistration` | `true` lets anyone sign up. Default `false` |
| `Cors__AllowedOrigins__N` | Only for the split setup above (supports `https://*.vercel.app`) |

## Troubleshooting

| Symptom | Likely cause and fix |
|---|---|
| Site shows *Hey, .NET Core developer* / 404 at `/` | The website was not included: publish from a machine with Node.js, or check `publish\wwwroot\index.html` exists before zipping. |
| `/healthz` fails or app keeps restarting | Open **Log stream** in Azure. Common: wrong SQL password, missing firewall rule, or `Jwt__Key` shorter than 32 characters. |
| *Cannot open server ... requested by the login* | The SQL firewall blocks the web app. Re-run the `AllowAzureServices` rule. |
| Admin login says *Incorrect email or password* | The admin is created only when there are no users. Check `Admin__Email`, or add the account via SQL. |
| Dashboard changes do not show | Hard refresh (Ctrl+F5). The public site reads services and projects from the API. |
| Old site after an update | Deploy again and hard refresh. `index.html` is never cached; assets are fingerprinted. |
