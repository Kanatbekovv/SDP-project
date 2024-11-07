package org.example.Service;

import org.example.Strategy.CreditCardPayment;
import org.example.Strategy.PayPalPayment;
import org.example.Strategy.PaymentStrategy;

public class PaymentService {
    public boolean processPayment(double amount, String paymentMethod) {
        PaymentStrategy paymentStrategy;
        switch (paymentMethod.toLowerCase()) {
            case "creditcard":
                paymentStrategy = new CreditCardPayment();
                break;
            case "paypal":
                paymentStrategy = new PayPalPayment();
                break;
            default:
                throw new IllegalArgumentException("Unsupported payment method: " + paymentMethod);
        }
        paymentStrategy.pay(amount);
        return true;
    }
}
