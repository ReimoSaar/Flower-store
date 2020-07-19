package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class Cart {
    final String productsName;
    final int quantity;

    public Cart(@JsonProperty("products_name") String productsName, @JsonProperty("quantity") int quantity) {
        this.productsName = productsName;
        this.quantity = quantity;
    }
}
