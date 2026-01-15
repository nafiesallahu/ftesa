/*
  Ftesa - shared invitation renderer

  How it works:
  - Each invitation page (e.g. /nafie-visar/) defines a config object:
      window.__FTESA_INVITATION__ = { title, imageSrc, imageAlt }
  - This script reads it and renders a single responsive image.

  Adding a new invitation (no core logic changes):
  1) Copy any existing folder in /public (e.g. /public/client-name) to /public/<new-slug>
  2) Replace /public/<new-slug>/invitation.png with your image (PNG/JPG)
  3) Update the config in /public/<new-slug>/index.html (title + alt text)
  4) Upload the /public folder contents to shared hosting.
*/

(function () {
  const cfg = window.__FTESA_INVITATION__;
  const app = document.getElementById("app");

  // If this isn't an invitation page, do nothing.
  if (!cfg || !app) return;

  const title = (cfg.title || "Wedding Invitation").toString();
  const imageSrc = (cfg.imageSrc || "invitation.png").toString();
  const imageAlt = (cfg.imageAlt || title).toString();

  // Improve accessibility + SEO basics for the invitation pages.
  document.title = title + " • Ftesa";

  const page = document.createElement("div");
  page.className = "page";

  const container = document.createElement("main");
  container.className = "container";
  container.setAttribute("role", "main");

  const img = document.createElement("img");
  img.className = "inviteImage";
  img.src = imageSrc;
  img.alt = imageAlt;
  img.loading = "eager";
  img.decoding = "async";

  container.appendChild(img);
  page.appendChild(container);

  if (cfg.showHint !== false) {
    const hint = document.createElement("div");
    hint.className = "hint";
    hint.textContent = "Scroll to view the full invitation.";
    page.appendChild(hint);
  }

  // Render
  app.replaceChildren(page);
})();

