async function loadComponent(selector, url) {
  const element = document.querySelector(selector);
  if (element) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      const html = await response.text();
      element.outerHTML = html;
      
      // Initialize navbar drawer if we just loaded the navbar
      if (selector === "navbar") {
        initNavbarDrawer();
      }
    } catch (error) {
      console.error(error);
    }
  }
}

async function loadHomeComponents() {
  await loadComponent("mapinfo", "components/homeComponents/mapinfo.html");
  await loadComponent("homehero", "components/homeComponents/homehero.html");
  await loadComponent("homeWhyUs", "components/homeComponents/homeWhyUs.html");
}

async function loadPage(page) {
  const container = document.querySelector("main");
  if (container) {
    try {
      const response = await fetch(`pages/${page}.html`);
      if (!response.ok) throw new Error(`Failed to load page: ${page}`);
      const html = await response.text();
      container.innerHTML = html;

      // ✅ If home page, load its nested components
      if (page === "home") {
        await loadHomeComponents();
        // Initialize accordion AFTER home components are loaded
        initAccordion();
      }

    } catch (error) {
      console.error(error);
      container.innerHTML = `<p>Failed to load page: ${page}</p>`;
    }
  }
}

// navbar
function initNavbarDrawer() {
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-btn");
  const drawer = document.getElementById("mobile-drawer");

  console.log('initNavbarDrawer called');
  console.log('menuBtn:', menuBtn);
  console.log('closeBtn:', closeBtn);
  console.log('drawer:', drawer);

  if (!menuBtn || !closeBtn || !drawer) {
    console.warn("Navbar drawer elements not found.");
    return;
  }

  menuBtn.addEventListener("click", () => {
    console.log('Menu button clicked');
    drawer.classList.add("open");
    menuBtn.classList.add("active");
    document.body.style.overflow = 'hidden';
  });

  closeBtn.addEventListener("click", () => {
    console.log('Close button clicked');
    drawer.classList.remove("open");
    menuBtn.classList.remove("active");
    document.body.style.overflow = '';
  });

  drawer.addEventListener("click", (e) => {
    if (e.target === drawer) {
      console.log('Drawer background clicked');
      drawer.classList.remove("open");
      menuBtn.classList.remove("active");
      document.body.style.overflow = '';
    }
  });

  console.log('Event listeners attached successfully');
}

// FAQ Accordion Functionality
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  if (accordionHeaders.length === 0) {
    console.log('No accordion headers found');
    return;
  }
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      // Close all other accordion items
      accordionHeaders.forEach(otherHeader => {
        if (otherHeader !== header) {
          otherHeader.classList.remove('active');
          const otherContent = otherHeader.nextElementSibling;
          if (otherContent && otherContent.classList.contains('accordion-content')) {
            otherContent.style.maxHeight = null;
          }
        }
      });
      
      // Toggle current accordion item
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      
      if (this.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = null;
      }
    });
  });
  
  // Open first accordion by default
  if (accordionHeaders.length > 0) {
    accordionHeaders[0].click();
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // create <main> if it doesn't exist
  if (!document.querySelector("main")) {
    document.body.insertAdjacentHTML("beforeend", "<main></main>");
  }

  // load common components
  await loadComponent("navbar", "comman/navbar.html");
  await loadComponent("footer", "comman/footer.html");

  // default page
  const initialPage = location.hash.replace("#", "") || "home";
  await loadPage(initialPage);

  // handle hash navigation
  window.addEventListener("hashchange", async () => {
    const page = location.hash.replace("#", "") || "home";
    await loadPage(page);
  });
});