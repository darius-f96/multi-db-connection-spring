package tpjad2.mssql.repos;

import org.springframework.stereotype.Repository;
import tpjad2.mssql.models.Product;
import tpjad2.utils.JpaRepositoryExtensions;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepositoryExtensions<Product, Long> {
    Optional<Product> findFirstByName(String name);
}
