import * as React from 'react';
import { observer, inject } from 'mobx-react';
import QRScanner from '../components/QRScanner';
import { RouterStore } from 'mobx-router';
import routes from '../routes';

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

  constructor(props) {
    super(props);

    this.state = {
      displayQrData: null,
      redirectId: null,
      fading: false,
      msg: null,
		};
  }

  readQR(retrievedQrData) {
      if (this.state.displayQrData === null || this.state.displayQrData !== retrievedQrData) {
        if (retrievedQrData !== null) {
          this.setState({ displayQrData: retrievedQrData });

          if (retrievedQrData.indexOf("stgpresents.org") < 0) {
            this.showError("Sorry, this isn't an STG code.");
            return;
          }

          //Extract the ID.
          var queryStringParameterName = "appcontent=";
          var indexOfID = retrievedQrData.indexOf(queryStringParameterName);
          if (indexOfID >= 0) {
            var justTheID = retrievedQrData.substring(indexOfID + (queryStringParameterName.length));
            if (justTheID !== null) {
              this.props.store.router.goTo(routes.pointpage, { id: justTheID });
            }
          }
        }
      }
  }

 showError(message) {
    this.setState({msg: message});
 }

  render() {
    const {msg, fading} = this.state;

    return (
      <div className="qr_reader">
        <header className="App-header">
          <h1 className="center">
           STG - Scan your QR Code
          </h1>
          
          <div className="wrap">
            <QRScanner width={300} height={300} completed={this.readQR.bind(this)}/>
            <div className="instructions">
                <span id="error" className="errorLabel">{this.state.msg}</span>
                <div>Locate nearby STG poster</div>
                <div>Place inside the QR code inside area</div>
            </div>
        </div>
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
    width: '100%',
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: '50%',
    height: 56,
    width: 56,
    color: '#000',
    margin: 20,
  },
  captureImage: {
    width: '100%',
  },
};

export default App;
