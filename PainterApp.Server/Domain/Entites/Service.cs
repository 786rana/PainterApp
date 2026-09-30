namespace PainterApp.Server.Domain.Entites
{
    public class Service
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string TitleAr { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string DescriptionAr { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        /// <summary>"painting" or "ceiling-design".</summary>
        public string Category { get; set; } = "painting";
        public int SortOrder { get; set; }
        public decimal Price { get; set; }
    }
}
