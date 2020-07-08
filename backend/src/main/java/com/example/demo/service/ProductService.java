package com.example.demo.service;

import com.example.demo.dao.ProductDao;
import com.example.demo.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductDao productDao;

    @Autowired
    public ProductService(@Qualifier("postgres") ProductDao productDao) {
        this.productDao = productDao;
    }

    /*public int addProduct(Product product) {
        return productDao.insertProduct(product);
    }*/

    public List<Product> getAllProducts() {
        return productDao.selectALlProducts();
    }

    /*public Optional<Person> getPersonById(UUID id) {
        return productDao.selectPersonByID(id);
    }

    public int deletePerson(UUID id) {
        return productDao.deletePersonById(id);
    }

    public int updatePerson(UUID id, Person newPerson) {
        return productDao.updatePersonById(id, newPerson);
    }*/
}
