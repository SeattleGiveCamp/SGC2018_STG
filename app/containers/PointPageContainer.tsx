import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { RouterStore } from 'mobx-router';
import YouTube from 'react-youtube';
import { Button } from 'react-bootstrap';

import routes from '../routes';
import DataStore from '../stores/DataStore';

interface Props {
	store?: RouterStore;
	data?: DataStore;
}

interface State {
	showPoints: boolean;
}

@inject('store', 'data')
@observer
class PointPageContainer extends React.Component<Props, State> {

	constructor(props) {
		super(props);

		this.state = {
			showPoints: false,
		};
	}

	componentDidMount() {
		this.props.data.loadMissionById(this.props.store.router.params.id);
	}

	onVideoEnd = () => {
		this.setState({ showPoints: true });
	}

	renderPoints() {
		if (this.state.showPoints) {
			return (
				<h3>You earned 5 points!</h3>
			);
		} else {
			return <h3>&nbsp;</h3>;
		}
	}

	onBackClick = () => {
		this.props.store.router.goTo(routes.home);
	}

	render() {
		const mission = this.props.data.currentMission;

		if (!mission) {
			return (
				<p />
			);
		}

		return (
			<div style={{ textAlign: 'center' }}>
				<h1>{mission.TaskName}</h1>
				<YouTube
					videoId="iRNzgF9M6iY"
					opts={{
						width: '100%',
						playerVars: {
							controls: 0,
							modestbranding: 1,
						},
					}}
					onEnd={this.onVideoEnd}
				/>
				{this.renderPoints()}
				<br /><br />
				<p>
					<Button
						bsStyle="primary"
						onClick={this.onBackClick}
					>
						Back to Home
					</Button>
				</p>
			</div>
		);
	}
}

export default PointPageContainer;