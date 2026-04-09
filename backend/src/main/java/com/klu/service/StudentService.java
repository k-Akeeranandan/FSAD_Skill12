package com.klu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klu.model.Student;
import com.klu.repo.StudentRepo;

@Service
public class StudentService {

    @Autowired
    private StudentRepo studentRepository;

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Add a student
    public Student addStudent(Student student) {
        student.setId(null);
        return studentRepository.save(student);
    }

    // Update a student
    public Student updateStudent(Student student) {
        if (!studentRepository.existsById(student.getId())) {
            throw new RuntimeException("Student not found");
        }
        return studentRepository.save(student);
    }

    // Delete a student
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}