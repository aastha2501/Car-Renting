using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class cartableupdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Cars");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b74ddd14-6340-4840-95c2-db12554843e5",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "72a799d3-8abc-4cd3-b3b7-394727ab004c", "AQAAAAEAACcQAAAAEEo+NzeWN+CWbtq4ajG7vK/2jjy1ueDIsSEWQroP2nAJYxVVRnB1A819QEc8G1VXNQ==", "d74cb12a-8b3e-4616-8fc9-25da65efd61f" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Cars",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b74ddd14-6340-4840-95c2-db12554843e5",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "5bde1d11-8987-43f9-b753-5cca74ca0592", "AQAAAAEAACcQAAAAEHrG35y/kqQH6AFGCIv57YbONmtE+aoEKQA1ZrrAnkP1OGmo5oPfcRGf8zsL6uX5Mg==", "514003ba-5a8a-429d-b95b-f6aa25046233" });
        }
    }
}
