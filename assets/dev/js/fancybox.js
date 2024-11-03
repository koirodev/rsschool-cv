document.addEventListener("DOMContentLoaded", function () {

  Fancybox.bind("[data-fancybox]", {
    Thumbs: false,
    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"],
      },
    },
    Carousel: {
      infinite: false,
      transition: "slide",
    },
  });

  Fancybox.bind("[data-modal]", {
    autoFocus: false,
    // Это для отключения закрытия перетаскиванием
    dragToClose: false,
    Carousel: {
      Panzoom: {
        touch: false,
      }
    }
  });

  document.querySelectorAll("[data-modal]").forEach(button => {
    button.addEventListener("click", function () {
      Fancybox.close();
    });
  });
});
