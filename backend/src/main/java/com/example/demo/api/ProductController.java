package com.example.demo.api;

import com.example.demo.model.Product;
import com.example.demo.service.ProductService;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RequestMapping("store")
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
    @GetMapping(path = "related/{name}")
    public List<Map<String, Object>> getTopThreeRelatedProducts(@PathVariable("name") String name) {
        return productService.getTopThreeRelatedProducts(name);
    }

    @CrossOrigin
    @GetMapping(path = "cart")
    public List<Map<String, Object>> getCartItems() {
        return productService.getCartItems();
    }

    @CrossOrigin
    @PutMapping(path = "cart/put")
    public int putCartItem(@RequestBody Map<String, Object> cartItemValues) {
        return productService.putCartItem(cartItemValues);
    }

    @CrossOrigin
    @PostMapping(path = "cart/post")
    public int postCartItem(@RequestBody String name) {
        return productService.postCartItem(name);
    }

    @CrossOrigin
    @GetMapping(path = "cart/sum")
    public double getCartSum() {
        return productService.getCartSum();
    }

    @CrossOrigin
    @DeleteMapping(path = "cart/delete")
    public int deleteFromCart(@RequestBody Map<String, Object> cartItemId) {
        return productService.deleteFromCart(cartItemId);
    }

    @CrossOrigin
    @GetMapping(path = "cart/exist/{name}")
    public boolean getCartItemExists(@PathVariable("name") String productName) {
        return productService.getCartItemExists(productName);
    }

    @CrossOrigin
    @PostMapping(path = "order")
    public int postNewOrder() {
        return productService.postNewOrder();
    }

    @CrossOrigin
    @GetMapping(path = "stock/{name}")
    public int getProductStock(@PathVariable("name") String name) {
        return productService.getProductStock(name);
    }
}
