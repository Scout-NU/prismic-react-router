module.exports = {
  output: {
    libraryTarget: 'umd',
    library: 'PrismicReactStarter',
  },
  externals: {
    react: 'react',
    'react-router-dom': 'react-router-dom',
    'prismic-javascript': 'prismic-javascript',
  },
};
