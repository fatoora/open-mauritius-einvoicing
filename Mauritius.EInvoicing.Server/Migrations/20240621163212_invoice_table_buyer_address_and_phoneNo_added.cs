using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mauritius.EInvoicing.Server.Migrations
{
    /// <inheritdoc />
    public partial class invoice_table_buyer_address_and_phoneNo_added : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BuyerAddress",
                table: "Invoices",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BuyerPhoneNo",
                table: "Invoices",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BuyerAddress",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "BuyerPhoneNo",
                table: "Invoices");
        }
    }
}
