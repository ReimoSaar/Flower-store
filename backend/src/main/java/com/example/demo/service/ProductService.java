package com.example.demo.service;

import com.example.demo.dao.ProductDao;
import com.example.demo.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProductService {

    private final ProductDao productDao;

    @Autowired
    public ProductService(@Qualifier("products") ProductDao productDao) {
        this.productDao = productDao;
    }

    public List<Product> getAllProductsByFilter(String condition) {
        return productDao.selectALlProductsByFilter(condition);
    }

    public Product getProductById(String name) {
        return productDao.selectProductByID(name);
    }

    public List<Map<String, Object>> getTopThreeRelatedProducts(String name) {
        return productDao.selectTopThreeRelatedProducts(name);
    }

    public int getProductStock(String name) {
        return productDao.selectProductStock(name);
    }

}
