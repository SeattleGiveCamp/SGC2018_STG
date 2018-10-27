import * as React from 'react';
import { Route } from 'mobx-router';
import Login from "./containers/Login";

import HomeContainer from './containers/HomeContainer';
import QRReaderContainer from './containers/QRReaderContainer';

const routes = {

	home: new Route({
		path: '/home',
		component: <HomeContainer />,
	}),
	login: new Route({
		path: '/',
		component: <Login />,
	}),
	qrreader: new Route({
		path: '/qrreader',
		component: <QRReaderContainer />,
	})

};

export default routes;