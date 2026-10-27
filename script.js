// SHOW AND HIDE PASSWORD
function togglePassword() {
    const password = document.getElementById("password");
    const eyeIcon = document.getElementById("eye-icon");

    if (password.type === "password") {
        password.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        password.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}

// LOGIN FORM
const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (email === "" || password === "") {
            alert("Please enter your email and password.");
            return;
        }

        // DEMONSTRATION LOGIN ONLY
        sessionStorage.setItem("beeUserEmail", email);

        alert("Login successful! Welcome to Bee's World.");

        window.location.href = "dashboard.html";
    });
}

// DISPLAY CUSTOMER INFORMATION ON DASHBOARD

const dashboardEmail = document.getElementById("dashboard-email");

if (dashboardEmail) {
    const savedEmail = sessionStorage.getItem("beeUserEmail");

    if (savedEmail) {
        dashboardEmail.textContent = savedEmail;

        const name = savedEmail.split("@")[0];

        document.getElementById("welcome-name").textContent = name;
        document.getElementById("dashboard-user-name").textContent = name;
    } else {
        dashboardEmail.textContent = "Demo account";
    }
}

// LOGOUT

function logoutUser() {
    sessionStorage.removeItem("beeUserEmail");

    alert("You have logged out successfully.");

    window.location.href = "login.html";
}

// TOGGLE MOBILE DASHBOARD MENU

function toggleSidebar() {
    const sidebar = document.getElementById("dashboard-sidebar");

    if (sidebar) {
        sidebar.classList.toggle("open");
    }
}

// BEE'S WORLD SHOPPING CART

// Get saved cart items or create an empty cart
let cart = JSON.parse(localStorage.getItem("beeCart")) || [];

// Save cart items
function saveCart() {
    localStorage.setItem("beeCart", JSON.stringify(cart));
}

// ADD PRODUCT TO CART
function addToCart(name, price) {
    cart = JSON.parse(localStorage.getItem("beeCart")) || [];

    cart.push({
        name: name,
        price: Number(price)
    });

    saveCart();
    updateCartCount();

    alert(name + " has been added to your cart!");

    window.location.href = "cart.html";
}

window.addToCart = addToCart;

// Update cart count on the website
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    const dashboardCartCount = document.getElementById("dashboard-cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    if (dashboardCartCount) {
        dashboardCartCount.textContent = cart.length;
    }
}

// Open the shopping cart
function showCart() {
    window.location.href = "cart.html";
}

// Shop Now button
function shopNow() {
    window.location.href = "index.html#products";
}
// CONTACT BUTTON
function contactUs() {
    const options = document.getElementById("contact-options");

    if (options) {
        options.classList.toggle("show");
    }
}

// Update the cart count when a page loads
document.addEventListener("DOMContentLoaded", function () {

    cart = JSON.parse(localStorage.getItem("beeCart")) || [];

    updateCartCount();

});

// DISPLAY SHOPPING CART ITEMS

function displayCart() {

    const cartItemsContainer = document.getElementById("cart-items");

    if (!cartItemsContainer) {
        return;
    }

    cart = JSON.parse(localStorage.getItem("beeCart")) || [];

    cartItemsContainer.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-bag-shopping"></i>
                <h3>Your cart is empty</h3>
                <p>Discover beautiful pieces from our collection.</p>
                <a href="index.html#products">Start Shopping</a>
            </div>
        `;

    } else {

        cart.forEach(function (item, index) {

            total += Number(item.price);

            cartItemsContainer.innerHTML += `
                <div class="cart-item">

                    <div>
                        <h3>${item.name}</h3>
                        <p>₦${Number(item.price).toLocaleString("en-NG")}</p>
                    </div>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(${index})"
                        aria-label="Remove ${item.name}">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>
            `;

        });

    }

    document.getElementById("cart-items-count").textContent =
        cart.length + (cart.length === 1 ? " item" : " items");

    document.getElementById("summary-quantity").textContent = cart.length;

    document.getElementById("cart-subtotal").textContent =
        "₦" + total.toLocaleString("en-NG");

    document.getElementById("cart-total").textContent =
        "₦" + total.toLocaleString("en-NG");

    updateCartCount();
}


// REMOVE AN ITEM FROM THE CART

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();
    displayCart();
}


// DEMONSTRATION CHECKOUT
function checkout() {
    cart = JSON.parse(localStorage.getItem("beeCart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty. Please add a product first.");
        return;
    }

    window.location.href = "checkout.html";
}

// INITIALIZE CART PAGE

document.addEventListener("DOMContentLoaded", function () {

    displayCart();

});
