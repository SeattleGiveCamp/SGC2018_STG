import * as React from 'react';
import { observer } from 'mobx-react';
import * as art from '../images/art.jpeg';
import * as music from '../images/music.jpeg';
import * as history from '../images/history.jpeg';
@observer
class HomeContainer extends React.Component<{}, {}> {

	render() {
		return (
			<div>
				<h1>STG Scavenger Hunt Game Goes Here</h1>
				 
				<div className="container-fluid bg-3 text-center"> 
  					<h3>Where To Find Me?</h3>
  					<div className="row">
    					<div className="col-sm-4">
      						<p>Lorem ipsum..</p>
      						<img width="100%" src={art} alt="Image"/>
    					</div>
    					<div className="col-sm-4">
      						<p>Lorem ipsum..</p>
      						<img width="100%" src={music} alt="Image"/>
    					</div>
    					<div className="col-sm-4"> 
      						<p>Lorem ipsum..</p>
      						<img width="100%" src={history} alt="Image"/>
    					</div>
  					</div>
				</div>
			</div>
			
		);
	}
}

export default HomeContainer;