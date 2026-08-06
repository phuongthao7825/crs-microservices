package vn.edu.crs.course_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.crs.course_service.entity.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    boolean existsByTenMonHocIgnoreCase(String tenMonHoc);
}