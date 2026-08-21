const ClinicMasterCarousel = function () {
  const handleTestimonialSwiper1 = () => {
    const swiperEl = document.querySelector(".testimonial-swiper1");
    if (!swiperEl) return;

    new Swiper(".testimonial-swiper1", {
      loop: true,
      spaceBetween: 20,
      slidesPerView: 1,
      navigation: {
        nextEl: ".swiper1-button-next",
        prevEl: ".swiper1-button-prev",
      },
    });
  };

  const handleClientSwiper2 = () => {
    const swiperEl = document.querySelector(".client-swiper2");
    if (!swiperEl) return;

    new Swiper(".client-swiper2", {
      loop: true,
      slidesPerView: 4,
      spaceBetween: 30,
      autoplay: {
        delay: 3000,
      },
      breakpoints: {
        767: {
          slidesPerView: 4,
        },
        575: {
          slidesPerView: 3,
        },
        320: {
          slidesPerView: 2,
        },
      },
    });
  };

  const BlogSlideshowSwiper = () => {
    const swiperEl = document.querySelector(".blog-slideshow");
    if (!swiperEl) return;

    new Swiper(".blog-slideshow", {
      loop: true,
      spaceBetween: 0,
      slidesPerView: "auto",
      speed: 1500,
      autoplay: {
        delay: 2000,
      },
      pagination: {
        el: ".swiper-pagination-two",
        clickable: true,
      },
    });
  };

  if (
    document.querySelector(".galley-thumb-swiper") &&
    document.querySelector(".galley-swiper")
  ) {
    const swiperThumbs = new Swiper(".galley-thumb-swiper", {
      loop: false,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    new Swiper(".galley-swiper", {
      loop: true,
      spaceBetween: 10,
      thumbs: {
        swiper: swiperThumbs,
      },
    });
  }

  const handleTestimonialSwiper = function () {
    const wrapper = document.querySelector(".testimonial-swiper-wrapper");
    if (!wrapper) return;

    const testimonialThumbs = new Swiper(".testimonial-thumbs", {
      speed: 1500,
      parallax: true,
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 3000,
      },
    });

    new Swiper(".testimonial-swiper", {
      speed: 1500,
      parallax: true,
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 3000,
      },
      navigation: {
        nextEl: ".testimonial-button-next",
        prevEl: ".testimonial-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      thumbs: {
        swiper: testimonialThumbs,
      },
    });
  };

  const handleServiceSwiper = () => {
    const swiperEl = document.querySelector(".service-swiper");
    if (!swiperEl) return;

    new Swiper(".service-swiper", {
      speed: 1500,
      parallax: true,
      slidesPerView: 1,
      spaceBetween: 35,
      loop: true,
      autoplay: {
        delay: 3000,
      },
      breakpoints: {
        567: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        767: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1025: {
          slidesPerView: 4,
          spaceBetween: 35,
        },
      },
    });
  };

  const handleVerticalSwiper = () => {
    const blogVerticalSwiper = document.querySelector(".blog-vertical-swiper");

    if (blogVerticalSwiper) {
      const teamSwiperThumb = new Swiper(".blog-vertical-swiper-thumb", {
        direction: "vertical",
        slidesPerView: 3,
        mousewheel: false,
        spaceBetween: 10,
        autoplay: {
          delay: 3000,
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            direction: "horizontal",
          },
          767: {
            slidesPerView: 2,
            direction: "vertical",
          },
          1191: {
            slidesPerView: 3,
          },
        },
      });

      new Swiper(".blog-vertical-swiper", {
        slidesPerView: 1,
        effect: "fade",
        grabCursor: true,
        thumbs: {
          swiper: teamSwiperThumb,
        },
        navigation: {
          nextEl: ".blog-swiper-next",
          prevEl: ".blog-swiper-prev",
        },
      });
    }
  };

  const handleCompareSwiper = () => {
    const compareSwiperEl = document.querySelector(".compare-swiper");

    if (!compareSwiperEl) return;

    const compareSwiper = new Swiper(".compare-swiper", {
      loop: true,
      slidesPerView: 4,
      spaceBetween: 20,
      centeredSlides: true,
      autoplay: {
        delay: 3000,
      },
      navigation: {
        nextEl: ".compare-swiper-next",
        prevEl: ".compare-swiper-prev",
      },
      pagination: {
        el: ".compare-pagination-swiper",
        type: "progressbar",
      },
      breakpoints: {
        1481: {
          slidesPerView: 4.4,
        },
        1280: {
          slidesPerView: 4,
        },
        991: {
          slidesPerView: 3.5,
        },
        320: {
          slidesPerView: 2,
        },
      },
    });

    const paginationContainer = document.querySelector(
      ".compare-slider__pagination"
    );
    if (paginationContainer) {
      const currentEl = document.querySelector(".compare-slider__current");
      const totalEl = document.querySelector(".compare-slider__total");

      const updatePagination = () => {
        const totalSlides =
          compareSwiperEl.querySelectorAll(".swiper-slide").length;
        let current = compareSwiper.realIndex + 1;

        if (current > totalSlides) current = 1;

        const idx = current < 10 ? "0" + current : current;
        const tdx = totalSlides < 10 ? "0" + totalSlides : totalSlides;

        if (currentEl) currentEl.textContent = idx;
        if (totalEl) totalEl.textContent = tdx;
      };

      updatePagination();
      compareSwiper.on("slideChange", updatePagination);
    }
  };

  const handleTeamSwiper1 = () => {

    const teamSwiperThumb = new Swiper(".dz-team-swiper1-thumb", {
      slidesPerView: 2,
      autoplay: {
        delay: 3000,
      },
      breakpoints: {
        320: {
          slidesPerView: 1.2,
          
        },
        591: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    });

    const teamSwiper = new Swiper(".dz-team-swiper1", {
      slidesPerView: 1,
      effect: "fade",
      thumbs: {
        swiper: teamSwiperThumb,
      },
      pagination: {
        el: ".team-progressbar-swiper",
        type: "progressbar",
      },
      navigation: {
        nextEl: ".team-swiper-next",
        prevEl: ".team-swiper-prev",
      },
    });

    if (document.querySelector(".team-pagination-swiper")) {
      const currentEl = document.querySelector(".team-slider__current");
      const totalEl = document.querySelector(".team-slider__total");

      const mainSliderPagination = () => {
        const totalSlides = document.querySelectorAll(
          ".dz-team-swiper1 .swiper-slide"
        ).length;
        let current = teamSwiper.realIndex + 1;
        if (current > totalSlides) current = 1;

        const idx = current < 10 ? "0" + current : current;
        const tdx = totalSlides < 10 ? "0" + totalSlides : totalSlides;

        if (totalEl) totalEl.textContent = tdx;
        if (currentEl) currentEl.textContent = idx;
      };

      mainSliderPagination();
      teamSwiper.on("slideChange", mainSliderPagination);
    }
  };

  const handleTestimonialSwiper2 = () => {
    const swiperEl = document.querySelector(".testimonial-swiper2");
    if (!swiperEl) return;

    const testimonialSwiper2 = new Swiper(".testimonial-swiper2", {
      loop: true,
      spaceBetween: 0,
      slidesPerView: 2,
      autoplay: {
        delay: 3000,
      },
      pagination: {
        el: ".testimonial-pagination-swiper2",
        type: "progressbar",
      },
      breakpoints: {
        1481: {
          slidesPerView: 2,
        },
        1280: {
          slidesPerView: 1.6,
        },
        1024: {
          slidesPerView: 1.2,
        },
        320: {
          slidesPerView: 1,
        },
      },
    });

    if (document.querySelector(".testimonial-slider__pagination2")) {
      const currentEl = document.querySelector(".testimonial-slider__current");
      const totalEl = document.querySelector(".testimonial-slider__total");

      const mainSliderPagination = () => {
        const totalSlides = document.querySelectorAll(
          ".testimonial-swiper2 .swiper-slide"
        ).length;
        let current = testimonialSwiper2.realIndex + 1;
        if (current > totalSlides) current = 1;

        const idx = current < 10 ? "0" + current : current;
        const tdx = totalSlides < 10 ? "0" + totalSlides : totalSlides;

        if (totalEl) totalEl.textContent = tdx;
        if (currentEl) currentEl.textContent = idx;
      };

      mainSliderPagination();
      testimonialSwiper2.on("slideChange", mainSliderPagination);
    }
  };

  const handleTestimonialSwiper7 = function () {
    const swiperContainer = document.querySelector(".testimonial-swiper7");

    if (swiperContainer) {
      const testimonialSwiper7 = new Swiper(".testimonial-swiper7", {
        loop: true,
        spaceBetween: 0,
        slidesPerView: 1,
        autoplay: {
          delay: 3000,
        },
        pagination: {
          el: ".testimonial-pagination-swiper7",
          clickable: true,
        },
      });
    }
  };

  return {
    load() {
      handleTestimonialSwiper();
      handleTestimonialSwiper1();
      handleTestimonialSwiper2();
      handleTestimonialSwiper7();
      handleClientSwiper2();
      BlogSlideshowSwiper();
      handleServiceSwiper();
      handleVerticalSwiper();
      handleCompareSwiper();
      handleTeamSwiper1();
    },
  };
};

window.addEventListener("load", function () {
  ClinicMasterCarousel().load();
});
