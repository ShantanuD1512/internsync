using admin_service.DTOs;
using InternSync.AdminService.DTOs;
using InternSync.AdminService.Repositories;
namespace InternSync.AdminService.Services
{
    public class AdminService
    {
        private readonly IAdminRepository _repo;
        public AdminService(IAdminRepository repo)
        {
            _repo = repo;
        }
        public Task<IEnumerable<OrganizationDto>> GetAllOrganizationsAsync() => _repo.GetAllOrganizationsAsync();
        public Task<bool> ApproveOrganizationAsync(int orgId) => _repo.ApproveOrganizationAsync(orgId);
    }
}