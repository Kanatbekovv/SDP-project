package org.example.Service;

import org.example.Observer.Observer;
import org.example.model.Product;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class InventoryService {
    private Map<Product, Integer> inventory = new HashMap<>();
    private List<Observer> observers = new ArrayList<>();

    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }


    public void reduceStock(Product product) {
        inventory.put(product, inventory.getOrDefault(product, 0) - 1);
    }

    public void notifyObservers(Product product) {
        for (Observer observer : observers) {
            observer.update(product);
        }
    }

    public void addProduct(Product product, int quantity) {
        inventory.put(product, quantity);
        notifyObservers(product);
    }

    public boolean isAvailable(Product product) {
        return inventory.getOrDefault(product, 0) > 0;
    }
}

