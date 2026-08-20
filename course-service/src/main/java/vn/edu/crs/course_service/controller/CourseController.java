package vn.edu.crs.course_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @GetMapping
    public ResponseEntity<?> getAllCourses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        // Dữ liệu mẫu khóa học
        Map<String, Object> course1 = new HashMap<>();
        course1.put("id", 1);
        course1.put("code", "JAVA01");
        course1.put("name", "Lập trình Java Căn Bản");
        course1.put("credits", 3);

        Map<String, Object> course2 = new HashMap<>();
        course2.put("id", 2);
        course2.put("code", "MS02");
        course2.put("name", "Kiến trúc Microservices với Spring Boot");
        course2.put("credits", 4);

        List<Map<String, Object>> courseList = Arrays.asList(course1, course2);

        return ResponseEntity.ok(courseList);
    }
}