using InternSync.AdminService.Data;
using InternSync.AdminService.DTOs;
using InternSync.AdminService.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternSync.AdminService.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly AdminDbContext _context;

        public AdminRepository(AdminDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OrganizationDto>> GetAllOrganizationsAsync()
        {
            return await _context.Organizations
                .Select(o => new OrganizationDto
                {
                    organization_id = o.organization_id,
                    org_name = o.org_name,
                    RegistrationNumber = o.registration_number,
                    IsApproved = o.is_approved
                })
                .ToListAsync();
        }

        public async Task<bool> ApproveOrganizationAsync(int orgId)
        {
            var org = await _context.Organizations.FindAsync(orgId);
            if (org == null) return false;

            org.is_approved = true;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<StudentDto>> GetAllStudentsAsync()
        {
            return await _context.Students
                .Include(s => s.Educations)
                .Include(s => s.Skills)
                .Select(s => new StudentDto
                {
                    StudentId = s.student_id,
                    StudentName = s.student_name,
                    Gender = s.gender,
                    Education = s.Educations.Select(e => new StudentEducationDto
                    {
                        Level = e.level,
                        InstitutionName = e.institution_name,
                        Board = e.board,
                        Grade = e.grade,
                        PassingYear = e.passing_year
                    }).ToList(),
                    Skills = s.Skills.Select(sk => sk.skill_name).ToList()
                })
                .ToListAsync();
        }
    }
}
