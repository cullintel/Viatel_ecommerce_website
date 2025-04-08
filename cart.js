
/*
document.addEventListener("DOMContentLoaded", function () {
  const cartTab = document.querySelector(".cartTab");
  const cartList = document.querySelector(".listcart");
  const openCartBtn = document.querySelector(".open_cart_btn");
  const closeCartBtn = document.querySelector(".cart_close_btn");
  const addToCartBtns = document.querySelectorAll(".add_to_cart");
  const totalDisplay = document.createElement("div"); // For displaying the total price
  totalDisplay.className = "total_display";

  cartTab.appendChild(totalDisplay); // Append total display at the bottom of the cart tab

  // Utility functions
  const loadCart = () => JSON.parse(localStorage.getItem("cart")) || [];
  const saveCart = (cartData) => localStorage.setItem("cart", JSON.stringify(cartData));
  const saveTotalToLocalStorage = (total) => localStorage.setItem("cartTotal", total);

  // Calculate and display the total price
  const calculateTotal = () => {
    const cartData = loadCart();
    const totalPrice = cartData.reduce((sum, product) => sum + product.price * product.quantity, 0);

    totalDisplay.innerHTML = `<h3>Total: Ksh ${totalPrice.toLocaleString()}</h3>`;
    saveTotalToLocalStorage(totalPrice); // Save total to localStorage
  };

  // Render cart items
  const renderCart = () => {
    const cartData = loadCart();
    cartList.innerHTML = ""; // Clear existing items

    if (cartData.length === 0) {
      cartList.innerHTML = "<p>Your cart is empty.</p>";
      totalDisplay.innerHTML = "<h3>Total: Ksh 0</h3>";
      saveTotalToLocalStorage(0); // Save 0 to localStorage
      return;
    }

    cartData.forEach((product) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("product");
      cartItem.dataset.name = product.name;

      cartItem.innerHTML = `
        <div class="product_img">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product_details">
          <h4>${product.name}</h4>
          <p class="product_total">Total: Ksh ${product.price * product.quantity}</p>
        </div>
        <div class="quantity">
          <span class="minus">&lt;</span>
          <span>${product.quantity}</span>
          <span class="plus">&gt;</span>
        </div>
        <button class="remove_btn">Remove</button>
      `;

      cartList.appendChild(cartItem);
    });

    calculateTotal(); // Update total after rendering
  };

  // Add event listeners for cart actions (e.g., add, increase, decrease, remove)
  addToCartBtns.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const productCard = this.closest(".pro");
      if (!productCard) return;

      const productName = productCard.getAttribute("data-name");
      const productPrice = parseInt(productCard.getAttribute("data-price"), 10);
      const productImage = productCard.getAttribute("data-image");

      const cartData = loadCart();
      const existingProduct = cartData.find((item) => item.name === productName);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cartData.push({
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1,
        });
      }

      saveCart(cartData);
      renderCart();
    });
  });

  cartList.addEventListener("click", (event) => {
    const target = event.target;
    const cartItem = target.closest(".product");
    if (!cartItem) return;

    const productName = cartItem.dataset.name;
    const cartData = loadCart();
    const productIndex = cartData.findIndex((item) => item.name === productName);

    if (productIndex === -1) return;

    const product = cartData[productIndex];

    if (target.classList.contains("plus")) {
      product.quantity += 1;
    } else if (target.classList.contains("minus") && product.quantity > 1) {
      product.quantity -= 1;
    } else if (target.classList.contains("remove_btn")) {
      cartData.splice(productIndex, 1);
    }

    saveCart(cartData);
    renderCart();
  });

  renderCart(); // Initial render
});

*/

document.addEventListener("DOMContentLoaded", function () {
  const cartTab = document.querySelector(".cartTab");
  const cartList = document.querySelector(".listcart");
  const openCartBtn = document.querySelector(".open_cart_btn");
  const closeCartBtn = document.querySelector(".cart_close_btn");
  const addToCartBtns = document.querySelectorAll(".add_to_cart");
  const totalDisplay = document.createElement("div"); // For displaying the total price
  totalDisplay.className = "total_display";

  // Append total display at the bottom of the cart tab
  cartTab.appendChild(totalDisplay);

  // Utility functions
  const loadCart = () => JSON.parse(localStorage.getItem("cart")) || [];
  const saveCart = (cartData) => localStorage.setItem("cart", JSON.stringify(cartData));
  const saveTotalToLocalStorage = (total) => localStorage.setItem("cartTotal", total);

  // Calculate and display the total price
  const calculateTotal = () => {
    const cartData = loadCart();
    const totalPrice = cartData.reduce((sum, product) => sum + product.price * product.quantity, 0);

    totalDisplay.innerHTML = `<h3>Total: Ksh ${totalPrice.toLocaleString()}</h3>`;
    saveTotalToLocalStorage(totalPrice); // Save total to localStorage
  };

  // Render cart items
  const renderCart = () => {
    const cartData = loadCart();
    cartList.innerHTML = ""; // Clear existing items

    if (cartData.length === 0) {
      cartList.innerHTML = "<p>Your cart is empty.</p>";
      totalDisplay.innerHTML = "<h3>Total: Ksh 0</h3>";
      saveTotalToLocalStorage(0); // Save 0 to localStorage
      return;
    }

    cartData.forEach((product) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("product");
      cartItem.dataset.name = product.name;

      cartItem.innerHTML = `
        <div class="product_img">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product_details">
          <h4>${product.name}</h4>
          <p class="product_total">Total: Ksh ${product.price * product.quantity}</p>
        </div>
        <div class="quantity">
          <span class="minus">&lt;</span>
          <span>${product.quantity}</span>
          <span class="plus">&gt;</span>
        </div>
        <button class="remove_btn">Remove</button>
      `;

      cartList.appendChild(cartItem);
    });

    calculateTotal(); // Update total after rendering
  };

  // Open the cart tab
  openCartBtn.addEventListener("click", () => {
    cartTab.classList.add("open");
  });

  // Close the cart tab
  closeCartBtn.addEventListener("click", () => {
    cartTab.classList.remove("open");
  });

  // Add event listeners for adding to the cart
  addToCartBtns.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const productCard = this.closest(".pro");
      if (!productCard) return;

      const productName = productCard.getAttribute("data-name");
      const productPrice = parseInt(productCard.getAttribute("data-price"), 10);
      const productImage = productCard.getAttribute("data-image");

      const cartData = loadCart();
      const existingProduct = cartData.find((item) => item.name === productName);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cartData.push({
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1,
        });
      }

      saveCart(cartData);
      renderCart();
    });
  });

  // Handle cart item actions (increase, decrease, remove)
  cartList.addEventListener("click", (event) => {
    const target = event.target;
    const cartItem = target.closest(".product");
    if (!cartItem) return;

    const productName = cartItem.dataset.name;
    const cartData = loadCart();
    const productIndex = cartData.findIndex((item) => item.name === productName);

    if (productIndex === -1) return;

    const product = cartData[productIndex];

    if (target.classList.contains("plus")) {
      product.quantity += 1;
    } else if (target.classList.contains("minus") && product.quantity > 1) {
      product.quantity -= 1;
    } else if (target.classList.contains("remove_btn")) {
      cartData.splice(productIndex, 1);
    }

    saveCart(cartData);
    renderCart();
  });

  renderCart(); // Initial render
});



