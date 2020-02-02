import React from 'react';
import '../styles/common.scss';
import Aside from './Aside';
import Header from './Header';
import Counter from './Counter';

class App extends React.Component {
  componentDidMount() {
    console.log('DiDMount');
  }

  state = {
    visible: false,
    IScroll: null,
  };

  handleToggleControl = () => {
    this.setState({
      visible: !this.state.visible,
    });
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
          <Counter />
        </section>
      </div>
    );
  }
}

export default App;
