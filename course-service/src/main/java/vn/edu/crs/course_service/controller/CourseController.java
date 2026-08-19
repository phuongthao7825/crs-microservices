package vn.edu.crs.course_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.crs.course_service.repository.CourseRepository;

import java.util.Map;

@RestController
@RequestMapping("/api/public/courses")
public class CourseController {

    private final CourseRepository courseRepository;

    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping
    public ResponseEntity<?> getPublicCourses() {
        return ResponseEntity.ok(Map.of("content", courseRepository.findAll()));
    }
}