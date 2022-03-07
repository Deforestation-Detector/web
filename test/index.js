if (module.hot) {
  const context = require.context('mocha-loader!./', false, /\.test.js$/);

  context.keys().forEach(context);
}
