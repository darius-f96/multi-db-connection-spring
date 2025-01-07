package tpjad2.postgres.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tpjad2.exceptions.ResourceNotFoundException;
import tpjad2.mssql.repos.ProductRepository;
import tpjad2.oracle.dto.OrderDTO;
import tpjad2.oracle.models.Order;
import tpjad2.oracle.repos.OrderRepository;
import tpjad2.postgres.dto.UserDTO;
import tpjad2.postgres.dto.UserRequestDTO;
import tpjad2.postgres.models.User;
import tpjad2.postgres.repos.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public User getUserById(Long id) {
        return userRepository.findByIdOrNull(id);
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(user -> {
            List<OrderDTO> orders = orderRepository.findByUserId(user.getId()).stream().map(order ->
                    new OrderDTO(order.getId(), user.getName(), productRepository.findByIdOrNull(order.getProductId()).getName(), order.getQuantity())
            ).collect(Collectors.toList());
            return new UserDTO(user.getId(), user.getName(), orders);
        }).collect(Collectors.toList());
    }

    public void deleteUserById(Long id) {
        List<Order> orders = orderRepository.findByUserId(id);
        orderRepository.deleteAll(orders);

        userRepository.deleteById(id);
    }

    public User createUser(UserRequestDTO userRequestDTO) {
        User user = new User();
        user.setName(userRequestDTO.getName());
        return userRepository.save(user);
    }
    public User updateUser(Long id, String name) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setName(name);
        return userRepository.save(user);
    }

}

