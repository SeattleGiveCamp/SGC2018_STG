import * as React from 'react';
import { observer } from 'mobx-react';

@observer
class HomeContainer extends React.Component<{}, {}> {

	render() {
		return (
			<h1>STG Scavenger Hunt Game Goes Here</h1>
		);
	}
}

export default HomeContainer;