package tpjad2.mssql.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tpjad2.exceptions.ResourceNotFoundException;
import tpjad2.mssql.dto.ProductDTO;
import tpjad2.mssql.dto.ProductRequestDTO;
import tpjad2.mssql.models.Product;
import tpjad2.mssql.repos.ProductRepository;
import tpjad2.oracle.dto.OrderDTO;
import tpjad2.oracle.models.Order;
import tpjad2.oracle.repos.OrderRepository;
import tpjad2.postgres.repos.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public Product getProductById(Long id) {
        return productRepository.findByIdOrNull(id);
    }
    public void deleteProductById(Long id) {
        List<Order> orders = orderRepository.findByProductId(id);
        orderRepository.deleteAll(orders);

        productRepository.deleteById(id);
    }

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream().map(product -> {
            List<OrderDTO> orders = orderRepository.findByProductId(product.getId()).stream().map(order ->
                    new OrderDTO(order.getId(), userRepository.findByIdOrNull(order.getUserId()).getName(), product.getName(), order.getQuantity())
            ).collect(Collectors.toList());
            return new ProductDTO(product.getId(), product.getName(), product.getPrice(), orders);
        }).collect(Collectors.toList());
    }

    public Product createProduct(ProductRequestDTO productRequestDTO) {
        Product product = new Product();
        product.setName(productRequestDTO.getName());
        product.setPrice(productRequestDTO.getPrice());
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, ProductRequestDTO updates) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        product.setName(updates.getName());
        product.setPrice(updates.getPrice());
        return productRepository.save(product);
    }

}

