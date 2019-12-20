import React from 'react';

class Header extends React.Component {
    render() {
        return(
            <header className="header">
                <button type="button" className="btn_aside" onClick={this.props.showControls}><span className="blind">메뉴</span></button>
            </header>
        )
    }
}

export default Header;