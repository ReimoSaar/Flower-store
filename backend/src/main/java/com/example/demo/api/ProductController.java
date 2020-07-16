package com.example.demo.api;

import com.example.demo.model.Product;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RequestMapping("products")
@RestController
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @CrossOrigin
    @GetMapping
    public List<Map<String, Object>> getAllProducts() {
        return productService.getAllProducts();
    }

    @CrossOrigin
    @GetMapping(path = "{name}")
    public Product getProductById(@PathVariable("name") String name) {
        return productService.getProductById(name);
    }

    @CrossOrigin
    @GetMapping(path = "/related/{name}")
    public List<Map<String, Object>> getTopThreeRelatedProducts(@PathVariable("name") String name) {
        return productService.getTopThreeRelatedProducts(name);
    }
}
