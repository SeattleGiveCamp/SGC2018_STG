import * as React from 'react';
import { observer, inject} from 'mobx-react';
import * as art from '../images/art.jpeg';
import * as music from '../images/music.jpeg';
import * as history from '../images/history.jpeg';

import { RouterStore } from 'mobx-router';

import routes from '../routes';
import DataStore from '../stores/DataStore';
import { checkIfStateModificationsAreAllowed } from 'mobx/lib/core/derivation';

interface Props {
	store?: RouterStore;
	data?: DataStore;
}

@inject('store', 'data')
@observer
class HomeContainer extends React.Component<Props, {}> {
	
	handleContent(idNumber:string){
		event.preventDefault();
		let contentPage:string = "/content/";
		window.location.href = contentPage.concat(idNumber);
		console.log("checking");
	}

	componentDidMount() {
		this.props.data.loadMissions();
	}


	render() {
		const missions = this.props.data.missions;

		const missionMap = missions.map(mission => (
					<div className="col-sm-4" key={mission.MissionID}>
						<p key={mission.MissionID}>{mission.MissionName}</p>
						<img onClick={()=>this.handleContent(mission.MissionID)} width="100%" src={mission.img_url} alt="Image" key={mission.MissionID}/>
					</div>
				))
		
		
		return (
			<div>
				<h1>STG Scavenger Hunt Game Goes Here</h1>
				 
				<div className="container-fluid bg-3 text-center"> 
  					<h3>Where To Find Me?</h3>
  					<div className="row">
    					{missionMap}
  					</div>
				</div>
			</div>
			
		);
	}
}

export default HomeContainer;