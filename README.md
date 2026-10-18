# Sean’s Photography

A responsive photography portfolio built with Node.js and Express, and deployable as a static site with GitHub Pages.

## Run locally with Express

Requirements: Node.js 18 or newer and npm.

```sh
npm install
npm run dev
```

Open <http://localhost:3000>. For a production-style start, run `npm start`. The server uses the `PORT` environment variable when set.

## Publish with GitHub Pages

1. In the GitHub repository, open **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose the `main` branch and the `/ (root)` folder, then save.
4. Once GitHub Pages finishes publishing, open <https://ur98tr8789461.github.io/Testing/>. The root `index.html` forwards visitors to the portfolio at `/Testing/public/`.

The portfolio's local CSS and JavaScript links are relative to `public/index.html`, so they load from the project subpath on GitHub Pages. Changes pushed to `main` are published by Pages; allow a short time for deployment to finish.

## Customize

- Edit `public/index.html` to update portfolio text, gallery images, and the contact email address.
- Edit `public/styles.css`, `public/hero.css`, and `public/lightbox.css` to adjust the visual design.
- Edit `public/script.js` to change gallery filters and navigation behavior.
