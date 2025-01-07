package tpjad2.oracle.models;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Entity
@Table(name = "ORDERS", schema = "ORAADMIN")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "QUANTITY")
    private int quantity;

    @Column(name = "PRODUCT_ID")
    private Long productId;

    @Column(name = "USER_ID")
    private Long userId;

}

