package com.example.demo.api;

import com.example.demo.model.Product;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    public List<Product> getAllPeople() {
        return productService.getAllProducts();
    }

    /*@GetMapping(path = "{id}")
    public Person getPersonById(@PathVariable("id") UUID id) {
        return productService.getPersonById(id)
                .orElse(null);
    }

    @PostMapping
    public void addPerson(@Valid @NonNull @RequestBody Person person) {
        productService.addPerson(person);
    }

    @DeleteMapping(path = "{id}")
    public void deletePersonById(@PathVariable("id") UUID id) {
        productService.deletePerson(id);
    }

    @PutMapping(path = "{id}")
    public int updatePerson(@PathVariable("id") UUID id, @Valid @NonNull @RequestBody Person personToUpdate) {
        return productService.updatePerson(id, personToUpdate);
    }*/
}
