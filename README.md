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

## Linking into another project
If you want to debug the Wysiwyg within another project, please execute the following in the main directory:

    npm link
    npm run component

In your other project, run this:

    npm link "vizz-wysiwyg"

Every change in the Wysiwyg's codebase will be reflected in your other project (might need a page reload). The Wysiwyg will also be built using the development environment so it's easier to debug.

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
