package tpjad2.oracle.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tpjad2.oracle.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
