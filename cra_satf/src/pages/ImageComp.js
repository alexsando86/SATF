import React from 'react';
import { gsap } from 'gsap';

class ImageComp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  fnImageSliceChg = () => {
    const tl = gsap.timeline();
    tl.staggerTo('.uncover_slice', 1, { height: '0px' }, 0.2);
    gsap.to('.sample_img', 1, { scale: 1.2 });
  };

  render() {
    return (
      <section className="imageContent">
        <div className="img_wrap">
          <div className="img_container">
            <img
              className="sample_img fill"
              src="https://images.unsplash.com/photo-1530157283576-64ccf368b02f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=12af955d5a302067df0be69a3828e3a2&auto=format&fit=crop&w=1534&q=80"
              alt=""
            />
            <div className="uncover">
              <div className="uncover_slice"></div>
              <div className="uncover_slice"></div>
              <div className="uncover_slice"></div>
            </div>
          </div>
          <div className="btn_act_wrap">
            <button
              type="button"
              className="btn_act act_slice"
              onClick={this.fnImageSliceChg}
            >
              Start Action 1
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default ImageComp;
