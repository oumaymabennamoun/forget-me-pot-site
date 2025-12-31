let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart() {
    const product = { id: 1, name: "Forget Me Pot", price: 130.00, quantity: 1 };
    const existing = cart.find(item => item.id === product.id);
    if (existing) existing.quantity += 1;
    else cart.push(product);
    saveCart();
    updateCartIcon();
    openCartDrawer();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartIcon() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIcon = document.querySelector(".cart a");
    if (cartIcon) {
        if (cartCount > 0) cartIcon.setAttribute("data-count", cartCount);
        else cartIcon.removeAttribute("data-count");
    }
}

function openCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const itemsList = document.getElementById("cart-items");
    const total = document.getElementById("cart-total");
    const checkoutBtn = drawer.querySelector(".checkout-btn");

    itemsList.innerHTML = "";

    drawer.querySelector("h2").innerHTML = `My Cart <i class="ph ph-shopping-cart" style="color:#000;"></i>`;

    if (cart.length === 0) {
        itemsList.innerHTML = `<li class="empty-message">Your cart is empty.</li>`;
        total.innerHTML = "";
        if (checkoutBtn) checkoutBtn.style.display = "none";
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.dataset.index = index;
            li.innerHTML = `
                <img src="images/pot.png" alt="${item.name}">
                <div class="item-info">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div class="quantity-controls">
                    <button class="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase">+</button>
                </div>
            `;
            itemsList.appendChild(li);
        });

        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const gst = subtotal * 0.05;
        const qst = subtotal * 0.09975;
        const estimatedTotal = subtotal + gst + qst;

        total.innerHTML = `
            <div style="color:#222; font-size:16px; margin-bottom:4px;">Subtotal: $${subtotal.toFixed(2)}</div>
            <div style="color:#555; font-size:14px; margin-bottom:2px;">Estimated taxes:</div>
            <div style="color:#555; font-size:14px;">GST: $${gst.toFixed(2)}</div>
            <div style="color:#555; font-size:14px;">QST: $${qst.toFixed(2)}</div>
            <div style="color:#222; font-size:16px; font-weight:600; margin-top:6px;">Estimated total: $${estimatedTotal.toFixed(2)}</div>
        `;

        if (checkoutBtn) checkoutBtn.style.display = "block";
    }

    drawer.classList.add("open");
}

document.getElementById("cart-items").addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    const index = parseInt(li.dataset.index);

    if (e.target.classList.contains("decrease")) {
        if (cart[index].quantity > 1) cart[index].quantity -= 1;
        else cart.splice(index, 1);
        saveCart();
        updateCartIcon();
        openCartDrawer();
    }

    if (e.target.classList.contains("increase")) {
        cart[index].quantity += 1;
        saveCart();
        updateCartIcon();
        openCartDrawer();
    }
});

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
    if (window.scrollY > 60) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
});

const backToTop = document.getElementById("backToTop");
function getScrollTrigger() {
    return window.innerWidth <= 768 ? 150 : 300;
}
window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > getScrollTrigger());
});
backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
