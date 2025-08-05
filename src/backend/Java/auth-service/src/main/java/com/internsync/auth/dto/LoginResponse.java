package com.internsync.auth.dto;

public class LoginResponse {
	private String message;
    private int userId;
    private String name;
    private String email;
    private int roleId;
    private int organizationId;
    
	public LoginResponse(String message, int userId, String name, String email, int roleId, int organizationId) {
		super();
		this.message = message;
		this.userId = userId;
		this.name = name;
		this.email = email;
		this.roleId = roleId;
		this.organizationId = organizationId;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getRoleId() {
		return roleId;
	}
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
	public int getOrganizationId() {
		return organizationId;
	}
	public void setOrganizationId(int organizationId) {
		this.organizationId = organizationId;
	}  

    
	
    
}
