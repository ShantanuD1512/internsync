using InternSync.AdminService.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace InternSync.AdminService.Data
{
    public class AdminDbContext : DbContext
    {
        public AdminDbContext(DbContextOptions<AdminDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<OrganizationDetails> Organizations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("user");
            modelBuilder.Entity<OrganizationDetails>().ToTable("organization_details");

            modelBuilder.Entity<User>().HasKey(u => u.user_id);
            modelBuilder.Entity<OrganizationDetails>().HasKey(o => o.organization_id);
        }
    }
}
