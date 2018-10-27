import * as React from 'react';
import { Route } from 'mobx-router';

import HomeContainer from './containers/HomeContainer';

const routes = {

	home: new Route({
		path: '/',
		component: <HomeContainer />,
	})

};

export default routes;