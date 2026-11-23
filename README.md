# Portfolio Website

A static, dark-themed portfolio (HTML, CSS, JavaScript). No build step, so it works on GitHub Pages.

## Files
- `index.html` – page sections and text
- `style.css` – all styling (colors are at the top in `:root`, the lime accent is `--lime`)
- `script.js` – filters, project popup, FAQ, contact form
- `projects.js` – **your details and your projects live here**
- `assets/images/` – your images (create this folder)

## 1. Add your details
Open `projects.js` and edit the `siteConfig` block at the top: name, handle, city, email, WhatsApp number, Instagram, Behance, years and project count. The whole site updates from it.

## 2. Add your images
Create `assets/images/` and add:
- `hero-portrait.png` – a photo of you with a **transparent background** (PNG cut-out, ideally waist-up). It is used in the hero, FAQ avatar and the lime banner. Tools like remove.bg or Photoshop can make the cut-out. Until you add it, your initials show.
- `about.jpg` – a photo of you at work (it is shown in black and white).
- `project-1.jpg`, `project-2.jpg`, ... – your project covers.
- `assets/cv.pdf` – your CV, for the "Download CV" button (optional).

Compress images before uploading (squoosh.app). File names are case-sensitive on GitHub.

## 3. Add projects
In `projects.js`, copy a block in the `projects` list and edit it. Categories are `"web"`, `"uiux"` and `"graphics"`. The first project is shown large and as the featured project. The grid shows 5 projects and a "View all" button appears when you have more.

## 4. Edit the text
Edit `index.html` directly for the About text, services, process steps, FAQ answers and pricing.
- **Pricing and stats are examples.** Change them to your real rates and numbers.
- **Testimonials are placeholders.** Replace them with real client quotes, or delete the whole Testimonials section until you have some.

## 5. Make the contact form send to your inbox
By default the form opens the visitor's email app. To receive messages directly, create a free form at formspree.io and paste its URL into `formEndpoint` in `projects.js`.

## 6. Host on GitHub Pages
1. Create a repository (for a root URL, name it `yourusername.github.io`).
2. Upload all files and the `assets` folder.
3. Go to **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
4. Your site is live in a minute or two at `https://yourusername.github.io/`.
