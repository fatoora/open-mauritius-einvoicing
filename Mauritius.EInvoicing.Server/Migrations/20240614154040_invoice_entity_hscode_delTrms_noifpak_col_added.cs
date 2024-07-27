using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mauritius.EInvoicing.Server.Migrations
{
    /// <inheritdoc />
    public partial class invoice_entity_hscode_delTrms_noifpak_col_added : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DeliveryTerms",
                table: "Invoices",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HsCode",
                table: "Invoices",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NoOfPackage",
                table: "Invoices",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryTerms",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "HsCode",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "NoOfPackage",
                table: "Invoices");
        }
    }
}
