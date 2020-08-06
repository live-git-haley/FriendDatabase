package com.cognixia.jump.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Friend implements Serializable{

	private static final long serialVersionUID = 1L;
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name = "firstname")
	private String firstName;
	
	@Column(name = "lastname")
	private String lastName;
	

	@Column(columnDefinition = "varchar(100)")
	private String location;
	
	@Column(name = "info")
	private String info;
	
	@Column(name = "imgurl")
	private String imgUrl;
	
	@Column(name = "dogname")
	private String dogname;
	
	@Column(name = "breed")
	private String breed;
	
	@Column(name = "dogurl")
	private String dogUrl;
	
	
	

	public Friend(Long id, String firstName, String lastName, String location, String info, String imgUrl
			, String dogname, String breed, String dogurl) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.location = location;
		this.info = info;
		this.imgUrl = imgUrl;
		this.dogname = dogname;
		this.breed = breed;
		this.dogUrl = dogurl;
	}
	
	public Friend() {
		this(-1L, "NA", "NA", "NA", "NA", "NA","NA", "NA", "NA");
	}
	
	
	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public String getDogname() {
		return dogname;
	}

	public void setDogname(String dogname) {
		this.dogname = dogname;
	}

	public String getBreed() {
		return breed;
	}

	public void setBreed(String breed) {
		this.breed = breed;
	}

	public String getDogUrl() {
		return dogUrl;
	}

	public void setDogUrl(String dogUrl) {
		this.dogUrl = dogUrl;
	}


	
	
}
