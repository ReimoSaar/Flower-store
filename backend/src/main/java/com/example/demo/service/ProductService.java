package com.example.demo.service;

import com.example.demo.dao.StoreDao;
import com.example.demo.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProductService {

    private final StoreDao storeDao;

    @Autowired
    public ProductService(@Qualifier("postgres") StoreDao storeDao) {
        this.storeDao = storeDao;
    }

    public List<Map<String, Object>> getAllProducts() {
        return storeDao.selectALlProducts();
    }

    public Product getProductById(String name) {
        return storeDao.selectProductByID(name);
    }

    public List<Map<String, Object>> getTopThreeRelatedProducts(String name) {
        return storeDao.selectTopThreeRelatedProducts(name);
    }

    public List<Map<String, Object>> getCartItems() {
        return storeDao.selectCartItems();
    }

    public int putCartItem(long id, int quantity) {
        return storeDao.updateCartItem(id, quantity);
    }

    public int postCartItem(String name) {
        return storeDao.addCartItem(name);
    }

}
