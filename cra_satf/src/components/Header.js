import React from 'react';

class Header extends React.Component {
  render() {
    const { onCreateShow } = this.props;
    return (
      <header className="header_top">
        <div className="btn_menu">
          <button type="button" className="btn_aside" onClick={onCreateShow}>
            <span className="blind">메뉴</span>
          </button>
          <h2>Ssg Animation Index</h2>
        </div>
      </header>
    );
  }
}

export default Header;
