package com.internsync.orgservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan(basePackages="com.internsync.orgservice.*")
public class OrgServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrgServiceApplication.class, args);
	}

}

