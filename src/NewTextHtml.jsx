// import React, { useEffect, useCallback } from 'react';
// import PropTypes from 'prop-types';

// // Custom hook for image lazy loading
// const useImageLazyLoading = () => {
//   const handleImageLoad = useCallback((img) => {
//     if ("loading" in HTMLImageElement.prototype) {
//       img.loading = "lazy";
//     }

//     img.classList.add("transition-opacity", "duration-300", "opacity-0");

//     img.onerror = () => {
//       const width = img.getAttribute("width") || img.clientWidth || 300;
//       const height = img.getAttribute("height") || img.clientHeight || 200;
//       img.src = `https://placehold.co/${width}x${height}/DEDEDE/555555?text=Image+Unavailable`;
//       img.alt = "Image unavailable";
//       img.classList.remove("opacity-0");
//       img.classList.add("opacity-100", "error-image");
//     };

//     const observer = new IntersectionObserver(
//       (entries, observer) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting && img.dataset.src) {
//             const tempImage = new Image();
//             tempImage.onload = () => {
//               img.src = img.dataset.src;
//               img.classList.remove("opacity-0");
//               img.classList.add("opacity-100");
//             };
//             tempImage.src = img.dataset.src;
//             img.removeAttribute("data-src");
//             observer.unobserve(img);
//           }
//         });
//       },
//       { rootMargin: "50px 0px", threshold: 0.01 }
//     );

//     if (img.dataset.src) {
//       observer.observe(img);
//     } else {
//       img.classList.remove("opacity-0");
//       img.classList.add("opacity-100");
//     }

//     return () => observer.disconnect();
//   }, []);

//   return handleImageLoad;
// };

// // Custom hook for performance monitoring
// const usePerformanceMonitoring = () => {
//   useEffect(() => {
//     if (!("performance" in window) || !("PerformanceObserver" in window)) return;

//     const perfObserver = new PerformanceObserver((list) => {
//       const entries = list.getEntries();
//       entries.forEach((entry) => {
//         const metric = {
//           'largest-contentful-paint': `LCP: ${entry.startTime}ms`,
//           'first-input': `FID: ${entry.processingStart - entry.startTime}ms`,
//           'layout-shift': `CLS: ${entry.value}`
//         }[entry.entryType];
        
//         if (metric) console.debug(metric);
//       });
//     });

//     perfObserver.observe({
//       entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"]
//     });

//     return () => perfObserver.disconnect();
//   }, []);
// };

// // Custom hook for network status
// const useNetworkStatus = () => {
//   useEffect(() => {
//     const handleOnline = () => {
//       document.body.classList.remove("offline");
//       console.log("Connection restored");
//     };

//     const handleOffline = () => {
//       document.body.classList.add("offline");
//       console.log("Connection lost");
//     };

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, []);
// };

// export default function NewTextHtml({ className = "" }) {
//   const handleImageLoad = useImageLazyLoading();
//   usePerformanceMonitoring();
//   useNetworkStatus();

//   useEffect(() => {
//     // Handle FAQ toggles
//     const handleFaqClick = (button) => {
//       const answer = button.nextElementSibling;
//       const icon = button.querySelector("svg");
      
//       answer.classList.toggle("hidden");
//       icon.style.transform = answer.classList.contains("hidden") 
//         ? "rotate(0deg)" 
//         : "rotate(180deg)";

//       // Close other answers
//       document.querySelectorAll(".faq-answer").forEach((otherAnswer) => {
//         if (otherAnswer !== answer && !otherAnswer.classList.contains("hidden")) {
//           otherAnswer.classList.add("hidden");
//           otherAnswer.previousElementSibling.querySelector("svg").style.transform = "rotate(0deg)";
//         }
//       });
//     };

//     // Add event listeners
//     document.querySelectorAll(".faq-button").forEach(button => {
//       button.addEventListener("click", () => handleFaqClick(button));
//     });

//     // Initialize mobile menu
//     const mobileMenuButton = document.getElementById("mobile-menu-button");
//     const mobileMenu = document.getElementById("mobile-menu");
//     if (mobileMenuButton && mobileMenu) {
//       mobileMenuButton.addEventListener("click", () => {
//         mobileMenu.classList.toggle("hidden");
//       });
//     }

//     // Cleanup event listeners
//     return () => {
//       document.querySelectorAll(".faq-button").forEach(button => {
//         button.removeEventListener("click", () => handleFaqClick(button));
//       });
//     };
//   }, []);

//   useEffect(() => {
//     // Initialize image lazy loading
//     document.querySelectorAll("img[data-src], img:not([data-src])")
//       .forEach(handleImageLoad);

//     // Watch for dynamically added images
//     const mutationObserver = new MutationObserver((mutations) => {
//       mutations.forEach((mutation) => {
//         mutation.addedNodes.forEach((node) => {
//           if (node.nodeType === 1) {
//             if (node.tagName === "IMG") handleImageLoad(node);
//             node.querySelectorAll("img").forEach(handleImageLoad);
//           }
//         });
//       });
//     });

//     mutationObserver.observe(document.body, {
//       childList: true,
//       subtree: true,
//     });

//     return () => mutationObserver.disconnect();
//   }, [handleImageLoad]);

//   // HTML content string
//   const htmlContent = `
//     <!DOCTYPE html>
//     <html lang="en" class="scroll-smooth">
//       <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <meta
//           name="description"
//           content="Start your day with inspiring morning quotes and beautiful images"
//         />
//         <meta name="theme-color" content="#000000" />
//         <title>Morning Quotes - Start Your Day with Inspiration</title>

//         <!-- Preload critical resources -->
//         <link rel="preload" href="https://cdn.tailwindcss.com" as="script" />
//         <link
//           rel="preload"
//           href="https://cdnjs.cloudflare.com/ajax/libs/alpinejs/3.13.3/cdn.min.js"
//           as="script"
//         />
//         <link
//           rel="preload"
//           href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap"
//           as="style"
//         />

//         <!-- Core CSS -->
//         <script src="https://cdn.tailwindcss.com" defer></script>
//         <script
//           defer
//           src="https://cdnjs.cloudflare.com/ajax/libs/alpinejs/3.13.3/cdn.min.js"
//         ></script>
//         <script
//           defer
//           src="https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.45.1/apexcharts.min.js"
//         ></script>

//         <!-- Optimized Font Loading -->
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap"
//           rel="stylesheet"
//         />

//         <!-- Icons -->
//         <link
//           rel="stylesheet"
//           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
//           integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
//           crossorigin="anonymous"
//           referrerpolicy="no-referrer"
//         />

//         <!-- Base Styles -->
//         <style>
//           * {
//             -ms-overflow-style: none; /* IE and Edge */
//             scrollbar-width: none; /* Firefox */
//           }

//           /* Webkit browsers like Chrome, Safari, newer Edge */
//           *::-webkit-scrollbar {
//             display: none;
//             width: 0;
//             height: 0;
//           }
//           /* Custom scrollbar */
//           ::-webkit-scrollbar {
//             width: 0px;
//           }

//           ::-webkit-scrollbar-track {
//             background: #f1f1f1;
//             border-radius: 4px;
//           }

//           ::-webkit-scrollbar-thumb {
//             background: #888;
//             border-radius: 4px;
//           }

//           ::-webkit-scrollbar-thumb:hover {
//             background: #666;
//           }

//           /* Remove tap highlight on mobile */
//           * {
//             -webkit-tap-highlight-color: transparent;
//           }

//           /* Improve text rendering */
//           body {
//             text-rendering: optimizeLegibility;
//             -webkit-font-smoothing: antialiased;
//             -moz-osx-font-smoothing: grayscale;
//           }

//           /* Focus outline styles */
//           :focus-visible {
//             outline: 2px solid currentColor;
//             outline-offset: 2px;
//           }

//           /* Print styles */
//           @media print {
//             .no-print {
//               display: none !important;
//             }

//             a[href]:after {
//               content: " (" attr(href) ")";
//             }
//           }

//           /* Improved scrollbar styles */
//           * {
//             scrollbar-width: thin;
//             scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
//           }

//           /* Enhanced focus styles */
//           :focus-visible {
//             outline: 2px solid currentColor;
//             outline-offset: 2px;
//             box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
//           }

//           /* Better image loading */
//           .lazy-image {
//             opacity: 0;
//             transition: opacity 0.3s ease-in-out;
//           }

//           .lazy-image.loaded {
//             opacity: 1;
//           }
//         </style>
//       </head>
//       <body
//         class="antialiased bg-neutral-50 text-neutral-900 min-h-screen flex flex-col"
//         x-data="{ mobileMenuOpen: false }"
//       >
//         <!-- Skip to main content link for accessibility -->
//         <a
//           href="#main-content"
//           class="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black"
//         >
//           Skip to main content
//         </a>

//         <!-- Header -->
//         <header class="relative z-50 bg-white dark:bg-gray-900">
//           <!-- Header content goes here -->
//         </header>

//         <!-- Main content area -->
//         <main id="main-content" class="flex-1 relative">
//           <!-- Content will be injected here -->
//         </main>

//         <!-- Move inline scripts to end of body -->
//         <script>
//           tailwind.config = {
//             theme: {
//               extend: {
//                 colors: {
//                   primary: {
//                     50: "#f8f8f8",
//                     100: "#e8e8e8",
//                     200: "#d3d3d3",
//                     300: "#a3a3a3",
//                     400: "#737373",
//                     500: "#525252",
//                     600: "#404040",
//                     700: "#262626",
//                     800: "#171717",
//                     900: "#0a0a0a",
//                     950: "#030303",
//                   },
//                   secondary: {
//                     50: "#f8f8f8",
//                     100: "#e8e8e8",
//                     200: "#d3d3d3",
//                     300: "#a3a3a3",
//                     400: "#737373",
//                     500: "#525252",
//                     600: "#404040",
//                     700: "#262626",
//                     800: "#171717",
//                     900: "#0a0a0a",
//                     950: "#030303",
//                   },
//                   accent: {
//                     50: "#f8f8f8",
//                     100: "#e8e8e8",
//                     200: "#d3d3d3",
//                     300: "#a3a3a3",
//                     400: "#737373",
//                     500: "#525252",
//                     600: "#404040",
//                     700: "#262626",
//                     800: "#171717",
//                     900: "#0a0a0a",
//                     950: "#030303",
//                   },
//                 },
//                 fontFamily: {
//                   sans: [
//                     "Inter",
//                     "system-ui",
//                     "-apple-system",
//                     "BlinkMacSystemFont",
//                     "Segoe UI",
//                     "Roboto",
//                     "Helvetica Neue",
//                     "Arial",
//                     "sans-serif",
//                   ],
//                   heading: ["Montserrat", "Inter", "system-ui", "sans-serif"],
//                 },
//                 spacing: {
//                   18: "4.5rem",
//                   22: "5.5rem",
//                   30: "7.5rem",
//                 },
//                 maxWidth: {
//                   "8xl": "88rem",
//                   "9xl": "96rem",
//                 },
//                 animation: {
//                   "fade-in": "fadeIn 0.5s ease-in",
//                   "fade-out": "fadeOut 0.5s ease-out",
//                   "slide-up": "slideUp 0.5s ease-out",
//                   "slide-down": "slideDown 0.5s ease-out",
//                   "slide-left": "slideLeft 0.5s ease-out",
//                   "slide-right": "slideRight 0.5s ease-out",
//                   "scale-in": "scaleIn 0.5s ease-out",
//                   "scale-out": "scaleOut 0.5s ease-out",
//                   "spin-slow": "spin 3s linear infinite",
//                   "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
//                   "bounce-slow": "bounce 3s infinite",
//                   float: "float 3s ease-in-out infinite",
//                 },
//                 keyframes: {
//                   fadeIn: {
//                     "0%": { opacity: "0" },
//                     "100%": { opacity: "1" },
//                   },
//                   fadeOut: {
//                     "0%": { opacity: "1" },
//                     "100%": { opacity: "0" },
//                   },
//                   slideUp: {
//                     "0%": { transform: "translateY(20px)", opacity: "0" },
//                     "100%": { transform: "translateY(0)", opacity: "1" },
//                   },
//                   slideDown: {
//                     "0%": { transform: "translateY(-20px)", opacity: "0" },
//                     "100%": { transform: "translateY(0)", opacity: "1" },
//                   },
//                   slideLeft: {
//                     "0%": { transform: "translateX(20px)", opacity: "0" },
//                     "100%": { transform: "translateX(0)", opacity: "1" },
//                   },
//                   slideRight: {
//                     "0%": { transform: "translateX(-20px)", opacity: "0" },
//                     "100%": { transform: "translateX(0)", opacity: "1" },
//                   },
//                   scaleIn: {
//                     "0%": { transform: "scale(0.9)", opacity: "0" },
//                     "100%": { transform: "scale(1)", opacity: "1" },
//                   },
//                   scaleOut: {
//                     "0%": { transform: "scale(1.1)", opacity: "0" },
//                     "100%": { transform: "scale(1)", opacity: "1" },
//                   },
//                   float: {
//                     "0%, 100%": { transform: "translateY(0)" },
//                     "50%": { transform: "translateY(-10px)" },
//                   },
//                 },
//                 aspectRatio: {
//                   portrait: "3/4",
//                   landscape: "4/3",
//                   ultrawide: "21/9",
//                 },
//               },
//             },
//             variants: {
//               extend: {
//                 opacity: ["disabled"],
//                 cursor: ["disabled"],
//                 backgroundColor: ["active", "disabled"],
//                 textColor: ["active", "disabled"],
//               },
//             },
//           };
//         </script>

//         <script>
//           document.addEventListener("DOMContentLoaded", () => {
//             const imageObserver = new IntersectionObserver(
//               (entries, observer) => {
//                 entries.forEach((entry) => {
//                   if (entry.isIntersecting) {
//                     const img = entry.target;
//                     if (img.dataset.src) {
//                       const tempImage = new Image();
//                       tempImage.onload = () => {
//                         img.src = img.dataset.src;
//                         img.classList.remove("opacity-0");
//                         img.classList.add("opacity-100");
//                       };
//                       tempImage.src = img.dataset.src;
//                       img.removeAttribute("data-src");
//                       observer.unobserve(img);
//                     }
//                   }
//                 });
//               },
//               {
//                 rootMargin: "50px 0px",
//                 threshold: 0.01,
//               }
//             );

//             const loadImage = (img) => {
//               if ("loading" in HTMLImageElement.prototype) {
//                 img.loading = "lazy";
//               }

//               img.classList.add("transition-opacity", "duration-300", "opacity-0");

//               img.onerror = () => {
//                 const width = img.getAttribute("width") || img.clientWidth || 300;
//                 const height =
//                   img.getAttribute("height") || img.clientHeight || 200;
//                 img.alt = "Image unavailable";
//                 img.classList.remove("opacity-0");
//                 img.classList.add("opacity-100", "error-image");
//               };

//               if (img.dataset.src) {
//                 imageObserver.observe(img);
//               } else {
//                 img.classList.remove("opacity-0");
//                 img.classList.add("opacity-100");
//               }
//             };

//             document
//               .querySelectorAll("img[data-src], img:not([data-src])")
//               .forEach(loadImage);

//             // Watch for dynamically added images
//             new MutationObserver((mutations) => {
//               mutations.forEach((mutation) => {
//                 mutation.addedNodes.forEach((node) => {
//                   if (node.nodeType === 1) {
//                     if (node.tagName === "IMG") {
//                       loadImage(node);
//                     }
//                     node.querySelectorAll("img").forEach(loadImage);
//                   }
//                 });
//               });
//             }).observe(document.body, {
//               childList: true,
//               subtree: true,
//             });
//           });

//           // Performance monitoring
//           if ("performance" in window && "PerformanceObserver" in window) {
//             // Create performance observer
//             const observer = new PerformanceObserver((list) => {
//               const entries = list.getEntries();
//               entries.forEach((entry) => {
//                 if (entry.entryType === "largest-contentful-paint") {
//                   console.log(\`LCP: \${entry.startTime}ms\`);
//                 }
//                 if (entry.entryType === "first-input") {
//                   console.log(\`FID: \${entry.processingStart - entry.startTime}ms\`);
//                 }
//                 if (entry.entryType === "layout-shift") {
//                   console.log(\`CLS: \${entry.value}\`);
//                 }
//               });
//             });

//             // Observe performance metrics
//             observer.observe({
//               entryTypes: [
//                 "largest-contentful-paint",
//                 "first-input",
//                 "layout-shift",
//               ],
//             });

//             // Log basic performance metrics
//             window.addEventListener("load", () => {
//               const timing = performance.getEntriesByType("navigation")[0];
//               console.log({
//                 "DNS Lookup": timing.domainLookupEnd - timing.domainLookupStart,
//                 "TCP Connection": timing.connectEnd - timing.connectStart,
//                 "DOM Content Loaded":
//                   timing.domContentLoadedEventEnd - timing.navigationStart,
//                 "Page Load": timing.loadEventEnd - timing.navigationStart,
//               });
//             });
//           }

//           // Handle offline/online status
//           window.addEventListener("online", () => {
//             document.body.classList.remove("offline");
//             console.log("Connection restored");
//           });

//           window.addEventListener("offline", () => {
//             document.body.classList.add("offline");
//             console.log("Connection lost");
//           });

//           // Error handling
//           window.addEventListener("error", function (e) {
//             console.error("Page Error:", e.message);
//             // Implement error reporting service here
//           });
//         </script>
//       </body>
//     </html>
//   `;

//   return (
//     <div 
//       className={`new-text-html-container ${className}`.trim()}
//       dangerouslySetInnerHTML={{ 
//         __html: htmlContent 
//       }} 
//     />
//   );
// }

// NewTextHtml.propTypes = {
//   className: PropTypes.string
// };