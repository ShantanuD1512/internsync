using Microsoft.EntityFrameworkCore;
using InternSync.AdminService.Models;

namespace InternSync.AdminService.Data
{
    public class AdminDbContext : DbContext
    {
        public AdminDbContext(DbContextOptions<AdminDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<OrganizationDetails> Organizations { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<StudentEducation> StudentEducations { get; set; }
        public DbSet<Skill> Skills { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("user");
            modelBuilder.Entity<OrganizationDetails>().ToTable("organization_details");
            modelBuilder.Entity<Student>().ToTable("student_details");
            modelBuilder.Entity<StudentEducation>().ToTable("student_education");
            modelBuilder.Entity<Skill>().ToTable("skill");

            modelBuilder.Entity<User>().HasKey(u => u.user_id);
            modelBuilder.Entity<OrganizationDetails>().HasKey(o => o.organization_id);
            modelBuilder.Entity<Student>().HasKey(s => s.student_id);
            modelBuilder.Entity<StudentEducation>().HasKey(se => se.education_id);
            modelBuilder.Entity<Skill>().HasKey(sk => sk.skill_id);

            // Relationships
            modelBuilder.Entity<Student>()
                .HasMany(s => s.Educations)
                .WithOne(e => e.Student)
                .HasForeignKey(e => e.student_id);

            modelBuilder.Entity<Student>()
                .HasMany(s => s.Skills)
                .WithOne(sk => sk.Student)
                .HasForeignKey(sk => sk.student_id);
        }
    }
}
