const express = require('express');
const passport = require('passport');
const next = require('next');
const sass = require('node-sass');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const postcssMiddleware = require('postcss-middleware');
const routes = require('./routes');
const { parse } = require('url');
const postcssConfig = require('./postcss.config');
const auth = require('./auth')();

// Load environment variables from .env file if present
require('dotenv').load();
require('es6-promise').polyfill();

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

// Next app creation
const app = next({ dev });
const handle = routes.getRequestHandler(app);

// Express app creation
const server = express();

// Configuring session and cookie options
const sessionOptions = {
  secret: process.env.SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: true
};

if (!dev) {
  const redisClient = redis.createClient(process.env.REDIS_URL);
  sessionOptions.store = new RedisStore({
    client: redisClient,
    logErrors: true
  });
}

// configure Express
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(session(sessionOptions));
server.use(passport.initialize());
server.use(passport.session());

const isAuthenticated = (req, res, nextAction) => {
  if (req.isAuthenticated()) return nextAction();
  // Fallback to home
  if (req.originalUrl) return res.redirect(`/login?referer=${req.originalUrl}`);
  return res.redirect('/login');
};

// Initializing next app before express server
app.prepare()
  .then(() => {
    if (!dev) {
      // Add route to serve compiled SCSS from /assets/{build id}/main.css
      // Note: This is is only used in production, in development it is inlined
      const sassResult = sass.renderSync({ file: './css/index.scss', outputStyle: 'compressed' });
      server.get('/styles/:id/index.css', postcssMiddleware(postcssConfig), (req, res) => {
        res.setHeader('Content-Type', 'text/css');
        res.setHeader('Cache-Control', 'public, max-age=2592000');
        res.setHeader('Expires', new Date(Date.now() + 2592000000).toUTCString());
        res.send(sassResult.css);
      });
    }

    // Configuring next routes with express
    const handleUrl = (req, res) => {
      const parsedUrl = parse(req.url, true);
      return handle(req, res, parsedUrl);
    };

    // Home doesn`t require authentication
    server.get('/', handleUrl);

    // Authentication
    server.post('/login', auth.authenticate(), (req, res) => {
      if (req.query.referer) return res.redirect(req.query.referer);
      return res.redirect('/');
    });
    server.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/');
    });

    server.use(handle);

    server.listen(port, (err) => {
      if (err) throw err;
      console.info(`> Ready on http://localhost:${port} [${process.env.NODE_ENV}]`);
    });
  })
  .catch((err) => {
    console.error('An error occurred, unable to start the server');
    console.error(err);
  });
