import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Link, RouterStore } from 'mobx-router';
import YouTube from 'react-youtube';

import routes from '../routes';

interface Props {
	store?: RouterStore;
}

interface State {
	showPoints: boolean;
}

@inject('store')
@observer
class PointPageContainer extends React.Component<Props, State> {

	constructor(props) {
		super(props);

		this.state = {
			showPoints: false,
		};
	}

	onVideoEnd = () => {
		this.setState({ showPoints: true });
	}

	renderVideoOrPoints() {
		if (!this.state.showPoints) {
			return (
				<YouTube
					videoId="iRNzgF9M6iY"
					opts={{
						width: '80%',
					}}
					onEnd={this.onVideoEnd}
				/>
			);
		} else {
			return (
				<h2>You earned 5 points!</h2>
			);
		}
	}

	render() {

		return (
			<div style={{ textAlign: 'center' }}>
				<h1>Points Page</h1>
				{this.renderVideoOrPoints()}
				<p>
					<Link
						view={routes.home}
						store={this.props.store}
					>
						Back to Home
					</Link>
				</p>
			</div>
		);
	}
}

export default PointPageContainer;