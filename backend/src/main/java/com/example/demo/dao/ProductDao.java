package com.example.demo.dao;

import com.example.demo.model.Product;

import java.util.List;
import java.util.Map;

public interface ProductDao {

    List<Map<String, Object>> selectALlProducts();

    Product selectProductByID(String name);

    List<Map<String, Object>> selectTopThreeRelatedProducts(String name);

    int selectProductStock(String name);
}
