/*
MaxBuildsXJ - Modern single-file React site (code/react)

What this file is:
- A single-file React component (default export) that represents a full one-page / small multi-section site.
- Built with Tailwind CSS utility classes (no tailwind import statements here). Assumes you have Tailwind installed and configured in the project.
- Uses client-side routing via a tiny in-file router (no external dependency) so you can drop this into a simple Create React App / Vite / Next.js page.
- Includes a dedicated "Factory Documents" area with a simple static UI and clear instructions (in comments) on how to connect a server or use Netlify/Cloud Storage for document hosting.

How to use:
1) Create a new React project (Vite or CRA recommended). Example with Vite:
   npm create vite@latest maxbuildsxj --template react
   cd maxbuildsxj
   npm install
2) Install Tailwind: follow Tailwind docs to add Tailwind to your project (tailwindcss + postcss + autoprefixer). Initialize config and add the Tailwind directives to index.css.
3) Copy this file into src/App.jsx (or another file) and import it from src/main.jsx.
4) Add the fonts / images referenced (or replace them with your own). See the `ASSETS` section below for recommended file names.
5) Factory Documents:
   - For a simple site without a server, you can store factory PDFs in a public/ folder and list them in `FACTORY_DOCS` array below. The front-end will link to them directly.
   - For an upload/download experience, implement an API endpoint to accept file uploads and return a JSON list. See comments at FactoryDocuments component.
6) Deployment: build with `npm run build` and host on Netlify, Vercel, or GitHub Pages.

ASSETS (place in public/ or import as modules):
- /images/hero.jpg (hero banner)
- /images/garage-hero.jpg
- /images/build-1.jpg, build-2.jpg, build-3.jpg (gallery)

Notes:
- This file is intentionally verbose with comments to make it self-documenting.
- Replace placeholder text and links with your real content.
- Accessibility: headings, alt tags, and aria attributes are included.
*/

import React, { useState, useEffect } from 'react';

/* ---------- SITE CONFIG / DATA ---------- */
const SITE = {
  title: "MaxBuilds XJ",
  tagline: "Built for trails, tuned for life",
  description: "High-quality Jeep XJ builds, parts, and factory documents.",
  email: "you@maxbuildsxjs.com",
};

// Example static factory documents. If you host files in public/factory-docs/ use those relative paths.
const FACTORY_DOCS = [
  { id: 1, name: 'Factory Service Manual - 1997 XJ.pdf', url: '/factory-docs/1997-xj-service-manual.pdf', size: '8.2 MB', notes: 'Scanned.' },
  { id: 2, name: 'Wiring Diagrams - Full.pdf', url: '/factory-docs/wiring-diagrams.pdf', size: '3.9 MB', notes: 'Color scan.' },
];

const GALLERY = [
  { id: 1, title: '1968 AMX swap fitment', src: '/images/build-1.jpg' },
  { id: 2, title: 'Roll cage mockup', src: '/images/build-2.jpg' },
  { id: 3, title: 'Trail ready XJ', src: '/images/build-3.jpg' },
];

/* ---------- Tiny Router ---------- */
function useRoute() {
  const [route, setRoute] = useState(window.location.hash.replace('#', '') || '/');
  useEffect(() => {
    function onHash() { setRoute(window.location.hash.replace('#', '') || '/'); }
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  function nav(to) { window.location.hash = to; }
  return { route, nav };
}

/* ---------- UTILITIES ---------- */
function IconMenu(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- COMPONENTS ---------- */

function TopNav({ nav, route }) {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-40 shadow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <a href="#/" className="flex items-center gap-3" aria-label={`${SITE.title} home`}>
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-red-600 rounded-md flex items-center justify-center font-bold">MB</div>
              <div>
                <div className="text-lg font-semibold">{SITE.title}</div>
                <div className="text-xs text-amber-300">{SITE.tagline}</div>
              </div>
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <button onClick={() => nav('/')} className={`hover:underline ${route === '/' ? 'underline' : ''}`}>Home</button>
            <button onClick={() => nav('/builds')} className={`hover:underline ${route === '/builds' ? 'underline' : ''}`}>Builds</button>
            <button onClick={() => nav('/gallery')} className={`hover:underline ${route === '/gallery' ? 'underline' : ''}`}>Gallery</button>
            <button onClick={() => nav('/docs')} className={`hover:underline ${route === '/docs' ? 'underline' : ''}`}>Factory Documents</button>
            <button onClick={() => nav('/contact')} className={`hover:underline ${route === '/contact' ? 'underline' : ''}`}>Contact</button>
          </nav>

          <div className="md:hidden">
            <MobileMenu nav={nav} route={route} />
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ nav, route }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" className="p-2 rounded-md hover:bg-white/10">
        <IconMenu className="w-6 h-6 text-white" />
      </button>
      {open && (
        <div id="mobile-menu" className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg py-2 text-sm">
          <button onClick={() => { nav('/'); setOpen(false); }} className={`w-full text-left px-4 py-2 ${route==='/'?'bg-slate-700':''}`}>Home</button>
          <button onClick={() => { nav('/builds'); setOpen(false); }} className={`w-full text-left px-4 py-2 ${route==='/builds'?'bg-slate-700':''}`}>Builds</button>
          <button onClick={() => { nav('/gallery'); setOpen(false); }} className={`w-full text-left px-4 py-2 ${route==='/gallery'?'bg-slate-700':''}`}>Gallery</button>
          <button onClick={() => { nav('/docs'); setOpen(false); }} className={`w-full text-left px-4 py-2 ${route==='/docs'?'bg-slate-700':''}`}>Factory Documents</button>
          <button onClick={() => { nav('/contact'); setOpen(false); }} className={`w-full text-left px-4 py-2 ${route==='/contact'?'bg-slate-700':''}`}>Contact</button>
        </div>
      )}
    </div>
  );
}

function Hero({ nav }) {
  return (
    <section className="bg-[url('/images/garage-hero.jpg')] bg-cover bg-center text-white">
      <div className="backdrop-brightness-75">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow">MaxBuilds XJ</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">We build reliable, high-performance swaps and fabrications for Jeep XJs and classic muscle — documented, photographed, and backed by service-level notes.</p>
          <div className="mt-8 flex gap-4">
            <button onClick={() => nav('/builds')} className="px-5 py-3 bg-amber-500 rounded shadow font-semibold">See Builds</button>
            <button onClick={() => nav('/docs')} className="px-5 py-3 border border-white/30 rounded">Factory Documents</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const items = [
    { title: 'Engine Swaps', desc: 'LS, AMC 360, Chrysler 400 — fitment planning & accessories.' },
    { title: 'Wiring & EFI', desc: 'Stand-alone engine management wiring harness design & diagrams.' },
    { title: 'Fabrication', desc: 'Roll cages, mounts, crossmembers, and exhuast routing.' },
  ];
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-bold">What we do</h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((it, idx) => (
          <article key={idx} className="p-6 border rounded-lg shadow-sm bg-white/80">
            <h3 className="font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm text-slate-700">{it.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BuildsPage() {
  // Example placeholder builds — you will replace these with real project write-ups.
  const builds = [
    { id: 'b1', name: '600 WHP Jeep XJ - 4.0L Turbo', summary: 'E85, T56 swap, custom mounts.' },
    { id: 'b2', name: 'AMC 360 Low-End Torque Build', summary: 'Hydraulic flat tappet, Edelbrock top end.' },
  ];
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold">Builds & Projects</h2>
      <div className="mt-6 space-y-4">
        {builds.map(b => (
          <article key={b.id} className="p-4 border rounded flex items-start gap-4">
            <div className="flex-1">
              <h3 className="font-semibold">{b.name}</h3>
              <p className="text-sm text-slate-700">{b.summary}</p>
              <div className="mt-3 flex gap-3">
                <button className="px-3 py-1 border rounded text-sm">Read</button>
                <button className="px-3 py-1 border rounded text-sm">Parts List</button>
              </div>
            </div>
            <div className="w-28 h-20 bg-slate-200 rounded overflow-hidden flex items-center justify-center text-sm">img</div>
          </article>
        ))}
      </div>
    </main>
  );
}

function GalleryPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold">Gallery</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {GALLERY.map(img => (
          <figure key={img.id} className="rounded overflow-hidden shadow">
            <img src={img.src} alt={img.title} className="w-full h-48 object-cover" />
            <figcaption className="p-3 text-sm bg-white">{img.title}</figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}

function FactoryDocuments({ docs = FACTORY_DOCS }) {
  /*
    FactoryDocuments component:
    - For a static site: add your PDF files to public/factory-docs/ and list them in FACTORY_DOCS above.
    - For dynamic listing: implement a GET endpoint (/api/factory-docs) that returns JSON [{id, name, url, size, notes}].
      Fetch that endpoint and replace the `docs` prop with the fetched list.
    - For uploads: implement a POST /api/upload that accepts multipart/form-data and stores the file in S3 or your host; return the updated list.

    Security & privacy notes:
    - If documents are sensitive, gate them behind authentication. This frontend provides only public links.
    - To force-download files instead of inline viewing in browser, add `download` attribute to the link or configure your hosting to set `Content-Disposition: attachment`.
  */
  const [list, setList] = useState(docs);

  useEffect(() => {
    // Example: if you have a server endpoint, fetch it here and replace list
    // fetch('/api/factory-docs').then(r=>r.json()).then(setList)
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Factory Documents</h2>
        <div className="text-sm text-slate-600">Tip: place PDFs in <code>public/factory-docs/</code> and update FACTORY_DOCS in the code.</div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map(d => (
          <div key={d.id} className="p-4 border rounded bg-white/80 flex items-start gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded">PDF</div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{d.name}</h3>
                  <p className="text-xs text-slate-600">{d.size} • {d.notes}</p>
                </div>
                <div className="flex items-center gap-2">
                  {/* Direct view link */}
                  <a href={d.url} target="_blank" rel="noreferrer" className="px-3 py-1 border rounded text-sm" aria-label={`Open ${d.name}`}>View</a>
                  {/* Download link: trick to request download attribute (works for same-origin files in most hosts) */}
                  <a href={d.url} download className="px-3 py-1 bg-amber-500 rounded text-white text-sm">Download</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-6 text-sm text-slate-600">
        <strong>Developer notes:</strong>
        <ul className="list-disc ml-6 mt-2">
          <li>If you want an admin UI to upload documents, build an authenticated route that calls a server endpoint to store files in S3 or your host and returns the file metadata.</li>
          <li>To prevent hotlinking, place files behind signed URLs (S3 pre-signed) and refresh tokens on the client.</li>
        </ul>
      </div>
    </main>
  );
}

function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold">Contact</h2>
      <p className="mt-3 text-sm text-slate-700">Email: <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a></p>
      <form className="mt-6 grid grid-cols-1 gap-4" onSubmit={(e)=>{ e.preventDefault(); alert('Replace this handler with a real endpoint'); }}>
        <input className="p-3 border rounded" placeholder="Your name" aria-label="Your name" required />
        <input className="p-3 border rounded" placeholder="Your email" aria-label="Your email" type="email" required />
        <textarea className="p-3 border rounded" placeholder="Message" rows={5} aria-label="Message" required />
        <div className="flex gap-3">
          <button type="submit" className="px-4 py-2 bg-amber-500 rounded text-white">Send</button>
          <button type="reset" className="px-4 py-2 border rounded">Reset</button>
        </div>
      </form>

      <div className="mt-6 text-xs text-slate-500">Note: replace the form handler with an API endpoint (Netlify Forms, Formspree, or your own /api/contact) to receive messages.</div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start justify-between gap-6">
        <div>
          <div className="font-semibold">{SITE.title}</div>
          <div className="text-sm text-slate-400 mt-2">{SITE.description}</div>
        </div>
        <div className="text-sm text-slate-400">
          <div>Contact: <a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
          <div className="mt-2">© {new Date().getFullYear()} {SITE.title}</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- MAIN APP ---------- */
export default function App() {
  const { route, nav } = useRoute();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-300 selection:text-amber-900">
      <TopNav nav={nav} route={route} />
      {/* Route view */}
      <main className="flex-1">
        {route === '/' && (
          <>
            <Hero nav={nav} />
            <Highlights />
            <section className="max-w-6xl mx-auto px-6 py-12">
              <h2 className="text-2xl font-bold">Featured project</h2>
              <div className="mt-4 p-6 bg-white rounded shadow-sm">
                <h3 className="font-semibold">600 WHP Jeep — 4.0L Turbo Swap</h3>
                <p className="mt-2 text-sm text-slate-700">Short overview: E85-compatible, custom turbo manifold, T56 transmission, full harness and tuning via Holley Terminator X Max.</p>
                <div className="mt-4 flex gap-3">
                  <button className="px-3 py-1 border rounded">Read more</button>
                  <button className="px-3 py-1 border rounded">Parts list</button>
                </div>
              </div>
            </section>
          </>
        )}

        {route === '/builds' && <BuildsPage />}
        {route === '/gallery' && <GalleryPage />}
        {route === '/docs' && <FactoryDocuments />}
        {route === '/contact' && <ContactPage />}

        {/* default fallback */}
        {!['/','/builds','/gallery','/docs','/contact'].includes(route) && (
          <main className="max-w-4xl mx-auto px-6 py-20">
            <h2 className="text-2xl font-bold">Page not found</h2>
            <p className="mt-3">The page you requested was not found. Use the navigation to find content.</p>
          </main>
        )}
      </main>

      <Footer />
    </div>
  );
}
