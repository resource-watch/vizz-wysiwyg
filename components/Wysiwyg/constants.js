const DEFAULT_TOOLBAR = {
  buttons: [
    { block: 'text' },
    { block: 'image' },
    { block: 'video' },
    { block: 'embed' }
  ]
};

const DEFAULT_BLOCKS = {
  text: {
    // Placeholder
    placeholder: {
      text: '<p>Type your text</p>'
    },
    // Medium editor props
    options: {
      extensions: {},
      toolbar: { buttons: ['bold', 'italic', 'underline', 'anchor', 'unorderedlist', 'orderedlist', 'h1', 'h2', 'h3'] },
      paste: {
        forcePlainText: false,
        cleanPastedHTML: true
      }
    }
  },

  image: {
    // Placeholder
    placeholder: {
      src: 'http://lorempixel.com/1280/720/nature',
      alt: 'Placeholder image'
    },

    options: {

    }
  },

  video: {
    // Placeholder
    placeholder: {
      url: 'https://vimeo.com/90509568'
    },

    // react player props
    // https://github.com/CookPete/react-player#props
    options: {
      controls: true
    }
  },

  embed: {
    // Placeholder
    placeholder: {
      src: 'https://staging.resourcewatch.org/embed/widget/acf093a0-c627-4ca7-9963-9cf1cc0c563e',
      width: '100%',
      height: '400px'
    },

    // react player props
    // https://github.com/CookPete/react-player#props
    options: {
      controls: true
    }
  }
};

export { DEFAULT_TOOLBAR, DEFAULT_BLOCKS };
