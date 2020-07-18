package com.example.demo.dao;

import com.example.demo.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("postgres")
public class StoreDataAccessService implements StoreDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StoreDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Map<String, Object>> selectALlProducts() {
        final String sql = "SELECT products.name, products.price, products.image_url FROM products";
        return jdbcTemplate
                .queryForList(sql);
    }

    @Override
    public Product selectProductByID(String name) {
        final String sql = "SELECT * FROM products WHERE name = ?";
        return jdbcTemplate.queryForObject(sql, new Object[] {name}, (resultSet, i) -> {
            final String productName = resultSet.getString("name");
            final int stock = resultSet.getInt("stock");
            final double price = resultSet.getDouble("price");
            final String imageUrl = resultSet.getString("image_url");
            return new Product(productName, stock, price, imageUrl);
        });
    }

    @Override
    public List<Map<String, Object>> selectTopThreeRelatedProducts(String name) {
        final String sql = "SELECT products.name, products.price, products.image_url FROM order_lines\n" +
                "INNER JOIN products ON (order_lines.products_name = products.name)\n" +
                "WHERE order_lines.orders_id IN (\n" +
                "\tSELECT order_lines.orders_id\n" +
                "\tFROM order_lines\n" +
                "\tINNER JOIN products ON (order_lines.products_name = products.name)\n" +
                "\tWHERE products.name = ?\n" +
                ") AND products.name != ? GROUP BY products.name\n" +
                "ORDER BY SUM(order_lines.quantity_ordered) DESC LIMIT 3\n";
        return jdbcTemplate
                .queryForList(sql, name, name);
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
    public int updateCartItem(long id, int quantity) {
        final String sql = "UPDATE cart\n" +
                "SET quantity = ?\n" +
                "WHERE id = ?";
        return jdbcTemplate.update(sql, quantity, id);
    }

    @Override
    public int addCartItem(String name) {
        final String sql = "INSERT INTO cart (products_name, quantity)\n" +
                "VALUES (?, 1)";
        return jdbcTemplate.update(sql, name);
    }
}
