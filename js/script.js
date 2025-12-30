let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart() {
    const product = {
        id: 1,
        name: "Forget Me Pot",
        price: 79.99,
        quantity: 1
    };

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartIcon();
    openCartDrawer();
}

function updateCartIcon() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIcon = document.querySelector(".cart a");

    if (cartCount > 0) {
        cartIcon.setAttribute("data-count", cartCount);
    } else {
        cartIcon.removeAttribute("data-count");
    }
}

function openCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const itemsList = document.getElementById("cart-items");
    const total = document.getElementById("cart-total");

    itemsList.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="images/pot.png" alt="${item.name}">
            <div class="item-info">
                <span class="item-name">${item.name}</span>
                <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <span>x${item.quantity}</span>
            <button onclick="removeFromCart(${index})">-</button>
        `;
        itemsList.appendChild(li);
    });

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    total.textContent = `Total: $${totalPrice.toFixed(2)}`;

    drawer.classList.add("open");
}

function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartIcon();
    openCartDrawer(); 
}

document.getElementById("close-cart").addEventListener("click", () => {
    document.getElementById("cart-drawer").classList.remove("open");
});

document.querySelector(".cart a").addEventListener("click", (e) => {
    e.preventDefault();
    openCartDrawer();
});

updateCartIcon();

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

const backToTop = document.getElementById("backToTop");

function getScrollTrigger() {
    return window.innerWidth <= 768 ? 150 : 300;
}

window.addEventListener("scroll", () => {
    backToTop.classList.toggle(
        "show",
        window.scrollY > getScrollTrigger()
    );
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});