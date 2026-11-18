# Heads Hair Studio

A one-page React landing site built with Vite, Tailwind CSS, Framer Motion, and GSAP.

## Run locally

```powershell
npm install
npm run dev
```

For a fresh project, scaffold it first:

```powershell
npm create vite@latest heads-hair-studio -- --template react --no-interactive
cd heads-hair-studio
npm install
npm install framer-motion gsap lucide-react
npm install -D tailwindcss@3 postcss autoprefixer
npm run dev
```

## Brand assets

Place the Herr Von Muellerhoff WOFF2 font at
`public/fonts/HerrVonMuellerhoff-Regular.woff2`. Great Vibes is already loaded
as the script fallback; Montserrat is loaded from Google Fonts.

Replace the Unsplash image URLs in the `IMAGES` object in `src/jason.jsx` with
Heads Hair Studio photographs. Replace the explicitly labelled review
placeholders with approved client reviews and update the social `#` links with
the studio's real profile URLs.

Business contact details, address, opening hours, social links, and navigation
are grouped in the `BUSINESS` object at the top of `src/jason.jsx`. The contact
form validates its fields and opens a prefilled email; it does not connect to a
booking backend.

`src/jason.jsx` is divided into labelled sections and marks suitable
ReactBites replacement points in comments.
