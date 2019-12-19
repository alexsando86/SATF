import React from 'react';
import '../styles/common.scss';
import Aside from "./Aside";
import Header from "./Header";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="App">
                <Header />
                <section className="container">
                    <Aside />
                </section>
            </div>
        )
    }
}

export default App;
