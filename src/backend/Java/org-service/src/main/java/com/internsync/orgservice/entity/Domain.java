package com.internsync.orgservice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "domain")
public class Domain {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "domain_id")
	private int domainId;

	@Column(name = "domain_name")
	private String name;


	public int getDomainId() {
	    return domainId;
	}

	public void setDomainId(int domainId) {
	    this.domainId = domainId;
	}

	public String getName() {
	    return name;
	}

	public void setName(String name) {
	    this.name = name;
	}

}