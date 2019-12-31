import React from 'react';

class Header extends React.Component {
    render() {
        const { showControls } = this.props;
        return(
            <header className="header">
                <button type="button" className="btn_aside" onClick={showControls}><span className="blind">메뉴</span></button>
            </header>
        )
    }
}

export default Header;