import { preloadImages } from "../../main/js/utils.min.js";
import {
  customDropdown,
  scrollChangeBgHeader,
  scrollFixedBookingForm,
  setOfferDescHeight,
  checkScrollBookingUp,
  bookingTime,
  effectText,
  animationItemsSection,
  fadeTextFooter,
  ctaRun,
  scrollToTop,
  initGuestSelector,
  accommodationDetail,
  sectionGallery,
  headerMobile,
  sectionExperiences,
  popupBookingMobile,
  animationSubMenu,
  bookingServices,
  clickCta,
  formContact,
  formBookingService,
  bookingFormRedirect,
  formNewsletter,
} from "../../main/js/global.min.js";
import {
  sectionNews,
  sliderWithShadow,
  sliderParallax,
} from "../../main/js/slider.min.js";
import {
  createFilterTab,
  createFilterTabMulti,
} from "../../main/js/tab.min.js";
import { sliderChangeContent } from "../../main/js/sliderChangeContent.min.js";
import { loading } from "../../main/js/loading.min.js";
import { sliderGallery } from "../../main/js/sliderGallery.min.js";
import {
  listPostFilter,
  filterDropdownBoostrapMobile,
  filterDropdownMobile,
} from "../../main/js/filter.min.js";
("use strict");
$ = jQuery;

const lenis = new Lenis();
window.lenis = lenis;
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
document.addEventListener("DOMContentLoaded", () => {
  const loadingElement = document.getElementById("loading");

  if (loadingElement) {
    loading()
      .then(() => {
        sliderChangeContent();
      })
      .catch((err) => console.error("Loading error:", err));
  } else {
    sliderChangeContent();
  }
});

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  effectText();
  animationItemsSection();
  fadeTextFooter();
  customDropdown();
  createFilterTab();
  sectionNews();
  scrollChangeBgHeader();
  // scrollFixedBookingForm();
  setOfferDescHeight();
  // sliderChangeContent();
  checkScrollBookingUp();
  scrollToTop();
  bookingTime();
  ctaRun();
  initGuestSelector();
  sliderParallax();

  accommodationDetail();
  sectionGallery();
  createFilterTabMulti();
  headerMobile();
  sectionExperiences();
  popupBookingMobile();
  animationSubMenu();
  filterDropdownBoostrapMobile();
  bookingServices();
  clickCta();
  formContact();
  listPostFilter();
  formBookingService();
  bookingFormRedirect();
  formNewsletter();
  filterDropdownMobile();
};

preloadImages("img").then(() => {
  init();
});

document.addEventListener("DOMContentLoaded", function () {
  sliderWithShadow();
  sliderGallery();
});

// event click element a
let isLinkClicked = false;

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (
    link?.href &&
    !link.href.startsWith("#") &&
    !link.href.startsWith("javascript:")
  ) {
    isLinkClicked = true;
  }
});

window.addEventListener("beforeunload", () => {
  if (!isLinkClicked) window.scrollTo(0, 0);
  isLinkClicked = false;
});
