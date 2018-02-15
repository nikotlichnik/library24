// $(document).ready(function(){
//   $('.news__items').owlCarousel({
//     loop:true,
//     nav: true,
//     navText: [$('.news__toggle--next'), $('.news__toggle--previous')],
//     controlsClass: 'news__toggles',
//     navClass: ['news__toggle--next','news__toggle--previous']
//   })
//
// });

var toggle = document.querySelector(".main-nav__toggle");
var nav = document.querySelector(".main-nav");

toggle.addEventListener("click", function () {
  if (nav.classList.contains("main-nav--closed")) {
    nav.classList.remove("main-nav--closed");
    nav.classList.add("main-nav--opened");
  } else {
    if (nav.classList.contains("main-nav--opened")) {
      nav.classList.remove("main-nav--opened");
      nav.classList.add("main-nav--closed");
    }
  }
});
