const imageContext = require.context('../public/images', false, /\.(png|jpe?g|svg)$/);

const images = imageContext.keys().map((key) => {
  return key.replace('./', '');
});

export default images;