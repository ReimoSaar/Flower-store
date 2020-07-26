package com.example.demo.service;

import com.example.demo.dao.CartDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CartService {

    private final CartDao cartDao;

    @Autowired
    public CartService(@Qualifier("cart") CartDao cartDao) {
        this.cartDao = cartDao;
    }

    public List<Map<String, Object>> getCartItems() {
        return cartDao.selectCartItems();
    }

    public int putCartItem(Map<String, Object> cartItemValues) {
        return cartDao.updateCartItem(cartItemValues);
    }

    public int postCartItem(String name) {
        return cartDao.addCartItem(name);
    }

    public double getCartSum() {
        return cartDao.selectCartSum();
    }

    public int deleteFromCart(Map<String, Object> cartItemId) {
        return cartDao.removeCartItem(cartItemId);
    }

    public boolean getCartItemExists(String productName) {
        return cartDao.selectCartItemExists(productName);
    }
}
