import * as React from 'react';
import { MobxRouter } from 'mobx-router';
import { injectGlobal } from 'styled-components';

injectGlobal``;

class App extends React.Component<{}, {}> {

	render() {
		return (
			<MobxRouter />
		);
	}
}

export default App;