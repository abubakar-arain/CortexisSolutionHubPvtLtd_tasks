let currentStep = 1;
const steps = document.querySelectorAll(".form-step");
const indicators = document.querySelectorAll(".step");

function showStep(step) {
  steps.forEach((s, i) => {
    s.classList.toggle("active", i === step - 1);
    indicators[i].classList.toggle("active", i === step - 1);
  });
}

function nextStep() {
  if (currentStep < steps.length) {
    currentStep++;
    showStep(currentStep);
    if (currentStep === 4) {
      updatePrice();
    }
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
}

// Enhanced Price Calculator Variables
let currentCurrency = "USD";
let previousTotal = 0;
const exchangeRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
};

const destinationPrices = {
  paris: 1200,
  tokyo: 1500,
  dubai: 1100,
  maldives: 1800,
};

const preferenceMultipliers = {
  "": 1,
  luxury: 1.5,
  adventure: 1.2,
  family: 1.1,
  budget: 0.8,
};

// Enhanced Price Calculator Functions
function updatePrice() {
  const destination = document.getElementById("destination").value;
  const travelers = parseInt(document.getElementById("travelers").value) || 1;
  const preference = document.getElementById("preferences").value;

  // Calculate base price
  let basePrice = destinationPrices[destination] || 0;

  // Calculate number of days
  const days =
    selectedStart && selectedEnd ? selectedEnd - selectedStart + 1 : 1;

  // Calculate total price
  let total = basePrice * days;
  let travelerCost = (travelers - 1) * 200 * days;
  let preferenceCost = total * (preferenceMultipliers[preference] - 1);

  total = total * preferenceMultipliers[preference] + travelerCost;

  // Convert to current currency
  const rate = exchangeRates[currentCurrency];
  const symbol = getCurrencySymbol(currentCurrency);

  // Format numbers with commas
  const formatNumber = (num) => {
    return (num * rate).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Update price display with animation if changed
  const totalElement = document.getElementById("totalPrice");
  if (previousTotal !== total) {
    totalElement.classList.add("price-updated");
    setTimeout(() => {
      totalElement.classList.remove("price-updated");
    }, 1000);
  }
  previousTotal = total;

  // Update price display
  document.getElementById("basePrice").textContent = `${symbol}${formatNumber(
    basePrice * days
  )}`;
  document.getElementById(
    "travelerCost"
  ).textContent = `${symbol}${formatNumber(travelerCost)}`;
  document.getElementById(
    "preferenceCost"
  ).textContent = `${symbol}${formatNumber(preferenceCost)}`;
  document.getElementById("totalPrice").textContent = `${symbol}${formatNumber(
    total
  )}`;

  // Add savings badge for budget option
  const preferenceCostElement = document.getElementById("preferenceCost");
  if (preference === "budget") {
    if (!preferenceCostElement.querySelector(".savings-badge")) {
      const savingsBadge = document.createElement("span");
      savingsBadge.className = "savings-badge";
      savingsBadge.textContent = "Save 20%";
      preferenceCostElement.appendChild(savingsBadge);
    }
  } else {
    const existingBadge = preferenceCostElement.querySelector(".savings-badge");
    if (existingBadge) {
      existingBadge.remove();
    }
  }
}

function getCurrencySymbol(currency) {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    default:
      return "$";
  }
}

// Enhanced currency selector functionality
document.querySelectorAll(".currency-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".currency-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    currentCurrency = this.dataset.currency;
    updatePrice();
  });
});

// Enhanced cost breakdown modal
function showBreakdown() {
  const destination = document.getElementById("destination").value;
  const travelers = parseInt(document.getElementById("travelers").value) || 1;
  const preference = document.getElementById("preferences").value;

  // Calculate breakdown
  let basePrice = destinationPrices[destination] || 0;
  const days =
    selectedStart && selectedEnd ? selectedEnd - selectedStart + 1 : 1;
  let total = basePrice * days;
  let travelerCost = (travelers - 1) * 200 * days;
  let preferenceCost = total * (preferenceMultipliers[preference] - 1);

  total = total * preferenceMultipliers[preference] + travelerCost;

  // Convert to current currency
  const rate = exchangeRates[currentCurrency];
  const symbol = getCurrencySymbol(currentCurrency);

  // Format numbers with commas
  const formatNumber = (num) => {
    return (num * rate).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Build enhanced breakdown HTML
  const breakdownHTML = `
        <div class="cost-breakdown-section">
          <h4>📅 Trip Details</h4>
          <div class="cost-item">
            <div>
              <span>Destination: ${
                destination
                  ? destination.charAt(0).toUpperCase() + destination.slice(1)
                  : "Not selected"
              }</span>
              <div class="cost-description">Base price per day</div>
            </div>
            <span>${symbol}${formatNumber(basePrice)}</span>
          </div>
          <div class="cost-item">
            <div>
              <span>Duration: ${days} day${days !== 1 ? "s" : ""}</span>
              <div class="cost-description">${
                selectedStart && selectedEnd
                  ? `From ${selectedStart} to ${selectedEnd}`
                  : "Dates not selected"
              }</div>
            </div>
            <span>× ${days}</span>
          </div>
        </div>
        
        <div class="cost-breakdown-section">
          <h4>👥 Travelers</h4>
          <div class="cost-item">
            <div>
              <span>${travelers} traveler${travelers !== 1 ? "s" : ""}</span>
              <div class="cost-description">First traveler included in base price</div>
            </div>
            <span>${symbol}0</span>
          </div>
          ${
            travelers > 1
              ? `
          <div class="cost-item">
            <div>
              <span>Additional ${travelers - 1} traveler${
                  travelers - 1 !== 1 ? "s" : ""
                }</span>
              <div class="cost-description">${symbol}200 per day per additional traveler</div>
            </div>
            <span>${symbol}${formatNumber(travelerCost)}</span>
          </div>
          `
              : ""
          }
        </div>
        
        <div class="cost-breakdown-section">
          <h4>⭐ Package Type</h4>
          <div class="cost-item">
            <div>
              <span>${
                preference
                  ? preference.charAt(0).toUpperCase() + preference.slice(1)
                  : "Standard"
              } Package</span>
              <div class="cost-description">
                ${
                  preference === "luxury"
                    ? "Premium accommodations & services"
                    : preference === "adventure"
                    ? "Adventure activities included"
                    : preference === "family"
                    ? "Family-friendly amenities"
                    : preference === "budget"
                    ? "Economy options with 20% savings"
                    : "Standard travel package"
                }
              </div>
            </div>
            <span>${preferenceCost >= 0 ? "+" : ""}${symbol}${formatNumber(
    preferenceCost
  )}</span>
          </div>
        </div>
        
        <div class="cost-item total">
          <span>Total Amount</span>
          <span>${symbol}${formatNumber(total)}</span>
        </div>
      `;

  document.getElementById("costDetails").innerHTML = breakdownHTML;
  document.getElementById("breakdownModal").style.display = "block";
}

function closeBreakdown() {
  document.getElementById("breakdownModal").style.display = "none";
}

// Close modal when clicking outside
window.addEventListener("click", function (event) {
  const modal = document.getElementById("breakdownModal");
  if (event.target === modal) {
    closeBreakdown();
  }
});

// Calendar Variables
const calendar = document.getElementById("calendar");
const dateSummary = document.getElementById("dateSummary");
const monthLabel = document.getElementById("monthLabel");
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedStart = null;
let selectedEnd = null;

const unavailableDates = [5, 6, 12, 20];
const priceVariations = {
  low: [2, 3, 4, 7],
  medium: [8, 9, 10, 11],
  high: [15, 16, 17],
};

function renderCalendar(month, year) {
  calendar.innerHTML = "";
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  monthLabel.textContent = `${monthNames[month]} ${year}`;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.textContent = day;

    if (unavailableDates.includes(day)) cell.classList.add("unavailable");
    else if (priceVariations.low.includes(day)) {
      cell.classList.add("price-low");
      cell.title = "Low price day 🌿";
    } else if (priceVariations.medium.includes(day)) {
      cell.classList.add("price-medium");
      cell.title = "Moderate price 🌤";
    } else if (priceVariations.high.includes(day)) {
      cell.classList.add("price-high");
      cell.title = "High demand 💰";
    }

    cell.addEventListener("click", () => handleDateSelect(day, cell));
    calendar.appendChild(cell);
  }
}

function handleDateSelect(day, cell) {
  if (cell.classList.contains("unavailable")) {
    // Provide haptic feedback for unavailable dates (where supported)
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    return;
  }

  if (!selectedStart || (selectedStart && selectedEnd)) {
    clearSelection();
    selectedStart = day;
    selectedEnd = null;
    cell.classList.add("selected");
    dateSummary.textContent = `Start date selected: ${day}`;

    // Visual feedback for selection
    cell.style.transform = "scale(0.95)";
    setTimeout(() => {
      cell.style.transform = "scale(1)";
    }, 150);
  } else if (day > selectedStart) {
    selectedEnd = day;
    highlightRange();
    dateSummary.textContent = `Travel Dates: ${selectedStart} → ${selectedEnd}`;
  }

  updatePrice();
}

function highlightRange() {
  const cells = calendar.querySelectorAll("div");
  cells.forEach((cell) => {
    const day = parseInt(cell.textContent);
    if (
      !cell.classList.contains("unavailable") &&
      day >= selectedStart &&
      day <= selectedEnd
    ) {
      cell.classList.add("selected");
    }
  });
}

function clearSelection() {
  calendar
    .querySelectorAll(".selected")
    .forEach((c) => c.classList.remove("selected"));
}

document.getElementById("prevMonth").addEventListener("click", () => {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  } else currentMonth--;
  renderCalendar(currentMonth, currentYear);
});

document.getElementById("nextMonth").addEventListener("click", () => {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else currentMonth++;
  renderCalendar(currentMonth, currentYear);
});

renderCalendar(currentMonth, currentYear);

function toggleFavorite(el) {
  el.classList.toggle("active");

  // Visual feedback for mobile
  if (window.innerWidth <= 768) {
    el.style.transform = "scale(1.3)";
    setTimeout(() => {
      el.style.transform = "scale(1)";
    }, 200);
  }
}

// 🧭 Sort Functionality
function sortGallery() {
  const gallery = document.getElementById("gallery");
  const cards = Array.from(gallery.getElementsByClassName("card"));
  const sortBy = document.getElementById("sortOptions").value;

  let sortedCards = cards.slice();

  if (sortBy === "price") {
    sortedCards.sort((a, b) => a.dataset.price - b.dataset.price);
  } else if (sortBy === "rating") {
    sortedCards.sort((a, b) => b.dataset.rating - a.dataset.rating);
  } else if (sortBy === "popularity") {
    sortedCards.sort((a, b) => b.dataset.popularity - a.dataset.popularity);
  } else {
    sortedCards = cards;
  }

  // Reorder cards
  gallery.innerHTML = "";
  sortedCards.forEach((card) => gallery.appendChild(card));
}

const regions = document.querySelectorAll(".region");
const tooltip = document.getElementById("tooltip");
const infoCard = document.getElementById("info-card");
let selected = null;

regions.forEach((region) => {
  region.addEventListener("mouseenter", (e) => {
    const name = region.dataset.name;
    tooltip.textContent = name;
    tooltip.style.display = "block";
  });

  region.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.pageX + "px";
    tooltip.style.top = e.pageY - 30 + "px";
  });

  region.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });

  region.addEventListener("click", () => {
    if (selected) selected.classList.remove("selected");
    region.classList.add("selected");
    selected = region;

    // Update info card
    infoCard.querySelector("h3").textContent = region.dataset.name;
    infoCard.querySelector("p").textContent = region.dataset.info;
    infoCard.classList.add("active");
  });
});

const data = [
  {
    n: "Sarah Khan",
    r: 5,
    t: "Loved our stay in Bali! Beautiful resort and friendly staff.",
  },
  {
    n: "John Doe",
    r: 4,
    t: "Great location and clean rooms. Food could be better though.",
  },
  {
    n: "Maria Lopez",
    r: 5,
    t: "Perfect getaway! Smooth booking and stunning beach views.",
  },
  {
    n: "Ahmed Ali",
    r: 3,
    t: "Decent trip, some facilities under renovation but good service.",
  },
  {
    n: "Lisa Wang",
    r: 5,
    t: "Phenomenal experience! The villa and pool were perfect.",
  },
  {
    n: "David Smith",
    r: 4,
    t: "Loved the cultural tours and local cuisine suggestions.",
  },
];


        let shown = 3;
        const container = document.getElementById("reviews-container");
        const loadMoreBtn = document.getElementById("loadMore");

        function stars(n) {
            return "★".repeat(n) + "☆".repeat(5 - n);
        }

        function render() {
            container.innerHTML = data
                .slice(0, shown)
                .map(
                    (d, i) => `
                    <div class="card" style="animation-delay:${i * 0.1}s">
                        <div class="header">
                            <span>${d.n}</span>
                            <span class="stars">${stars(d.r)}</span>
                        </div>
                        <p class="text">${d.t}</p>
                        <span class="toggle">Read More</span>
                    </div>`
                )
                .join("");
            
            container.querySelectorAll(".toggle").forEach(
                btn => btn.onclick = (e) => {
                    const card = e.target.closest(".card");
                    card.classList.toggle("expanded");
                    btn.textContent = card.classList.contains("expanded")
                        ? "Show Less"
                        : "Read More";
                }
            );
            
            if (shown >= data.length) {
                loadMoreBtn.style.display = "none";
            }
        }

        loadMoreBtn.onclick = () => {
            shown += 3;
            render();
        };

        // Initial render
        render();

// Enhanced form submission for mobile
document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // Add loading state for better UX
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Processing...";
  submitBtn.disabled = true;

  // Simulate processing time
  setTimeout(() => {
    alert("🎉 Booking Confirmed! Thank you for choosing ExploreEase.");
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
});

// ===== ENHANCED MOBILE OPTIMIZATION JAVASCRIPT =====

// Enhanced collapsible sections functionality - only for mobile
function initCollapsibleSections() {
  // Only initialize if on mobile
  if (window.innerWidth <= 768) {
    document.querySelectorAll(".collapsible").forEach((button) => {
      button.addEventListener("click", function () {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        content.classList.toggle("active");

        // Scroll to section when expanded
        if (content.classList.contains("active")) {
          setTimeout(() => {
            content.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 300);
        }
      });
    });
  } else {
    // On desktop, ensure all sections are visible
    document.querySelectorAll(".collapsible-content").forEach((section) => {
      section.classList.add("active");
    });
  }
}

// Initialize collapsible sections based on screen size
initCollapsibleSections();

// Re-initialize when window is resized
window.addEventListener("resize", initCollapsibleSections);

// Touch-optimized calendar with swipe support
let touchStartX = 0;
let touchEndX = 0;

const calendarContainer = document.querySelector(".calendar-wrapper");

calendarContainer.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true }
);

calendarContainer.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  { passive: true }
);

function handleSwipe() {
  const swipeThreshold = 50;

  if (touchEndX < touchStartX - swipeThreshold) {
    // Swipe left - next month
    document.getElementById("nextMonth").click();
  }

  if (touchEndX > touchStartX + swipeThreshold) {
    // Swipe right - previous month
    document.getElementById("prevMonth").click();
  }
}

// Optimized image loading for mobile
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll('img[loading="lazy"]');

  // Use Intersection Observer for better performance
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => {
      // Store original src in data-src if not already
      if (!img.dataset.src) {
        img.dataset.src = img.src;
      }
      // Set a lightweight placeholder initially
      img.src =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0f0f0'/%3E%3C/svg%3E";
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach((img) => {
      if (img.complete) {
        img.classList.add("loaded");
      } else {
        img.addEventListener("load", function () {
          this.classList.add("loaded");
        });
      }
    });
  }

  // Add error handling
  images.forEach((img) => {
    img.addEventListener("error", function () {
      console.log("Error loading image:", this.dataset.src);
      // Set a fallback image
      this.src =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='%23999'%3EImage not available%3C/text%3E%3C/svg%3E";
      this.classList.add("loaded");
    });
  });
});

// Enhanced touch interactions
document.addEventListener("touchstart", function () {}, { passive: true });

// Prevent zoom on double-tap for iOS
let lastTouchEnd = 0;
document.addEventListener(
  "touchend",
  function (event) {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  false
);

// Improve touch scrolling
let initialY = null;

document.addEventListener("touchstart", (e) => {
  if (
    e.target.tagName === "INPUT" ||
    e.target.tagName === "SELECT" ||
    e.target.tagName === "TEXTAREA"
  ) {
    return;
  }

  initialY = e.touches[0].clientY;
});

document.addEventListener(
  "touchmove",
  (e) => {
    if (
      !initialY ||
      e.target.tagName === "INPUT" ||
      e.target.tagName === "SELECT" ||
      e.target.tagName === "TEXTAREA"
    ) {
      return;
    }

    const currentY = e.touches[0].clientY;
    const diffY = initialY - currentY;

    // If element is at the top and user is trying to scroll up, prevent it
    if (e.currentTarget.scrollTop === 0 && diffY < 0) {
      e.preventDefault();
    }
  },
  { passive: false }
);

// Mobile-optimized navigation
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      // Add visual feedback for mobile navigation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    }
  });
});
