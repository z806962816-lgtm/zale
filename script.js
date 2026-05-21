// Product Database
const products = [
    {
        id: 1,
        name: '极速运动轮毂',
        series: 'sedan',
        size: '18',
        price: 1899,
        originalPrice: 2499,
        style: 'sport',
        specs: '18英寸 · 轿车系列 · 运动风格'
    },
    {
        id: 2,
        name: '豪华镀铬轮毂',
        series: 'sedan',
        size: '19',
        price: 2499,
        originalPrice: 3299,
        style: 'luxury',
        specs: '19英寸 · 轿车系列 · 豪华风格'
    },
    {
        id: 3,
        name: '越野王者轮毂',
        series: 'truck',
        size: '20',
        price: 3899,
        originalPrice: 4999,
        style: 'sport',
        specs: '20英寸 · 越野系列 · 运动风格'
    },
    {
        id: 4,
        name: 'SUV精英轮毂',
        series: 'suv',
        size: '19',
        price: 2799,
        originalPrice: 3599,
        style: 'modern',
        specs: '19英寸 · SUV系列 · 现代风格'
    },
    {
        id: 5,
        name: '跑车梦想轮毂',
        series: 'sport',
        size: '20',
        price: 4499,
        originalPrice: 5999,
        style: 'sport',
        specs: '20英寸 · 跑车系列 · 运动风格'
    },
    {
        id: 6,
        name: '经典黑金轮毂',
        series: 'sedan',
        size: '17',
        price: 1599,
        originalPrice: 2199,
        style: 'classic',
        specs: '17英寸 · 轿车系列 · 经典风格'
    },
    {
        id: 7,
        name: '现代简约轮毂',
        series: 'suv',
        size: '18',
        price: 1999,
        originalPrice: 2699,
        style: 'modern',
        specs: '18英寸 · SUV系列 · 现代风格'
    },
    {
        id: 8,
        name: '超级跑车轮毂',
        series: 'sport',
        size: '21',
        price: 5999,
        originalPrice: 7999,
        style: 'sport',
        specs: '21英寸 · 跑车系列 · 运动风格'
    },
    {
        id: 9,
        name: '豪华SUV轮毂',
        series: 'suv',
        size: '20',
        price: 3599,
        originalPrice: 4799,
        style: 'luxury',
        specs: '20英寸 · SUV系列 · 豪华风格'
    },
    {
        id: 10,
        name: '越野探险轮毂',
        series: 'truck',
        size: '18',
        price: 2199,
        originalPrice: 2999,
        style: 'sport',
        specs: '18英寸 · 越野系列 · 运动风格'
    },
    {
        id: 11,
        name: '轿车标配轮毂',
        series: 'sedan',
        size: '17',
        price: 1299,
        originalPrice: 1799,
        style: 'modern',
        specs: '17英寸 · 轿车系列 · 现代风格'
    },
    {
        id: 12,
        name: '豪华越野轮毂',
        series: 'truck',
        size: '21',
        price: 4999,
        originalPrice: 6499,
        style: 'luxury',
        specs: '21英寸 · 越野系列 · 豪华风格'
    }
];

// Shopping Cart
let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    setupEventListeners();
    loadCartFromStorage();
});

// Render Products
function renderProducts(productsToShow) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">未找到匹配的产品</p>';
        return;
    }
    
    productsToShow.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">🛞</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-specs">${product.specs}</div>
                <div class="product-price">
                    <div>
                        <div class="price">¥${product.price}</div>
                        <div class="original-price">¥${product.originalPrice}</div>
                    </div>
                    <div style="font-weight: 600; color: var(--accent-color);">省¥${product.originalPrice - product.price}</div>
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">加入购物车</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filter Products
function filterProducts() {
    const series = document.getElementById('carSeriesFilter').value;
    const size = document.getElementById('sizeFilter').value;
    const price = document.getElementById('priceFilter').value;
    const style = document.getElementById('styleFilter').value;
    
    let filtered = products.filter(product => {
        let match = true;
        
        if (series && product.series !== series) match = false;
        if (size && product.size !== size) match = false;
        if (style && product.style !== style) match = false;
        
        if (price) {
            const [min, max] = getPriceRange(price);
            if (product.price < min || product.price > max) match = false;
        }
        
        return match;
    });
    
    renderProducts(filtered);
}

function getPriceRange(priceFilter) {
    const ranges = {
        '1000-2000': [1000, 2000],
        '2000-3500': [2000, 3500],
        '3500-5000': [3500, 5000],
        '5000+': [5000, 999999]
    };
    return ranges[priceFilter] || [0, 999999];
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    updateCartCount();
    showNotification('已添加到购物车');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartCount();
    renderCart();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

// Render Cart
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">购物车为空</p>';
        updateCartSummary();
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.specs}</p>
                <p style="margin-top: 0.3rem;">数量: ${item.quantity}</p>
            </div>
            <div style="text-align: right;">
                <div class="cart-item-price">¥${item.price * item.quantity}</div>
                <button onclick="removeFromCart(${item.id})" style="background: var(--accent-color); color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem; margin-top: 0.5rem;">删除</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    updateCartSummary();
}

function updateCartSummary() {
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let shipping = subtotal > 5000 ? 0 : 50;
    let total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `¥${subtotal}`;
    document.getElementById('shipping').textContent = `¥${shipping}`;
    document.getElementById('total').textContent = `¥${total}`;
}

// Cart Modal
function toggleCartModal() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('active');
    renderCart();
}

// Setup Event Listeners
function setupEventListeners() {
    // Filter listeners
    document.getElementById('carSeriesFilter').addEventListener('change', filterProducts);
    document.getElementById('sizeFilter').addEventListener('change', filterProducts);
    document.getElementById('priceFilter').addEventListener('change', filterProducts);
    document.getElementById('styleFilter').addEventListener('change', filterProducts);
    
    // Cart listeners
    document.querySelector('.cart-icon').addEventListener('click', toggleCartModal);
    document.querySelector('.close-cart').addEventListener('click', toggleCartModal);
    document.getElementById('cartModal').addEventListener('click', function(e) {
        if (e.target === this) {
            toggleCartModal();
        }
    });
    
    // Checkout button
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        if (cart.length > 0) {
            showNotification('订单已提交！我们将尽快处理您的订单。');
            cart = [];
            saveCartToStorage();
            updateCartCount();
            renderCart();
            setTimeout(() => {
                toggleCartModal();
            }, 500);
        }
    });
    
    // CTA Button
    document.querySelector('.cta-button').addEventListener('click', function() {
        const filtersSection = document.querySelector('.filters');
        filtersSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// Notifications
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b35, #ff8c42);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(255, 107, 53, 0.4);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// LocalStorage
function saveCartToStorage() {
    localStorage.setItem('zaleCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const saved = localStorage.getItem('zaleCart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartCount();
    }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);