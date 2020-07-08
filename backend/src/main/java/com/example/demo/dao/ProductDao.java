package com.example.demo.dao;

import com.example.demo.model.Product;

import java.util.List;

public interface ProductDao {

    //int insertProduct(int id, Product product);

    List<Product> selectALlProducts();

    //Optional<Product> selectProductByID(UUID id);

    //int deleteProductById(UUID id);

    //int updateProductById(UUID id, Person person);
}
