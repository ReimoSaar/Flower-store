package com.example.demo.dao;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

public interface OrderDao {

    int addNewOrder();
}
