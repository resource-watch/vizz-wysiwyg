# Wysiswyg
Welcome to the most amazing Wysiwyg.

## Documentation
Check [the docs](https://resource-watch.github.io/vizz-wysiwyg/styleguide/)

## Dependencies
    npm install -S react@15.6.2
    npm install -S react-dom@15.6.2    
    npm install -S react-quill@1.1.0

## Running locally in development mode
To get started in development mode, just clone the repository and run:

    npm install
    npm run dev

## Building and deploying in production
If you wanted to run this site in production run:

    npm install
    npm run build
    npm start

You should run the the build step again any time you make changes to pages or
components.

## Publishing
- component: `npm run publish`
- documentation: `npm run documentation`
- staging: `git push heroku master`
