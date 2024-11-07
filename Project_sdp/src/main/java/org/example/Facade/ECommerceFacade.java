package org.example.Facade;

import org.example.Service.InventoryService;
import org.example.Service.PaymentService;
import org.example.model.Product;

public class ECommerceFacade {
    private InventoryService inventoryService;
    private PaymentService paymentService;

    public ECommerceFacade(InventoryService inventoryService, PaymentService paymentService) {
        this.inventoryService = inventoryService;
        this.paymentService = paymentService;
    }

    public void purchaseProduct(Product product, String paymentMethod) {
        if (inventoryService.isAvailable(product)) {
            if (paymentService.processPayment(product.getPrice(), paymentMethod)) {
                inventoryService.reduceStock(product);
                System.out.println("Purchase successful: " + product.getName());
            } else {
                System.out.println("Payment failed. Please try another method.");
            }
        } else {
            System.out.println("Product not available");
        }
    }
}

