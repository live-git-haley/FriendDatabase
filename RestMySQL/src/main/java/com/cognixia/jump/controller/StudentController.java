package com.cognixia.jump.controller;

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

import com.cognixia.jump.model.Student;
import com.cognixia.jump.repository.StudentRepository;

@RequestMapping("/api")
@RestController
public class StudentController {

	@Autowired
	StudentRepository service;

	@GetMapping("/students")
	public List<Student> getAllStudents() {

		return service.findAll();

	}

	@PostMapping("/add/student")
	public void addStudent(@RequestBody Student newStudent) {

		newStudent.setId(-1L);
		Student added = service.save(newStudent);
		System.out.println("Added student: " + added);

	}

	@GetMapping("/students/{id}")
	public Student getStudent(@PathVariable long id) {
		Optional<Student> student = service.findById(id);
		if (student.isPresent()) {
			return student.get();

		}
		return new Student();
	}

	@PutMapping("/update/student")
	public @ResponseBody String updateStudent(@RequestBody Student updateStudent) {

		Optional<Student> found = service.findById(updateStudent.getId());

		if (found.isPresent()) {
			service.save(updateStudent);
			return "Saved: " + updateStudent.toString();
		} else {
			return "Could not update student with id: " + updateStudent.getId();
		}

	}

	@PatchMapping("/update/student/department")
	public @ResponseBody String updateDepartment(@RequestBody Map<String, String> deptInfo) {
		long id = Long.parseLong(deptInfo.get("id"));
		String department = deptInfo.get("department");

		Optional<Student> found = service.findById(id);

		if (found.isPresent()) {

			Student toUpdate = found.get();

			String old = toUpdate.getDepartment();
			toUpdate.setDepartment(department);
			service.save(toUpdate);

			return "Old Department: " + old + "\nNewDepartment: " + department;
		}

		else {
			return "Could not update deparment with student id of: " + id;
		}

	}

	@DeleteMapping("/delete/student/{id}")
	public ResponseEntity<String> deleteStudent(@PathVariable long id) {
		Optional<Student> found = service.findById(id);
		if (found.isPresent()) {

			service.deleteById(id);
			return ResponseEntity.status(200).body("Deleted student with id: " + id);

		} else {
			return ResponseEntity.status(400)
					.header("student id", id + "")
					.body("Student with id = " + id + " not found");
		}

	}

}
