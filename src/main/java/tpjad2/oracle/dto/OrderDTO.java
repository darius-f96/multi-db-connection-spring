package tpjad2.oracle.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private Long orderId;
    private String userName;
    private String productName;
    private int quantity;
}
