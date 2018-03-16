import React from 'react';
import { Route } from 'react-router-dom';

const PrismicRoute = props => {
  const { component: Component, componentProps, path, routerProps } = props;
  return (
    <Route
      path={path}
      render={routeProps => (
        <Component
          {...componentProps}
          {...routeProps}
          prismicCtx={routerProps.prismicCtx}
        />
      )}
    />
  );
};

export default PrismicRoute;
