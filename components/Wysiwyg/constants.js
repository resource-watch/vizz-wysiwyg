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

    model: {
      src: {
        type: 'text',
        id: 'src',
        label: 'Src',
        validations: {
          presence: { allowEmpty: false },
          url: true
        }
      },
      alt: {
        type: 'text',
        id: 'alt',
        label: 'Alt',
        validations: {
          presence: { allowEmpty: false }
        }
      }
    },

    options: {
    }
  },

  video: {
    // Placeholder
    placeholder: {
      url: 'https://vimeo.com/90509568'
    },

    model: {
      url: {
        type: 'text',
        id: 'url',
        label: 'Url',
        validations: {
          presence: { allowEmpty: false },
          url: true
        }
      }
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

    model: {
      src: {
        type: 'text',
        id: 'src',
        label: 'Src',
        validations: {
          presence: { allowEmpty: false },
          url: true
        }
      }
    },

    options: {
    }
  },

  grid: {
    // Placeholder
    placeholder: {
    },

    model: {
      columns: {
        type: 'select',
        id: 'columns',
        label: 'Columns',
        defaultValue: 2,
        options: [
          { label: 2, value: 2 },
          { label: 3, value: 3 }
        ],
        validations: {
          presence: { allowEmpty: false }
        }
      }
    },

    options: {
    }
  }
};

export { DEFAULT_TOOLBAR, DEFAULT_BLOCKS };
