import React from 'react';
import '../styles/common.scss';
import Aside from "./Aside";
import Header from "./Header";

class App extends React.Component {
    state = {
        visible: false,
    }

    showControl = () => {
        this.setState({
            visible: true,
        })
    }
    hideControl = () => {
        this.setState({
            visible: false,
        })
    }

    render() {
        return(
            <div className="App">
                <Header showControls={this.showControl} />
                <section className="container">
                    <Aside currentState={this.state.visible} hideContols={this.hideControl}/>
                </section>
            </div>
        )
    }
}

export default App;
