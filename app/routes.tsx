import * as React from 'react';
import { Route } from 'mobx-router';
import Login from "./containers/Login";

import QRReaderContainer from './containers/QRReaderContainer';
import PointPageContainer from './containers/PointPageContainer';
import CameraContainer from './containers/CameraContainer';
import ContentPageContainer from './containers/ContentPageContainer';
import MapContainer from './containers/MapContainer';

// These are the URL routes for the web app. To add a new page you need to add a new route in here that matches the other routes.
// This uses mobx-router.
const routes = {
	home: new Route({
		path: '/home',
		component: <MapContainer />,
	}),

	login: new Route({
		path: '/',
		component: <Login />,
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

	map:  new Route({
		path: '/map',
		component: <MapContainer />,
	}),
};

export default routes;