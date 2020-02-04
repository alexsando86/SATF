import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class Aside extends React.Component {
  render() {
    const on = 'on';
    const { currentState, onCreateHide } = this.props;
    let aside = React.createRef();

    return (
      <div
        ref={aside}
        className={currentState.visible === true ? 'aside active' : 'aside'}
      >
        <ul className="aside_ctg">
          <li>
            <Link to="/ButtonComp" onClick={onCreateHide}>
              Button
            </Link>
          </li>
          {/* <li><Link to="/CounterComp">Counter</Link></li> */}
          <li>
            <NavLink
              to="/CounterComp"
              activeClassName={on}
              onClick={onCreateHide}
            >
              Counter
            </NavLink>
          </li>
          <li>Loading</li>
          <li>Festival</li>
          <li>Snow</li>
          <li>Button</li>
          <li>Loading</li>
          <li>Festival</li>
          <li>Snow</li>
          <li>Button</li>
          <li>Loading</li>
          <li>Festival</li>
          <li>Snow</li>
          <li>Button</li>
          <li>Loading</li>
          <li>Festival</li>
          <li>Snow</li>
          <li>Button</li>
          <li>Loading</li>
          <li>Festival</li>
          <li>Snow</li>
          <li>Button</li>
          <li>Loading</li>
          <li>Festival</li>
          <li>Snow</li>
          <li>Button</li>
          <li>Loading</li>
          <li>Festival</li>
          <li>Snow</li>
          <li>Button</li>
          <li>Loading</li>
          <li>Festival</li>
          <li>Snow</li>
          <li>Button</li>
          <li>Loading</li>
          <li>Festival</li>
          <li>Snow</li>
        </ul>
        <button type="button" className="aside_close" onClick={onCreateHide}>
          <span className="blind">닫기</span>
        </button>
      </div>
    );
  }
}

export default Aside;
