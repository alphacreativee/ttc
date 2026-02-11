export function onImagesReady(container, callback) {
  const images = container.querySelectorAll("img");
  let loaded = 0;

  if (!images.length) {
    callback();
    return;
  }

  images.forEach((img) => {
    if (img.complete) {
      loaded++;
    } else {
      img.addEventListener("load", () => {
        loaded++;
        if (loaded === images.length) callback();
      });
    }
  });

  if (loaded === images.length) callback();
}

export function setOfferDescHeightAfterAjax(container) {
  const items = container.querySelectorAll(".offer-item");
  if (!items.length) return;

  // mobile → clear
  if (window.innerWidth < 992) {
    items.forEach((item) => item.style.removeProperty("--height-desc"));
    return;
  }

  items.forEach((item) => {
    const desc = item.querySelector(".content-desc");
    if (!desc) return;

    item.style.setProperty("--height-desc", `${desc.offsetHeight}px`);
  });
}

export function listPostFilter() {
  if ($(".list-post-filter").length < 1) return;

  let wrapper = $(".list-post-filter");
  let currentTerm = "all";
  let currentPage = 1;
  let isLoading = false;

  let functionFilter = "filter_offers";
  if (wrapper.hasClass("new")) {
    functionFilter = "filter_news";
  } else if (wrapper.hasClass("experience")) {
    functionFilter = "filter_experiences";
  }

  let fixedLocation =
    typeof window.EXPERIENCE_FILTER_LOCATION === "number"
      ? window.EXPERIENCE_FILTER_LOCATION
      : "all";

  function loadOffers(term, page = 1) {
    if (isLoading) return;
    isLoading = true;

    $.ajax({
      url: ajaxUrl,
      type: "POST",
      data: {
        action: functionFilter,
        term: term,
        page: page,
        filter_location: fixedLocation
      },
      beforeSend() {
        $(".list-post-filter .list-post").addClass("is-loading");
      },
      success(res) {
        if (!res || !res.success) return;

        const $wrapper = $(".list-post-filter");
        const $list = $wrapper.find(".list-post");

        $list.html(res.data.posts);
        $wrapper.find(".pagination").remove();
        $list.after(res.data.pagination);

        if (wrapper.hasClass("offer")) {
          onImagesReady($list[0], () => {
            setOfferDescHeightAfterAjax($list[0]);
          });
        }

        currentPage = page;
      },
      complete() {
        $(".list-post-filter .list-post").removeClass("is-loading");
        isLoading = false;
      }
    });
  }

  // FILTER CLICK
  $(document).on(
    "click",
    ".list-post-filter .filter-button, .list-post-filter .dropdown-custom-item span",
    function () {
      const tab = $(this).data("tab");
      if (!tab) return;

      currentTerm = tab === "all" ? "all" : tab.replace("post-category-", "");
      currentPage = 1;

      $(".list-post-filter .filter-button").removeClass("active");
      $('.list-post-filter .filter-button[data-tab="' + tab + '"]').addClass(
        "active"
      );

      loadOffers(currentTerm, 1);
    }
  );

  // PAGINATION CLICK
  $(document).on("click", ".list-post-filter .pagination a", function (e) {
    e.preventDefault();

    const page = $(this).data("page") || parseInt($(this).text(), 10);

    if (!page || isNaN(page)) return;

    loadOffers(currentTerm, page);
  });

  // AUTO LOAD khi có filter-location (tuỳ bạn bật)
  if (wrapper.hasClass("experience") && fixedLocation !== "all") {
    // loadOffers("all", 1);
  }
}

export function filterDropdownBoostrapMobile() {
  if ($(".filter-dropdown").length < 1 || $(window).width() > 991) return;

  $(".filter-dropdown .dropdown-custom-item").on("click", function () {
    const span = $(this).find("span");
    if (!span.length) return;

    const tabId = span.data("tab");

    const trigger = $(`[data-bs-target="#${tabId}"]`);
    if (trigger.length) {
      const tab = new bootstrap.Tab(trigger[0]);
      tab.show();
    }
  });
}

export function filterDropdownMobile() {
  if ($(".filter-list-button").length < 1) return;

  const filterListButton = $(".filter-list-button");
  const dropdownMobile = filterListButton.siblings(".filter-dropdown");
  const dropdownItemsMobile = dropdownMobile.find(".dropdown-custom-item");

  const isPageAccommodations =
    $(".section-accommodation, .destination-location").length > 0;

  dropdownItemsMobile.on("click", function () {
    const thisDataTab = $(this).find("span").data("tab");

    if (isPageAccommodations) {
      filterListButton
        .find(`.filter-button[data-type="${thisDataTab}"]`)
        .trigger("click");
    } else {
      filterListButton
        .find(`.filter-button[data-tab="${thisDataTab}"]`)
        .trigger("click");
    }
  });
}
