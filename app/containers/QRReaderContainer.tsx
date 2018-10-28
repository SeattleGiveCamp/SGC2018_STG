import * as React from 'react';
import { observer } from 'mobx-react';
import QRScanner from '../components/QRScanner';

interface State {
  displayQrData: string;
  redirectId: string;
}

@observer
class App extends React.Component<{}, State> {

    private camera;
    private img;
    private src;
    
  constructor(props) {
    super(props);

    this.state = {
      displayQrData: null,
      redirectId: null
		};
  }

  readQR(retrievedQrData) {
    //console.log(retrievedQrData);
    
      if (this.state.displayQrData == null || this.state.displayQrData != retrievedQrData)
      {
        if (retrievedQrData != null)
        {
          this.setState({ displayQrData: retrievedQrData });

          //Extract the ID.
          var indexOfID = retrievedQrData.indexOf("id=");
          if (indexOfID >= 0)
          {
            var justTheID = retrievedQrData.substring(indexOfID + 3);
            this.setState({ redirectId: justTheID});
          }
        }
      }
  }


  render() {
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
