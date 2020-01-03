import React from 'react';
import '../styles/common.scss';
import Aside from "./Aside";
import Header from "./Header";
import IScroll from "iscroll";

class App extends React.Component {
    
    componentDidMount() {
        //    첫렌더링 성공시 실행
        console.log('성공');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //    리렌더링
        let asideIScroll = null;
        if ( prevState.visible === true ) {
            console.log('닫기', this.state.IScroll);
            // this.state.IScroll.destroy();
            this.setState({
                IScroll : null
            })
        } else {
            const aside = document.querySelector('.aside');
            this.setState({
                IScroll : new IScroll(aside, {

                })
            })
        }
        
    }

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
