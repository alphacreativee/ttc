export function createFilterTab() {
  document.querySelectorAll(".filter-section").forEach((section) => {
    const result = section.nextElementSibling;
    if (!result?.classList.contains("filter-section-result")) return;

    const buttons = section.querySelectorAll(".filter-button[data-type]");

    // Đảm bảo có ít nhất 1 button active khi load
    if (!section.querySelector(".filter-button.active")) {
      buttons[0]?.classList.add("active");

      // Filter ngay khi load nếu button đầu tiên không phải "all"
      const firstType = buttons[0]?.dataset.type;
      if (firstType && firstType !== "all") {
        result.querySelectorAll(".filter-item").forEach((item) => {
          item.style.display = item.dataset.filter === firstType ? "" : "none";
        });
      }
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", function () {
        section
          .querySelectorAll(".filter-button")
          .forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const type = this.dataset.type;
        const items = result.querySelectorAll(".filter-item");

        ScrollTrigger.getAll().forEach((st) => st.disable());

        gsap
          .timeline()
          .to(result, { autoAlpha: 0, duration: 0.3 })
          .call(() => {
            items.forEach((item) => {
              // Hỗ trợ cả có và không có "all"
              if (type === "all") {
                item.style.display = "";
              } else {
                item.style.display = item.dataset.filter === type ? "" : "none";
              }
            });
          })
          .to(result, { autoAlpha: 1, duration: 0.3 })
          .call(() => {
            ScrollTrigger.getAll().forEach((st) => st.enable());
            ScrollTrigger.refresh();
          });
      });
    });
  });
}

export function createFilterTabMulti() {
  document
    .querySelectorAll(".filter-section-multi, .tab-section")
    .forEach((section) => {
      let result;

      // Tìm filter-section-result theo thứ tự ưu tiên
      const targetSelector = section.dataset.target;
      if (targetSelector) {
        result = document.querySelector(targetSelector);
      } else {
        result = section.querySelector(".filter-section-result");
        if (!result) {
          result = section.nextElementSibling;
          if (!result?.classList.contains("filter-section-result")) return;
        }
      }

      if (!result) return;

      const buttons = section.querySelectorAll(".filter-button[data-type]");

      // Chỉ cần check và filter lần đầu nếu có button active
      const activeBtn = section.querySelector(".filter-button.active");
      if (activeBtn) {
        const activeType = activeBtn.dataset.type;
        if (activeType !== "all") {
          result.querySelectorAll(".filter-item").forEach((item) => {
            item.style.display = item.classList.contains(activeType)
              ? ""
              : "none";
          });
        }
      }

      buttons.forEach((btn) => {
        btn.addEventListener("click", function () {
          section
            .querySelectorAll(".filter-button")
            .forEach((b) => b.classList.remove("active"));
          this.classList.add("active");

          const type = this.dataset.type;
          const items = result.querySelectorAll(".filter-item");

          gsap
            .timeline()
            .to(result, { autoAlpha: 0, duration: 0.3 })
            .call(() => {
              items.forEach((item) => {
                if (type === "all") {
                  item.style.display = "";
                } else {
                  item.style.display = item.classList.contains(type)
                    ? ""
                    : "none";
                }
              });
            })
            .to(result, { autoAlpha: 1, duration: 0.3 });
        });
      });
    });
}
