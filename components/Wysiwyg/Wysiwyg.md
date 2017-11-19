<a name="wysiwyg-items"></a>
## Item types
### Text
```js static
{
  id: 1,
  type: 'text',
  content: '<h1>This is a title</h1>'
}
```

### Image
```js static
{
  id: 2,
  type: 'image',
  content: {
    src: 'https://media.istockphoto.com/photos/jordanian-dessert-at-sunrise-picture-id185099703?s=2048x2048',
    alt: 'Testing'
  }
}
```

### Video
```js static
{
  id: 3,
  type: 'video',
  content: {
    src: 'https://www.youtube.com/watch?v=1JC0NJdfbsA',
    alt: 'Video'
  }
}
```

### Embed
```js static
{
  id: 4,
  type: 'embed',
  content: {
    src: 'https://staging.resourcewatch.org/embed/widget/7592da9e-8844-429d-9f2b-0147dde29ff5'
  }
}
```

### Grid
```js static
{
  id: 5,
  type: 'grid',
  content: [
    {
      id: 51,
      type: 'embed',
      content: {
        src: 'https://staging.resourcewatch.org/embed/widget/7592da9e-8844-429d-9f2b-0147dde29ff5'
      }
    },
    {
      id: 52,
      type: 'embed',
      content: {
        src: 'https://staging.resourcewatch.org/embed/widget/acf093a0-c627-4ca7-9963-9cf1cc0c563e'
      }
    }
  ]
}
```

<a name="wysiwyg-blocks"></a>
## Block types
### Text
```js static
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
```

### Image
```js static
image: {
  Component: Image,
  EditionComponent: ImageEdition,
  tooltip: true,
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
```

### Video
```js static
video: {
  Component: Video,
  EditionComponent: VideoEdition,
  tooltip: true,
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
```

### Embed
```js static
embed: {
  Component: Embed,
  EditionComponent: EmbedEdition,
  tooltip: true,
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
```

### Grid
```js static
grid: {
  Component: Grid,
  EditionComponent: GridEdition,
  tooltip: true,
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
```

## Example
```js
<Wysiwyg
  items={[
    { id: 1, type: 'text', content: '<h1>This is a title</h1>' },
    { id: 2, type: 'text', content: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>' },
    { id: 3, type: 'text', content: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' },
    { id: 4, type: 'text', content: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>' },
    { id: 5, type: 'image', content: { src: '/static/images/placeholder.png', alt: 'Narcos' } },
    { id: 6, type: 'text', content: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>' }
  ]}
/>
```
