import React from 'react';

class Aside extends React.Component {
  render() {
    const { currentState, onCreateHide } = this.props;

    // onSubPageShow = () => {

    // };

    return (
      <div className={currentState.visible === true ? 'aside active' : 'aside'}>
        <ul className="aside_ctg">
          <li>
            <button type="button" /*onClick={this.onSubPageShow}*/>
              Button
            </button>
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
