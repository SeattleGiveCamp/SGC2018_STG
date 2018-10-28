import * as React from 'react';
import { MobxRouter } from 'mobx-router';
import { injectGlobal } from 'styled-components';

injectGlobal`
	html {
		padding: 0;
		margin: 0;
	}
	
`;

class App extends React.Component<{}, {}> {

	render() {
		return (
			<MobxRouter />
		);
	}
}

export default App;