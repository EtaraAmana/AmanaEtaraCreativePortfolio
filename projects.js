/* =====================================================
   1) YOUR DETAILS  (edit once, the whole site updates)
   ===================================================== */
window.siteConfig = {
  name: "Your Name",              // full name
  firstName: "Your Name",         // used in "Hi, I'm ..." (first name only is nicer)
  handle: "your.name",            // logo text in the menu and footer
  location: "Your City",          // shown in About and Contact
  years: "5",                     // years of experience
  projects: "50",                 // projects delivered
  email: "you@example.com",
  whatsapp: "2340000000000",      // digits only, with country code, no + sign
  whatsappDisplay: "+234 000 000 0000",
  instagram: "yourhandle",        // without the @
  behance: "yourname",            // your Behance username

  // Optional: paste a Formspree URL (https://formspree.io) so the form sends
  // messages straight to your inbox. Leave empty to open the visitor's email app.
  formEndpoint: ""
};

/* =====================================================
   2) YOUR PROJECTS
   Put images in assets/images/ and copy one block below.

   category must be:  "web"  |  "uiux"  |  "graphics"
   image   = cover image shown on the grid
   gallery = (optional) extra images shown in the popup
   link    = (optional) live site, Behance or Figma link

   The FIRST project is shown big and as the "Featured project".
   ===================================================== */
const projects = [
  {
    title: "Brand Designer Landing Page",
    category: "web",
    year: "2026",
    image: "assets/images/project-1.jpg",
    gallery: [],
    description: "A responsive landing page designed in Figma and built with HTML, CSS and JavaScript.",
    tools: "Figma · HTML · CSS · JavaScript",
    link: ""
  },
  {
    title: "Fitness App UI",
    category: "uiux",
    year: "2026",
    image: "assets/images/project-2.jpg",
    gallery: [],
    description: "Mobile app screens and a clickable prototype covering onboarding, workouts and progress tracking.",
    tools: "Figma",
    link: ""
  },
  {
    title: "Coffee Brand Identity",
    category: "graphics",
    year: "2025",
    image: "assets/images/project-3.jpg",
    gallery: [],
    description: "Logo, colour palette and packaging mockups for a coffee shop.",
    tools: "Adobe Illustrator · Photoshop",
    link: ""
  },
  {
    title: "Social Media Campaign",
    category: "graphics",
    year: "2025",
    image: "assets/images/project-4.jpg",
    gallery: [],
    description: "A set of social posts, stories and a short promo video for a product launch.",
    tools: "Canva · Photoshop · CapCut",
    link: ""
  },
  {
    title: "Online Store Redesign",
    category: "web",
    year: "2025",
    image: "assets/images/project-5.jpg",
    gallery: [],
    description: "A cleaner product page and checkout flow for an online shop.",
    tools: "Figma · HTML · CSS",
    link: ""
  }
];
