package com.cognixia.jump.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.cognixia.jump.model.Friend;

@Repository
public interface FriendRepository extends JpaRepository<Friend,Long>{
	
	List<Friend> findAll();
}


