export default {
  props: {
    title: {
      // Placeholder
      placeholder: {
        text: '<h1>This is the default title</h1>'
      },
      // Medium editor props
      // https://github.com/yabwe/medium-editor#mediumeditor-options
      options: {
        toolbar: { buttons: ['h1', 'h2', 'h3'] }
      }
    }
  },
  reduxState: { }
};
