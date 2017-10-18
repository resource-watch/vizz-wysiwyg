// routes.js
const nextRoutes = require('next-routes');

const routes = nextRoutes();

// ========================= APP ROUTES =====================
routes.add('home', '/', 'wysiwyg');
routes.add('wysiwyg', '/wysiwyg', 'wysiwyg');

module.exports = routes;
