class EliteAccordion {
  constructor(accordion) {
    this.animationDuration = 350; // Время анимации в миллисекундах из переменной --animation-duration
    this.accordion = accordion;
    this.hidden = this.accordion.querySelector("[data-accordion-hidden]");
    this.content = this.accordion.querySelector("[data-accordion-content]");
    this.current = this.accordion.querySelector("[data-accordion-current]");
    this.contentHeight = this.content.clientHeight;
    this.accordionIcon = null;
    this.iconHidden = null;
    this.IconShow = null;

    if (this.current.querySelector("[data-accordion-icon]")) {
      this.accordionIcon = this.current.querySelector("[data-accordion-icon]");

      let iconList = this.accordionIcon.getAttribute("data-accordion-icon");
      iconList = iconList.substring(1, iconList.length - 1);
      let iconArray = iconList.split(",");
      if (iconArray.length == 2) {
        this.iconHidden = iconArray[0].trim(),
          this.IconShow = iconArray[1].trim();
      } else {
        console.error("Invalid data-accordion-icon attribute");
      }

      this.accordionIcon.addEventListener("click", function (event) {
        event.preventDefault();
      });
    }
  }

  replaceIcon(hidden = true) {
    if (!this.accordionIcon) {
      return;
    }

    if (!this.accordionIcon.querySelector("use")) {
      console.debug("No use tag found in the accordion icon");
      return;
    }

    if (hidden) {
      this.accordionIcon.querySelector("use")
        .setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', "/assets/templates/img/sprite.svg#" + this.iconHidden);
    } else {
      this.accordionIcon.querySelector("use")
        .setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', "/assets/templates/img/sprite.svg#" + this.IconShow);
    }
  }

  scrollIntoView() {
    this.content.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  show() {
    this.hidden.style.height = `${this.contentHeight}px`;
    this.accordion.classList.add("js-accordion-active");

    // Скролл к открытому аккордеону
    // this.scrollIntoView();

    setTimeout(() => {
      this.replaceIcon(false);
    }, this.animationDuration / 2);
  }

  hide() {
    this.hidden.style.height = "";
    this.accordion.classList.remove("js-accordion-active");

    setTimeout(() => {
      this.replaceIcon(true);
    }, this.animationDuration / 2);
  }

  toggle() {
    this.accordion.classList.contains("js-accordion-active") ? this.hide() : this.show();

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, this.animationDuration);
  }
}

function hideAllAccordions(closestObject) {
  closestObject.querySelectorAll("[data-accordion].js-accordion-active").forEach(function (activeAccordion) {
    if (activeAccordion != event.target.closest("[data-accordion]")) {
      const acc = new EliteAccordion(activeAccordion);
      acc.hide();
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector("[data-accordion]")) {

    document.querySelectorAll("[data-accordion]").forEach(function (accordion) {
      const acc = new EliteAccordion(accordion);

      acc.current.addEventListener("click", function (event) {
        if (acc.current.closest("[data-accordion-content]")) {
          const parentContent = acc.current.closest("[data-accordion-hidden]");

          if (accordion.classList.contains("js-accordion-active")) {
            acc.hide();
            parentContent.style.height = `${parentContent.clientHeight - acc.contentHeight}px`;
          } else {
            acc.show();
            parentContent.style.height = `${parentContent.clientHeight + acc.contentHeight}px`;
          }

          return;
        }

        if (acc.current.closest("[data-accordion-not-close]")) {
          acc.toggle();
          return;
        }

        if (acc.current.closest("[data-accordion-container]")) {
          hideAllAccordions(acc.current.closest("[data-accordion-container]"));
        } else if (acc.current.closest(".section")) {
          hideAllAccordions(acc.current.closest(".section"));
        }
        acc.toggle();
      });

      if (accordion.classList.contains("js-accordion-active")) {
        acc.show();
      }
    });
  }
});
