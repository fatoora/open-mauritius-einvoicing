using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mauritius.EInvoicing.Server.Migrations
{
    /// <inheritdoc />
    public partial class invoice_entity_ssystemInvoice_col_added : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SystemInvoice",
                table: "Invoices",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SystemInvoice",
                table: "Invoices");
        }
    }
}
