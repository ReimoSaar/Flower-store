package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.sql.Timestamp;

@Getter
public class Product {
    final String name;
    final int stock;
    final double price;
    final String image_url;

    public Product(@JsonProperty("name") String name,
                   @JsonProperty("stock") int stock,
                   @JsonProperty("price") double price,
                   @JsonProperty("image_url") String image_url) {
        this.name = name;
        this.stock = stock;
        this.price = price;
        this.image_url = image_url;
    }
}
