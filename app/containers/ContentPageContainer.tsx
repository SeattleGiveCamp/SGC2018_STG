import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { RouterStore } from 'mobx-router';
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
				<h1>{mission.MissionName}</h1>
				<img
					width='100%'
					src={mission.img_url}
				/>
				<p>{mission.TaskDescription}</p>
				<p>Total Points: {mission.TotalPoints}</p>
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