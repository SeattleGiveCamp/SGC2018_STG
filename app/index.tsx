import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouterStore, startRouter } from 'mobx-router';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';

import App from './App';
import routes from './routes';
import QrCodeStore from './stores/QrCodeStore';

useStrict(true);
const routerStore = {
	router: new RouterStore(),
};

const qrCodeStore = new QrCodeStore();

const renderApp = (root: Element, AppComponent: React.ComponentClass) => {
	ReactDOM.render((
		<Provider
			store={routerStore}
			qrcode={qrCodeStore}
		>
			<AppComponent />
		</Provider>
	), root);
};

startRouter(routes, routerStore);

const rootEl = document.getElementById('root');
renderApp(rootEl, App);

if (module.hot) {
	module.hot.accept('./App', function () {
		const NewApp = require('./App');

		renderApp(rootEl, NewApp);
	});
}