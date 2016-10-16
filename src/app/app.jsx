(function () {
  let React = require('react/addons');
  let injectTapEventPlugin = require('react-tap-event-plugin');
  let Fluxible = require('fluxible');
  let ProductAPI = require('./api/productAPI');

  let Router = require('react-router');
  let { DefaultRoute, Link, Route, RouteHandler, Redirect, NotFoundRoute } = Router;

  let Main = require('./components/main.jsx');
  let NotFound = require('./components/notFound.jsx');
  let Generate= require('./components/login.jsx');

  //Needed for React Developer Tools
  window.React = React;

  //Needed for onTouchTap
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
  injectTapEventPlugin();

    let AppRoutes = (
    <Route name="root" path="/" handler={Main}>
      <Route name="generate" path="generate" handler={Generate} />
      <Redirect from="/" to="generate" />
      <NotFoundRoute handler={NotFound} />
    </Route>
  );

  Router.create({
      routes: AppRoutes,
      scrollBehavior: Router.ScrollToTopBehavior
    }).run(function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
  });

})();
