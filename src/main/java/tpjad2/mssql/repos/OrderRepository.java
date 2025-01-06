package tpjad2.mssql.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tpjad2.mssql.models.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
