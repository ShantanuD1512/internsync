using Microsoft.AspNetCore.Mvc;
using InternSync.AdminService.Services;
using System.Threading.Tasks;

namespace InternSync.AdminService.Controllers
{
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly Services.AdminService _adminService;

        public AdminController(Services.AdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("organizations")]
        public async Task<IActionResult> GetOrganizations()
        {
            var orgs = await _adminService.GetAllOrganizationsAsync();
            return Ok(orgs);
        }

        [HttpPut("approve/{id}")]
        public async Task<IActionResult> Approve(int id)
        {
            var result = await _adminService.ApproveOrganizationAsync(id);
            if (!result) return NotFound("Organization not found");
            return Ok("Organization approved successfully");
        }

        // New endpoint for students
        [HttpGet("students")]
        public async Task<IActionResult> GetAllStudents()
        {
            var students = await _adminService.GetAllStudentsAsync();
            return Ok(students);
        }
    }
}
