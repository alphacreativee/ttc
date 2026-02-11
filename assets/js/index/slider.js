export function sectionNews() {
  if ($(".section-news").length < 1) return;

  document.querySelectorAll(".section-news").forEach((section) => {
    const swiperEl = section.querySelector(".news-slider .swiper");

    if (!swiperEl) return;

    new Swiper(swiperEl, {
      slidesPerView: 3,
      spaceBetween: 24,
      loop: false,
      speed: 800,
      autoplay: false,
      navigation: {
        prevEl: section.querySelector(".arrow-prev"),
        nextEl: section.querySelector(".arrow-next")
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 24
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 24
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 24
        },
        0: {
          slidesPerView: 1,
          spaceBetween: 24
        }
      }
    });
  });
}

export function sliderWithShadow() {
  // slider with shadow
  if ($(".slider-with-shadow").length < 1) return;

  document.querySelectorAll(".slider-with-shadow").forEach((section) => {
    const swiperEl = section.querySelector(".slider-with-shadow .swiper");

    new Swiper(swiperEl, {
      slidesPerView: 3,
      spaceBetween: 0,
      loop: false,
      speed: 800,
      autoplay: false,
      navigation: {
        prevEl: section.querySelector(".arrow-prev"),
        nextEl: section.querySelector(".arrow-next")
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 0
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 0
        },
        0: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      }
    });
  });
}

export function sliderParallax() {
  if ($("[slider-parallax]").length < 1) return;

  var interleaveOffset = 0.8;

  $("[slider-parallax]").each(function () {
    const swiperEl = this;
    const $swiper = $(this);

    const hasAutoplay =
      window.innerWidth < 992
        ? false
        : swiperEl.hasAttribute("slider-autoplay");

    const hasNoDrag = swiperEl.hasAttribute("slider-no-drag");
    const hasChangeLabel = swiperEl.hasAttribute("slider-change-label");

    const $sliderTitle = $swiper.find(".slider-title");
    const $pagination = $swiper.find(".slider-pagination");

    const $wrapper = $swiper.closest(".wrapper-slider-parallax");
    const nextBtn = $wrapper.find(".arrow-next")[0];
    const prevBtn = $wrapper.find(".arrow-prev")[0];

    const hasArrow =
      swiperEl.hasAttribute("slider-arrow") && nextBtn && prevBtn;

    const swiper = new Swiper(swiperEl, {
      slidesPerView: 1,
      init: true,
      loop: true,
      speed: 1500,
      watchSlidesProgress: true,

      keyboard: !hasNoDrag,
      // mousewheel: !hasNoDrag,
      grabCursor: !hasNoDrag,
      allowTouchMove: hasNoDrag ? false : true,

      autoplay: hasAutoplay
        ? {
            delay: 3500,
            disableOnInteraction: true
          }
        : false,

      navigation: hasArrow
        ? {
            nextEl: nextBtn,
            prevEl: prevBtn
          }
        : false,
      on: {
        init(swiper) {
          if (hasChangeLabel) updateLabel(swiper);
        },

        slideChange(swiper) {
          if (hasChangeLabel) updateLabel(swiper);
        },

        progress: function (swiper) {
          swiper.slides.forEach(function (slide) {
            const slideProgress = slide.progress || 0;
            const innerOffset = swiper.width * interleaveOffset;
            const innerTranslate = slideProgress * innerOffset;

            if (!isNaN(innerTranslate)) {
              const slideInner = slide.querySelector(".image");
              if (slideInner) {
                slideInner.style.transform = `translate3d(${innerTranslate}px, 0, 0)`;
              }
            }
          });
        },

        touchStart: function (swiper) {
          swiper.slides.forEach(function (slide) {
            slide.style.transition = "";
          });
        },

        setTransition: function (swiper, speed) {
          const easing = "cubic-bezier(0.25, 0.1, 0.25, 1)";

          swiper.slides.forEach(function (slide) {
            slide.style.transition = `${speed}ms ${easing}`;

            const slideInner = slide.querySelector(".image");
            if (slideInner) {
              slideInner.style.transition = `${speed}ms ${easing}`;
            }
          });
        }
      }
    });

    function updateLabel(swiper) {
      const realIndex = swiper.realIndex;

      const realSlides = swiper.el.querySelectorAll(
        ".swiper-slide:not(.swiper-slide-duplicate)"
      );

      const total = realSlides.length;
      const currentSlide = realSlides[realIndex];
      const title = currentSlide?.dataset?.title || "";

      if ($sliderTitle.length) {
        $sliderTitle.text(title);
      }

      if ($pagination.length) {
        $pagination.text(`${realIndex + 1}/${total}`);
      }
    }
  });

  // init on open modal
  document
    .querySelectorAll(".modal-accommodation-detail")
    .forEach((modalEl) => {
      modalEl.addEventListener("shown.bs.modal", () => {
        const swiperEl = modalEl.querySelector("[slider-parallax]");

        if (!swiperEl || !swiperEl.swiper) return;

        const swiper = swiperEl.swiper;

        swiper.update();
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.slideToLoop(0, 0, false);
      });
    });
}
