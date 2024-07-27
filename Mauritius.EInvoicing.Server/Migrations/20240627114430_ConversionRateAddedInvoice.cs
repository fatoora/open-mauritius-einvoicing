using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mauritius.EInvoicing.Server.Migrations
{
    /// <inheritdoc />
    public partial class ConversionRateAddedInvoice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "ConversionRate",
                table: "Invoices",
                type: "decimal(18,2)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConversionRate",
                table: "Invoices");
        }
    }
}
