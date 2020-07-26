package com.example.demo.service;

import com.example.demo.dao.OrderDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final OrderDao orderDao;

    @Autowired
    public OrderService(@Qualifier("order") OrderDao orderDao) {
        this.orderDao = orderDao;
    }

    public int postNewOrder() {
        return orderDao.addNewOrder();
    }
}
