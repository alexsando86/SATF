import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        visible: false,
    }

    handleVisible = () => {
        this.setState( {
            visible : true
        })
    }

    render() {
        console.log(this.state.visible)
        return(
            <header className="header">
                <button type="button" className="btn_aside" onClick={ this.handleVisible }><span className="blind">메뉴</span></button>
            </header>
        )
    }
}

export default Header;