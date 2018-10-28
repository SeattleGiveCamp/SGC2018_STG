import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { RouterStore } from 'mobx-router';
import * as tempCircle from '../images/circle.jpeg'; /*QRCircle supposed to be here later*/
import './Landmark.css';

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

		const textTask = mission.tasks.find(task => task.ContentType === 'txt') || {};

		return (
			<div>
				<div id='headline' style={{ width: "100%" }}>
					<h1 style={{ fontSize: '40px' }}>{mission.MissionName}</h1>
				</div>
				<div id ="imgMission">
						<a>
							<img src={mission.img_url} alt="Image"/>
						</a>
				</div>
				<div id="summaryBox" style={{ width: "100%" }}>
					<h4>{textTask.TaskName}</h4>
					<p>{textTask.TaskDescription}</p>
				</div>
				<a id = "circleTemp">
						<img src = {tempCircle} id = "circleTemp" alt = "Image" onClick={this.onScanClick}/>
				</a>
				<svg>
					<polygon fill= '#ffffcc' points="0,50 430,0 430,50"/>
				</svg>
			</div>
		);
	}
}

export default ContentPageContainer;