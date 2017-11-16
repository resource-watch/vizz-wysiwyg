// Visual Blocks
import Text from 'components/Wysiwyg/Blocks/Text';
import Image from 'components/Wysiwyg/Blocks/Image';
import Video from 'components/Wysiwyg/Blocks/Video';
import Embed from 'components/Wysiwyg/Blocks/Embed';
import Grid from 'components/Wysiwyg/Blocks/Grid';

// Edition Blocks
import ImageEdition from 'components/Wysiwyg/Blocks/Edition/ImageEdition';
import VideoEdition from 'components/Wysiwyg/Blocks/Edition/VideoEdition';
import EmbedEdition from 'components/Wysiwyg/Blocks/Edition/EmbedEdition';
import GridEdition from 'components/Wysiwyg/Blocks/Edition/GridEdition';

const DEFAULT_BLOCKS = {
  text: {
    Component: Text,
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
    Component: Image,
    EditionComponent: ImageEdition,
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
    Component: Video,
    EditionComponent: VideoEdition,
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
    Component: Embed,
    EditionComponent: EmbedEdition,
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
    Component: Grid,
    EditionComponent: GridEdition,
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

export { DEFAULT_BLOCKS };
