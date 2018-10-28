import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { RouterStore } from 'mobx-router';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import DataStore from '../stores/DataStore';

const AnyReactComponent = ({ text }) => (
    <div style={{
      color: 'white', 
      background: 'grey',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}>
      {text}
    </div>
  );

  interface Props {
	store?: RouterStore;
	data?: DataStore;
}


interface State {
	markers: any;
}

  
@inject('store', 'data')
@observer
class MapContainer extends React.Component<Props, State> {

    constructor(props) {
        super(props);
    
    
      }

      componentDidMount() {
		this.props.data.loadMissions();
		this.props.data.getUserPoints("6");
	}

    
    handleContent(idNumber:string){
		event.preventDefault();
		let contentPage:string = "/content/";
		window.location.href = contentPage.concat(idNumber);
		console.log("checking");
	}

  
    render() {
		const points = this.props.data.points;
      const position = [47.6133, -122.3313];
      const zoom = 13;
      const missions = this.props.data.missions;
      const missionMap = missions.map(mission => (
        <div className="col-xs-2" key={mission.MissionID}>
            
            <img object-fit="cover" width="100px" height="100px" className="img-responsive" onClick={()=>this.handleContent(mission.MissionID)} src={mission.img_url} alt="Image" key={mission.MissionID}/>
            <figcaption>{mission.MissionName}</figcaption>
        </div>
    ));

        console.log(missions);
      return (
          <div>
     <h1>STG Scavenger Hunt Game</h1>
     <h3>Total Points: {points}</h3>
        <Map center={position} zoom={zoom} >
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {missions.map((mission, idx) => 
          <Marker key={`marker-${idx}`} position={mission.tasks[0].Location.split(',')}>
          <Popup>
            <h3>{mission.MissionName}</h3>
            <br/>
            <img object-fit="cover" width="100px" height="100px" className="img-responsive" onClick={()=>this.handleContent(mission.MissionID)} src={mission.img_url} alt="Image" key={mission.MissionID}/>
            
          </Popup>
        </Marker>
        )}
      </Map>

      <div>
				

				
				 
				<div className="container-fluid bg-3 text-center"> 
  					
  					<div className="row">
    					{missionMap}
  					</div>
				</div>
			</div>

      </div>
      );
    }
  }

  export default MapContainer;