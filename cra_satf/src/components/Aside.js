import React from 'react';

class Aside extends React.Component {
    render() {
        return(
            <div className={this.props.currentState === true ? 'aside active' : 'aside' }>
                <ul className="aside_ctg">
                    <li>Button</li>
                    <li>Loading</li>
                    <li>Festival</li>
                    <li>Snow</li>
                </ul>
                <button type="button" className="aside_close" onClick={this.props.hideContols}><span className="blind">닫기</span></button>
            </div>
        )
    }
}

export default Aside;