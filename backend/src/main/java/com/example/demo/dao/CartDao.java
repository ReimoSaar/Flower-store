package com.example.demo.dao;

import java.util.List;
import java.util.Map;

public interface CartDao {

    List<Map<String, Object>> selectCartItems();

    int updateCartItem(Map<String, Object> cartItemValues);

    int addCartItem(String name);

    double selectCartSum();

    int removeCartItem(Map<String, Object> cartItemId);

    boolean selectCartItemExists(String productName);
}
