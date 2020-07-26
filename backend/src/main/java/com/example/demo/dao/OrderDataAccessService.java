package com.example.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository("order")
public class OrderDataAccessService implements OrderDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public OrderDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int addNewOrder() {
        final String sql = "SELECT create_order()";
        jdbcTemplate.execute(sql);
        return 1;
    }
}
