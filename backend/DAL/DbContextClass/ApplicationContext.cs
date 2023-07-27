using DAL.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.DbContextClass
{
    public class ApplicationContext: IdentityDbContext<User>
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options): base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            this.SeedUsers(builder);
            this.SeedRoles(builder);
            this.SeedUserRoles(builder);
        }

        private void SeedUsers(ModelBuilder builder)
        {
            User user = new User()
            {
                Id = "b74ddd14-6340-4840-95c2-db12554843e5",
                UserName = "Admin",
                FirstName = "Admin",
                Email = "admin@gmail.com",
                NormalizedEmail = "admin@gmail.com",
                LockoutEnabled = false,
                PhoneNumber = "1234567890",
                PasswordHash = new PasswordHasher<User>().HashPassword(null, "Admin@123"),
                NormalizedUserName = "admin@gmail.com"
            };
            builder.Entity<User>().HasData(user);
        }

        private void SeedRoles(ModelBuilder builder)
        {
            builder.Entity<IdentityRole>().HasData(
                new IdentityRole() { Id = "185bcd9cbde1439abcb206ca2a0b0dab", Name = "Admin", ConcurrencyStamp = "1", NormalizedName = "Admin"},
                new IdentityRole() { Id = "80d018f8-f0c1-4dda-b3ad-195473cd5a66", Name = "User", ConcurrencyStamp = "2", NormalizedName = "User"}
                );
        }

        private void SeedUserRoles(ModelBuilder builder)
        {
            builder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>() { RoleId = "185bcd9cbde1439abcb206ca2a0b0dab", UserId = "b74ddd14-6340-4840-95c2-db12554843e5" }
                );
        }
        public DbSet<Car> Cars { get; set; }
        public DbSet<BookedCar> BookedCars { get; set; }
        public DbSet<Brand> Brands { get; set; }
    }
}
