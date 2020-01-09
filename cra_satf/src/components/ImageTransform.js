import React from 'react';
import { gsap } from 'gsap';

class ImageTransform extends React.Component {
  constructor(props) {
    super(props);
    this.rectRef = React.createRef();
  }

  onBackgroundChg = () => {
    gsap.to(this.rectRef.current, {
      duration: 3,
      backgroundColor: '#ff687a',
    });
  };
  render() {
    return (
      <section class="test_conts">
        <div className="rect_test" ref={this.rectRef}></div>
        <button
          type="button"
          className="btn_test"
          onClick={this.onBackgroundChg}
        >
          Background Change
        </button>
      </section>
    );
  }
}

export default ImageTransform;
