import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { RouterStore } from 'mobx-router';
import { Button } from 'react-bootstrap';
import * as hammerMan from '../images/Hammering-Man-Small.jpeg';
import * as tempCircle from '../images/circle.jpeg';/*QRCircle supposed to be here later*/
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
                <div id = 'headline'>
                    <nav>test</nav>
                    <h1>MPOP</h1>
                </div>
                   
                <div id ="imgMission">
                    <a>
                    <img  src={mission.img_url} alt="Image"/>
                    </a>
                </div>
                <div id = "summaryBox">
                    <h4>Architectural Expression</h4>
					<p>{textTask.TaskDescription}</p>
                </div>
                <a id = "circleTemp">
                    <img src = {tempCircle} id = "circleTemp" alt = "Image"/>
                </a>
				<svg>						
					<polygon fill= '#ffffcc' points="0,50 430,0 430,50"/>
					
				</svg>
				
                
			</div>
			/*
			
			OLD CODE KEPT IF NEEDED
			Example code of acessing database for reference

			fill = '#ffffcc'
			<div style={{ textAlign: 'center' }}>
				<h1>{mission.MissionName}</h1>
				<p>Total Points: {mission.TotalPoints}</p>
				<img
					width='100%'
					src={mission.img_url}
				/>
				<p>{textTask.content_url}</p>
				<h4>{textTask.TaskName}</h4>
				<p>{textTask.TaskDescription}</p>
				<p>
					<Button
						bsStyle="primary"
						onClick={this.onScanClick}
					>
						Scan QR Code
					</Button>
					&nbsp;&nbsp;
					<Button
						bsStyle="primary"
						onClick={this.onBackClick}
					>
						Back to Home
					</Button>
				</p>
			</div>*/
		);
	}
}

export default ContentPageContainer;