export function sliderChangeContent() {
  document.querySelectorAll("section.hero").forEach((section) => {
    if (!section.querySelector(".hero-slider")) return;

    let isTransitioning = false;

    const heroSwiper = new Swiper(section.querySelector(".hero-slider"), {
      slidesPerView: 1,
      speed: 1000,
      loop: false,
      allowTouchMove: false,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: "section.hero .slider-pagination",
        type: "fraction",
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      on: {
        slideChangeTransitionStart: function () {
          if (isTransitioning) return;
          isTransitioning = true;

          const currentTag = section.querySelector(".current-tag");
          const currentTitle = section.querySelector(".current-title");

          if (currentTag) {
            gsap.to(currentTag, {
              autoAlpha: 0,
              y: -5,
              ease: "power2.out",
              duration: 0.3,
            });
          }

          if (currentTitle) {
            const titleLines = currentTitle.querySelectorAll(".line");
            if (titleLines.length > 0) {
              gsap.to(titleLines, {
                autoAlpha: 0,
                y: -10,
                ease: "power2.in",
                duration: 0.3,
                stagger: 0.015,
              });
            } else {
              gsap.to(currentTitle, {
                autoAlpha: 0,
                y: -10,
                ease: "power2.out",
                duration: 0.3,
              });
            }
          }

          const swiper = this; // Lưu reference của Swiper

          setTimeout(() => {
            const nextSlide = swiper.slides[swiper.activeIndex];
            const slideContent = nextSlide.querySelector(
              ".hero-slider-content",
            );

            if (!slideContent) return;

            const nextTag =
              slideContent.querySelector(".slider-tag")?.innerHTML || "";
            const nextTitle =
              slideContent.querySelector(".slider-title")?.innerHTML || "";

            // Cập nhật content
            const contentContainer = section.querySelector(
              ".slider-content-import",
            );
            if (contentContainer) {
              let contentHTML = "";
              if (nextTag) {
                contentHTML += `<div class='current-tag'>${nextTag}</div>`;
              }
              if (nextTitle) {
                contentHTML += `<h1 class='current-title'>${nextTitle}</h1>`;
              }
              contentContainer.innerHTML = contentHTML;

              const newTag = contentContainer.querySelector(".current-tag");
              const newTitle = contentContainer.querySelector(".current-title");

              if (newTag) {
                gsap.fromTo(
                  newTag,
                  { autoAlpha: 0, y: 5 },
                  {
                    autoAlpha: 1,
                    y: 0,
                    ease: "power2.out",
                    duration: 0.4,
                    delay: 0.1,
                  },
                );
              }

              if (newTitle && typeof SplitText !== "undefined") {
                const split = new SplitText(newTitle, {
                  type: "lines",
                  linesClass: "line",
                });

                split.lines.forEach((line) => {
                  const wrapper = document.createElement("div");
                  wrapper.style.overflow = "hidden";
                  line.parentNode.insertBefore(wrapper, line);
                  wrapper.appendChild(line);
                });

                gsap.fromTo(
                  split.lines,
                  { autoAlpha: 0, y: 30 },
                  {
                    autoAlpha: 1,
                    y: 0,
                    ease: "power2.out",
                    duration: 0.5,
                    delay: 0.2,
                    stagger: 0.08,
                  },
                );
              } else if (newTitle) {
                gsap.fromTo(
                  newTitle,
                  { autoAlpha: 0, y: 20 },
                  {
                    autoAlpha: 1,
                    y: 0,
                    ease: "power2.out",
                    duration: 0.4,
                    delay: 0.2,
                  },
                );
              }
            }
          }, 400);
        },

        slideChangeTransitionEnd: function () {
          isTransitioning = false;
        },
      },
    });

    // Init content cho slide đầu tiên
    const initialSlide = heroSwiper.slides[heroSwiper.activeIndex];
    const initialSlideContent = initialSlide?.querySelector(
      ".hero-slider-content",
    );

    if (initialSlideContent) {
      const initialTag =
        initialSlideContent.querySelector(".slider-tag")?.innerHTML || "";
      const initialTitle =
        initialSlideContent.querySelector(".slider-title")?.innerHTML || "";

      const contentContainer = section.querySelector(".slider-content-import");
      if (contentContainer) {
        let initialContentHTML = "";
        if (initialTag) {
          initialContentHTML += `<div class='current-tag'>${initialTag}</div>`;
        }
        if (initialTitle) {
          initialContentHTML += `<h1 class='current-title'>${initialTitle}</h1>`;
        }
        contentContainer.innerHTML = initialContentHTML;

        // Animate initial content
        const initialTagElement =
          contentContainer.querySelector(".current-tag");
        const initialTitleElement =
          contentContainer.querySelector(".current-title");

        // Animate tag
        if (initialTagElement) {
          gsap.fromTo(
            initialTagElement,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.8,
              delay: 0.5,
            },
          );
        }

        if (initialTitleElement && typeof SplitText !== "undefined") {
          const split = new SplitText(initialTitleElement, {
            type: "lines",
            linesClass: "line",
          });

          split.lines.forEach((line) => {
            const wrapper = document.createElement("div");
            wrapper.style.overflow = "hidden";
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
          });

          gsap.fromTo(
            split.lines,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.6,
              delay: 0.7,
              stagger: 0.08,
            },
          );
        } else if (initialTitleElement) {
          // Fallback
          gsap.fromTo(
            initialTitleElement,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.8,
              delay: 0.7,
            },
          );
        }

        const lineVertical = section.querySelector(
          ".slider-content-line-vertical",
        );
        if (lineVertical) {
          lineVertical.classList.add("active");
        }
        setTimeout(() => {
          const sliderPagination = section.querySelector(
            ".slider-content-wrapper .slider-pagination",
          );
          if (sliderPagination) {
            sliderPagination.classList.add("active");
          }
        }, 1000);
      }
    }
  });
}
