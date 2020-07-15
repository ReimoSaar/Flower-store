package com.example.demo.dao;

import com.example.demo.model.Product;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductDao {

    //int insertProduct(int id, Product product);

    List<Product> selectALlProducts();

    Product selectProductByID(String name);

    //int deleteProductById(UUID id);

    //int updateProductById(UUID id, Person person);
}
