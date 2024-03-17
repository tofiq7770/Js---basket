$(document).ready(function() {
  var currentSlide = 0;
  var totalSlides = $('.slider-item').length;
  
  $('.slider-item').eq(currentSlide).show();
  
  $('.prev').click(function() {
    if (currentSlide > 0) {
      currentSlide--;
    } else {
      currentSlide = totalSlides - 1;
    }
    $('.slider-item').hide().eq(currentSlide).fadeIn();
  });
  
  $('.next').click(function() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
    } else {
      currentSlide = 0;
    }
    $('.slider-item').hide().eq(currentSlide).fadeIn();
  });
});

$(document).ready(function(){
  $('.toggle-btn').click(function(){
      $('.sidebar').toggleClass('show');
  });
});