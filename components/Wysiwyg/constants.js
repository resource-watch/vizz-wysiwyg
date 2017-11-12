const DEFAULT_TOOLBAR = {
  buttons: [
    { block: 'text' },
    { block: 'image' },
    { block: 'video' },
    { block: 'embed' },
    { block: 'grid' }
  ]
};

const DEFAULT_BLOCKS = {
  text: {
    // Placeholder
    placeholder: 'Type your text',
    theme: 'bubble',
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link']
      ]
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
  },

  grid: {
    // Placeholder
    placeholder: {
      content: [
        { id: 1234, type: 'text', content: '<h1>This is a title</h1>' },
        { id: 4321, type: 'text', content: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>' }
      ]
    },

    options: {

    }
  }
};

export { DEFAULT_TOOLBAR, DEFAULT_BLOCKS };
