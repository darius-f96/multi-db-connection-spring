package tpjad2.mssql.dto;

import lombok.*;
import tpjad2.oracle.dto.OrderDTO;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long productId;
    private String productName;
    private float price;
    private List<OrderDTO> orders;
}

