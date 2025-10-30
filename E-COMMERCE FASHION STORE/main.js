// Cart functionality
const cartIcon = document.getElementById("cart-icon");
const cartSidebar = document.querySelector(".cart-sidebar");
const closeCart = document.querySelector(".close-cart");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotalElement = document.getElementById("cart-total");
const cartCount = document.querySelector(".cart-count");
const overlay = document.querySelector(".overlay");

let cart = [];
let total = 0;

// Toggle cart sidebar
cartIcon.addEventListener("click", () => {
  cartSidebar.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "auto";
});

overlay.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Update cart display
function updateCart() {
  cartItemsContainer.innerHTML = "";
  total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
                    <div style="text-align: center; padding: 40px 20px;">
                        <i class="fas fa-shopping-bag" style="font-size: 3rem; color: #ddd; margin-bottom: 15px;"></i>
                        <p>Your cart is empty</p>
                        <a href="#" class="btn" style="margin-top: 15px; display: inline-block;">Continue Shopping</a>
                    </div>
                `;
  } else {
    cart.forEach((item) => {
      total += item.price * item.quantity;

      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");
      cartItemElement.innerHTML = `
                        <div class="cart-item-img">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p class="cart-item-price">$${item.price.toFixed(
                              2
                            )}</p>
                            <div class="cart-item-actions">
                                <button class="quantity-btn minus" data-id="${
                                  item.id
                                }">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn plus" data-id="${
                                  item.id
                                }">+</button>
                                <button class="remove-item" data-id="${
                                  item.id
                                }"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    `;

      cartItemsContainer.appendChild(cartItemElement);
    });
  }

  cartTotalElement.textContent = total.toFixed(2);
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Add event listeners to quantity buttons and remove buttons
  document.querySelectorAll(".quantity-btn.minus").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const item = cart.find((item) => item.id === id);
      if (item.quantity > 1) {
        item.quantity -= 1;
        updateCart();
      }
    });
  });

  document.querySelectorAll(".quantity-btn.plus").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const item = cart.find((item) => item.id === id);
      item.quantity += 1;
      updateCart();
    });
  });

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      cart = cart.filter((item) => item.id !== id);
      updateCart();
    });
  });
}

// Product Filter System
let activeFilters = {
  category: "all",
  price: "all",
  size: "all",
};

// Function to filter products based on active filters
function filterProducts() {
  let filteredProducts = [...products];

  // Category filter
  if (activeFilters.category !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === activeFilters.category
    );
  }

  // Price filter
  if (activeFilters.price !== "all") {
    const [min, max] = activeFilters.price.split("-").map(Number);
    filteredProducts = filteredProducts.filter((product) => {
      if (max === 999) return product.price >= min;
      return product.price >= min && product.price <= max;
    });
  }

  // Size filter
  if (activeFilters.size !== "all") {
    filteredProducts = filteredProducts.filter((product) =>
      product.sizes.includes(activeFilters.size)
    );
  }

  return filteredProducts;
}

// Function to update the product grid based on filters
function updateProductGrid() {
  const filteredProducts = filterProducts();
  const productsContainer = document.getElementById("products-container");

  // Update results count
  const resultsCount = document.getElementById("resultsCount");
  resultsCount.textContent = `Showing ${filteredProducts.length} of ${products.length} products`;

  // Clear current products
  productsContainer.innerHTML = "";

  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = `
                    <div class="no-products">
                        <i class="fas fa-search"></i>
                        <p>No products match your filters. Try adjusting your criteria.</p>
                    </div>
                `;
    return;
  }

  // Render filtered products
  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card", "fade-in");

    let badgeHTML = "";
    if (product.badge) {
      badgeHTML = `<div class="product-badge">${product.badge}</div>`;
    }

    let originalPriceHTML = "";
    if (product.originalPrice) {
      originalPriceHTML = `<span class="original-price">$${product.originalPrice.toFixed(
        2
      )}</span>`;
    }

    // Create color variants HTML
    let colorVariantsHTML = "";
    if (product.colorVariants && product.colorVariants.length > 0) {
      colorVariantsHTML = `<div class="color-variants">`;
      product.colorVariants.forEach((variant, index) => {
        colorVariantsHTML += `<div class="color-option ${
          index === 0 ? "active" : ""
        }" 
                            style="background-color: ${variant.color}" 
                            title="${variant.name}"></div>`;
      });
      colorVariantsHTML += `</div>`;
    }

    productCard.innerHTML = `
                    ${badgeHTML}
                    <div class="product-img">
                        <img src="${product.image}" alt="${product.name}" />
                        <div class="product-overlay">
                            <button class="quick-view">Quick View</button>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="product-price">
                            $${product.price.toFixed(2)} ${originalPriceHTML}
                        </p>
                        ${colorVariantsHTML}
                        <div class="product-actions">
                            <button
                                class="add-to-cart"
                                data-id="${product.id}"
                                data-name="${product.name}"
                                data-price="${product.price}"
                                data-image="${product.image}"
                            >
                                Add to Cart
                            </button>
                            <button class="wishlist"><i class="far fa-heart"></i></button>
                        </div>
                    </div>
                `;

    productsContainer.appendChild(productCard);
  });

  // Re-attach event listeners after rendering
  attachEventListeners();
}

// Function to attach event listeners to filter options
function setupFilterListeners() {
  // Category filter
  const categoryOptions = document.querySelectorAll(
    "#categoryFilter .filter-option"
  );
  categoryOptions.forEach((option) => {
    option.addEventListener("click", () => {
      // Update active filter
      activeFilters.category = option.getAttribute("data-value");

      // Update UI
      categoryOptions.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");

      // Update product grid
      updateProductGrid();
    });
  });

  // Price filter
  const priceOptions = document.querySelectorAll("#priceFilter .filter-option");
  priceOptions.forEach((option) => {
    option.addEventListener("click", () => {
      // Update active filter
      activeFilters.price = option.getAttribute("data-value");

      // Update UI
      priceOptions.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");

      // Update product grid
      updateProductGrid();
    });
  });

  // Size filter
  const sizeOptions = document.querySelectorAll("#sizeFilter .filter-option");
  sizeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      // Update active filter
      activeFilters.size = option.getAttribute("data-value");

      // Update UI
      sizeOptions.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");

      // Update product grid
      updateProductGrid();
    });
  });

  // Clear filters button
  const clearFiltersBtn = document.getElementById("clearFilters");
  clearFiltersBtn.addEventListener("click", () => {
    // Reset active filters
    activeFilters = {
      category: "all",
      price: "all",
      size: "all",
    };

    // Update UI
    document.querySelectorAll(".filter-option").forEach((option) => {
      if (option.getAttribute("data-value") === "all") {
        option.classList.add("active");
      } else {
        option.classList.remove("active");
      }
    });

    // Update product grid
    updateProductGrid();
  });
}

// Function to attach event listeners
function attachEventListeners() {
  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      const name = button.getAttribute("data-name");
      const price = parseFloat(button.getAttribute("data-price"));
      const image = button.getAttribute("data-image");

      // Check if item already in cart
      const existingItem = cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id,
          name,
          price,
          image,
          quantity: 1,
        });
      }

      updateCart();
      cartSidebar.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";

      // Add animation to cart icon
      cartIcon.style.transform = "scale(1.2)";
      setTimeout(() => {
        cartIcon.style.transform = "scale(1)";
      }, 300);
    });
  });

  // Color variant selection
  const colorOptions = document.querySelectorAll(".color-option");
  colorOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const parentCard = this.closest(".product-card");
      const allOptions = parentCard.querySelectorAll(".color-option");
      allOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Quick view buttons
  const quickViewButtons = document.querySelectorAll(".quick-view");
  quickViewButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const productCard = button.closest(".product-card");
      const productName = productCard.querySelector("h3").textContent;
      alert(`Quick view for: ${productName}`);
    });
  });

  // Wishlist buttons
  const wishlistButtons = document.querySelectorAll(".wishlist");
  wishlistButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const icon = button.querySelector("i");
      if (icon.classList.contains("far")) {
        icon.classList.remove("far");
        icon.classList.add("fas");
        icon.style.color = "#e17055";
        button.style.background = "#e17055";
        button.style.color = "white";
      } else {
        icon.classList.remove("fas");
        icon.classList.add("far");
        icon.style.color = "";
        button.style.background = "";
        button.style.color = "";
      }
    });
  });
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Render products
  updateProductGrid();

  // Setup filter listeners
  setupFilterListeners();

  // Initialize slideshow
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  let current = 0;
  let interval;

  // Show slide function
  const showSlide = (index) => {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  };

  // Auto-rotate slides
  const startSlideshow = () => {
    interval = setInterval(() => showSlide(current + 1), 5000);
  };

  // Event listeners
  prev.addEventListener("click", () => {
    clearInterval(interval);
    showSlide(current - 1);
    startSlideshow();
  });

  next.addEventListener("click", () => {
    clearInterval(interval);
    showSlide(current + 1);
    startSlideshow();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      clearInterval(interval);
      showSlide(parseInt(dot.getAttribute("data-index")));
      startSlideshow();
    });
  });

  // Start the slideshow
  startSlideshow();

  // Fade in animation on scroll
  const fadeElements = document.querySelectorAll(".fade-in");

  const fadeInOnScroll = () => {
    fadeElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for fade elements
  fadeElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  window.addEventListener("scroll", fadeInOnScroll);
  // Initial check in case elements are already in view
  fadeInOnScroll();

  // Initialize cart
  updateCart();

  // Mobile menu toggle
  const mobileMenu = document.getElementById("mobile-menu");
  const mainNav = document.getElementById("main-nav");

  mobileMenu.addEventListener("click", () => {
    mainNav.style.display = mainNav.style.display === "flex" ? "none" : "flex";
    mainNav.style.flexDirection = "column";
    mainNav.style.position = "absolute";
    mainNav.style.top = "100%";
    mainNav.style.left = "0";
    mainNav.style.right = "0";
    mainNav.style.background = "white";
    mainNav.style.padding = "20px";
    mainNav.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const newsletterForm = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("emailInput");
  const errorMessage = document.getElementById("errorMessage");
  const successMessage = document.getElementById("successMessage");
  const noThanksLink = document.getElementById("noThanks");
  const newsletterContent = document.querySelector(".newsletter-content");

  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Form submission handler
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();

    // Reset previous error state
    errorMessage.style.display = "none";
    emailInput.style.border = "none";

    // Validate email
    if (!isValidEmail(email)) {
      errorMessage.style.display = "block";
      emailInput.style.border = "2px solid #ff6b6b";
      return;
    }

    // Simulate form submission
    newsletterForm.classList.add("submitting");

    // In a real application, you would send the data to a server here
    setTimeout(function () {
      // Hide form and show success message
      newsletterContent.style.display = "none";
      successMessage.style.display = "block";

      // Reset form
      newsletterForm.classList.remove("submitting");
      newsletterForm.reset();
    }, 1500);
  });

  // No thanks handler
  noThanksLink.addEventListener("click", function () {
    // In a real application, you might set a cookie or send to analytics
    alert("Thanks for letting us know. You can always subscribe later!");
    // Optionally hide the newsletter entirely
    document.querySelector(".newsletter").style.display = "none";
  });
});
