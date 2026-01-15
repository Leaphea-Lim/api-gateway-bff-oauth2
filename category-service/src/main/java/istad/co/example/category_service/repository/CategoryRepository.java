package istad.co.example.category_service.repository;

import istad.co.example.category_service.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
