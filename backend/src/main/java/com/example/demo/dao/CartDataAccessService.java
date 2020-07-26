package com.example.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("cart")
public class CartDataAccessService implements CartDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CartDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Map<String, Object>> selectCartItems() {
        final String sql = "SELECT\n" +
                "cart.id,\n" +
                "products.name,\n" +
                "products.stock,\n" +
                "products.price,\n" +
                "products.image_url,\n" +
                "cart.quantity\n" +
                "FROM products\n" +
                "INNER JOIN cart ON (products.name = cart.products_name)\n" +
                "ORDER BY products.name";
        return jdbcTemplate
                .queryForList(sql);
    }

    @Override
    public int updateCartItem(Map<String, Object> cartItemValues) {
        final String sql = "UPDATE cart\n" +
                "SET quantity = ?\n" +
                "WHERE id = ?";
        final int quantity = (int) cartItemValues.get("quantity");
        final long id = ((Integer) cartItemValues.get("id")).longValue();
        return jdbcTemplate.update(sql, quantity, id);
    }

    @Override
    public int addCartItem(String name) {
        final String sql = "INSERT INTO cart (products_name, quantity)\n" +
                "VALUES (?, 1)";
        return jdbcTemplate.update(sql, name);
    }

    @Override
    public double selectCartSum() {
        final String sql = "SELECT COALESCE(SUM(products.price * cart.quantity), 0)\n" +
                "FROM cart\n" +
                "INNER JOIN products ON (cart.products_name = products.name)";
        return jdbcTemplate.queryForObject(sql, Double.class);
    }

    @Override
    public int removeCartItem(Map<String, Object> cartItemId) {
        final String sql = "DELETE FROM cart WHERE products_name = ?";
        final String productsName = (String) cartItemId.get("name");
        return jdbcTemplate.update(sql, productsName);
    }

    @Override
    public boolean selectCartItemExists(String productName) {
        final String sql = "SELECT EXISTS(SELECT cart.products_name FROM cart WHERE cart.products_name = ?)";
        return jdbcTemplate.queryForObject(sql, Boolean.class, productName);
    }
}
