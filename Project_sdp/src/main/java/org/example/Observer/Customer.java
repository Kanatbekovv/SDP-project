package org.example.Observer;

import org.example.model.Product;

public class Customer implements Observer {
    private String name;

    public Customer(String name) {
        this.name = name;
    }

    @Override
    public void update(Product product) {
        System.out.println(name + ", the product " + product.getName() + " is now available.");
    }
}
