package com.example.demo.dao;

import com.example.demo.model.Product;

import java.util.List;
import java.util.Map;

public interface StoreDao {

    //int insertProduct(int id, Product product);

    List<Map<String, Object>> selectALlProducts();

    Product selectProductByID(String name);

    List<Map<String, Object>> selectTopThreeRelatedProducts(String name);

    List<Map<String, Object>> selectCartItems();

    int updateCartItem(Map<String, Object> cartItemValues);

    int addCartItem(String name);

    double selectCartSum();

    int removeCartItem(Map<String, Object> cartItemId);

    //int deleteProductById(UUID id);

    //int updateProductById(UUID id, Person person);
}
