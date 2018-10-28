import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Link, RouterStore } from 'mobx-router';
import { Button } from 'react-bootstrap';

import routes from '../routes';
import DataStore from '../stores/DataStore';

interface Props {
	store?: RouterStore;
	data?: DataStore;
}

@inject('store', 'data')
@observer
class ContentPageContainer extends React.Component<Props, {}> {

	componentDidMount() {
		this.props.data.loadMissionById(this.props.store.router.params.id);
	}

	onScanClick = () => {
		this.props.store.router.goTo(routes.qrreader);
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
				<iframe
					width='100%'
					height='400px'
					src={mission.content_url}
				/>
				<p>{mission.TaskDescription}</p>
				<p>Reward: {mission.Points} points</p>
				<p>
					<Button
						bsStyle="primary"
						onClick={this.onScanClick}
					>
						Scan QR Code
					</Button>
				</p>
			</div>
		);
	}
}

export default ContentPageContainer;