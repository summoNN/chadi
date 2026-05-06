# Chadi Portfolio — 3D Interactive Portfolio

A modern, production-grade portfolio site built with **Next.js 14 (App Router)**, **React Three Fiber**, and **Tailwind CSS**. Features a fullscreen 3D hero with interactive retro TVs.

---

## ✨ Features

- **Fullscreen 3D hero** with your `hero.glb` model
- **Clickable TVs** via raycasting (R3F pointer events)
- **Floating animation** — each TV bobs with a unique phase
- **Hover feedback** — scale + emissive glow on hover
- **Camera parallax** — subtle movement following the mouse
- **Smooth scrolling** via Lenis
- **Custom cursor** with lag ring
- **Glassmorphism + noise texture** UI
- **Project grid** with hover card animations
- **Responsive** — mobile shows a static fallback instead of WebGL
- **Minimal, editorial aesthetic** — Playfair Display + Space Mono

---

## 📁 Project Structure

```
chadi-portfolio/
├── app/
│   ├── globals.css          # Design tokens, custom styles
│   ├── layout.tsx           # Root layout with Lenis + cursor
│   └── page.tsx             # Main page assembly
├── components/
│   ├── Scene.tsx            # R3F Canvas + lighting
│   ├── TVModel.tsx          # GLB loader + click/hover logic
│   ├── Navbar.tsx           # Fixed navigation
│   ├── Footer.tsx           # Site footer
│   ├── CustomCursor.tsx     # Animated cursor
│   └── LenisProvider.tsx    # Smooth scroll setup
├── sections/
│   ├── HeroSection.tsx      # Fullscreen 3D scene
│   ├── About.tsx            # About me
│   └── Projects.tsx         # Project grid
├── lib/
│   ├── scroll.ts            # scrollToSection() utility
│   └── inspectGLB.ts        # Debug helper for mesh names
└── public/
    └── hero.glb             # ← PUT YOUR FILE HERE
```

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
# or
pnpm install
```

### 2. Add your GLB

Copy your `hero.glb` file into the `public/` folder:

```bash
cp /path/to/hero.glb public/hero.glb
```

### 3. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔧 Mesh Name Mapping

The TVs are identified by their mesh names inside the GLB. Current detection logic (in `components/TVModel.tsx`):

| Mesh name contains | Clicks to |
|---|---|
| `CHADI` | `#about` |
| `VIDEASTZ` or `MOTION` | `#projects` |
| `LOGO`, `TV3`, or `TV_3` | `#home` |

If your mesh names are different, **inspect them first**:

```bash
# Install gltf-transform CLI
npx gltf-transform inspect public/hero.glb
```

Or add a temporary `console.log` in the `TVModel` component:

```tsx
scene.traverse((obj) => {
  console.log("Mesh:", obj.name, obj.type);
});
```

Then update `getConfigForMesh()` in `TVModel.tsx` to match your actual names.

---

## 🎨 Customization

### Colors

Edit CSS variables in `app/globals.css`:

```css
:root {
  --accent: #e8d5b0;        /* Main text color */
  --accent-warm: #c9a96e;   /* Highlights */
  --bg: #080808;            /* Background */
}
```

### Camera position

Edit `Scene.tsx`:

```tsx
camera={{ position: [0, 1, 6], fov: 45 }}
```

### Floating animation speed

Edit `TVModel.tsx`:

```tsx
const floatY = Math.sin(timeRef.current * 0.6 ...) * 0.08;
//                                         ^^^          ^^^^
//                                      speed       amplitude
```

### Scroll target for each TV

Edit `TV_CONFIG` in `TVModel.tsx`.

---

## 📦 Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | 14.2.5 | Framework |
| `react` / `react-dom` | ^18 | UI library |
| `@react-three/fiber` | ^8.17 | Three.js for React |
| `@react-three/drei` | ^9.109 | R3F helpers (useGLTF, Html, etc.) |
| `three` | ^0.167 | 3D engine |
| `lenis` | ^1.1.9 | Smooth scrolling |
| `framer-motion` | ^11 | (available for additional animations) |
| `gsap` | ^3.12 | (available for timeline animations) |
| `tailwindcss` | ^3.4 | Utility CSS |

---

## 🏗️ Build for Production

```bash
npm run build
npm run start
```

---

## ⚠️ Common Issues

**"Cannot find module 'three'"**
```bash
npm install three @types/three
```

**GLB not loading**
- Check `public/hero.glb` exists
- Check the browser Network tab for a 404

**TVs not clickable**
- Run `gltf-transform inspect` to find actual mesh names
- Update `getConfigForMesh()` in `TVModel.tsx`

**Mobile shows blank**
- The mobile fallback (`isMobile` check in `HeroSection.tsx`) is intentional
- Replace the fallback content with a static image if desired

---

## 📄 License

MIT — use freely for portfolio and commercial projects.
