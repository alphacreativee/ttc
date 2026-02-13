export function customDropdown() {
  const dropdowns = document.querySelectorAll(
    ".dropdown-custom, .dropdown-custom-select"
  );

  dropdowns.forEach((dropdown) => {
    const btnDropdown = dropdown.querySelector(".dropdown-custom-btn");
    const dropdownMenu = dropdown.querySelector(".dropdown-custom-menu");
    const dropdownItems = dropdown.querySelectorAll(".dropdown-custom-item");
    const valueSelect = dropdown.querySelector(".value-select");
    const displayText = dropdown.querySelector(".dropdown-custom-text");

    const isSelectType = dropdown.classList.contains("dropdown-custom-select");

    btnDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllDropdowns(dropdown);
      dropdownMenu.classList.toggle("dropdown--active");
      btnDropdown.classList.toggle("--active");
    });

    document.addEventListener("click", function () {
      closeAllDropdowns();
    });

    dropdownItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.stopPropagation();

        // dropdown nav tab
        const isInSectionModel = dropdown.classList.contains("filter-dropdown");

        const clickedText =
          item.querySelector("span")?.textContent.trim() ||
          item.textContent.trim();

        const clickedDataTab = item.dataset.tab || "";

        /* ===== FILTER TAB (GIỮ NGUYÊN) ===== */
        if (isInSectionModel) {
          const spanEl = valueSelect.querySelector("span");
          if (spanEl) spanEl.textContent = clickedText;

          if (clickedDataTab) valueSelect.dataset.tab = clickedDataTab;

          closeAllDropdowns();
          return;
        }

        /* ===== SELECT TYPE ===== */
        if (isSelectType) {
          displayText.textContent = clickedText;
          dropdown.classList.add("selected");
        } else {
          /* ✨ FIX: KHÔNG REWRITE item.innerHTML NỮA ✨ */
          const spanEl = valueSelect.querySelector("span");
          if (spanEl) spanEl.textContent = clickedText;
        }

        /* ===== DESTINATION SELECT ===== */
        const isSelectDestination =
          dropdown.classList.contains("select-destination");

        if (isSelectDestination) {
          const hotelId = item.dataset.idHotel || "";
          const hotelBookingUrl = item.dataset.bookingUrl || "";

          console.log("booking_url:", hotelBookingUrl);

          /* giữ nguyên hotel_id */
          if (hotelId) {
            const hiddenHotelInput = document.querySelector(
              'input[type="hidden"][name="hotel_id"]'
            );
            if (hiddenHotelInput) {
              hiddenHotelInput.value = hotelId;
            }
          }

          /* ✨ FIX BOOKING URL – KHÔNG MẤT DATA CLICK LẦN 2 ✨ */
          if (hotelBookingUrl) {
            const bookingInput = dropdown.querySelector(
              'input[type="hidden"][name="booking_url"]'
            );
            if (bookingInput) {
              bookingInput.value = hotelBookingUrl;
            }

            console.log("click");
            console.log(bookingInput);
          }
        }

        closeAllDropdowns();
      });
    });

    window.addEventListener("scroll", function () {
      if (dropdownMenu.closest(".header-lang")) {
        dropdownMenu.classList.remove("dropdown--active");
        btnDropdown.classList.remove("--active");
      }
    });
  });

  function closeAllDropdowns(exception) {
    dropdowns.forEach((dropdown) => {
      const menu = dropdown.querySelector(".dropdown-custom-menu");
      const btn = dropdown.querySelector(".dropdown-custom-btn");

      if (!exception || dropdown !== exception) {
        menu.classList.remove("dropdown--active");
        btn.classList.remove("--active");
      }
    });
  }
}

export function scrollChangeBgHeader() {
  const header = document.querySelector("#header");

  if (!header || header.classList.contains("without-home")) return;

  if (header.classList.contains("header-theme-light-first")) return;

  gsap.to(header, {
    scrollTrigger: {
      trigger: "body",
      start: "top -10px",
      end: "+=100",
      onEnter: () => header.classList.add("header-theme-light"),
      onLeaveBack: () => header.classList.remove("header-theme-light")
      // markers: true,
    }
  });
}
export function scrollFixedBookingForm() {
  const bookingFormWrapper = document.querySelector(".booking-form-wrapper");
  const headerHeight = document.querySelector("#header").clientHeight;

  if (!bookingFormWrapper) return;

  const bookingTop =
    bookingFormWrapper.getBoundingClientRect().top + window.pageYOffset;

  ScrollTrigger.create({
    trigger: "body",
    start: `${bookingTop}px ${headerHeight}px`,
    endTrigger: "body",
    end: "bottom bottom",
    onEnter: () => bookingFormWrapper.classList.add("booking-fixed"),
    onLeaveBack: () => bookingFormWrapper.classList.remove("booking-fixed")
    // markers: true,
  });
}
export function checkScrollBookingUp() {
  const bookingFormWrapper = document.querySelector(".booking-form-wrapper");

  if (!bookingFormWrapper) return;

  const bookingTop =
    bookingFormWrapper.getBoundingClientRect().top + window.pageYOffset;
  ScrollTrigger.create({
    trigger: "body",
    start: `${bookingTop}px center`,
    endTrigger: "body",
    end: "bottom bottom",
    onEnter: () => bookingFormWrapper.classList.add("booking-up"),
    onLeaveBack: () => bookingFormWrapper.classList.remove("booking-up")
    // markers: true,
  });
}

export function setOfferDescHeight() {
  const items = document.querySelectorAll(".offer-item");

  if ($("window").width() < 992 || !items.length) return;

  items.forEach((item) => {
    const desc = item.querySelector(".content-desc");
    if (!desc) return;

    const height = desc.offsetHeight;

    item.style.setProperty("--height-desc", `${height}px`);
  });
}
export function bookingTime() {
  if (!document.querySelector(".booking-form-wrapper")) return;

  function positionCalendar() {
    var input = picker._opts.field;
    var rect = input.getBoundingClientRect();
    var calendar = picker.el;

    if (rect.top >= window.innerHeight / 2) {
      calendar.style.top =
        rect.top + window.scrollY - calendar.offsetHeight - 20 + "px";
      calendar.style.left = rect.left + window.scrollX - 30 + "px";
      // calendar.style.borderRadius = "12px 12px 0 0";
    } else {
      calendar.style.top = rect.bottom + window.scrollY + 15 + "px";
      calendar.style.left = rect.left + window.scrollX - 30 + "px";
      // calendar.style.borderRadius = "0 0 12px 12px";
    }
  }

  var picker = new Lightpick({
    field: document.getElementById("checkInDate"),
    secondField: document.getElementById("checkOutDate"),
    singleDate: false,
    minDate: moment().startOf("now"),
    numberOfMonths: 2,
    startDate: moment().startOf("day").toDate(),
    endDate: moment().startOf("day").add(1, "days").toDate(),

    onOpen: function () {
      positionCalendar();
      setTimeout(positionCalendar, 50);

      // Thêm event listener cho scroll khi calendar mở
      window.addEventListener("scroll", positionCalendar);
      window.addEventListener("resize", positionCalendar);
    },

    onClose: function () {
      // Xóa event listener khi calendar đóng
      window.removeEventListener("scroll", positionCalendar);
      window.removeEventListener("resize", positionCalendar);
    },

    onMonthChange: function () {
      setTimeout(positionCalendar, 10);
    },

    onYearChange: function () {
      setTimeout(positionCalendar, 10);
    }
  });

  const bookingCalendar = document.querySelector(".booking-calendar");
  if (bookingCalendar) {
    bookingCalendar.addEventListener("click", function (e) {
      e.stopPropagation();
      picker.show();
      document.getElementById("checkInDate").focus();
    });

    bookingCalendar.style.cursor = "pointer";
  }
}
export function effectText() {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  gsap.utils.toArray(".data-fade-in").forEach((element) => {
    const delay = parseFloat(element.getAttribute("data-delay")) || 0;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 20,
        willChange: "opacity, transform"
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "sine.out",
        delay: delay,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 80%"
        }
      }
    );
  });

  gsap.utils.toArray(".effect-line-auto").forEach((description) => {
    const delay = parseFloat(description.getAttribute("data-delay")) || 0;

    const split = new SplitText(description, {
      type: "lines",
      linesClass: "line",
      mask: "lines"
    });

    gsap.fromTo(
      split.lines,
      { yPercent: 100, willChange: "transform" },
      {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
        delay: delay
      }
    );
  });

  gsap.utils.toArray(".effect-line").forEach((description) => {
    const split = new SplitText(description, {
      type: "lines",
      linesClass: "line",
      mask: "lines"
    });

    gsap.fromTo(
      split.lines,
      { yPercent: 100, willChange: "transform" },
      {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: description,
          start: "top 80%"
        }
      }
    );
  });

  if ($(window).width() < 992) {
    gsap.utils.toArray(".data-fade-in-mobile").forEach((element) => {
      const delay = parseFloat(element.getAttribute("data-delay")) || 0;

      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 20,
          willChange: "opacity, transform"
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "sine.out",
          delay: delay,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 80%"
          }
        }
      );
    });

    gsap.utils.toArray(".effect-line-mobile").forEach((description) => {
      const split = new SplitText(description, {
        type: "lines",
        linesClass: "line",
        mask: "lines"
      });

      gsap.fromTo(
        split.lines,
        { yPercent: 100, willChange: "transform" },
        {
          yPercent: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: description,
            start: "top 80%"
          }
        }
      );
    });
  }
}

export function animationItemsSection() {
  const isMobile = $(window).width() < 992;

  const FADE_EASE = "power2.out";
  const LINE_EASE = "power1.out";

  const ITEM_DURATION = 0.4;
  const ITEM_STAGGER = 0.07;
  const MOVE_Y = 20;

  gsap.utils.toArray("[section-fade-each-item]").forEach((section) => {
    const items = section.querySelectorAll("[data-fade-item]");

    const isExperience = section.closest(
      ".section-experience,.section-accommodation"
    );
    const isFadeInMobile = section.hasAttribute("enabled-fade-each-mobile");
    if (isMobile && !isFadeInMobile) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 65%",
        toggleActions: "play none none none",
        once: true
      }
    });

    items.forEach((item) => {
      const isLineItem = item.hasAttribute("fade-item-line");

      // ===== LINE ITEM =====
      if (isLineItem) {
        const split = new SplitText(item, {
          type: "lines",
          linesClass: "line",
          mask: "lines"
        });

        gsap.set(split.lines, {
          yPercent: 120,
          force3D: true
        });

        tl.to(split.lines, {
          yPercent: 0,
          duration: ITEM_DURATION,
          ease: LINE_EASE,
          force3D: true,
          stagger: ITEM_STAGGER
        });
      }

      // ===== NORMAL FADE ITEM =====
      else {
        gsap.set(item, {
          y: MOVE_Y,
          opacity: 0,
          force3D: true,
          willChange: "transform, opacity"
        });

        tl.to(
          item,
          {
            y: 0,
            opacity: 1,
            duration: ITEM_DURATION,
            ease: FADE_EASE,
            force3D: true,
            clearProps: "willChange"
          },
          "+=0"
        ); // giữ flow tự nhiên
      }
    });
  });

  gsap.utils.toArray("[modal-fade-each-item]").forEach((modal) => {
    const items = modal.querySelectorAll("[data-fade-item]");
    const tl = gsap.timeline({ paused: true });

    items.forEach((item) => {
      const isLineItem = item.hasAttribute("fade-item-line");

      if (isLineItem) {
        const split = new SplitText(item, {
          type: "lines",
          linesClass: "line",
          mask: "lines"
        });

        gsap.set(split.lines, {
          yPercent: 120,
          force3D: true
        });

        tl.to(split.lines, {
          yPercent: 0,
          duration: ITEM_DURATION,
          ease: LINE_EASE,
          force3D: true,
          stagger: ITEM_STAGGER
        });
      } else {
        gsap.set(item, {
          y: MOVE_Y,
          opacity: 0,
          force3D: true,
          willChange: "transform, opacity"
        });

        tl.to(item, {
          y: 0,
          opacity: 1,
          duration: ITEM_DURATION,
          ease: FADE_EASE,
          force3D: true,
          clearProps: "willChange"
        });
      }
    });

    modal.addEventListener("shown.bs.modal", () => {
      tl.restart();
    });

    modal.addEventListener("hidden.bs.modal", () => {
      tl.pause(0);
    });
  });
}

export function fadeTextFooter() {
  if (
    $(".section-accommodation").length > 0 ||
    $(".list-post-filter").length > 0
  )
    return;

  const elements = document.querySelectorAll("[data-text-footer]");

  gsap.set(elements, {
    opacity: 0,
    y: 20
  });

  let tlf = gsap.timeline({ paused: true });

  tlf.fromTo(
    elements,
    {
      opacity: 0,
      y: 20
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: "power2.out"
    }
  );

  ScrollTrigger.create({
    trigger: "footer",
    start: "top 80%",
    animation: tlf,
    toggleActions: "play none none none",
    invalidateOnRefresh: true // Reset animation khi refresh
    // markers: true,
  });

  return tlf;
}

export function scrollToTop() {
  const btn = document.querySelector(".btn-scroll-top");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const start = window.scrollY;
    const duration = 800;
    const startTime = performance.now();

    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const ease = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, start * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  });
}

export function ctaRun() {
  const cta = document.getElementById("cta");
  if (!cta) return;

  const footer = document.querySelector("footer");
  if (!footer) return;

  gsap.registerPlugin(ScrollTrigger);

  let isInFooter = false;

  const isShortPage = () => document.body.scrollHeight <= window.innerHeight;

  const isMobile = () => window.innerWidth < 768;

  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      if (!isInFooter && !isShortPage()) {
        cta.classList.toggle("run-right", self.direction === 1);
      }
    }
  });

  ScrollTrigger.create({
    trigger: footer,
    start: "top bottom",
    end: "bottom bottom",

    onEnter: () => {
      isInFooter = true;

      if (isMobile()) {
        // 👉 ép CTA chạy ra ngoài trước
        cta.classList.add("run-right");

        // 👉 đợi animation xong mới hide
        setTimeout(() => {
          cta.style.display = "none";
        }, 300); // = duration transition CSS
      } else {
        cta.classList.remove("run-right");
        cta.style.position = "absolute";
        const ctaHeight = cta.offsetHeight;
        cta.style.top = footer.offsetTop - ctaHeight - 35 + "px";
      }
    },

    onLeaveBack: () => {
      isInFooter = false;

      if (isMobile()) {
        // 👉 hiện lại CTA
        cta.style.display = "flex";

        // 👉 reset vị trí để nó chạy lại mượt
        requestAnimationFrame(() => {
          cta.classList.remove("run-right");
        });
      } else {
        cta.style.position = "fixed";
        cta.style.top = "";
      }
    }
  });
}

export function initGuestSelector() {
  document
    .querySelectorAll(".booking-form-item .select-people")
    .forEach((container) => {
      const adultDisplay = container.querySelector(".adult-value");
      const childDisplay = container.querySelector(".child-value");

      const selectBox = container.querySelector(".select-box");

      const adultValElem = selectBox.querySelector(".adult .val");
      const childValElem = selectBox.querySelector(".child .val");

      const adultMinus = selectBox.querySelector(".adult .min");
      const adultPlus = selectBox.querySelector(".adult .plus");
      const childMinus = selectBox.querySelector(".child .min");
      const childPlus = selectBox.querySelector(".child .plus");

      let adults = parseInt(adultValElem.textContent) || 1;
      let children = parseInt(childValElem.textContent) || 0;

      function updateDisplay() {
        adultValElem.textContent = adults;
        childValElem.textContent = children;

        adultDisplay.textContent = adults;
        childDisplay.textContent = children;

        adultMinus.style.opacity = adults <= 1 ? "0.4" : "1";
        adultMinus.style.pointerEvents = adults <= 1 ? "none" : "auto";

        childMinus.style.opacity = children <= 0 ? "0.4" : "1";
        childMinus.style.pointerEvents = children <= 0 ? "none" : "auto";
      }

      adultMinus.addEventListener("click", () => {
        if (adults > 1) {
          adults--;
          updateDisplay();
        }
      });

      adultPlus.addEventListener("click", () => {
        adults++;
        updateDisplay();
      });

      childMinus.addEventListener("click", () => {
        if (children > 0) {
          children--;
          updateDisplay();
        }
      });

      childPlus.addEventListener("click", () => {
        children++;
        updateDisplay();
      });

      updateDisplay();

      const displayArea = container.querySelector(".select-people-wrapper");
      if (displayArea) {
        displayArea.addEventListener("click", (e) => {
          if (!e.target.closest(".select-box")) {
            selectBox.classList.toggle("active");
          }
        });
      }

      document.addEventListener("click", (e) => {
        if (!container.contains(e.target)) {
          selectBox.classList.remove("active");
        }
      });
    });
}

export function accommodationDetail() {
  const $btn = $(".accommodation-detail .facilities-view-more");
  if ($btn.length < 1) return;

  const $more = $(".accommodation-detail .facilities-more");
  const $btnTextMore = $btn.data("read-more");
  const $btnTextLess = $btn.data("read-less");
  const duration = 500;

  // Hàm kiểm tra và set trạng thái theo màn hình
  function checkScreenSize() {
    const windowWidth = $(window).width();

    if (windowWidth >= 768 && windowWidth <= 991) {
      // Luôn mở trong khoảng 768-991px
      $more.addClass("is-open");
      $more.css({
        height: "auto",
        overflow: "visible"
      });
      $btn.hide(); // Ẩn button
    } else {
      // Ngoài khoảng này thì hoạt động bình thường
      $btn.show();

      if (!$more.hasClass("is-open")) {
        $more.css({
          overflow: "hidden",
          height: 0,
          transition: `height ${duration}ms ease`
        });
      }
    }
  }

  // Chạy khi load
  checkScreenSize();

  // Chạy khi resize
  $(window).on("resize", checkScreenSize);

  $btn.on("click", function () {
    // Kiểm tra kích thước màn hình
    const windowWidth = $(window).width();
    if (windowWidth >= 768 && windowWidth <= 991) {
      return; // Không làm gì nếu trong khoảng 768-991px
    }

    const isOpen = $more.hasClass("is-open");

    $btn.toggleClass("active");

    if (!isOpen) {
      // OPEN
      $more.addClass("is-open");

      const fullHeight = $more[0].scrollHeight;
      $more.css({
        height: fullHeight + "px",
        overflow: "hidden",
        transition: `height ${duration}ms ease`
      });

      setTimeout(() => {
        $more.css("height", "auto");
      }, duration);

      $btn.find("span").text($btnTextLess);
    } else {
      // CLOSE
      const currentHeight = $more[0].scrollHeight;

      $more.css("height", currentHeight + "px");
      $more[0].offsetHeight;
      $more.css("height", 0);

      setTimeout(() => {
        $more.removeClass("is-open");
      }, duration);

      $btn.find("span").text($btnTextMore);
    }
  });
}

export function sectionGallery() {
  if ($(".section-gallery").length < 1) return;

  let tabLightbox = null;
  let outsideLightbox = null;

  function createLightbox(selector) {
    if (!document.querySelector(`${selector} .glightbox`)) return null;

    return GLightbox({
      selector: `${selector} .glightbox`,
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
      onOpen: handleCustomArrow
    });
  }

  outsideLightbox = createLightbox(".section-gallery");

  function initTabLightbox(selector) {
    if (tabLightbox) {
      tabLightbox.destroy();
      tabLightbox = null;
    }

    tabLightbox = createLightbox(selector);
  }

  // Init tab active
  const activeTab = document.querySelector(".tab-pane.active.show");
  if (activeTab) {
    initTabLightbox(`#${activeTab.id}`);
  }

  // On tab change
  document.querySelectorAll('[data-bs-toggle="tab"]').forEach((btn) => {
    btn.addEventListener("shown.bs.tab", (e) => {
      initTabLightbox(e.target.getAttribute("data-bs-target"));
    });
  });

  function handleCustomArrow() {
    const prev = document.querySelector(".gprev");
    const next = document.querySelector(".gnext");

    if (prev && !prev.classList.contains("custom")) {
      prev.classList.add("custom");
      prev.innerHTML = `
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
          <path
            d="M13 5.5C10 4.5 7 1 7 0M13 5.5C10 6.5 7 10 7 11M13 5.5H0"
            stroke="currentColor"
            stroke-linejoin="bevel"
          />
        </svg>
      `;
    }

    if (next && !next.classList.contains("custom")) {
      next.classList.add("custom");
      next.innerHTML = `
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
          <path
            d="M13 5.5C10 4.5 7 1 7 0M13 5.5C10 6.5 7 10 7 11M13 5.5H0"
            stroke="currentColor"
            stroke-linejoin="bevel"
          />
        </svg>
      `;
    }
  }
}
// export function headerMobile() {
//   if (window.innerWidth >= 992) return;

//   const hamburger = document.getElementById("hamburger");
//   const subMenu = document.querySelector(".header-sub-menu");
//   const header = document.querySelector("header");

//   const menuItems = document.querySelectorAll(
//     ".header-menu.mobile-layout > ul > li > a",
//   );

//   if (menuItems.length > 0) {
//     gsap.set(menuItems, {
//       y: 10,
//       opacity: 0,
//     });
//   }

//   hamburger.addEventListener("click", function () {
//     this.classList.toggle("active");
//     subMenu.classList.toggle("active");

//     if (this.classList.contains("active")) {
//       document.body.classList.add("overflow-hidden");

//       if (header) {
//         const hadLightTheme = header.classList.contains("header-theme-light");
//         header.classList.add("header-theme-light");

//         if (!hadLightTheme) {
//           header.setAttribute("data-hamburger-light", "true");
//         }
//       }

//       if (window.lenis) {
//         window.lenis.stop();
//       }

//       if (menuItems.length > 0) {
//         gsap.to(menuItems, {
//           y: 0,
//           opacity: 1,
//           duration: 0.6,
//           stagger: 0.08,
//           ease: "power3.out",
//         });
//       }
//     } else {
//       document.body.classList.remove("overflow-hidden");

//       if (header && header.hasAttribute("data-hamburger-light")) {
//         header.classList.remove("header-theme-light");
//         header.removeAttribute("data-hamburger-light");
//       }

//       if (window.lenis) {
//         window.lenis.start();
//       }

//       if (menuItems.length > 0) {
//         gsap.to(menuItems, {
//           y: 10,
//           opacity: 0,
//           duration: 0.4,
//           stagger: 0.04,
//           ease: "power3.in",
//         });
//       }

//       const menuItemsWithChildren = document.querySelectorAll(
//         ".menu-item-has-children",
//       );
//       menuItemsWithChildren.forEach((item) => {
//         item.classList.remove("active");
//       });

//       const allSubMenus = document.querySelectorAll(".sub-menu");
//       allSubMenus.forEach((menu) => {
//         menu.classList.remove("show-menu");
//       });
//     }
//   });

//   const menuItemsWithChildren = document.querySelectorAll(
//     ".menu-item-has-children",
//   );

//   menuItemsWithChildren.forEach((menuItem) => {
//     const menuLink = menuItem.querySelector(":scope > a");

//     if (menuLink) {
//       menuLink.addEventListener("click", function (e) {
//         e.preventDefault();

//         const subMenuElement = menuItem.querySelector(".sub-menu");
//         if (subMenuElement) {
//           subMenuElement.classList.toggle("show-menu");
//           menuItem.classList.toggle("active");
//         }
//       });
//     }
//   });

//   const backButtons = document.querySelectorAll(".sub-menu-back");
//   backButtons.forEach((backButton) => {
//     backButton.addEventListener("click", function (e) {
//       e.preventDefault();
//       e.stopPropagation();

//       const currentSubMenu = this.closest(".sub-menu");
//       if (currentSubMenu) {
//         currentSubMenu.classList.remove("show-menu");

//         const parentMenuItem = currentSubMenu.parentElement;
//         if (
//           parentMenuItem &&
//           parentMenuItem.classList.contains("menu-item-has-children")
//         ) {
//           parentMenuItem.classList.remove("active");
//         }
//       }
//     });
//   });
// }
export function headerMobile() {
  if (window.innerWidth >= 1200) return;

  const hamburger = document.getElementById("hamburger");
  const subMenu = document.querySelector(".header-sub-menu");
  const header = document.querySelector("header");

  const menuItems = document.querySelectorAll(
    ".header-menu.mobile-layout > ul > li > a"
  );

  if (menuItems.length > 0) {
    gsap.set(menuItems, {
      y: 10,
      opacity: 0
    });
  }

  // Detect Chrome on iOS
  const isChromeIOS = /CriOS/.test(navigator.userAgent);

  // Prevent scroll specifically for Chrome iOS
  const preventScroll = (e) => {
    if (!subMenu.contains(e.target)) {
      e.preventDefault();
    }
  };

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    subMenu.classList.toggle("active");

    if (this.classList.contains("active")) {
      document.body.classList.add("overflow-hidden");

      if (header) {
        const hadLightTheme = header.classList.contains("header-theme-light");
        header.classList.add("header-theme-light");

        if (!hadLightTheme) {
          header.setAttribute("data-hamburger-light", "true");
        }
      }

      if (window.lenis) {
        window.lenis.stop();
      }

      // Chỉ apply fix cho Chrome iOS
      if (isChromeIOS) {
        document.addEventListener("touchmove", preventScroll, {
          passive: false
        });
      }

      if (menuItems.length > 0) {
        gsap.to(menuItems, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out"
        });
      }
    } else {
      document.body.classList.remove("overflow-hidden");

      if (header && header.hasAttribute("data-hamburger-light")) {
        header.classList.remove("header-theme-light");
        header.removeAttribute("data-hamburger-light");
      }

      if (window.lenis) {
        window.lenis.start();
      }

      // Remove fix cho Chrome iOS
      if (isChromeIOS) {
        document.removeEventListener("touchmove", preventScroll, {
          passive: false
        });
      }

      if (menuItems.length > 0) {
        gsap.to(menuItems, {
          y: 10,
          opacity: 0,
          duration: 0.4,
          stagger: 0.04,
          ease: "power3.in"
        });
      }

      const menuItemsWithChildren = document.querySelectorAll(
        ".menu-item-has-children"
      );
      menuItemsWithChildren.forEach((item) => {
        item.classList.remove("active");
      });

      const allSubMenus = document.querySelectorAll(".sub-menu");
      allSubMenus.forEach((menu) => {
        menu.classList.remove("show-menu");
      });
    }
  });

  const menuItemsWithChildren = document.querySelectorAll(
    ".menu-item-has-children"
  );

  menuItemsWithChildren.forEach((menuItem) => {
    const menuLink = menuItem.querySelector(":scope > a");

    if (menuLink) {
      menuLink.addEventListener("click", function (e) {
        e.preventDefault();

        const subMenuElement = menuItem.querySelector(".sub-menu");
        if (subMenuElement) {
          subMenuElement.classList.toggle("show-menu");
          menuItem.classList.toggle("active");
        }
      });
    }
  });

  const backButtons = document.querySelectorAll(".sub-menu-back");
  backButtons.forEach((backButton) => {
    backButton.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const currentSubMenu = this.closest(".sub-menu");
      if (currentSubMenu) {
        currentSubMenu.classList.remove("show-menu");

        const parentMenuItem = currentSubMenu.parentElement;
        if (
          parentMenuItem &&
          parentMenuItem.classList.contains("menu-item-has-children")
        ) {
          parentMenuItem.classList.remove("active");
        }
      }
    });
  });
}
export function sectionExperiences() {
  if ($(".section-experience").length < 1) return;

  const percentParallax = $(window).width() < 992 ? 7 : 10;
  const triggerItem =
    $(window).width() < 991
      ? ".section-experience"
      : ".section-experience .col-image .image";

  document
    .querySelectorAll(".section-experience .image-parallax")
    .forEach((wrap) => {
      const img = wrap.querySelector("img");
      if (!img) return;

      gsap.fromTo(
        img,
        { yPercent: `-${percentParallax}` },
        {
          yPercent: percentParallax, // parallax 10%
          ease: "none",
          scrollTrigger: {
            trigger: triggerItem,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });

  const section = document.querySelector(".section-experience");

  if ($(window).width() < 992) return;

  section.querySelectorAll(".box-parallax").forEach((box) => {
    let fromY = 0;
    let toY = 0;

    if (box.classList.contains("box-parallax-top")) {
      fromY = 0;
      toY = -15;
    }

    if (box.classList.contains("box-parallax-bottom")) {
      fromY = 0;
      toY = 15;
    }

    if (fromY === toY) return;

    gsap.fromTo(
      box,
      { yPercent: fromY },
      {
        yPercent: toY,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  });
}

export function popupBookingMobile() {
  if (window.innerWidth >= 992) return;
  const ctaBooking = document.querySelector(".cta-booking");
  const popupBookingMobile = document.querySelector(".booking-form-wrapper");
  const closeBtnPopup = popupBookingMobile.querySelector(".btn-booking-close");
  ctaBooking.addEventListener("click", function () {
    popupBookingMobile.classList.add("active");
  });
  closeBtnPopup.addEventListener("click", function () {
    popupBookingMobile.classList.remove("active");
  });
}
export function animationSubMenu() {
  const isMobile = window.innerWidth < 992;

  const menuItemsWithChildren = document.querySelectorAll(
    "#header .header-menu > ul > li.menu-item-has-children"
  );

  menuItemsWithChildren.forEach((menuItem) => {
    const subMenu = menuItem.querySelector(".sub-menu");
    const subMenuItems = subMenu ? subMenu.querySelectorAll("li") : [];
    const btnViewHotel = subMenu
      ? subMenu.querySelector(".btn-view-hotel")
      : null;

    if (subMenuItems.length > 0) {
      gsap.set(subMenuItems, {
        y: 10,
        opacity: 0
      });
    }

    if (btnViewHotel) {
      gsap.set(btnViewHotel, {
        y: 10,
        opacity: 0
      });
    }

    if (isMobile) {
      // Animation cho mobile - chỉ animate khi MỞ menu
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "class") {
            const hasShowMenu = subMenu?.classList.contains("show-menu");

            if (hasShowMenu) {
              // Chỉ animate in khi mở menu
              if (subMenuItems.length > 0) {
                gsap.to(subMenuItems, {
                  y: 0,
                  opacity: 1,
                  duration: 0.6,
                  stagger: 0.08,
                  ease: "power3.out"
                });
              }

              if (btnViewHotel) {
                gsap.to(btnViewHotel, {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  delay: subMenuItems.length * 0.08,
                  ease: "power3.out"
                });
              }
            } else {
              // Khi đóng menu, reset về trạng thái ban đầu NGAY LẬP TỨC (không có animation)
              if (subMenuItems.length > 0) {
                gsap.set(subMenuItems, {
                  y: 10,
                  opacity: 0
                });
              }

              if (btnViewHotel) {
                gsap.set(btnViewHotel, {
                  y: 10,
                  opacity: 0
                });
              }
            }
          }
        });
      });

      if (subMenu) {
        observer.observe(subMenu, { attributes: true });
      }
    } else {
      // Animation cho desktop với mouseenter/mouseleave
      menuItem.addEventListener("mouseenter", function () {
        if (subMenuItems.length > 0) {
          gsap.to(subMenuItems, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out"
          });
        }

        if (btnViewHotel) {
          gsap.to(btnViewHotel, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: subMenuItems.length * 0.08,
            ease: "power3.out"
          });
        }
      });

      menuItem.addEventListener("mouseleave", function () {
        if (subMenuItems.length > 0) {
          gsap.to(subMenuItems, {
            y: 10,
            opacity: 0,
            duration: 0.6,
            stagger: 0.04,
            ease: "power3.in"
          });
        }

        if (btnViewHotel) {
          gsap.to(btnViewHotel, {
            y: 10,
            opacity: 0,
            duration: 0.6,
            ease: "power3.in"
          });
        }
      });
    }
  });
}

export function bookingServices() {
  if ($("#checkInDateServices").length < 1) return;

  var pickerServices = new Lightpick({
    field: document.getElementById("checkInDateServices"),
    secondField: document.getElementById("checkOutDateServices"),
    singleDate: false,
    minDate: moment().startOf("now"),
    numberOfMonths: 1,
    startDate: moment().startOf("day").toDate(),
    endDate: moment().startOf("day").add(1, "days").toDate()
  });
}
export function clickCta() {
  const ctaWrapper = document.querySelector(".cta-wrapper");
  const ctaGlobal = document.querySelector(".cta-global");

  if (!ctaWrapper || !ctaGlobal) return;

  const isMobile = window.matchMedia("(max-width: 991px)").matches;

  if (isMobile) {
    ctaGlobal.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      ctaWrapper.classList.toggle("is-active");
    });

    document.addEventListener("click", (e) => {
      if (!ctaWrapper.contains(e.target)) {
        ctaWrapper.classList.remove("is-active");
      }
    });
  }
}

export function formContact() {
  if ($("#formContact").length < 1) return;

  $("#formContact").on("submit", function (e) {
    e.preventDefault();

    const $form = $(this);
    const $inputName = $form.find("input[name='name']");
    const $inputEmail = $form.find("input[name='email']");
    const $inputPhone = $form.find("input[name='phone']");
    const $inputHotel = $form.find("input[name='hotel_id']");
    const $inputMessage = $form.find("textarea[name='message']");
    const $buttonSubmit = $form.find("button[type='submit']");
    const $emailRecipient = $buttonSubmit.attr("email-recipient");

    console.log($inputHotel);

    let isValid = true;

    $form.find("input").removeClass("error");

    if ($inputName.val().trim() === "") {
      $inputName.closest(".field-item").addClass("error");
      isValid = false;
    }

    if ($inputPhone.val().trim() === "") {
      $inputPhone.closest(".field-item").addClass("error");
      isValid = false;
    }

    if ($inputEmail.val().trim() === "") {
      $inputEmail.closest(".field-item").addClass("error");
      isValid = false;
    }

    if ($inputMessage.val().trim() === "") {
      $inputMessage.closest(".field-item").addClass("error");
      isValid = false;
    }

    if (!isValid) return;

    $.ajax({
      url: ajaxUrl,
      type: "POST",
      data: {
        action: "submit_contact_form",
        name: $inputName.val().trim(),
        phone: $inputPhone.val().trim(),
        email: $inputEmail.val().trim(),
        hotel: $inputHotel.val().trim(),
        message: $inputMessage.val().trim(),
        email_recipient: $emailRecipient.trim()
      },
      beforeSend: function () {
        $buttonSubmit.addClass("aloading");
      },
      success: function (res) {
        $form[0].reset();
        $form.find(".field-item").removeClass("error");
        $buttonSubmit.removeClass("aloading");
        $("#modal-success-contact").modal("show");
      },
      error: function (xhr, status, error) {
        console.error("Lỗi khi gửi form:", error);
        $form.append(
          '<span class="contact-message body-sm-regular" style="color: #FF0000;">Có lỗi xảy ra, vui lòng thử lại sau.</span>'
        );
        $buttonSubmit.removeClass("aloading");
      }
    });
  });
}

export function formBookingService() {
  if ($("#formBookingService").length < 1) return;

  $("#formBookingService").on("submit", function (e) {
    e.preventDefault();

    const $form = $(this);
    const $inputName = $form.find("input[name='name']");
    const $inputEmail = $form.find("input[name='email']");
    const $inputPhone = $form.find("input[name='phone']");
    const $inputHotel = $form.find("input[name='hotel_id']");
    const $inputMessage = $form.find("textarea[name='message']");
    const $adult = $form.find(".adult-value");
    const $child = $form.find(".child-value");
    const $arrival = $form.find("#checkInDateServices");
    const $departure = $form.find("#checkOutDateServices");
    const $buttonSubmit = $form.find("button[type='submit']");
    const $emailRecipient = $buttonSubmit.attr("email-recipient");
    const $serviceID = $form.find("input[name='service_id']");

    let isValid = true;

    $form.find("input").removeClass("error");

    if ($inputName.val().trim() === "") {
      $inputName.closest(".field-item").addClass("error");
      isValid = false;
    }

    if ($inputPhone.val().trim() === "") {
      $inputPhone.closest(".field-item").addClass("error");
      isValid = false;
    }

    if ($inputEmail.val().trim() === "") {
      $inputEmail.closest(".field-item").addClass("error");
      isValid = false;
    }

    if (!isValid) return;

    $.ajax({
      url: ajaxUrl,
      type: "POST",
      data: {
        action: "submit_service_form",
        name: $inputName.val().trim(),
        phone: $inputPhone.val().trim(),
        email: $inputEmail.val().trim(),
        hotel: $inputHotel.val().trim(),
        adult: $adult.text().trim(),
        child: $child.text().trim(),
        arrival: $arrival.val().trim(),
        departure: $departure.val().trim(),
        message: $inputMessage.val().trim(),
        email_recipient: $emailRecipient.trim(),
        serviceID: $serviceID.val().trim() || ""
      },
      beforeSend: function () {
        $buttonSubmit.addClass("aloading");
      },
      success: function (res) {
        $form[0].reset();
        $form.find(".field-item").removeClass("error");
        $buttonSubmit.removeClass("aloading");
        $("#modal-booking-services").modal("hide");
        $("#modal-success-services").modal("show");
      },
      error: function (xhr, status, error) {
        console.error("Lỗi khi gửi form:", error);
        $form.append(
          '<span class="contact-message body-sm-regular" style="color: #FF0000;">Có lỗi xảy ra, vui lòng thử lại sau.</span>'
        );
        $buttonSubmit.removeClass("aloading");
      }
    });
  });
}

export function bookingFormRedirect() {
  const form = document.getElementById("bookingHotel");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const bookingUrl =
      form.querySelector('input[name="booking_url"]')?.value || "";
    if (!bookingUrl) return;

    const checkInRaw = document.querySelector("#checkInDate")?.value || "";
    const checkOutRaw = document.querySelector("#checkOutDate")?.value || "";

    if (!checkInRaw || !checkOutRaw) return;

    const checkIn = formatDateToISO(checkInRaw);
    const checkOut = formatDateToISO(checkOutRaw);

    const adults =
      document.querySelector(".adult-value")?.textContent.trim() || 1;
    const children =
      document.querySelector(".child-value")?.textContent.trim() || 0;

    const promoCode =
      form.querySelector('input[placeholder*="khuyến mãi"]')?.value.trim() ||
      "";

    const dateIn = new Date(checkIn);
    const dateOut = new Date(checkOut);
    const stayNights = Math.max(
      1,
      Math.round((dateOut - dateIn) / (1000 * 60 * 60 * 24))
    );

    const url = new URL(bookingUrl);

    url.searchParams.set("check_in", checkIn);
    url.searchParams.set("check_out", checkOut);
    // url.searchParams.set("stay_nights", stayNights);
    url.searchParams.set("filter_adult", adults);
    url.searchParams.set("filter_child", children);

    if (promoCode) {
      url.searchParams.set("coupon", promoCode);
    }

    window.location.href = url.toString();
  });

  function formatDateToISO(dateStr) {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("/");
    return `${day}-${month}-${year}`;
  }
}

export function formNewsletter() {
  if ($("#form-newsletter").length < 1) return;

  $("#form-newsletter").on("submit", function (e) {
    e.preventDefault();

    const thisForm = $(this);
    const emailField = thisForm.find("input[type='email']");
    const buttonSubmit = thisForm.find("button[type='submit']");

    emailField.removeClass("error");
    thisForm.siblings("span").remove();

    if (!emailField.length) {
      console.error("Không tìm thấy input email trong form.");
      return;
    }

    const email = emailField.val() ? emailField.val().trim() : "";

    if (!email) {
      thisForm.find(".field-item").addClass("error");
      return;
    }

    $.ajax({
      type: "POST",
      url: ajaxUrl,
      data: {
        action: "nesta_receive_newsletter",
        email: email
      },
      beforeSend: function () {
        console.log("Đang gửi dữ liệu...");
        buttonSubmit.addClass("aloading");
      },
      success: function (res) {
        thisForm.find(".form-message").remove();
        thisForm.find(".field-item").removeClass("error");
        buttonSubmit.removeClass("aloading");

        if (res.success) {
          thisForm[0].reset();
          $("#modalNewsletterSuccess").modal("show");
        } else {
          thisForm.after(`<span class="form-message error">${res.data}</span>`);
        }
      },
      error: function (xhr, status, error) {
        console.error("Lỗi khi gửi form:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại sau.");
      }
    });
  });
}
