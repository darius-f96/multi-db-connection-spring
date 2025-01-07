package tpjad2.mssql.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDTO {
    private String name;
    private float price;
}

