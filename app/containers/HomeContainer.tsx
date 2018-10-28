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

		const missionMap = ({missions}) => (
			<div>
				{missions.map(mission => (
					<div className="col-sm-4" key={mission.MissionID}>{mission.MissionID}
						<p key={mission.MissionID}>{mission.MissionID}</p>
						<img onClick={()=>this.handleContent("abc")} width="100%" src={mission.img_url} alt="Image" key={mission.img_url}/>
						<p key={mission.MissionID}>{</p>
					</div>
				))

				}
			</div>
		);
		return (
			<div>
				<h1>STG Scavenger Hunt Game Goes Here</h1>
				 
				<div className="container-fluid bg-3 text-center"> 
  					<h3>Where To Find Me?</h3>
  					<div className="row">
    					<div className="col-sm-4" id="111">
      						<p>Lorem ipsum..</p>
      						<img onClick={()=> this.handleContent("abc")} width="100%" src={art} alt="Image"/>
    					</div>
    					<div className="col-sm-4" id="222">
      						<p>Lorem ipsum..</p>
      						<img onClick={()=> this.handleContent("222")} width="100%" src={music} alt="Image"/>
    					</div>
    					<div className="col-sm-4" id="333"> 
      						<p>Lorem ipsum..</p>
      						<img onClick={() => this.handleContent("333")} width="100%" src={history} alt="Image"/>
    					</div>
  					</div>
				</div>
			</div>
			
		);
	}
}

export default HomeContainer;