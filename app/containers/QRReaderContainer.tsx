import * as React from 'react';
import { observer, inject } from 'mobx-react';
import QRScanner from '../components/QRScanner';
import { Link, RouterStore } from 'mobx-router';
import routes from '../routes';
import './Login.css'

//import { ReactCSSTransitionGroup } from 'react-transition-group' // ES6
//var ReactCSSTransitionGroup = require('react-transition-group'); // ES5 with npm

interface State {
  displayQrData: string;
  redirectId: string;
  fading: boolean;
  msg: string;
}
interface Props {
	store?: RouterStore;
}

@inject('store')
@observer
class App extends React.Component<Props, State> {

    private camera;
    private img;
    private src;
    private timer;
    
  constructor(props) {
    super(props);

    this.state = {
      displayQrData: null,
      redirectId: null,
      fading: false,
      msg: null
		};
  }

  readQR(retrievedQrData) {
    //console.log(retrievedQrData);
    
      if (this.state.displayQrData == null || this.state.displayQrData != retrievedQrData)
      {
        if (retrievedQrData != null)
        {
          this.setState({ displayQrData: retrievedQrData });

          if (retrievedQrData.indexOf("stgpresents.org") < 0)
          {
            this.showError("Sorry, this isn't an STG code.");
            return;
          }

          //Extract the ID.
          var queryStringParameterName = "appcontent=";
          var indexOfID = retrievedQrData.indexOf(queryStringParameterName);
          if (indexOfID >= 0)
          {
            var justTheID = retrievedQrData.substring(indexOfID + (queryStringParameterName.length));
            if(justTheID != null){
              this.props.store.router.goTo(routes.pointpage,{id:justTheID});
            }
          }
         //this.props.store.router.goTo(routes.pointpage,{id:'abc'}); 
        } 
      }
      else //
      {
        
      }
    

  }

 showError(message) {
    // // in some handler code
    // this.setState({fading: true}); // fade out
    // this.timer = setTimeout(_ => {
    //   this.setState({msg: message}); // swap the text
    //   this.setState({fading: false, msg: ""}); // fade back in
    // }, 3000); // animation timing offset

    this.setState({msg: message});
 }

  render() {

    const {msg, fading} = this.state;

    return (
      <div className="App">
        <header className="App-header">
         
          <h1>
           STG - Scan your QR Code
          </h1>
          <div>
            <QRScanner width={456} height={456} completed={this.readQR.bind(this)}/>
          </div>
          <div>
             {this.state.displayQrData}
          </div>
          <div>
             ID: {this.state.redirectId}
          </div>
          
          {/* <ReactCSSTransitionGroup
            transitionName="errorSection"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}
            transitionLeaveTimeout={2500}>
            <h4>{this.state.msg}</h4>
          </ReactCSSTransitionGroup> */}
          
          {/* AUBREY FIX THIS KTHX  */}
          <span id="error" color="red" className="errorLabel">{this.state.msg}</span>
          <a
            className="App-link"
            href="https://www.stgpresents.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            STG
          </a>
        </header>
      </div>
    );
  }

  
}

const style = {
  preview: {
    position: 'relative',
  },
  captureContainer: {
    display: 'flex',
    //position: 'absolute',
    justifyContent: 'center',
    zIndex: 1,
    bottom: 0,
    width: '100%'
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: '50%',
    height: 56,
    width: 56,
    color: '#000',
    margin: 20
  },
  captureImage: {
    width: '100%',
  }
};

export default App;
