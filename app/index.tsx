import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouterStore, startRouter } from 'mobx-router';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import routes from './routes';
import DataStore from './stores/DataStore';

// This is for Mobx. It requires that all updates to data in the mobx store must be done inside an action.
// This is recommended as it ensures you don't accidentally change data from another location that you don't want it to change from.
useStrict(true);

// Configure the Mobx stores and mobx-router store
const routerStore = {
	router: new RouterStore(),
};

const dataStore = new DataStore();

const renderApp = (root: Element, AppComponent: React.ComponentClass) => {
	ReactDOM.render((
		<Provider
			store={routerStore}
			data={dataStore}
		>
			<AppComponent />
		</Provider>
	), root);
};

startRouter(routes, routerStore);

const rootEl = document.getElementById('root');
renderApp(rootEl, App);

// This is only used for development. It will automatically refresh your page when you change and save any file.
if (module.hot) {
	module.hot.accept('./App', function () {
		const NewApp = require('./App');

		renderApp(rootEl, NewApp);
	});
}