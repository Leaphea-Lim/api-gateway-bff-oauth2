package istad.co.example.category_service.data;

import istad.co.example.category_service.domain.Category;
import istad.co.example.category_service.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0) {
            Category c1 = new Category(null, "Electronics", "Devices and gadgets");
            Category c2 = new Category(null, "Accessories", "Peripherals and add-ons");
            Category c3 = new Category(null, "Computers", "Laptops and desktops");

            categoryRepository.saveAll(List.of(c1, c2, c3));

            System.out.println("Sample categories inserted!");
        }
    }
}