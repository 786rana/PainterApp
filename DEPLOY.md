# Deploying Zaman Paints & Decor

The site has two parts that are hosted separately:

| Part | What it is | Where it runs |
|---|---|---|
| **Frontend** | React/Vite site in `frontend/` | **Vercel** (static hosting) |
| **Backend** | ASP.NET Core API in `PainterApp.Server/` | **Azure App Service** (or any Docker host) |
| **Database** | SQL Server | **Azure SQL** |

Vercel cannot run .NET, so the API needs its own host. The frontend finds it through one
environment variable, `VITE_API_URL`. Without a backend the public pages still work, but the
contact form, login, dashboard and saved settings will not.

Order: **1. database + backend → 2. Vercel → 3. connect them (CORS) → 4. first login.**

---

## 1. Backend and database on Azure

Install the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) and the .NET 10 SDK.
Run these in PowerShell from the repository root. Replace the `<...>` values. Names marked *unique*
must be unique worldwide.

```powershell
az login

$rg      = "painter-rg"
$loc     = "uaenorth"                 # a region near your customers (e.g. uaenorth, westeurope)
$sql     = "painter-sql-<unique>"     # SQL server name (unique)
$sqlUser = "painteradmin"
$sqlPass = "<a strong password>"      # 12+ chars, mixed case, digits, symbols
$plan    = "painter-plan"
$api     = "painter-api-<unique>"     # becomes https://<name>.azurewebsites.net

# Secrets -- generate once and keep them somewhere safe
$jwtKey  = [Convert]::ToBase64String([Security.Cryptography.RandomNumberGenerator]::GetBytes(48))

az group create -n $rg -l $loc

# Database
az sql server create -g $rg -n $sql -l $loc -u $sqlUser -p $sqlPass
az sql server firewall-rule create -g $rg -s $sql -n AllowAzureServices --start-ip-address 0.0.0.0 --end-ip-address 0.0.0.0
az sql db create -g $rg -s $sql -n PainterApp --service-objective Basic

# Web app (Linux, .NET 10)
az appservice plan create -g $rg -n $plan --sku B1 --is-linux
az webapp create -g $rg -p $plan -n $api --runtime "DOTNETCORE:10.0"
az webapp config set -g $rg -n $api --always-on true --generic-configurations '{\"healthCheckPath\":\"/healthz\"}'

# Configuration (these are the settings the API reads; "__" means a nested setting)
az webapp config appsettings set -g $rg -n $api --settings `
  ASPNETCORE_ENVIRONMENT=Production `
  "ConnectionStrings__Default=Server=tcp:$sql.database.windows.net,1433;Database=PainterApp;User ID=$sqlUser;Password=$sqlPass;Encrypt=True;TrustServerCertificate=False;" `
  "Jwt__Key=$jwtKey" `
  Database__AutoMigrate=true `
  Admin__Email=<your admin email> `
  "Admin__Password=<your admin password, 8+ chars>" `
  "Cors__AllowedOrigins__0=https://<your-site>.vercel.app" `
  "Cors__AllowedOrigins__1=https://*.vercel.app"

# Publish and upload the API
dotnet publish PainterApp.Server -c Release -o publish
Compress-Archive -Path publish\* -DestinationPath publish.zip -Force
az webapp deploy -g $rg -n $api --src-path publish.zip --type zip
```

Check it: open `https://<api>.azurewebsites.net/healthz`. You should see `{"status":"ok"}`.

What `Database__AutoMigrate=true` does on every start-up: creates the tables if they are missing,
applies schema upgrades (safe to repeat), and, only when there are **no users yet**, creates your
admin account from `Admin__Email` / `Admin__Password`. After the first successful start you can
remove `Admin__Password` from the settings.

Approximate cost: App Service B1 and SQL Basic are each a few US dollars per month. Azure also has
a free SQL database offer and a free (F1) App Service tier with limits. Check current pricing for
your region before choosing.

### Any other host (Docker)

`PainterApp.Server/Dockerfile` builds the same API for any container host (Azure Container Apps,
Render, Railway, Fly.io...). Build from the repository root:

```bash
docker build -f PainterApp.Server/Dockerfile -t painter-api .
```

It listens on port `8080` and uses the same settings as above (as environment variables). You still
need a **SQL Server** database; Azure SQL works from any host if you allow the host's IP in the
SQL server firewall.

---

## 2. Frontend on Vercel

1. In Vercel: **Add New -> Project**, import this GitHub repository.
2. Leave **Root Directory** empty. The root `vercel.json` already tells Vercel how to build `frontend/`.
3. Add an environment variable (for **Production** and **Preview**):

   | Name | Value |
   |---|---|
   | `VITE_API_URL` | `https://<api>.azurewebsites.net`  (no trailing slash, no `/api`) |

4. Deploy. If you add or change the variable later, **redeploy**: the address is baked in at build time.

If you use a custom domain (for example `zamanpaints.com`), also add it in Vercel and then add it
to the backend CORS list (next step).

## 3. Connect them (CORS)

The API only accepts browser requests from sites you list. Set these on the backend
(`Cors__AllowedOrigins__0`, `__1`, `__2`, ... one per site):

- your production address, e.g. `https://zamanpaints.com` and `https://<project>.vercel.app`
- `https://*.vercel.app` so preview deployments work

```powershell
az webapp config appsettings set -g $rg -n $api --settings `
  "Cors__AllowedOrigins__0=https://zamanpaints.com" `
  "Cors__AllowedOrigins__1=https://<project>.vercel.app" `
  "Cors__AllowedOrigins__2=https://*.vercel.app"
```

## 4. First login and content

1. Open your site -> the palette icon (**Settings**) -> **Log in**, using `Admin__Email` / `Admin__Password`.
2. Open **Dashboard** -> **Services** -> **Import the sample services**, then edit them.
3. Add real photos under **Projects** (images are links, so host the photos first).
4. Visitors can pick a design on the Settings page; logged-in users have it saved to their account.

Public sign-up is **closed** in production (`Auth__AllowRegistration` is off), so only accounts you
create exist. Turn it on only temporarily if you need more accounts.

---

## Configuration reference

| Setting (environment variable) | Purpose |
|---|---|
| `ConnectionStrings__Default` | SQL Server connection string |
| `Jwt__Key` | Secret used to sign login tokens, at least 32 characters. **Required.** Keep it private. |
| `Cors__AllowedOrigins__N` | Sites allowed to call the API (supports `https://*.vercel.app`) |
| `Database__AutoMigrate` | `true` = create/upgrade tables on start-up |
| `Admin__Email`, `Admin__Password` | First admin account, created only when there are no users |
| `Auth__AllowRegistration` | `true` lets anyone sign up. Default `false` |
| `VITE_API_URL` (Vercel) | Address of the backend, used by the frontend |

## Troubleshooting

| Symptom | Likely cause and fix |
|---|---|
| Browser console: *blocked by CORS policy* | The site's address is missing from `Cors__AllowedOrigins__N`, or it has a different scheme/www. Add it and restart the web app. |
| Site loads but login/forms fail with *Network Error* | `VITE_API_URL` is missing or wrong on Vercel. Fix it and **redeploy**. |
| API returns 500 at start / `/healthz` fails | Check **Log stream** in Azure. Common: wrong SQL password, firewall rule missing, or `Jwt__Key` shorter than 32 characters. |
| *Cannot open server ... requested by the login* | The SQL firewall blocks the web app. Re-run the `AllowAzureServices` rule. |
| Login says *Incorrect email or password* for the admin | The admin is created only when there are no users. Check `Admin__Email`, or add the account via SQL. |
| Changes in the dashboard do not show | Hard refresh. The public site reads services and projects from the API. |
