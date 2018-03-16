import React from 'react';

export default (Wrapped, Loading, NotFound) =>
  class PrismicPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        doc: null,
        err: null,
      };
      this.fetchPage = this.fetchPage.bind(this);
    }

    componentWillMount() {
      this.fetchPage(this.props);
    }

    componentWillReceiveProps(props) {
      this.fetchPage(props);
    }

    fetchPage(props) {
      if (props.prismicCtx) {
        props.prismicCtx.api.getByUID(
          Wrapped.pageType,
          this.props.uid || this.props.routeProps.params.uid,
          {},
          (err, doc) => {
            if (err) {
              this.setState(() => ({ err }));
            } else if (doc) {
              this.setState(() => ({ doc }));
            }
          }
        );
      }
    }

    render() {
      return this.state.doc ? (
        <Wrapped doc={this.state.doc} />
      ) : this.state.err ? (
        NotFound ? (
          <NotFound />
        ) : null
      ) : Loading ? (
        <Loading />
      ) : null;
    }
  };
