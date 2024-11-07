let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
}

function changeQuantity(itemId, change) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart)); 

    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartItems = document.getElementById('cart-items');
    
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.innerText = totalItems;
    cartTotal.innerText = `$${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}`;

    if (cart.length === 0) {
        cartItems.innerHTML = `<p>Your cart is empty. Start adding items!</p>`;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item mb-3 p-3  rounded" style="background-color: #373737; color: #373737; box-shadow: 0px 0px 10px rgba(255, 204, 0, 0.2);">
                <h5 style="font-size: 1.3rem; font-weight: bold;">${item.title}</h5>
                <p style="font-size: 1.1rem;">Price: <span style="color: #ff6666;">$${item.price.toFixed(2)}</span></p>
                <p style="font-size: 1.1rem;">Quantity: 
                    <button class="btn btn-sm btn-outline-danger" onclick="changeQuantity(${item.id}, -1)" style="font-weight: ">-</button>
                    <span style="margin: 0 10px;">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-success" onclick="changeQuantity(${item.id}, 1)" style="font-weight: ">+</button>
                </p>
                <p style="font-size: 1.1rem;">Total: <span style="color: #ff6666;">$${(item.price * item.quantity).toFixed(2)}</span></p>
                <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})" style="width: 100%; font-weight: bold; color: white; background-color: #872d2d; border: none; margin-top: 10px;">Remove</button>
            </div>
        `).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});

document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
        const item = {
            id: index + 1, 
            title: button.closest('.card-body').querySelector('.card-title').innerText,
            price: parseFloat(button.closest('.card-body').querySelector('.card-text').innerText.replace('Price: $', ''))
        };
        addToCart(item);
    });
});


const cartTotal = document.getElementById("cart-total").parentElement;

cartTotal.onmouseover = function() {
    cartTotal.style.transform = "scale(1.2)";
};

cartTotal.onmouseout = function() {
    cartTotal.style.transform = "scale(1)";
};
// Находим все элементы с классом "nav-link"
const navLinks = document.querySelectorAll('.nav-link');

// Проходим по каждому элементу и добавляем обработчики событий
navLinks.forEach(link => {
    link.onmouseover = function() {
        link.style.transform = 'scale(1.2)';
        link.style.transition = 'transform 0.3s ease';
    };

    link.onmouseout = function() {
        link.style.transform = 'scale(1)';
    };
});
