import React from 'react';
import '../styles/common.scss';
import Aside from './Aside';
import Header from './Header';
import ImageTransform from './ImageTransform';
import { gsap } from 'gsap';

class App extends React.Component {
  state = {
    visible: false,
  };

  constructor(props) {
    super(props);
    this.circleRef = React.createRef();
  }

  componentDidMount() {
    gsap.to(this.circleRef.current, {
      rotation: 360,
      duration: 1,
      backgroundColor: 'red',
    });
  }

  handleToggleControl = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };
  style = {
    border: '1px solid #000',
    borderRadius: '20px',
    width: '100px',
    height: '100px',
    margin: 'auto',
  };
  render() {
    return (
      <div className="App">
        <Header onCreateShow={this.handleToggleControl} />
        <section className="container">
          <Aside
            currentState={this.state}
            onCreateHide={this.handleToggleControl}
          />
          <div ref={this.circleRef} style={this.style}>
            11
          </div>
          <ImageTransform />
        </section>
      </div>
    );
  }
}

export default App;
