using admin_service.Data;
using admin_service.DTOs;
using InternSync.AdminService.Data;
using InternSync.AdminService.DTOs;
using InternSync.AdminService.Models;
using Microsoft.EntityFrameworkCore;
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
    }
}
