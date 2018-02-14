$(document).ready(function(){
  $('.news__items').owlCarousel({
    loop:true,
    nav: true,
    navText: [$('.news__toggle--next'), $('.news__toggle--previous')],
    controlsClass: 'news__toggles',
    navClass: ['news__toggle--next','news__toggle--previous']
  })

});
