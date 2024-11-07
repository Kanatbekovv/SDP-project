package org.example.Decorator;

import org.example.model.Product;

public class DiscountDecorator extends ProductDecorator {
    private double discount;

    public DiscountDecorator(Product decoratedProduct, double discount) {
        super(decoratedProduct);
        this.discount = discount;
    }

    @Override
    public double getPrice() {
        return decoratedProduct.getPrice() - (decoratedProduct.getPrice() * discount);
    }
}
