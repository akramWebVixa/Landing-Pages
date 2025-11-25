


// /* ===========================
//    COMPONENT LOADING SYSTEM
// =========================== */
// async function loadComponent(selector, url) {
//   const element = document.querySelector(selector);
//   if (element) {
//     try {
//       console.log(`Loading component: ${selector} from ${url}`);
//       const response = await fetch(url);
//       if (!response.ok) throw new Error(`Failed to load ${url}`);
//       const html = await response.text();
//       element.outerHTML = html;
      
//       console.log(`Component ${selector} loaded successfully`);
      
//       if (selector === "navbar") {
//         console.log('Initializing navbar with dynamic data...');
//         await initNavbarWithDynamicData();
//       }
//       if (selector === "footer") {
//         console.log('Initializing footer with dynamic data...');
//         await initFooterWithDynamicData();
//       }
//     } catch (error) {
//       console.error(`Error loading component ${selector}:`, error);
//     }
//   } else {
//     console.warn(`Element for selector ${selector} not found`);
//   }
// }


// async function loadHomeComponents() {
//   await Promise.all([
//     loadComponent("mapinfo", "components/homeComponents/mapinfo.html"),
//     loadComponent("homehero", "components/homeComponents/homehero.html"),
//     loadComponent("homeWhyUs", "components/homeComponents/homeWhyUs.html")
//   ]);
// }

// async function loadPage(page) {
//   const container = document.querySelector("main");
//   if (container) {
//     try {
//       const response = await fetch(`pages/${page}.html`);
//       if (!response.ok) throw new Error(`Failed to load page: ${page}`);
//       const html = await response.text();
//       container.innerHTML = html;

//       if (page === "home") {
//         await loadHomeComponents();
//         await loadHomeContentFromJSON();
//         initAccordion();
//       }
//     } catch (error) {
//       console.error(error);
//       container.innerHTML = `<p>Failed to load page: ${page}</p>`;
//     }
//   }
// }
// /* ===========================
//    DYNAMIC CONTENT LOADING
// =========================== */

// let clinicData = null;

// async function loadClinicData() {
//   if (!clinicData) {
//     try {
//       console.log('Loading clinic data from JSON...');
//       const res = await fetch('clients/gardendental.json');
//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//       clinicData = await res.json();
//       console.log('Clinic data loaded successfully:', clinicData);
//     } catch (error) {
//       console.error('Error loading clinic data:', error);
//       clinicData = {};
//     }
//   }
//   return clinicData;
// }


// /* ===========================
//    DYNAMIC CONTENT LOADING
// =========================== */

// async function loadHomeContentFromJSON() {
//   try {
//     await Promise.all([
//       loadHeroContent(),
//       loadWhyUsContent(),
//       loadFindUsContent()
//     ]);
//   } catch (error) {
//     console.error('Error loading home content:', error);
//   }
// }

// async function loadHeroContent() {
//   try {
//     const res = await fetch('clients/gardendental.json');
//     const json = await res.json();
//     const hero = json.homeHero;


//     const heroContent = document.querySelector('.hero-content');
//     const heroForm = document.querySelector('.hero-form .form');


//     if (heroContent) {
//       heroContent.innerHTML = `
//         <h1 style="color: azure;">${hero.title}</h1>
//         <p class="lead" style="color: azure;">${hero.description}</p>
//         <div class="feature-row" aria-label="Clinic highlights">
//           ${hero.features.map(f => `
//             <div class="feature">
//               <div class="icon">${f.icon}</div>
//               <div class="text">${f.text}</div>
//             </div>
//           `).join('')}
//         </div>
//       `;
//     }

//     if (heroForm) {
//       heroForm.innerHTML = `
//         <h3 id="book-title">${hero.form.title}</h3>
//         <form action="https://api.web3forms.com/submit" method="POST" id="consultation-form">
//           <input type="hidden" name="access_key" value="23a48d7a-e35c-4ffc-93e9-aaad527163ed">
//           <input type="hidden" name="subject" value="New Consultation Request from Banning Dental">
//           <input type="hidden" name="from_name" value="Banning Dental Website">
//           <input type="hidden" name="redirect" value="https://yourdomain.com/thank-you">
//           <input type="checkbox" name="botcheck" class="hidden" style="display: none;">
          
//           ${hero.form.fields.map(field => `
//             <div class="field">
//               <label for="${field.id}">${field.label}</label>
//               ${field.type === 'textarea' ? 
//                 `<textarea id="${field.id}" name="${field.name || field.id}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''} rows="4"></textarea>` :
//                 `<input id="${field.id}" name="${field.name || field.id}" type="${field.type}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>`
//               }
//             </div>
//           `).join('')}
          
//           <div class="cta">
//             <button class="btn" type="submit" id="submit-btn">${hero.form.buttonText}</button>
//           </div>
//           <div id="form-error" class="error-message" style="display:none; color: red; margin-top: 10px;"></div>
//         </form>
//         <div class="success-message" id="success-message" style="display:none;">
//           <h3>${hero.form.successMessage.title}</h3>
//           <p>${hero.form.successMessage.message}</p>
//         </div>
//       `;

      
//       // Initialize form with debugging
//       initConsultationForm();
//     } else {
//       console.error('❌ Hero form element not found after injection');
//     }
//   } catch (e) {
//     console.error('❌ Hero Load Error:', e);
//   }
// }

// function initConsultationForm() {
//   const form = document.getElementById('consultation-form');
 

//   if (!form) {
//     console.error('❌ Form with ID "consultation-form" not found!');
//     return;
//   }

//   // Add click event to button for testing
//   const submitBtn = document.getElementById('submit-btn');
//   if (submitBtn) {
//     submitBtn.addEventListener('click', function(e) {
//       e.preventDefault(); // Prevent default first
      
//       // Manually trigger form submission
//       handleFormSubmission(e);
//     });
//   }

//   // Also attach to form submit event
//   form.addEventListener('submit', function(e) {
//     e.preventDefault();
//     handleFormSubmission(e);
//   });

// }

// function handleFormSubmission(e) {
//   e.preventDefault();
  
//   const form = document.getElementById('consultation-form');
//   const submitBtn = document.getElementById('submit-btn');
  
//   if (!form || !submitBtn) {
//     console.error('❌ Form or submit button not found');
//     return;
//   }

  
//   // Log all form data
//   const formData = new FormData(form);
//   // for (let [key, value] of formData.entries()) {
//   //   console.log(`  ${key}: ${value}`);
//   // }

//   // Show loading state
//   const originalText = submitBtn.textContent;
//   submitBtn.textContent = 'Sending...';
//   submitBtn.disabled = true;


//   // Simulate a delay to see the loading state
//   setTimeout(async () => {
//     try {
//       const response = await fetch(form.action, {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Accept': 'application/json'
//         }
//       });


//       const result = await response.json();

//       if (result.success) {
//         const successMessage = document.getElementById('success-message');
//         if (successMessage) {
//           successMessage.style.display = 'block';
//           form.style.display = 'none';
//         }
//       } else {
//         console.error('❌ Form submission failed:', result);
//         alert('Form submission failed. Check console for details.');
//       }
//     } catch (error) {
//       console.error('❌ Form submission error:', error);
//       alert('Network error. Check console for details.');
//     } finally {
//       // Reset button state
//       submitBtn.textContent = originalText;
//       submitBtn.disabled = false;
//     }
//   }, 1000); // 1 second delay to see loading state
// }

// async function loadWhyUsContent() {
//   try {
//     const res = await fetch('clients/gardendental.json');
//     const data = await res.json();
//     const why = data.homeWhyUs;

//     const box = document.getElementById('why-us-content');
//     if (!box) return;

//     box.innerHTML = `
//       <div class="why" role="region" aria-label="Why choose us">
//         <div>
//           <img src="${why.whyChooseUs.image}" alt="${why.whyChooseUs.alt}">
//         </div>
//         <div>
//           <h2>${why.whyChooseUs.title}</h2>
//           <p class="muted">${why.whyChooseUs.description}</p>
//           <ul>
//             ${why.whyChooseUs.features.map(f => `<li>${f}</li>`).join('')}
//           </ul>
//           <div style="margin-top: 20px">
//             <button class="btn scroll-to-form"><i class="${why.whyChooseUs.buttonIcon}"></i> ${why.whyChooseUs.buttonText}</button>
//           </div>
//         </div>
//       </div>

//       <h3 class="section-title">${why.services.title}</h3>
//       <div class="cards">
//         ${why.services.cards.map(c => `
//           <article class="card" aria-labelledby="service-${c.title.toLowerCase().replace(/\s+/g, '-')}">
//             <h4 id="service-${c.title.toLowerCase().replace(/\s+/g, '-')}">${c.title}</h4>
//             <p class="muted">${c.description}</p>
//             <div class="price">${c.price}</div>
//             <div class="small-list">${c.details}</div>
//             <div style="margin-top: 20px">
//               <button class="btn scroll-to-form"><i class="${c.buttonIcon}"></i> ${c.buttonText}</button>
//             </div>
//           </article>
//         `).join('')}
//       </div>

//       <div class="steps" aria-label="3 step action plan">
//         ${why.steps.map(s => `
//           <div class="step">
//             <div class="step-number">${s.number}</div>
//             <h4>${s.title}</h4>
//             <p class="muted">${s.description}</p>
//           </div>
//         `).join('')}
//       </div>

//       <h3 class="section-title">${why.gallery.title}</h3>
//       <div class="gallery" role="list">
//         ${why.gallery.items.map((g, index) => `
//           <div class="ba" role="listitem">
//             <img src="${g.before}" alt="Before treatment">
//             <img src="${g.after}" alt="After treatment">
//             <div class="muted" style="margin-top: 8px">${g.description}</div>
//           </div>
//         `).join('')}
//       </div>

//       <h3 class="section-title">${why.testimonials.title}</h3>
//       <div class="testimonials" aria-live="polite">
//         ${why.testimonials.reviews.map(r => `
//           <div class="review">
//             <h5><i class="fas fa-user-circle"></i> ${r.platform} <span class="stars">${r.stars}</span></h5>
//             <p class="muted">"${r.text}"</p>
//           </div>
//         `).join('')}
//       </div>

//       <div class="cta-section">
//         <h3>${why.cta.title}</h3>
//         <p>${why.cta.description}</p>
//         <button class="btn cta-btn scroll-to-form"><i class="${why.cta.buttonIcon}"></i> ${why.cta.buttonText}</button>
//       </div>
//     `;

//     box.querySelectorAll('.scroll-to-form').forEach(button => {
//       button.addEventListener('click', scrollToForm);
//     });
//   } catch (e) {
//     console.error('WHY US Error:', e);
//   }
// }

// async function loadFindUsContent() {
//   try {
//     const res = await fetch('clients/gardendental.json');
//     const data = await res.json();
//     const f = data.homeFindUs;

//     const container = document.getElementById('find-us-container');
//     if (!container) return;

//     container.innerHTML = `
//       <section class="mapInfo">
//         <div class="info">
//           <h2>${f.title}</h2>
//           <p>${f.description}</p>
//           <ul>
//             ${f.points.map(p => `<li>${p}</li>`).join('')}
//           </ul>
//           <a class="btn" href="${f.buttonLink}">${f.buttonText}</a>
//         </div>
//         <div class="map">
//           <h3>${f.mapTitle}</h3>
//           <p>${f.address}</p>
//           <p class="muted">${f.extraInfo}</p>
//           <div class="map-frame">
//             <iframe src="${f.mapEmbedUrl}" loading="lazy" title="Our clinic location map"></iframe>
//           </div>
//         </div>
//       </section>
//     `;
//   } catch (e) {
//     console.error('Find Us Load Error:', e);
//   }
// }
// async function initNavbarWithDynamicData() {
//   try {
//     console.log('Starting navbar dynamic data initialization...');
//     const data = await loadClinicData();
//     const clinicInfo = data.clinicInfo;
    
//     if (!clinicInfo) {
//       console.error('No clinicInfo found in data');
//       // Don't show anything if no data
//       return;
//     }

//     console.log('Updating navbar with clinic info:', clinicInfo);
    
//     // Update desktop brand section
//     const brandDiv = document.querySelector('.brand .brand-text');
//     if (brandDiv && clinicInfo.name && clinicInfo.tagline) {
//       console.log('Found brand div, updating content...');
//       brandDiv.innerHTML = `
//         <div style="font-size:15px">${clinicInfo.name}</div>
//         <div style="font-size:12px;opacity:.85">${clinicInfo.tagline}</div>
//       `;
//       console.log('Brand div updated successfully');
//     }

//     // Update mobile drawer contact information
//     const mobileAddress = document.querySelector('.mobile-address');
//     if (mobileAddress && clinicInfo.phone) {
//       console.log('Found mobile address section, updating...');
//       mobileAddress.innerHTML = `
//         <h4>Contact Information</h4>
//         <p><strong>Phone:</strong> ${clinicInfo.phone}</p>
//         <p><strong>Email:</strong> ${clinicInfo.email || 'N/A'}</p>
//         <p><strong>Address:</strong> ${clinicInfo.address ? clinicInfo.address.replace('<br>', ', ') : 'N/A'}</p>
//         <p><strong>Hours:</strong> ${clinicInfo.hours || 'N/A'}</p>
//       `;
//       console.log('Mobile address updated successfully');
//     }

//     // Re-initialize navbar drawer functionality
//     console.log('Re-initializing navbar drawer...');
//     initNavbarDrawer();
//     console.log('Navbar dynamic data initialization complete');
//   } catch (error) {
//     console.error('Error initializing navbar with dynamic data:', error);
//     // Don't show any error to user, just fail silently
//   }
// }

// async function initFooterWithDynamicData() {
//   try {
//     console.log('Starting footer dynamic data initialization...');
//     const data = await loadClinicData();
//     const clinicInfo = data.clinicInfo;
    
//     if (!clinicInfo) {
//       console.error('No clinicInfo found in data');
//       // Don't show anything if no data
//       return;
//     }

//     console.log('Updating footer with clinic info:', clinicInfo);

//     // Update footer clinic info - only if we have data
//     const footerClinicInfo = document.querySelector('.footer-col.clinic-info');
//     if (footerClinicInfo && clinicInfo.name) {
//       console.log('Found clinic info footer column, updating...');
//       footerClinicInfo.innerHTML = `
//         <h4>${clinicInfo.name}</h4>
//         ${clinicInfo.description ? `<p class="muted" style="max-width:28ch">${clinicInfo.description}</p>` : ''}
//         ${clinicInfo.locations ? `<p style="margin-top:12px;font-size:14px">${clinicInfo.locations}</p>` : ''}
//         <div class="social-links">
//           <a href="#"><i class="fab fa-facebook-f"></i></a>
//           <a href="#"><i class="fab fa-twitter"></i></a>
//           <a href="#"><i class="fab fa-linkedin-in"></i></a>
//           <a href="#"><i class="fab fa-youtube"></i></a>
//         </div>
//       `;
//       console.log('Clinic info footer column updated');
//     }

//     // Update footer visit us section - only if we have data
//     const footerVisitUs = document.querySelector('.footer-col.visit-info');
//     if (footerVisitUs && clinicInfo.address) {
//       console.log('Found visit info footer column, updating...');
//       let visitContent = `<h2 id="visit">Visit us</h2>`;
      
//       if (clinicInfo.address) {
//         visitContent += `<p>${clinicInfo.address}</p>`;
//       }
      
//       if (clinicInfo.addressExtra) {
//         visitContent += `<p class="muted">${clinicInfo.addressExtra}</p>`;
//       }
      
//       if (clinicInfo.phone || clinicInfo.email) {
//         visitContent += `<div style="margin-top: 20px;">`;
//         if (clinicInfo.phone) {
//           visitContent += `<p class="muted"><i class="fas fa-phone"></i> ${clinicInfo.phone}</p>`;
//         }
//         if (clinicInfo.email) {
//           visitContent += `<p class="muted"><i class="fas fa-envelope"></i> ${clinicInfo.email}</p>`;
//         }
//         visitContent += `</div>`;
//       }
      
//       footerVisitUs.innerHTML = visitContent;
//       console.log('Visit info footer column updated');
//     }

//     // Update footer bottom - only if we have data
//     const footerBottom = document.querySelector('.footer-bottom');
//     if (footerBottom && clinicInfo.name) {
//       console.log('Found footer bottom, updating...');
//       footerBottom.innerHTML = `<p>&copy; 2025 ${clinicInfo.name}. All rights reserved. | Privacy Policy | Terms of Service</p>`;
//       console.log('Footer bottom updated');
//     }

//     // Re-attach footer event listeners
//     console.log('Initializing footer event listeners...');
//     initFooterEventListeners();
//     console.log('Footer dynamic data initialization complete');
//   } catch (error) {
//     console.error('Error initializing footer with dynamic data:', error);
//     // Don't show any error to user, just fail silently
//   }
// }
// /* ===========================
//    UI COMPONENTS INITIALIZATION
// =========================== */

// function initNavbarDrawer() {
//   const menuBtn = document.getElementById("menu-btn");
//   const closeBtn = document.getElementById("close-btn");
//   const drawer = document.getElementById("mobile-drawer");

//   if (!menuBtn || !closeBtn || !drawer) {
//     console.warn("Navbar drawer elements not found.");
//     return;
//   }

//   menuBtn.addEventListener("click", () => {
//     drawer.classList.add("open");
//     menuBtn.classList.add("active");
//     document.body.style.overflow = 'hidden';
//   });

//   closeBtn.addEventListener("click", () => {
//     drawer.classList.remove("open");
//     menuBtn.classList.remove("active");
//     document.body.style.overflow = '';
//   });

//   drawer.addEventListener("click", (e) => {
//     if (e.target === drawer) {
//       drawer.classList.remove("open");
//       menuBtn.classList.remove("active");
//       document.body.style.overflow = '';
//     }
//   });
// }

// function initAccordion() {
//   const accordionHeaders = document.querySelectorAll('.accordion-header');
  
//   if (accordionHeaders.length === 0) return;
  
//   accordionHeaders.forEach(header => {
//     header.addEventListener('click', function() {
//       accordionHeaders.forEach(otherHeader => {
//         if (otherHeader !== header) {
//           otherHeader.classList.remove('active');
//           const otherContent = otherHeader.nextElementSibling;
//           if (otherContent && otherContent.classList.contains('accordion-content')) {
//             otherContent.style.maxHeight = null;
//           }
//         }
//       });
      
//       this.classList.toggle('active');
//       const content = this.nextElementSibling;
      
//       if (this.classList.contains('active')) {
//         content.style.maxHeight = content.scrollHeight + "px";
//       } else {
//         content.style.maxHeight = null;
//       }
//     });
//   });
  
//   if (accordionHeaders.length > 0) {
//     accordionHeaders[0].click();
//   }
// }

// /* ===========================
//    SMOOTH SCROLLING
// =========================== */

// function initEnhancedSmoothScrolling() {
//   // Handle footer link clicks
//   document.addEventListener('footerLinkClick', function(e) {
//     const target = e.detail.target;
//     switch(target) {
//       case 'testimonials':
//         scrollToTestimonials();
//         break;
//       case 'visit':
//         scrollToFindUs();
//         break;
//       case 'contact':
//         scrollToForm();
//         break;
//       case 'about':
//         scrollToWhyUs();
//         break;
//       case 'services':
//         scrollToServices();
//         break;
//     }
//   });

//   // Handle navbar consultation button clicks
//   document.addEventListener('click', function(e) {
//     const target = e.target;
    
//     // Handle navbar consultation buttons
//     if (target.closest('.btn') && 
//         (target.textContent.toLowerCase().includes('book') || 
//          target.textContent.toLowerCase().includes('consultation'))) {
//       e.preventDefault();
      
//       // Close mobile drawer if open
//       const drawer = document.getElementById('mobile-drawer');
//       const menuBtn = document.getElementById('menu-btn');
//       if (drawer && drawer.classList.contains('open')) {
//         drawer.classList.remove('open');
//         if (menuBtn) menuBtn.classList.remove('active');
//         document.body.style.overflow = '';
//       }
      
//       scrollToForm();
//     }
    
//     // Handle other navigation links
//     if (target.closest('a[href*="consultation"], a[href*="book"]') || 
//         target.textContent.toLowerCase().includes('consultation') ||
//         target.textContent.toLowerCase().includes('book')) {
//       e.preventDefault();
//       scrollToForm();
//     }
    
//     if (target.closest('a[href*="contact"]') || 
//         target.textContent.toLowerCase().includes('contact')) {
//       e.preventDefault();
//       scrollToForm();
//     }
    
//     if (target.closest('a[href*="about"]') || 
//         target.textContent.toLowerCase().includes('about')) {
//       e.preventDefault();
//       scrollToWhyUs();
//     }
    
//     if (target.closest('a[href*="services"]') || 
//         target.textContent.toLowerCase().includes('service')) {
//       e.preventDefault();
//       scrollToServices();
//     }
    
//     if (target.closest('a[href*="visit"]') || 
//         target.closest('a[href*="address"]') || 
//         target.closest('a[href*="location"]') ||
//         target.textContent.toLowerCase().includes('visit') ||
//         target.textContent.toLowerCase().includes('address') ||
//         target.textContent.toLowerCase().includes('location')) {
//       e.preventDefault();
//       scrollToFindUs();
//     }
    
//     if (target.closest('a[href*="testimonial"]') || 
//         target.textContent.toLowerCase().includes('testimonial')) {
//       e.preventDefault();
//       scrollToTestimonials();
//     }
//   });

//   window.addEventListener('hashchange', handleHashNavigation);
// }

// function scrollToTestimonials() {
//   // First try to find testimonials in why-us section
//   const whyUsTestimonials = document.querySelector('#why-us-content .testimonials');
//   if (whyUsTestimonials) {
//     whyUsTestimonials.scrollIntoView({ 
//       behavior: 'smooth', 
//       block: 'center' 
//     });
//     return;
//   }
  
//   // Fallback to testimonials title
//   const testimonialsTitle = document.querySelector('h3.section-title');
//   if (testimonialsTitle && testimonialsTitle.textContent.includes('What Our Patients Say')) {
//     testimonialsTitle.scrollIntoView({ 
//       behavior: 'smooth', 
//       block: 'start' 
//     });
//     return;
//   }
  
//   // Final fallback
//   scrollToWhyUs();
// }

// function scrollToForm() {
//   const form = document.querySelector('.hero-form');
//   if (form) {
//     form.scrollIntoView({ 
//       behavior: 'smooth', 
//       block: 'center' 
//     });
//   } else {
//     // If form not found, try to load home page first
//     loadPage('home').then(() => {
//       setTimeout(() => {
//         const form = document.querySelector('.hero-form');
//         if (form) {
//           form.scrollIntoView({ 
//             behavior: 'smooth', 
//             block: 'center' 
//           });
//         }
//       }, 500);
//     });
//   }
// }

// function scrollToWhyUs() {
//   const whyUsSection = document.getElementById('why-us-content');
//   if (whyUsSection) {
//     whyUsSection.scrollIntoView({ 
//       behavior: 'smooth', 
//       block: 'start' 
//     });
//   }
// }

// function scrollToServices() {
//   const servicesSection = document.querySelector('.section-title');
//   if (servicesSection && servicesSection.textContent.includes('Services')) {
//     servicesSection.scrollIntoView({ 
//       behavior: 'smooth', 
//       block: 'start' 
//     });
//   } else {
//     scrollToWhyUs();
//   }
// }

// function scrollToFindUs() {
//   const findUsSection = document.getElementById('find-us-container');
//   if (findUsSection) {
//     findUsSection.scrollIntoView({ 
//       behavior: 'smooth', 
//       block: 'start' 
//     });
//   } else {
//     // If find-us section not found, try to load it
//     loadFindUsContent().then(() => {
//       setTimeout(() => {
//         const findUsSection = document.getElementById('find-us-container');
//         if (findUsSection) {
//           findUsSection.scrollIntoView({ 
//             behavior: 'smooth', 
//             block: 'start' 
//           });
//         }
//       }, 500);
//     });
//   }
// }

// function handleHashNavigation() {
//   const hash = window.location.hash;
//   switch(hash) {
//     case '#consultation':
//     case '#book':
//     case '#contact':
//       scrollToForm();
//       break;
//     case '#about':
//       scrollToWhyUs();
//       break;
//     case '#services':
//       scrollToServices();
//       break;
//     case '#visit':
//     case '#location':
//     case '#address':
//       scrollToFindUs();
//       break;
//     case '#testimonials':
//     case '#testimonial':
//       scrollToTestimonials();
//       break;
//   }
// }

// /* ===========================
//    APPLICATION INITIALIZATION
// =========================== */

// document.addEventListener("DOMContentLoaded", async () => {
//   console.log('DOM Content Loaded - Starting application initialization');
  
//   if (!document.querySelector("main")) {
//     document.body.insertAdjacentHTML("beforeend", "<main></main>");
//   }

//   // Pre-load clinic data first
//   console.log('Pre-loading clinic data...');
//   await loadClinicData();

//   // Load navbar and footer components
//   console.log('Loading navbar and footer components...');
//   await Promise.all([
//     loadComponent("navbar", "comman/navbar.html"),
//     loadComponent("footer", "comman/footer.html")
//   ]);

//   // Load initial page
//   const initialPage = location.hash.replace("#", "") || "home";
//   console.log(`Loading initial page: ${initialPage}`);
//   await loadPage(initialPage);

//   console.log('Initializing smooth scrolling and hash navigation...');
//   initEnhancedSmoothScrolling(); 
//   handleHashNavigation();

//   window.addEventListener("hashchange", async () => {
//     const page = location.hash.replace("#", "") || "home";
//     console.log(`Hash changed, loading page: ${page}`);
//     await loadPage(page);
//     setTimeout(() => {
//       initEnhancedSmoothScrolling(); 
//       handleHashNavigation();
//     }, 100);
//   });

//   console.log('Application initialization complete');
// });

