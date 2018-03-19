# prismic-react-router

This repository serves as a boilerplate project to get started with a client-side Prismic site built with Create React App

## Table of Contents

* [Background](#background)
* [Usage](#usage)
* [API](#api)
* [Maintainers](#maintainers)
* [Code of Conduct](#code-of-conduct)
* [Contributing](#contributing)
* [License](#license)
* [About Scout](#about-scout)

## Background

When Scout started its first Prismic project, we found the resources around a React implementation to be quite scarce. As a result, we created several wrappers and utilities to make working with Prismic a bit more pleasant.

## Usage

We highly recommend using a package manager and a bundler with this library. First, install the module:

```bash
# NPM 5+
npm i react react-dom react-router-dom prismic-javascript prismic-react-router

# NPM < 5
npm i --save react react-dom react-router-dom prismic-javascript prismic-react-router

# Yarn
yarn add react react-dom react-router-dom prismic-javascript prismic-react-router
```

Then, import based on your stack:

#### CommonJS

```js
// import the entire package
const PrismicReactRouter = require('prismic-react-router');

// just a single module
const PrismicPage = require('prismic-react-router').PrismicPage;
```

#### ES Modules

```js
// import the entire package
import * as PrismicReactRouter from 'prismic-react-router';

// just a single module
import { PrismicPage } from 'prismic-react-router';
```

#### UMD

If you're not using a bundler and would like a UMD build, no worries! We've got that too:

```html
<script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>
<script src="https://unpkg.com/prismic-javascript"></script>
<script src="https://unpkg.com/prismic-react-router@latest/dist/umd/prismic-react-router.js"></script>
<script>
  var PrismicPage = window.PrismicReactRouter;
</script>
```

## API

### `PrismicPage(Page: React.Component, Loading: React.Component?, NotFound: React.Component?)`

The PrismicPage component creates an easy-to-use wrapper around the Prismic API to fetch a single page. Rather than using the imperative API, the PrismicPage higher-order component provides a declarative way to fetch pages based on UID and access their content via props.

#### Props

* `prismicCtx: PrismicContext` - the Prismic API wrapper
* `uid: string` - the UID of the page to fetch

#### Usage

```jsx
class Home extends React.Component {
  static pageType = 'home';
  render() {
    return this.props.err ? (
      <h1>Error</h1>
    ) : (
      PrismicReact.RichText.render(this.props.doc.data.content)
    );
  }
}
export default PrismicPage(Home, <h1>Not Found</h1>, <h1>Loading...</h1>);

// inside a react router component, likely
<PrismicPage prismicCtx={prismicCtx} uid="home" />;
```

### `<PrismicRoute />`

The PrismicRoute component provides a convenient abstraction on top of `react-router-dom` to automatically render Prismic pages based on route params.

#### Props

* `component: React.Component` - the component to Render for the given route
* `componentProps: object` - the props to pass down to the rendered component
* `path: string` - the path for react-router-dom to match
* `routerProps: object` - the props passed in from the PrismicWrapper (documented below)

#### Usage

```jsx
const Routes = props => (
  <Router>
    <Switch>
      <PrismicRoute
        path="/"
        routerProps={props}
        componentProps={{ uid: 'home' }} // pass in page UID if not in path
        component={Home} // components should be of type PrismicPage
      />
      <PrismicRoute
        path="/blog/:uid" // uid path param is automatically detected
        routerProps={props}
        component={BlogPost}
      />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
```

### `<PrismicWrapper />`

The PrismicWrapper provides a wrapper around the Prismic API for usage with `PrismicRoute`s (documented above) and react-router-dom.

#### Props

* `routes: ReactRouterDom.Router` - the router configuration to wrap
* `accessToken: string?` - the access token for your repository, if needed
* `repositoryName: string` - the name of the Prismic repository to load
* `linkResolver: (doc, ctx) => string` - a resolver to resolve Link components. see the Prismic documentation for more information

#### Usage

```jsx
// using Routes from above example
ReactDOM.render(
  <PrismicWrapper
    routes={Routes}
    repositoryName="scout-nu"
    linkResolver={this.myResolver}
  />,
  document.getElementById('root')
);
```

## Maintainers

#### Adam Markon

_Email_: [amarkon895@gmail.com](mailto:amarkon895@gmail.com)

_Twitter_: [@amarkon88](https://twitter.com/amarkon88)

## Code of Conduct

Scout strives to provide a welcoming, inclusive environment for all users, period. To hold ourselves accountable to that mission, Scout has a strictly-enforced [code of conduct](https://github.com/Scout-NU/open-source/blob/develop/CODE_OF_CONDUCT.md). Violating those rules will result in removal from the Scout organization, and potentially being banned from contributing to our projects.

## Contributing

We welcome all contributions to our projects! Filing bugs, feature requests, code changes, docs changes, or anything else you'd like to contribute are all more than welcome! More information about contributing to Scout projects can be found in our [contributors' guide](/CONTRIBUTING.md)!

## License

All Scout libraries are [ISC-licensed](/LICENSE). tl;dr: you can use this code however you'd like, just please attribute us appropriately!

## About Scout

<p align="center">
  <img src="https://web.northeastern.edu/scout/wp-content/themes/scout/images/logo.png" alt="Scout Logo" />
</p>

Scout is Northeastern University's student-led design studio. The Studio has about 45 members selected via interview and application processes to select the university's best talent. Each semester the studio produces design and development assets for four ventures. Check out our [portfolio](https://web.northeastern.edu/scout/portfolio) for some past projects!
