 // ====== All Blog Data ======
      const blogs = [
        {
          title: "Mastering Frontend Performance Optimization",
          author: "Abu Bakar",
          date: "Oct 14, 2025",
          image: "pic/master.jpg",
          content: `
          <h2>Introduction</h2>
          <p>Optimizing frontend performance is crucial for delivering fast, responsive, and smooth web experiences. A slow-loading website not only frustrates users but also impacts SEO rankings and conversion rates.</p>

          <h2>Why Performance Matters</h2>
          <p>Users expect websites to load instantly. According to Google, if a page takes more than 3 seconds to load, over 50% of users abandon it. That’s why optimizing performance should be a priority for every developer.</p>

          <h2>Key Performance Metrics</h2>
          <ul>
            <li>First Contentful Paint (FCP)</li>
            <li>Largest Contentful Paint (LCP)</li>
            <li>Time to Interactive (TTI)</li>
            <li>Cumulative Layout Shift (CLS)</li>
          </ul>

          <h2>Advanced Techniques</h2>
          <p><b>Code Splitting:</b> Break JavaScript bundles using dynamic imports, so the browser loads only what’s needed for each route.</p>
          <p><b>Lazy Loading:</b> Load images and components only when they enter the viewport using Intersection Observer API.</p>
          <p><b>CDN and Caching:</b> Serve static assets from CDNs with proper cache headers for faster delivery.</p>

          <h2>Conclusion</h2>
          <p>Frontend optimization is an ongoing process. Regularly measure, analyze, and refine your performance using tools like Lighthouse and WebPageTest to keep your site blazing fast.</p>
        `,
        },
        {
          title: "Creative Design Thinking",
          author: "Abu Bakar",
          date: "Oct 13, 2025",
          image: "pic/design.jpg",
          content: `
          <h2>Introduction</h2>
          <p>Design thinking encourages creativity and user-focused innovation by understanding user needs and challenges deeply.</p>

          <h2>Stages of Design Thinking</h2>
          <p>The process involves five stages: Empathize, Define, Ideate, Prototype, and Test.</p>

          <h2>Benefits</h2>
          <p>Design thinking fosters collaboration, creativity, and problem-solving — leading to better user-centered products.</p>
        `,
        },
        {
          title:
            "Future of Artificial Intelligence: Potential, Ethics, and Impact",
          author: "Abu Bakar",
          date: "Oct 12, 2025",
          image: "pic/ai.jpg",
          content: `
    <h2>Introduction</h2>
    <p>Artificial Intelligence (AI) is reshaping industries, redefining human capability, and influencing how we live, work, and interact. From healthcare and education to finance and creative arts, AI’s reach continues to expand, raising both excitement and ethical questions about the future.</p>

    <h2>The Potential of AI</h2>
    <p>AI holds immense potential to solve complex global problems. It can analyze vast amounts of data faster than humans, leading to breakthroughs in medicine, environmental protection, and automation. AI-powered tools are helping doctors detect diseases earlier, optimizing transportation systems, and enabling smart cities to operate more efficiently.</p>

    <h2>Ethical Challenges</h2>
    <p>While AI offers great benefits, it also brings serious ethical challenges. Issues such as data privacy, algorithmic bias, and job displacement are major concerns. Ethical AI development requires transparency, accountability, and fairness to ensure technology serves humanity responsibly. Policymakers and developers must collaborate to create frameworks that protect individuals and society.</p>

    <h2>Impact on Society</h2>
    <p>The integration of AI into daily life is transforming economies and social structures. Automation is reshaping the workforce, creating new roles while making others obsolete. Education systems are adapting to prepare students for an AI-driven future, emphasizing creativity, critical thinking, and digital literacy as essential skills.</p>

    <h2>Conclusion</h2>
    <p>The future of Artificial Intelligence depends on how responsibly it is developed and applied. By balancing innovation with ethics, humanity can harness AI’s full potential while minimizing its risks — leading toward a smarter, fairer, and more connected world.</p>
  `,
        },
        {
          title: "Building with HTML5: The Foundation of the Modern Web",
          author: "Abu Bakar",
          date: "Oct 11, 2025",
          image: "pic/html.jpg",
          content: `
    <h2>Introduction</h2>
    <p>HTML5 is the cornerstone of modern web development, providing the structure and foundation upon which all websites are built. It introduced new semantic elements, multimedia support, and powerful APIs that make web applications faster, more accessible, and more interactive.</p>

    <h2>Semantic Structure</h2>
    <p>One of the biggest strengths of HTML5 is its focus on semantics. Elements like <code>&lt;header&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>, and <code>&lt;footer&gt;</code> help developers write cleaner, more meaningful code. This makes web pages easier to understand for both users and search engines.</p>

    <h2>Multimedia Integration</h2>
    <p>HTML5 allows developers to embed audio and video content directly using the <code>&lt;audio&gt;</code> and <code>&lt;video&gt;</code> tags, eliminating the need for external plugins like Flash. This makes multimedia elements faster to load and more compatible across devices.</p>

    <h2>Enhanced Forms and APIs</h2>
    <p>With new input types and attributes, HTML5 makes form handling more intuitive and user-friendly. Features like built-in validation, geolocation, and local storage APIs empower developers to create interactive and responsive web experiences.</p>

    <h2>Responsive and Mobile-Friendly</h2>
    <p>HTML5 works seamlessly with CSS3 and JavaScript to build responsive, mobile-optimized designs. Its flexibility ensures that websites perform efficiently across various screen sizes and devices, improving accessibility and user engagement.</p>

    <h2>Conclusion</h2>
    <p>HTML5 continues to be the backbone of the web, enabling developers to create modern, fast, and accessible websites. Understanding and using its features effectively is the first step toward mastering front-end development and building a better web for everyone.</p>
  `,
        },
        {
          title:
            "JavaScript Tips for Beginners: Writing Clean, Modern Code (ES6+)",
          author: "Abu Bakar",
          date: "Oct 13, 2025",
          image: "pic/js.jpg",
          category: "Programming",
          tags: ["JavaScript", "ES6", "Coding", "Best Practices", "Async"],
          excerpt:
            "Level up your JavaScript skills by adopting essential tips and modern ES6+ features for writing cleaner, more efficient, and maintainable code in your real-world projects.",
          content: `
    <h2>Introduction</h2>
    <p>JavaScript is one of the most versatile and widely used programming languages, powering nearly all modern web applications. To move from a beginner to a confident developer, it’s important to write clean, readable, and efficient code using modern ES6+ features.</p>

    <h2>Best Practices for Clean Code</h2>
    <p>Following these best practices will make your JavaScript code easier to understand, maintain, and debug:</p>
    <ul>
      <li><strong>Variable Declaration:</strong> Use <code>const</code> and <code>let</code> instead of the outdated <code>var</code>. Default to <code>const</code> and use <code>let</code> only when reassignment is necessary.</li>
      <li><strong>Modularity:</strong> Organize your code into small, reusable functions and modules. This improves structure and makes testing or debugging simpler.</li>
      <li><strong>Code Style:</strong> Maintain a consistent coding style using tools like Prettier or ESLint to ensure readability across your project.</li>
    </ul>

    <h2>Essential ES6+ Features to Master</h2>
    <p>The ES6 (ECMAScript 2015) update introduced powerful new syntax and capabilities that make coding more elegant and efficient:</p>
    <ul>
      <li><strong>Arrow Functions:</strong> Provide a cleaner, shorter syntax for writing functions and automatically bind the <code>this</code> keyword.</li>
      <li><strong>Template Literals:</strong> Use backticks (<code>\`</code>) to create multi-line strings and easily embed variables through interpolation.</li>
      <li><strong>Destructuring:</strong> Quickly extract values from arrays or objects into variables, reducing repetitive code.</li>
      <li><strong>Promises & Async/Await:</strong> Simplify asynchronous code, making it easier to handle API calls and avoid callback hell.</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Mastering these best practices and ES6+ features will help you write cleaner, more modern JavaScript. Practice with real-world examples — such as DOM manipulation, API requests, and async data handling — to strengthen your skills and build professional-grade web applications.</p>
  `,
        },
        {
          title:
            "Exploring Cloud Computing: The Backbone of Modern Digital Infrastructure",
          author: "Abu Bakar",
          date: "Oct 15, 2025",
          image: "pic/cloud.jpg",
          category: "Tech",
          tags: ["Cloud", "AWS", "Azure", "GCP", "IaaS", "PaaS", "SaaS"],
          readTime: "6 min read",
          excerpt:
            "Understand how cloud computing powers modern applications, offering scalable and cost-effective solutions via major platforms like AWS, Azure, and Google Cloud.",
          content: `
    <h2>Introduction</h2>
    <p>Cloud computing is the delivery of computing services — including servers, storage, databases, networking, software, analytics, and intelligence — over the Internet <strong>(the cloud)</strong>. This model allows businesses to consume resources on-demand, transforming capital expenditures (CapEx) into operational expenditures (OpEx).</p>

    <h2>The Three Service Models</h2>
    <p>Cloud services are categorized into three main models, each offering a different level of control and management:</p>
    <ul>
      <li><strong>IaaS (Infrastructure as a Service):</strong> Provides the foundational building blocks — servers, storage, and networking. The user manages the operating system and applications (e.g., Virtual Machines).</li>
      <li><strong>PaaS (Platform as a Service):</strong> Offers a complete development and deployment environment that abstracts the infrastructure layer, allowing developers to focus solely on writing and deploying code.</li>
      <li><strong>SaaS (Software as a Service):</strong> Fully managed software applications delivered over the Internet, accessible through a browser (e.g., Gmail, Office 365).</li>
    </ul>

    <h2>Major Cloud Providers and Benefits</h2>
    <p>The global cloud market is dominated by major providers that deliver scalable, secure, and reliable services:</p>
    <ul>
      <li><strong>Providers:</strong> Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP).</li>
      <li><strong>Scalability:</strong> Automatically adjusts computing resources based on demand, ensuring performance and cost efficiency.</li>
      <li><strong>Cost-Effectiveness:</strong> Pay-as-you-go models charge only for the resources consumed, reducing waste.</li>
      <li><strong>Global Reach:</strong> Applications can be deployed closer to users around the world, reducing latency and improving reliability.</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Cloud computing is the <strong>backbone of modern digital infrastructure</strong>, powering everything from web applications to AI services. By enabling scalability, flexibility, and innovation, it continues to transform the way organizations operate and deliver value in the digital age.</p>
  `,
        },
      ];

      // ====== Get Blog ID from URL ======
      const params = new URLSearchParams(window.location.search);
      const blogId = params.get("id");

      // ====== Render Blog ======
      const blogContainer = document.getElementById("content");
      if (blogId !== null && blogs[blogId]) {
        const blog = blogs[blogId];
        blogContainer.innerHTML = `
        <img class="cover" src="${blog.image}" alt="Blog Cover">
        <h1>${blog.title}</h1>
        <p class="meta">✍️ ${blog.author} • ${blog.date}</p>
        <p class="reading-time">🕒 Estimated reading time: 6 min</p>
        ${blog.content}
      `;
      } else {
        blogContainer.innerHTML = `<h2>Blog not found!</h2><p>Please go back and select a valid post.</p>`;
      }

      // ===== Generate TOC Dynamically =====
      const tocLinks = document.getElementById("tocLinks");
      const headings = blogContainer.querySelectorAll("h2");
      headings.forEach((h, i) => {
        h.id = "section-" + i;
        const link = document.createElement("a");
        link.href = "#" + h.id;
        link.textContent = h.textContent;
        tocLinks.appendChild(link);
      });

      // ===== Smooth Scroll =====
      document.querySelectorAll(".toc a").forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          document.querySelector(link.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      });

      // ===== Active TOC Highlight =====
      const tocAnchors = document.querySelectorAll(".toc a");
      window.addEventListener("scroll", () => {
        let current = "";
        headings.forEach((section) => {
          const sectionTop = section.offsetTop - 130;
          if (scrollY >= sectionTop) current = section.id;
        });
        tocAnchors.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href").includes(current))
            link.classList.add("active");
        });
      });

      // ===== Scroll Progress Bar =====
      const progressBar = document.getElementById("progressBar");
      window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const percent = (scrollTop / docHeight) * 100;
        progressBar.style.width = percent + "%";
      });