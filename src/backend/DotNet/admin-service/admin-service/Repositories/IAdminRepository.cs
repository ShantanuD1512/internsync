using admin_service.DTOs;
using InternSync.AdminService.DTOs;

namespace InternSync.AdminService.Repositories
{
    public interface IAdminRepository
    {
        Task<IEnumerable<OrganizationDto>> GetAllOrganizationsAsync();
        Task<bool> ApproveOrganizationAsync(int orgId);
    }
}
