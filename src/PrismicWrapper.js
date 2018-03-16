import React from 'react';
import 'whatwg-fetch';
import Prismic from 'prismic-javascript';

export default class PrismicWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prismicCtx: null,
    };
  }

  componentWillMount() {
    this.buildContext()
      .then(prismicCtx => {
        this.setState({ prismicCtx });
      })
      .catch(e => {
        console.error(
          `Cannot contact the API, check your prismic configuration:\n${e}`
        );
      });
  }

  buildContext() {
    const { accessToken, repositoryName, linkResolver } = this.props;
    const endpoint = `https://${repositoryName}.prismic.io/api/v2`;
    return Prismic.api(endpoint, { accessToken }).then(api => ({
      api,
      endpoint,
      accessToken,
      linkResolver: linkResolver || ((doc, ctx) => '/'),
    }));
  }

  render() {
    const Routes = this.props.routes;
    return <Routes prismicCtx={this.state.prismicCtx} />;
  }
}
