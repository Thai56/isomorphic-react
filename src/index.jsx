import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import getStore from './getStore';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

const store = getStore(history);

const fetchDataForLocation = () => {
  store.dispatch({ type: 'REQUEST_FETCH_QUESTIONS' });
};

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

const render = (_App) => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <_App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('AppContainer'),
  );
};

// render(App);
store.subscribe(() => {
  const state = store.getState();
  if (state.questions.length > 0) {
    console.info('Mounting app');
    render(App);
  } else {
    console.log('app has not mounted yet');
  }
});
fetchDataForLocation();
