import React from 'react';
import { gsap } from 'gsap';
// import tweenmax from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.2/TweenMax.min.js';

class ButtonComp extends React.Component {
  constructor(props) {
    super(props);
    this.rectRef = React.createRef();
    this.btntRef = React.createRef();
  }

  componentDidMount() {
    this.tl = gsap
      .to(this.btntRef.current, {
        duration: 0.5,
        backgroundColor: '#ff5498',
        rotation: 360,
        color: '#fff',
        border: 'none',
      })
      .reverse();
  }

  onBackgroundChg = () => {
    gsap.to(this.rectRef.current, {
      duration: 3,
      backgroundColor: '#ff687a',
    });
  };

  onClickButton = () => {
    this.tl.reversed(!this.tl.reversed());
  };
  render() {
    return (
      <section className="test_conts">
        <div className="rect_test" ref={this.rectRef}></div>
        <button
          type="button"
          className="btn_test"
          onClick={this.onBackgroundChg}
        >
          Background Change
        </button>

        <button
          type="button"
          className="btn ty_btn1"
          ref={this.btntRef}
          onClick={this.onClickButton}
        >
          ♡
        </button>
      </section>
    );
  }
}

export default ButtonComp;
