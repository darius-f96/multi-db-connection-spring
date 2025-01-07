package tpjad2.oracle.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tpjad2.mssql.models.Product;
import tpjad2.mssql.repos.ProductRepository;
import tpjad2.oracle.dto.OrderDTO;
import tpjad2.oracle.dto.OrderRequestDTO;
import tpjad2.oracle.models.Order;
import tpjad2.oracle.repos.OrderRepository;
import tpjad2.postgres.models.User;
import tpjad2.postgres.repos.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public Order getOrderById(Long id) {
        return orderRepository.findByIdOrNull(id);
    }

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public List<Order> getOrdersByProduct(Long productId) {
        return orderRepository.findByProductId(productId);
    }

    public OrderDTO getOrderDetails(Long orderId) {
        Order order = orderRepository.findByIdOrNull(orderId);
        if (order == null) {
            return null;
        }

        String userName = userRepository.findById(order.getUserId())
                .map(User::getName).orElse("Unknown User");

        String productName = productRepository.findById(order.getProductId())
                .map(Product::getName).orElse("Unknown Product");

        return new OrderDTO(order.getId(), userName, productName, order.getQuantity());
    }

    public void deleteOrderById(Long orderId){
         orderRepository.deleteById(orderId);
    }

    public Order createOrder(OrderRequestDTO orderRequestDTO) {
        Order order = new Order();
        order.setUserId(orderRequestDTO.getUserId());
        order.setProductId(orderRequestDTO.getProductId());
        order.setQuantity(orderRequestDTO.getQuantity());
        return orderRepository.save(order);
    }

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream().map(order -> {
            String userName = userRepository.findById(order.getUserId()).map(User::getName).orElse("Unknown User");
            String productName = productRepository.findById(order.getProductId()).map(Product::getName).orElse("Unknown Product");
            return new OrderDTO(order.getId(), userName, productName, order.getQuantity());
        }).collect(Collectors.toList());
    }

}
