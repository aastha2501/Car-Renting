using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class imagefieldinuser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b74ddd14-6340-4840-95c2-db12554843e5",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "13beaa36-ec8d-413d-b330-ea9b6a0c8527", "AQAAAAEAACcQAAAAEBMJWOlVO7uQDNzV166VDGgSWXq15Q3Q/6kcqgAd02vlfbq32CjTn8spphwNZJCMhg==", "38bb0024-d687-4366-9b3a-082adb83f1ea" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "AspNetUsers");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b74ddd14-6340-4840-95c2-db12554843e5",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "aded2f18-e00f-4284-a243-c4d07bc07f9c", "AQAAAAEAACcQAAAAEDM3dnQdyJO3/XEGktHq2hDWy0IkaSY9hzz6Qpmbw+Qi7MYXdktqKAljRGKk8u1VAQ==", "ea78b0fa-0cda-4588-bc43-794e31a7e0ae" });
        }
    }
}
