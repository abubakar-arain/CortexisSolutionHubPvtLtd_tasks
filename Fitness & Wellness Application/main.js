// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

// Check for saved theme preference or default to light
const currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
}

// Navigation
const navLinks = document.querySelectorAll(".nav-link");
const bottomNavIcons = document.querySelectorAll(".nav-icon");
const sections = document.querySelectorAll(".section");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Handle navigation clicks
function handleNavigationClick(link, isBottomNav = false) {
  // Remove active class from all links and sections
  navLinks.forEach((l) => l.classList.remove("active"));
  bottomNavIcons.forEach((i) => i.classList.remove("active"));
  sections.forEach((s) => s.classList.remove("active"));

  // Add active class to clicked link
  link.classList.add("active");

  // Show corresponding section
  const targetId = link.getAttribute("href").substring(1);
  document.getElementById(targetId).classList.add("active");

  // Close mobile menu if open
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    handleNavigationClick(link);
  });
});

bottomNavIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    e.preventDefault();
    handleNavigationClick(icon, true);
  });
});

// Mobile menu toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

function animateProgressRings() {
  const rings = document.querySelectorAll(".ring");

  rings.forEach((ring) => {
    const target = +ring.getAttribute("data-percent");
    let current = 0;

    const ringValue = ring.querySelector(".ring-value");

    const interval = setInterval(() => {
      current++;
      ring.style.background = `conic-gradient(var(--primary-color) ${current * 3.6}deg, var(--border-color) 0deg)`;
      ringValue.textContent = current + "%";

      if (current >= target) clearInterval(interval);
    }, 15); // speed (lower = faster)
  });
}

// run when page is visible
document.addEventListener("DOMContentLoaded", animateProgressRings);

// Initialize progress rings when page loads
document.addEventListener("DOMContentLoaded", animateProgressRings);

// Workout Timer
let timerInterval;
let timerSeconds = 0;
const timerDisplay = document.getElementById("timer-display");
const startTimerBtn = document.getElementById("start-timer");

startTimerBtn.addEventListener("click", () => {
  if (timerInterval) {
    // Timer is running, so stop it
    clearInterval(timerInterval);
    timerInterval = null;
    startTimerBtn.innerHTML = '<i class="fas fa-play"></i> Start Timer';
  } else {
    // Timer is not running, so start it
    timerInterval = setInterval(() => {
      timerSeconds++;
      updateTimerDisplay();
    }, 1000);
    startTimerBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Timer';
  }
});

function updateTimerDisplay() {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}
// Populate Exercise Library
const categoryTabs = document.querySelectorAll(".category-tab");
const exerciseList = document.getElementById("exercise-list");

function populateExerciseList(category) {
  exerciseList.innerHTML = "";

  exerciseLibrary[category].forEach((exercise) => {
    const exerciseItem = document.createElement("div");
    exerciseItem.className = "exercise-item";
    exerciseItem.draggable = true;
    exerciseItem.setAttribute("data-id", exercise.id);

    let details = "";
    if (category === "cardio" || category === "yoga") {
      details = `<p>Duration: ${exercise.duration}</p>`;
    } else {
      details = `<p>Sets: ${exercise.sets}</p>`;
    }

    exerciseItem.innerHTML = `
                    <h4>${exercise.name}</h4>
                    ${details}
                    <p>Calories: ${exercise.calories}</p>
                `;

    exerciseList.appendChild(exerciseItem);
  });

  // Add drag and drop functionality
  addDragAndDrop();
}

// Initialize with cardio exercises
populateExerciseList("cardio");

// Category Tab Switching
categoryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    categoryTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const category = tab.getAttribute("data-category");
    populateExerciseList(category);
  });
});

// Drag and Drop Functionality
function addDragAndDrop() {
  const exerciseItems = document.querySelectorAll(".exercise-item");
  const dropzone = document.getElementById("workout-dropzone");

  exerciseItems.forEach((item) => {
    item.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", item.getAttribute("data-id"));
      item.classList.add("dragging");
    });

    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
    });

    // Touch events for mobile
    item.addEventListener("touchstart", (e) => {
      e.preventDefault();
      item.classList.add("dragging");
    });

    item.addEventListener("touchend", () => {
      item.classList.remove("dragging");
    });
  });

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("active");
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("active");
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("active");

    const exerciseId = e.dataTransfer.getData("text/plain");
    const category = document
      .querySelector(".category-tab.active")
      .getAttribute("data-category");
    const exercise = exerciseLibrary[category].find(
      (ex) => ex.id == exerciseId
    );

    if (exercise) {
      addExerciseToWorkout(exercise);
    }
  });

  // Touch events for mobile dropzone
  dropzone.addEventListener("touchmove", (e) => {
    e.preventDefault();
    dropzone.classList.add("active");
  });

  dropzone.addEventListener("touchend", (e) => {
    dropzone.classList.remove("active");
    addExerciseToWorkout(exerciseLibrary.cardio[0]);
  });
}

// Add Exercise to Workout Plan
function addExerciseToWorkout(exercise) {
  const dropzone = document.getElementById("workout-dropzone");
  const placeholder = dropzone.querySelector(".dropzone-placeholder");

  if (placeholder) {
    placeholder.remove();
  }

  const workoutItem = document.createElement("div");
  workoutItem.className = "workout-item";
  workoutItem.innerHTML = `
                <div class="workout-item-info">
                    <h4>${exercise.name}</h4>
                    <p>Calories: ${exercise.calories}</p>
                </div>
                <div class="workout-item-actions">
                    <button class="btn btn-outline remove-exercise">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;

  dropzone.appendChild(workoutItem);

  // Add remove functionality
  const removeBtn = workoutItem.querySelector(".remove-exercise");
  removeBtn.addEventListener("click", () => {
    workoutItem.remove();

    // Show placeholder if no exercises left
    if (dropzone.children.length === 0) {
      const placeholder = document.createElement("p");
      placeholder.className = "dropzone-placeholder";
      placeholder.textContent = "Drag exercises here to build your workout";
      dropzone.appendChild(placeholder);
    }
  });
}

// Nutrition Tracker
const mealTabs = document.querySelectorAll(".meal-tab");
const mealList = document.getElementById("meal-list");
const addFoodBtn = document.getElementById("add-food-btn");

// Populate Meal List
function populateMealList(mealType) {
  mealList.innerHTML = "";

  meals[mealType].forEach((meal) => {
    const mealItem = document.createElement("div");
    mealItem.className = "meal-item";
    mealItem.innerHTML = `
                    <div class="meal-item-info">
                        <h4>${meal.name}</h4>
                        <p>${meal.calories} cal • C: ${meal.carbs}g • P: ${meal.protein}g • F: ${meal.fat}g</p>
                    </div>
                    <div class="meal-item-actions">
                        <button class="btn btn-outline remove-food">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;

    mealList.appendChild(mealItem);
  });
  

  // Add remove functionality
  const removeButtons = document.querySelectorAll(".remove-food");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const mealItem = e.target.closest(".meal-item");
      mealItem.remove();
    });
  });
}

// Initialize with breakfast meals
populateMealList("breakfast");

// Meal Tab Switching
mealTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    mealTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const mealType = tab.getAttribute("data-meal");
    populateMealList(mealType);
  });
});

// Add Food Button
addFoodBtn.addEventListener("click", () => {
  // In a real app, this would open a modal or form to add food
  alert("Food search and add functionality would be implemented here");
});

// Statistics Charts
const statsTabs = document.querySelectorAll(".stats-tab");
const stepsChart = document.getElementById("steps-chart");
const caloriesChart = document.getElementById("calories-chart");

// Create Bar Charts
function createBarCharts(period) {
  const data = statsData[period];

  // Clear existing charts
  stepsChart.innerHTML = "";
  caloriesChart.innerHTML = "";

  // Create steps chart
  const maxSteps = Math.max(...data.steps);
  data.steps.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    const height = (value / maxSteps) * 100;
    bar.style.height = `${height}%`;

    const barValue = document.createElement("div");
    barValue.className = "bar-value";
    barValue.textContent = value.toLocaleString();

    const barLabel = document.createElement("div");
    barLabel.className = "bar-label";
    barLabel.textContent = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
      index
    ];

    bar.appendChild(barValue);
    bar.appendChild(barLabel);
    stepsChart.appendChild(bar);
  });

  // Create calories chart
  const maxCalories = Math.max(...data.calories);
  data.calories.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    const height = (value / maxCalories) * 100;
    bar.style.height = `${height}%`;

    const barValue = document.createElement("div");
    barValue.className = "bar-value";
    barValue.textContent = value.toLocaleString();

    const barLabel = document.createElement("div");
    barLabel.className = "bar-label";
    barLabel.textContent = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
      index
    ];

    bar.appendChild(barValue);
    bar.appendChild(barLabel);
    caloriesChart.appendChild(bar);
  });
}

// Initialize with day data
createBarCharts("day");

// Stats Tab Switching
statsTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    statsTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    const period = tab.getAttribute("data-period");
    createBarCharts(period);
  });
});

// Exercise Video Controls
const exerciseVideo = document.getElementById("exercise-video");
const playPauseBtn = document.getElementById("play-pause");
const fullscreenBtn = document.getElementById("fullscreen-btn");

playPauseBtn.addEventListener("click", () => {
  if (exerciseVideo.paused) {
    exerciseVideo.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    exerciseVideo.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
});

fullscreenBtn.addEventListener("click", () => {
  if (exerciseVideo.requestFullscreen) {
    exerciseVideo.requestFullscreen();
  } else if (exerciseVideo.webkitRequestFullscreen) {
    exerciseVideo.webkitRequestFullscreen();
  } else if (exerciseVideo.msRequestFullscreen) {
    exerciseVideo.msRequestFullscreen();
  }
});

// Offline Detection
const offlineNotice = document.getElementById("offline-notice");

window.addEventListener("online", () => {
  offlineNotice.classList.remove("show");
});

window.addEventListener("offline", () => {
  offlineNotice.classList.add("show");
});

// Check initial online status
if (!navigator.onLine) {
  offlineNotice.classList.add("show");
}

// Achievement Badge Animations
const badges = document.querySelectorAll(".badge");

badges.forEach((badge) => {
  badge.addEventListener("mouseenter", () => {
    if (badge.classList.contains("unlocked")) {
      badge.style.transform = "scale(1.1)";
    }
  });

  badge.addEventListener("mouseleave", () => {
    if (badge.classList.contains("unlocked")) {
      badge.style.transform = "scale(1.05)";
    }
  });

  // Touch events for mobile
  badge.addEventListener("touchstart", () => {
    if (badge.classList.contains("unlocked")) {
      badge.style.transform = "scale(1.1)";
      setTimeout(() => {
        badge.style.transform = "scale(1.05)";
      }, 300);
    }
  });
});

// Swipe Gestures for Mobile
let touchStartX = 0;
let touchEndX = 0;
const swipeIndicator = document.getElementById("swipe-indicator");

// Show swipe indicator on mobile
if (window.innerWidth <= 768) {
  setTimeout(() => {
    swipeIndicator.style.display = "block";
    setTimeout(() => {
      swipeIndicator.style.display = "none";
    }, 3000);
  }, 1000);
}

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;

  if (touchEndX < touchStartX - swipeThreshold) {
    // Swipe left - go to next section
    navigateToNextSection();
  }

  if (touchEndX > touchStartX + swipeThreshold) {
    // Swipe right - go to previous section
    navigateToPrevSection();
  }
}

function navigateToNextSection() {
  const activeSection = document.querySelector(".section.active");
  const activeLink = document.querySelector(".nav-link.active");
  const activeBottomIcon = document.querySelector(".nav-icon.active");
  const nextSection = activeSection.nextElementSibling;
  const nextLink =
    activeLink.parentElement.nextElementSibling?.querySelector(".nav-link");
  const nextBottomIcon =
    activeBottomIcon.parentElement.nextElementSibling?.querySelector(
      ".nav-icon"
    );

  if (nextSection && nextLink && nextBottomIcon) {
    // Remove active class from current section and links
    activeSection.classList.remove("active");
    activeLink.classList.remove("active");
    activeBottomIcon.classList.remove("active");

    // Add active class to next section and links
    nextSection.classList.add("active");
    nextLink.classList.add("active");
    nextBottomIcon.classList.add("active");
  }
}

function navigateToPrevSection() {
  const activeSection = document.querySelector(".section.active");
  const activeLink = document.querySelector(".nav-link.active");
  const activeBottomIcon = document.querySelector(".nav-icon.active");
  const prevSection = activeSection.previousElementSibling;
  const prevLink =
    activeLink.parentElement.previousElementSibling?.querySelector(".nav-link");
  const prevBottomIcon =
    activeBottomIcon.parentElement.previousElementSibling?.querySelector(
      ".nav-icon"
    );

  if (prevSection && prevLink && prevBottomIcon) {
    // Remove active class from current section and links
    activeSection.classList.remove("active");
    activeLink.classList.remove("active");
    activeBottomIcon.classList.remove("active");

    // Add active class to previous section and links
    prevSection.classList.add("active");
    prevLink.classList.add("active");
    prevBottomIcon.classList.add("active");
  }
}
