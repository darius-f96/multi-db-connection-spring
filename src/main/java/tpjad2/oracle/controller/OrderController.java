package tpjad2.oracle.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tpjad2.oracle.dto.OrderDTO;
import tpjad2.oracle.dto.OrderRequestDTO;
import tpjad2.oracle.models.Order;
import tpjad2.oracle.service.OrderService;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    public List<OrderDTO> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable Long userId) {
        return orderService.getOrdersByUser(userId);
    }

    @GetMapping("/product/{productId}")
    public List<Order> getOrdersByProduct(@PathVariable Long productId) {
        return orderService.getOrdersByProduct(productId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderDetails(@PathVariable Long id) {
        OrderDTO orderDTO = orderService.getOrderDetails(id);
        return orderDTO != null ? ResponseEntity.ok(orderDTO) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrderById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequestDTO orderRequestDTO) {
        Order order = orderService.createOrder(orderRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrderQuantity(@PathVariable Long id, @RequestBody Map<String, Integer> updates) {
        int quantity = updates.get("quantity");
        Order updatedOrder = orderService.updateOrderQuantity(id, quantity);
        return ResponseEntity.ok(updatedOrder);
    }

}

