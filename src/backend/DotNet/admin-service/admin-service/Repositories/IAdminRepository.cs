using InternSync.AdminService.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InternSync.AdminService.Repositories
{
    public interface IAdminRepository
    {
        Task<IEnumerable<OrganizationDto>> GetAllOrganizationsAsync();
        Task<bool> ApproveOrganizationAsync(int orgId);

        Task<IEnumerable<StudentDto>> GetAllStudentsAsync();
    }
}
