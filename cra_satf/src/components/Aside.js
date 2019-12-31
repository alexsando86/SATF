import React from 'react';

class Aside extends React.Component {
    render() {
        const { currentState, hideContols } = this.props;
        return(
            <div className={currentState === true ? 'aside active' : 'aside' }>
                <ul className="aside_ctg">
                    <li>Button</li>
                    <li>Loading</li>
                    <li>Festival</li>
                    <li>Snow</li>
                </ul>
                <button type="button" className="aside_close" onClick={hideContols}><span className="blind">닫기</span></button>
            </div>
        )
    }
}

export default Aside;