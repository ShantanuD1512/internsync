import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
});

// Auth APIs
export const login = (credentials) => API.post('/api/auth/login', credentials);
export const registerOrgUser = (data) => API.post('/api/auth/register-org', data);
export const registerStudent = async (formData) => {
  const payload = {
    ...formData,
    roleId: 2, 
  };
  return API.post('/api/auth/register-student', payload);
};

// Organization APIs
export const getDomains = () => API.get('/api/org/domains');
export const registerOrganization = (data) => API.post('/api/org/organization', data);

export const createInternship = async (data) => {
  try {
    const response = await API.post('/api/org/internship/create', data);
    return response;
  } catch (error) {
    console.error("Create Internship Error:", error);
    return { data: "Error while creating internship" };
  }
};

export const fetchInternshipsByOrg = async (orgId) => {
  const response = await API.get(`/api/org/internship/all/${orgId}`);
  if (!response.ok) throw new Error('Failed to fetch internships');
  return response.data;
};

export const fetchOrganizationIdByUserId = async (userId) => {
  const res = await API.get(`/api/org/user/${userId}`);
  if (res.status !== 200) throw new Error("Failed to fetch organizationId");
  return res.data; // returns organizationId (int)
};

export const fetchInternshipsByOrgId = async (orgId) => {
  const res = await API.get(`/api/org/internship/all/${orgId}`);
  if (res.status !== 200) throw new Error("Failed to fetch internships");
  return res.data;
};

// Student Service APIs
export async function fetchApplicationsByInternships(internshipIds, statusFilter) {
  const params = new URLSearchParams();
  internshipIds.forEach(id => params.append('internshipIds', id));
  if (statusFilter) {
    params.append('statusFilter', statusFilter);
  }

  const response = await API.get(`/applications/internships?${params.toString()}`);
  if (response.status !== 200) throw new Error('Failed to fetch applications');
  return response.data;
}

export const fetchStudentId = async (userId) => {
  const response = await API.get(`/students/by-user/${userId}`);
  return response.data; 
};
