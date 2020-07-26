package com.example.demo.api;

import com.example.demo.service.CartService;
import com.example.demo.service.ProductService;
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

@RequestMapping("cart")
@RestController
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @CrossOrigin
    @GetMapping
    public List<Map<String, Object>> getCartItems() {
        return cartService.getCartItems();
    }

    @CrossOrigin
    @PutMapping(path = "put")
    public int putCartItem(@RequestBody Map<String, Object> cartItemValues) {
        return cartService.putCartItem(cartItemValues);
    }

    @CrossOrigin
    @PostMapping(path = "post")
    public int postCartItem(@RequestBody String name) {
        return cartService.postCartItem(name);
    }

    @CrossOrigin
    @GetMapping(path = "sum")
    public double getCartSum() {
        return cartService.getCartSum();
    }

    @CrossOrigin
    @DeleteMapping(path = "delete")
    public int deleteFromCart(@RequestBody Map<String, Object> cartItemId) {
        return cartService.deleteFromCart(cartItemId);
    }

    @CrossOrigin
    @GetMapping(path = "exist/{name}")
    public boolean getCartItemExists(@PathVariable("name") String productName) {
        return cartService.getCartItemExists(productName);
    }

}
