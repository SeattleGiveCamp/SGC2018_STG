import * as React from 'react';
import { Route } from 'mobx-router';

import HomeContainer from './containers/HomeContainer';
import QRReaderContainer from './containers/QRReaderContainer';

const routes = {

	home: new Route({
		path: '/',
		component: <HomeContainer />,
	}),
	qrreader: new Route({
		path: '/qrreader',
		component: <QRReaderContainer />,
	})

};

export default routes;