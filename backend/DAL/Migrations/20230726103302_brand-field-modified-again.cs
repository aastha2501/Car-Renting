using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class brandfieldmodifiedagain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b74ddd14-6340-4840-95c2-db12554843e5",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "5bde1d11-8987-43f9-b753-5cca74ca0592", "AQAAAAEAACcQAAAAEHrG35y/kqQH6AFGCIv57YbONmtE+aoEKQA1ZrrAnkP1OGmo5oPfcRGf8zsL6uX5Mg==", "514003ba-5a8a-429d-b95b-f6aa25046233" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b74ddd14-6340-4840-95c2-db12554843e5",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d69ce8b4-787b-4dd4-a819-705ad94b1a50", "AQAAAAEAACcQAAAAEJZSggzCdvL71UFwvMFap3Y7GvIcgW7IOYqBDYco/q6b4T+zvrhLlDx4+X7878kYTw==", "65cab7fc-0365-4b8c-b4cb-65a69011a727" });
        }
    }
}
