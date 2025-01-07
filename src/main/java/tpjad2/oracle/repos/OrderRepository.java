package tpjad2.oracle.repos;

import org.springframework.stereotype.Repository;
import tpjad2.oracle.models.Order;
import tpjad2.utils.JpaRepositoryExtensions;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepositoryExtensions<Order, Long> {
    List<Order> findByUserId(Long userId);
    List<Order> findByProductId(Long productId);
    void deleteById(Long id);
}
