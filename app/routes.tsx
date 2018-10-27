import * as React from 'react';
import { Route } from 'mobx-router';

import HomeContainer from './containers/HomeContainer';
import QRReaderContainer from './containers/QRReaderContainer';
import PointPageContainer from './containers/PointPageContainer';
import CameraContainer from './containers/CameraContainer';
import ContentPageContainer from './containers/ContentPageContainer';

const routes = {

	home: new Route({
		path: '/',
		component: <HomeContainer />,
	}),

	contentpage: new Route({
		path: '/content/:id',
		component: <ContentPageContainer />,
	}),

	qrreader: new Route({
		path: '/qrreader',
		component: <QRReaderContainer />,
	}),

	pointpage: new Route({
		path: '/points/:id',
		component: <PointPageContainer />,
	}),

	camera:  new Route({
		path: '/camera',
		component: <CameraContainer />,
	}),
};

export default routes;