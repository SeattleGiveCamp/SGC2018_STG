import * as React from 'react';
import { Route } from 'mobx-router';

import HomeContainer from './containers/HomeContainer';
import QRReaderContainer from './containers/QRReaderContainer';
import CameraContainer from './containers/CameraContainer';

const routes = {

	home: new Route({
		path: '/',
		component: <HomeContainer />,
	}),
	qrreader: new Route({
		path: '/qrreader',
		component: <QRReaderContainer />,
	}),
	camera:  new Route({
		path: '/camera',
		component: <CameraContainer />,
	})
};

export default routes;