package com.cognixia.jump.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.model.Friend;
import com.cognixia.jump.repository.FriendRepository;

@RequestMapping("/api")
@RestController
public class FriendController {

	@Autowired
	FriendRepository service;

	@GetMapping("/friends")
	public List<Friend> getAllFriends() {

		return service.findAll();

	}
	
	@GetMapping("/friend/locations")
	public List<String> getAllFriendLocations() {
		List<Friend> friends = service.findAll();
		List<String> locations = new ArrayList();

		for(Friend friend: friends) {
			locations.add(friend.getLocation());
		}
		
		return locations;
	}


	@PostMapping("/add/friend")
	public void addStudent(@RequestBody Friend newFriend) {

		newFriend.setId(-1L);
		Friend added = service.save(newFriend);
		System.out.println("Added friend: " + added);

	}

	@GetMapping("/friends/{id}")
	public Friend getFriend(@PathVariable long id) {
		Optional<Friend> friend = service.findById(id);
		if (friend.isPresent()) {
			return friend.get();

		}
		return new Friend();
	}

	@PutMapping("/update/friend")
	public @ResponseBody String updateFriend(@RequestBody Friend updateFriend) {

		Optional<Friend> found = service.findById(updateFriend.getId());

		if (found.isPresent()) {
			service.save(updateFriend);
			return "Saved: " + updateFriend.toString();
		} else {
			return "Could not update student with id: " + updateFriend.getId();
		}

	}

	@PatchMapping("/update/friend/location")
	public @ResponseBody String updateLocation(@RequestBody Map<String, String> locationInfo) {
		long id = Long.parseLong(locationInfo.get("id"));
		String location = locationInfo.get("location");

		Optional<Friend> found = service.findById(id);

		if (found.isPresent()) {

			Friend toUpdate = found.get();

			String old = toUpdate.getLocation();
			toUpdate.setLocation(location);
			service.save(toUpdate);

			return "Old Location: " + old + "\nNew Location: " + location;
		}

		else {
			return "Could not update location with friend id of: " + id;
		}

	}

	@DeleteMapping("/delete/friend/{id}")
	public ResponseEntity<String> deleteFriend(@PathVariable long id) {
		Optional<Friend> found = service.findById(id);
		if (found.isPresent()) {

			service.deleteById(id);
			return ResponseEntity.status(200).body("Deleted friend with id: " + id);

		} else {
			return ResponseEntity.status(400)
					.header("friend id", id + "")
					.body("Friend with id = " + id + " not found");
		}

	}

}
