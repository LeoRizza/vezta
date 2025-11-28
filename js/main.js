/* ===================================================================
 * Flare 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {
  "use strict";

  const cfg = {
    scrollDuration: 800, // smoothscroll duration
    mailChimpURL: "", // mailchimp url
  };
  const $WIN = $(window);

  // Add the User Agent to the <html>
  // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
  // const doc = document.documentElement;
  // doc.setAttribute('data-useragent', navigator.userAgent);

  /* preloader
   * -------------------------------------------------- */
  const ssPreloader = function () {
    $("html").addClass("ss-preload");

    $WIN.on("load", function () {
      // force page scroll position to top at page refresh
      $("html, body").animate({ scrollTop: 0 }, "normal");

      // will first fade out the loading animation
      $("#loader").fadeOut("slow", function () {
        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");
      });

      // for hero content animations
      $("html").removeClass("ss-preload");
      $("html").addClass("ss-loaded");
    });
  };

  /* pretty print
   * -------------------------------------------------- */
  const ssPrettyPrint = function () {
    $("pre").addClass("prettyprint");
    $(document).ready(function () {
      prettyPrint();
    });
  };

  /* move header
   * -------------------------------------------------- */
  const ssMoveHeader = function () {
    const $hero = $(".s-hero"),
      $hdr = $(".s-header"),
      triggerHeight = $hero.outerHeight() - 170;

    $WIN.on("scroll", function () {
      let loc = $WIN.scrollTop();

      if (loc > triggerHeight) {
        $hdr.addClass("sticky");
      } else {
        $hdr.removeClass("sticky");
      }

      if (loc > triggerHeight + 20) {
        $hdr.addClass("offset");
      } else {
        $hdr.removeClass("offset");
      }

      if (loc > triggerHeight + 150) {
        $hdr.addClass("scrolling");
      } else {
        $hdr.removeClass("scrolling");
      }
    });
  };

  /* mobile menu
   * ---------------------------------------------------- */
  const ssMobileMenu = function () {
    const $toggleButton = $(".s-header__menu-toggle");
    const $headerContent = $(".s-header__content");
    const $siteBody = $("body");

    $toggleButton.on("click", function (event) {
      event.preventDefault();
      $toggleButton.toggleClass("is-clicked");
      $siteBody.toggleClass("menu-is-open");
    });

    $headerContent.find(".s-header__nav a, .btn").on("click", function () {
      // at 900px and below
      if (window.matchMedia("(max-width: 900px)").matches) {
        $toggleButton.toggleClass("is-clicked");
        $siteBody.toggleClass("menu-is-open");
      }
    });

    $WIN.on("resize", function () {
      // above 900px
      if (window.matchMedia("(min-width: 901px)").matches) {
        if ($siteBody.hasClass("menu-is-open"))
          $siteBody.removeClass("menu-is-open");
        if ($toggleButton.hasClass("is-clicked"))
          $toggleButton.removeClass("is-clicked");
      }
    });
  };

  /* photoswipe
   * ----------------------------------------------------- */
  const ssPhotoswipe = function () {
    const items = [],
      $pswp = $(".pswp")[0],
      $folioItems = $(".folio-item");

    // get items
    $folioItems.each(function (i) {
      let $folio = $(this),
        $thumbLink = $folio.find(".folio-item__thumb-link"),
        $title = $folio.find(".folio-item__title"),
        $caption = $folio.find(".folio-item__caption"),
        $titleText = "<h4>" + $.trim($title.html()) + "</h4>",
        $captionText = $.trim($caption.html()),
        $href = $thumbLink.attr("href"),
        $size = $thumbLink.data("size").split("x"),
        $width = $size[0],
        $height = $size[1];

      let item = {
        src: $href,
        w: $width,
        h: $height,
      };

      if ($caption.length > 0) {
        item.title = $.trim($titleText + $captionText);
      }

      items.push(item);
    });

    // bind click event
    $folioItems.each(function (i) {
      $(this)
        .find(".folio-item__thumb-link")
        .on("click", function (e) {
          e.preventDefault();
          let options = {
            index: i,
            showHideOpacity: true,
          };

          // initialize PhotoSwipe
          let lightBox = new PhotoSwipe(
            $pswp,
            PhotoSwipeUI_Default,
            items,
            options
          );
          lightBox.init();
        });
    });
  };

  /* slick slider
   * ------------------------------------------------------ */
  const ssSlickSlider = function () {
    
    $(".testimonial-slider").slick({
      arrows: true,
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      pauseOnFocus: false,
      autoplaySpeed: 1500,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            arrows: false,
            dots: true,
          },
        },
      ],
    });
  };

  /* animate on scroll
   * ------------------------------------------------------ */
  const ssAOS = function () {
    AOS.init({
      offset: 100,
      duration: 600,
      easing: "ease-in-out",
      delay: 300,
      once: true,
      disable: "mobile",
    });
  };

  /* alert boxes
   * ------------------------------------------------------ */
  const ssAlertBoxes = function () {
    $(".alert-box").on("click", ".alert-box__close", function () {
      $(this).parent().fadeOut(500);
    });
  };

  /* smooth scrolling
   * ------------------------------------------------------ */
  const ssSmoothScroll = function () {
    $(".smoothscroll").on("click", function (e) {
      const target = this.hash;
      const $target = $(target);

      e.preventDefault();
      e.stopPropagation();

      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top,
          },
          cfg.scrollDuration,
          "swing"
        )
        .promise()
        .done(function () {
          window.location.hash = target;
        });
    });
  };

  /* back to top
   * ------------------------------------------------------ */
  const ssBackToTop = function () {
    const pxShow = 800;
    const $goTopButton = $(".ss-go-top");

    // Show or hide the button
    if ($(window).scrollTop() >= pxShow)
      $goTopButton.addClass("link-is-visible");

    $(window).on("scroll", function () {
      if ($(window).scrollTop() >= pxShow) {
        if (!$goTopButton.hasClass("link-is-visible"))
          $goTopButton.addClass("link-is-visible");
      } else {
        $goTopButton.removeClass("link-is-visible");
      }
    });
  };

  /* initialize
   * ------------------------------------------------------ */
  (function ssInit() {
    ssPreloader();
    ssPrettyPrint();
    ssMoveHeader();
    ssMobileMenu();
    ssPhotoswipe();
    ssSlickSlider();
    ssAOS();
    ssAlertBoxes();
    ssSmoothScroll();
    ssBackToTop();
  })();
})(jQuery);

window.addEventListener("scroll", function () {
  const header = document.querySelector(".s-header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

//------------------------------------------

// Abrir modal
document.querySelectorAll(".folio-item").forEach((item) => {
  item.addEventListener("click", function () {
    const pdfUrl = this.getAttribute("data-pdf");
    const iframe = document.getElementById("pdfViewer");
    iframe.src = pdfUrl;
    document.getElementById("pdfModal").style.display = "block";
  });
});

// Cerrar modal
document.querySelector(".pdf-close").addEventListener("click", function () {
  const modal = document.getElementById("pdfModal");
  modal.style.display = "none";
  document.getElementById("pdfViewer").src = ""; // Limpia para evitar errores
});

// Cierre al hacer clic fuera del iframe
window.addEventListener("click", function (event) {
  const modal = document.getElementById("pdfModal");
  if (event.target === modal) {
    modal.style.display = "none";
    document.getElementById("pdfViewer").src = "";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".folio-item2");
  const modal = document.getElementById("pdfModal");
  const iframe = document.getElementById("pdfViewer");
  const closeBtn = document.querySelector(".pdf-close");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const pdfUrl = item.getAttribute("data-pdf");
      iframe.src = pdfUrl;
      modal.style.display = "block";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    iframe.src = "";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      iframe.src = "";
    }
  });
});


/* FORMULARIO */


document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', async function (e) {
    e.preventDefault(); // Evita el envío tradicional

    // Tomamos los datos del formulario
    const data = {
      nombre: document.getElementById('nombre').value,
      empresa: document.getElementById('empresa').value,
      email: document.getElementById('email').value,
      telefono: document.getElementById('telefono').value,
      mensaje: document.getElementById('mensaje').value,
    };

    try {
      const response = await fetch('https://hook.us2.make.com/8m65w7rnn87qxmt1q5gxmc6jdlhkteaw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      // Acá podés mostrar un mensaje de éxito
      alert('¡Gracias! Tu mensaje fue enviado correctamente, te contactaremos en breve.');
      form.reset();
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al enviar el formulario. Por favor, intentá de nuevo.');
    }
  });
});

