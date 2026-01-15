package istad.co.example.product_service.data;

import istad.co.example.product_service.domain.Product;
import istad.co.example.product_service.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            Product p1 = new Product(null, "Laptop", "High-performance gaming laptop", 1299.99);
            Product p2 = new Product(null, "Smartphone", "Latest Android phone with 128GB", 799.99);
            Product p3 = new Product(null, "Headphones", "Wireless noise-cancelling headphones", 199.99);
            Product p4 = new Product(null, "Mouse", "Ergonomic wireless mouse", 49.99);

            productRepository.saveAll(List.of(p1, p2, p3, p4));

            System.out.println("Sample products inserted!");  // Check logs
        }
    }
}
