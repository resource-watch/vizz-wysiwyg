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
      src: '/static/images/placeholder.png',
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
    },

    options: {
      columns: 2
    }
  }
};

export { DEFAULT_TOOLBAR, DEFAULT_BLOCKS };
