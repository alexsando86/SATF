class saiSlide {
  constructor(el, opts) {
    this.DOM = {el: el};
    this._opts = opts || {};

    this.config = {
      saiSlSpeed: this._opts.saiSlSpeed || 800,
      saiSlDelay: this._opts.saiSlDelay || 3000,
      saiSlDuration: this._opts.saiSlDuration || 3,
      saiSlLoop: this._opts.saiSlLoop || true,
      saiGsapDuration: this._opts.saiGsapDuration || 1,
      saiGsapEase: this._opts.saiGsapEase || "ease", 
      saiGsapDelay: this._opts.saiGsapDelay || 0.05
    };

    this.init();
  }
  init() {
    this.assignElements();
    this.assignComponents();
    this.assignEventHandler();
  }
  assignElements() {
    this._swiperItem = this.DOM.el.querySelector(".swiper-slide");
    this._swiperPagination = this.DOM.el.querySelector(".slideshow-pagination");
    this._swiperNavigation = this.DOM.el.querySelector(".slideshow-navigation");
    this._swiperNavigationPrev = this.DOM.el.querySelector(".prev");
    this._swiperNavigationNext = this.DOM.el.querySelector(".next");
    this._swiperTitle = this.DOM.el.querySelectorAll('.slide-title');
    this._swiperTitle.forEach((slText, i) => {
      let _array = slText.textContent.split("");
      let _html = '';
      _array.forEach((txt) => {
        _html += '<span class="text">' + txt + '</span>';
      })
      slText.innerHTML = _html;
    });
  }
  assignComponents() {
    let self = this;
    this.saislide = new Swiper(this.DOM.el, {
      speed: this.config.saiSlSpeed,
      loop: this.config.saiSlLoop,
      preloadImages: true,
      updateOnImagesReady: true,
      autoplay: {
        delay: this.config.saiSlDelay,
        disableOnInteraction: false,
      },
      pagination: {
        duration: this.config.saiSlDuration,
      },
      navigation: {
        nextEl: this._swiperNavigationNext,
        prevEl: this._swiperNavigationPrev,
      },
      on: {
        init: function() {
          self.onMoveNext();
        },
      }
    });
  }
  assignEventHandler() {
    this.saislide.on('slideNextTransitionStart', () => this.onMoveNext());
    this.saislide.on('slidePrevTransitionStart', () => this.onMovePrev());
  }
  onMovePrev() {
    this.DOM.activeSlide = this.DOM.el.querySelector('.swiper-slide-active'),
    this.DOM.activeSlideImg = this.DOM.activeSlide.querySelector('.slide-image'),
    this.DOM.activeSlideTitle = this.DOM.activeSlide.querySelector('.slide-title'),
    this.DOM.activeSlideTitleLetters = [].slice.call(this.DOM.activeSlideTitle.querySelectorAll('span')).reverse();
    this.DOM.oldSlide = this.DOM.el.querySelector('.swiper-slide-next');
    
    this.onMove('prev');

  }
  onMoveNext() {
    this.DOM.activeSlide = this.DOM.el.querySelector('.swiper-slide-active'),
    this.DOM.activeSlideImg = this.DOM.activeSlide.querySelector('.slide-image'),
    this.DOM.activeSlideTitle = this.DOM.activeSlide.querySelector('.slide-title'),
    this.DOM.activeSlideTitleLetters = this.DOM.activeSlideTitle.querySelectorAll('span');
    this.DOM.oldSlide = this.DOM.el.querySelector('.swiper-slide-prev');
    
    this.onMove('next');
  }
  onMove(direction) {
    if (this.DOM.oldSlide) {
      this.DOM.oldSlideTitle = this.DOM.oldSlide.querySelector('.slide-title'),
      this.DOM.oldSlideTitleLetters = this.DOM.oldSlideTitle.querySelectorAll('span'); 
      // 초기화
      gsap.set(
        this.DOM.oldSlideTitleLetters, 
        {autoAlpha: 0, y: -100, delay: this.config.saiSlDelay}, 
      );
    }
  
    // 애니메이션
    gsap.fromTo(
      this.DOM.activeSlideTitleLetters, 
      {
        autoAlpha: 0, 
        y: -100
      }, 
      {
        autoAlpha: 1, 
        y:0, 
        duration: this.config.saiGsapDuration, 
        stagger: 0.05, 
        ease: this.config.saiGsapEase, 
        delay: this.config.saiGsapEelay
      }
    );

    //백그라운드
    gsap.fromTo(this.DOM.activeSlideImg, 
      {
        x: direction === 'next' ? 200 : -200
      },
      {
        x: 0,
        ease: "slow(0.5, 0.4, false)", 
        duration: 1.2,
      }
    );
  }
};

const saislide = new saiSlide(
  document.querySelector('.slideshow'),
  {
    saiGsapDuration: 0.7,
    saiGsapEase: "back.out(1.7)"
  }
);
