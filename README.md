# Wysiswyg
Welcome to the most amazing Wysiwyg.

## Documentation
Check [the docs](https://resource-watch.github.io/vizz-wysiwyg/styleguide/)

## Dependencies
    yarn add react@15.6.2
    yarn add react-dom@15.6.2    
    yarn add react-quill@1.1.0

## Running locally in development mode
To get started in development mode, just clone the repository and run:

    yarn install
    yarn run dev

## Linking into another project
If you want to debug the Wysiwyg within another project, please execute the following in the main directory:

    yarn link
    yarn run component

In your other project, run this:

    yarn link "vizz-wysiwyg"

Every change in the Wysiwyg's codebase will be reflected in your other project (might need a page reload). The Wysiwyg will also be built using the development environment so it's easier to debug.

## Building and deploying in production
If you wanted to run this site in production run:

    yarn install
    yarn run build
    yarn start

You should run the the build step again any time you make changes to pages or
components.

## Publishing
- component: `yarn run publish`
- documentation: `yarn run documentation`
- staging: `git push heroku master`
