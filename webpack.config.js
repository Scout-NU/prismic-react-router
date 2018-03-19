module.exports = {
  output: {
    libraryTarget: 'umd',
    library: 'PrismicReactRouter',
  },
  externals: {
    react: 'react',
    'react-router-dom': 'react-router-dom',
    'prismic-javascript': 'prismic-javascript',
  },
};
