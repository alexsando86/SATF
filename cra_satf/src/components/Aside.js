import React from 'react';

class Aside extends React.Component {
    render() {
        const { currentState, onCreateHide } = this.props;
        return(
            <div className={currentState.visible === true ? 'aside active' : 'aside' }>
                <ul className="aside_ctg">
                    <li>Button</li>
                    <li>Loading</li>
                    <li>Festival</li>
                    <li>Snow</li>
                </ul>
                <button type="button" className="aside_close" onClick={onCreateHide}><span className="blind">닫기</span></button>
            </div>
        )
    }
}

export default Aside;