using System.ComponentModel.DataAnnotations;
using MediatR;

namespace PainterApp.Server.Application.CQRS.Command
{
    public class CreateServiceCommand : IRequest<int>
    {
        [Required, StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [StringLength(200)]
        public string TitleAr { get; set; } = string.Empty;

        [Required, StringLength(2000)]
        public string Description { get; set; } = string.Empty;

        [StringLength(2000)]
        public string DescriptionAr { get; set; } = string.Empty;

        [StringLength(1000)]
        public string ImageUrl { get; set; } = string.Empty;

        [RegularExpression("^(painting|ceiling-design)$", ErrorMessage = "Category must be 'painting' or 'ceiling-design'.")]
        public string Category { get; set; } = "painting";

        public int SortOrder { get; set; }

        public decimal Price { get; set; }
    }
}
