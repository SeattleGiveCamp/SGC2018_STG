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
	alreadyDone: boolean;
	ended: boolean;
}

@inject('store', 'data')
@observer
class PointPageContainer extends React.Component<Props, State> {

	constructor(props) {
		super(props);

		this.state = {
			ended: false,
			showPoints: false,
			alreadyDone: false,
		};
	}

	componentDidMount() {
		this.props.data.loadMissionById(this.props.store.router.params.id);
	}

	onVideoEnd(taskId: string) {
		if (this.state.ended) {
			return;
		}

		this.setState({ ended: true });

		this.props.data.addPoints(6, taskId)
			.then(response => {
				const done = response.startsWith('Congratulations');

				this.setState({
					showPoints: done,
					alreadyDone: !done,
				});
			});
	}

	renderPoints(points: number) {
		if (this.state.showPoints) {
			return (
				<h4>You earned {points} points!</h4>
			);
		} else if (this.state.alreadyDone) {
			return (
				<h4>You already completed this task.</h4>
			);
		} else {
			return <h4>&nbsp;</h4>;
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

		const videoTask = mission.tasks.find(task => task.ContentType === 'vid');

		if (!videoTask) {
			return (
				<p>No video task found</p>
			);
		}

		return (
			<div style={{ textAlign: 'center' }}>
				<h1>{mission.MissionName}</h1>
				<h4>{videoTask.TaskName}</h4>
				<YouTube
					videoId={videoTask.content_url}
					opts={{
						width: '100%',
						playerVars: {
							controls: 1,
							modestbranding: 1,
						},
					}}
					onEnd={() => this.onVideoEnd(videoTask.TaskID)}
				/>
				<p>{videoTask.TaskDescription}</p>
				{this.renderPoints(videoTask.Points)}
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