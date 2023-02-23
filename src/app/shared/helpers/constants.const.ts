export class ConstantsKitc {
  static get DEFAULT_PORTRAIT_RESPONSIVE_SWIPER_BREAKPOINTS(): any {
    var breakpoints = {
      220: {
        slidesPerView: 1.2,
      },
      320: {
        slidesPerView: 2.2,
      },
      600: {
        slidesPerView: 3.2,
      },
      860: {
        slidesPerView: 4.2,
      },
      980: {
        slidesPerView: 5.2,
      },
      1100: {
        slidesPerView: 6.2,
      },
    };
    return breakpoints;
  }
  static get DEFAULT_STUDENT_REVIEWS_RESPONSIVE_SWIPER_BREAKPOINTS(): any {
    var breakpoints = {
      320: {
        slidesPerView: 1.2,
      },
      600: {
        slidesPerView: 2.2,
      },
      770: {
        slidesPerView: 3.2,
      },
    };
    return breakpoints;
  }
}
