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
		this.props.data.getUserPoints("6");
	}


	render() {
		const missions = this.props.data.missions;
		const points = this.props.data.points;
		const missionMap = missions.map(mission => (
					<div className="col-xs-2" key={mission.MissionID}>
						
						<img object-fit="cover" width="100px" height="100px" className="img-responsive" onClick={()=>this.handleContent(mission.MissionID)} src={mission.img_url} alt="Image" key={mission.MissionID}/>
						<figcaption>{mission.MissionName}</figcaption>
					</div>
				))
		
			
		return (
			<div>
				<h1>STG Scavenger Hunt Game Goes Here</h1>

				<h3>Total Points: </h3><h3>{points}</h3>
				 
				<div className="container-fluid bg-3 text-center"> 
  					
  					<div className="row">
    					{missionMap}
  					</div>
				</div>
			</div>
			
		);
	}
}

export default HomeContainer;