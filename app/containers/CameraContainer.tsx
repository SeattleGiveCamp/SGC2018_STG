import * as React from 'react';
import { observer } from 'mobx-react';
import Camera from 'react-camera';

@observer
class App extends React.Component<{}, {}> {

    private camera;
    private img;
    private src;

  constructor(props) {
    super(props);
    this.takePicture = this.takePicture.bind(this);
  }

  takePicture() {
    this.camera.capture()
    .then(blob => {
      this.img.src = URL.createObjectURL(blob);
      this.img.onload = () => { URL.revokeObjectURL(this.src); }
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
         
          <p>
           STG: Awesome QR Code reader coming soon
          </p>
          <div>
        <Camera
          style={style.preview}
          ref={(cam) => {
            this.camera = cam;
          }}
        >
          <div style={style.captureContainer} onClick={this.takePicture}>
            <div style={style.captureButton} />
          </div>
        </Camera>
        <img
          style={style.captureImage}
          ref={(img) => {
            this.img = img;
          }}
        />
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
