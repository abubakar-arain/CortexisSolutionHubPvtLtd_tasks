// ===== Mobile Menu Toggle =====
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuBtn.classList.toggle("open"); // optional: animate icon
});

// ===== Active Nav on Scroll =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    if (top >= offset && top < offset + height) {
      current = sec.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});
// ==== SELECT ELEMENTS ====
const grid = document.getElementById("projectGrid");
const filters = document.querySelectorAll(".filter-btn");
const loadMore = document.getElementById("loadMore");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.getElementById("closeModal");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let visible = 3;
let current = 0;

// ==== SHOW PROJECTS ====
function showProjects() {
  grid.innerHTML = "";
  projects.slice(0, visible).forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "project";
    card.dataset.category = p.category;
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.description}</p>`;
    card.onclick = () => openModal(i);
    grid.appendChild(card);
  });
}
showProjects();

// ==== FILTER ====
filters.forEach((btn) => {
  btn.onclick = () => {
    filters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const type = btn.dataset.filter;
    document.querySelectorAll(".project").forEach((p) => {
      p.style.display =
        type === "all" || p.dataset.category === type ? "block" : "none";
    });
  };
});

// ==== LOAD MORE ====
loadMore.onclick = () => {
  visible = projects.length;
  showProjects();
  loadMore.style.display = "none";
};

// ==== MODAL FUNCTIONS ====
function openModal(i) {
  current = i;
  updateModal();
  modal.style.display = "flex";
}

function updateModal() {
  const p = projects[current];
  modalImg.src = p.image;
  modalTitle.textContent = p.title;
  modalDesc.innerHTML = `
    ${p.description}<br><br>
    <a href="${p.link}" target="_blank" style="color:#00eaff;">Visit Project 🔗</a>`;
}

// ==== NEXT / PREVIOUS BUTTONS ====
nextBtn.onclick = () => {
  current = (current + 1) % projects.length;
  updateModal();
};
prevBtn.onclick = () => {
  current = (current - 1 + projects.length) % projects.length;
  updateModal();
};

// ==== CLOSE MODAL ====
closeModal.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};
// Animate skill bars and percentages
window.onload = () => {
  document.querySelectorAll(".card").forEach((card) => {
    const bar = card.querySelector(".fill");
    const num = card.querySelector(".num");
    const value = parseInt(bar.dataset.value);
    let count = 0;

    // Animate the progress bar
    bar.style.width = value + "%";

    // Animate the percentage number
    const counter = setInterval(() => {
      if (count >= value) clearInterval(counter);
      else num.textContent = ++count + "%";
    }, 15);
  });
};

// Filter skill cards by category
const buttons = document.querySelectorAll(".buttons button");
const cards = document.querySelectorAll(".card");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    cards.forEach((card) => {
      card.style.display =
        filter === "all" || card.classList.contains(filter) ? "block" : "none";
    });
  });
});
// Render Blogs
    const blogContainer = document.getElementById("blogContainer");
    function renderBlogs(list) {
      blogContainer.innerHTML = list.map((b, i) => `
        <div class="card" onclick="openPost(${i})">
          <img src="${b.image}" alt="${b.title}">
          <div class="content">
            <h3>${b.title}</h3>
            <p>${b.excerpt}</p>
            <span class="cat">${b.category}</span>
          </div>
        </div>
      `).join("");
    }
    renderBlogs(blogs);

    // Filter
    const s = document.getElementById("search");
    const c = document.getElementById("cat");
    const t = document.querySelectorAll(".tag");
    let tag = "all";
    function filter() {
      const text = s.value.toLowerCase();
      const cat = c.value;
      const filtered = blogs.filter(
        (b) =>
          (b.title.toLowerCase().includes(text) ||
           b.excerpt.toLowerCase().includes(text)) &&
          (cat === "all" || b.category === cat) &&
          (tag === "all" || b.tags.includes(tag))
      );
      renderBlogs(filtered);
    }
    s.oninput = c.onchange = filter;
    t.forEach(btn => btn.onclick = () => {
      t.forEach(x => x.classList.remove("active"));
      btn.classList.add("active");
      tag = btn.dataset.tag;
      filter();
    });

    // ===== Open blog in new page =====
function openPost(id) {
  window.open(`index.blog.html?id=${id}`, "_blank");
}

