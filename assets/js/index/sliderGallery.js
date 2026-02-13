export function sliderGallery() {
  const gallerySection = document.querySelector(".slider-gallery");
  if (!gallerySection) return;

  let isTransitioning = false;
  let contentTimeout = null;

  const swiperThumbnails = new Swiper(".slider-thumbnail", {
    spaceBetween: 12,
    slidesPerView: 2.2,
    freeMode: true,
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,

    navigation: {
      nextEl: ".thumbnail-list-wrapper .swiper-button-next",
      prevEl: ".thumbnail-list-wrapper .swiper-button-prev",
    },

    on: {
      init() {
        this.el.style.opacity = "1";
      },
    },

    breakpoints: {
      768: {
        slidesPerView: 3.5,
      },
      992: {
        slidesPerView: 6,
      },
    },
  });

  const swiperBg = new Swiper(".slider-image-bg", {
    slidesPerView: 1,
    allowTouchMove: false,
    effect: "fade",
    speed: 1000,
    fadeEffect: {
      crossFade: true,
    },
    thumbs: {
      swiper: swiperThumbnails,
    },
    on: {
      slideChangeTransitionStart: function () {
        // Clear timeout cũ nếu có
        if (contentTimeout) {
          clearTimeout(contentTimeout);
          contentTimeout = null;
        }

        // Kill tất cả animation đang chạy
        const contentGroup = gallerySection.querySelector(
          ".content-thumbnail-group",
        );
        if (contentGroup) {
          gsap.killTweensOf(contentGroup.querySelectorAll("*"));
        }

        isTransitioning = true;

        if (!contentGroup) {
          isTransitioning = false;
          return;
        }

        // Fade out nội dung cũ nhanh hơn
        const currentElements = contentGroup.querySelectorAll(
          ".name-room, .description, a",
        );
        if (currentElements.length > 0) {
          gsap.to(currentElements, {
            autoAlpha: 0,
            y: -10,
            ease: "power2.in",
            duration: 0.2,
            stagger: 0.03,
          });
        }

        // Dùng biến timeout để có thể clear
        contentTimeout = setTimeout(() => {
          const activeSlide = this.slides[this.activeIndex];
          const contentWrapper = activeSlide?.querySelector(
            ".thumbnail-content-wrapper",
          );

          if (!contentWrapper) {
            contentGroup.innerHTML = "";
            isTransitioning = false;
            return;
          }

          const nameRoom =
            contentWrapper.querySelector(".name-room")?.innerHTML.trim() || "";
          const description =
            contentWrapper.querySelector(".description")?.innerHTML.trim() ||
            "";
          const link = contentWrapper.querySelector("a");

          let contentHTML = "";
          if (nameRoom)
            contentHTML += `<div class="name-room">${nameRoom}</div>`;
          if (description)
            contentHTML += `<div class="description">${description}</div>`;
          if (link) contentHTML += `${link.outerHTML}`;

          contentGroup.innerHTML = contentHTML;

          // Animate nội dung mới
          const newName = contentGroup.querySelector(".name-room");
          const newDesc = contentGroup.querySelector(".description");
          const newLink = contentGroup.querySelector("a");

          const animationPromises = [];

          if (newName) {
            const tween = gsap.fromTo(
              newName,
              { autoAlpha: 0, y: 20 },
              {
                autoAlpha: 1,
                y: 0,
                ease: "power2.out",
                duration: 0.5,
                delay: 0.1,
              },
            );
            animationPromises.push(tween);
          }
          if (newDesc) {
            const tween = gsap.fromTo(
              newDesc,
              { autoAlpha: 0, y: 20 },
              {
                autoAlpha: 1,
                y: 0,
                ease: "power2.out",
                duration: 0.5,
                delay: 0.2,
              },
            );
            animationPromises.push(tween);
          }
          if (newLink) {
            const tween = gsap.fromTo(
              newLink,
              { autoAlpha: 0, y: 20 },
              {
                autoAlpha: 1,
                y: 0,
                ease: "power2.out",
                duration: 0.5,
                delay: 0.3,
                onComplete: () => {
                  isTransitioning = false;
                },
              },
            );
            animationPromises.push(tween);
          } else {
            // Nếu không có link thì set lại flag sau animation cuối
            setTimeout(() => {
              isTransitioning = false;
            }, 700);
          }
        }, 250);
      },
      slideChangeTransitionEnd: function () {
        // Backup: đảm bảo reset flag
        setTimeout(() => {
          isTransitioning = false;
        }, 100);
      },
    },
  });

  // Khởi tạo nội dung cho slide đầu tiên
  const initialSlide = swiperBg.slides[swiperBg.activeIndex];
  const initialContentWrapper = initialSlide?.querySelector(
    ".thumbnail-content-wrapper",
  );
  const contentGroup = gallerySection.querySelector(".content-thumbnail-group");

  if (initialContentWrapper && contentGroup) {
    const nameRoom =
      initialContentWrapper.querySelector(".name-room")?.innerHTML.trim() || "";
    const description =
      initialContentWrapper.querySelector(".description")?.innerHTML.trim() ||
      "";
    const link = initialContentWrapper.querySelector("a");

    let initialHTML = "";
    if (nameRoom) initialHTML += `<div class="name-room">${nameRoom}</div>`;
    if (description)
      initialHTML += `<div class="description">${description}</div>`;
    if (link) initialHTML += `${link.outerHTML}`;

    contentGroup.innerHTML = initialHTML;

    // Animate lần đầu với ScrollTrigger
    const initName = contentGroup.querySelector(".name-room");
    const initDesc = contentGroup.querySelector(".description");
    const initLink = contentGroup.querySelector("a");

    const elementsToAnimate = [initName, initDesc, initLink].filter(Boolean);

    if (elementsToAnimate.length > 0) {
      // Set initial state
      gsap.set(elementsToAnimate, { autoAlpha: 0, y: 30 });

      // Create ScrollTrigger animation
      ScrollTrigger.create({
        trigger: ".slider-gallery",
        start: "top 50%",
        once: true,
        onEnter: () => {
          if (initName) {
            gsap.to(initName, {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.6,
              delay: 0.2,
            });
          }
          if (initDesc) {
            gsap.to(initDesc, {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.6,
              delay: 0.4,
            });
          }
          if (initLink) {
            gsap.to(initLink, {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.6,
              delay: 0.6,
            });
          }
        },
      });
    }
  }
}
