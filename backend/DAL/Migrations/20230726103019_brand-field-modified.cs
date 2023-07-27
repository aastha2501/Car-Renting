using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class brandfieldmodified : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b74ddd14-6340-4840-95c2-db12554843e5",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d69ce8b4-787b-4dd4-a819-705ad94b1a50", "AQAAAAEAACcQAAAAEJZSggzCdvL71UFwvMFap3Y7GvIcgW7IOYqBDYco/q6b4T+zvrhLlDx4+X7878kYTw==", "65cab7fc-0365-4b8c-b4cb-65a69011a727" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b74ddd14-6340-4840-95c2-db12554843e5",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "08f77389-2252-47e2-a3ac-c55c20094ec6", "AQAAAAEAACcQAAAAEKe2Zf5nsHBLeSV75JJLHb6i0BiOeVJyRrHhdNiY8D7V9nrdyGybAU36pRtWo9zPcA==", "e1f7dad2-70e3-4b05-bfbe-2d619d85d2e8" });
        }
    }
}
