import React from 'react';
import '../styles/common.scss';
import Aside from "./Aside";
import Header from "./Header";

class App extends React.Component {

    state = {
        visible: false,
        IScroll : null,
    };

    handleToggleControl = () => {
        this.setState({
            visible: !this.state.visible,
        })
    };
    render() {
        return(
            <div className="App">
                <Header onCreateShow={this.handleToggleControl} />
                <section className="container">
                    <Aside currentState={this.state} onCreateHide={this.handleToggleControl} />
                </section>
            </div>
        )
    }
}

export default App;
