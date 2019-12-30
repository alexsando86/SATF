import React from 'react';
import '../styles/common.scss';
import Aside from "./Aside";
import Header from "./Header";

class App extends React.Component {
    state = {
        visible: false,
    };

    displayToggleControl = () => {
        this.setState({
            visible: !this.state.visible,
        })
    };

    render() {
        return(
            <div className="App">
                <Header showControls={this.displayToggleControl} />
                <section className="container">
                    <Aside currentState={this.state.visible} hideContols={this.displayToggleControl}/>
                </section>
            </div>
        )
    }
}

export default App;
