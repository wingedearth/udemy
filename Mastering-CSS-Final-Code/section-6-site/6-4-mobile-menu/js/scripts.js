$(document).ready(function() {
  $(".mobile-menu-icon").on("click", function () {
    $(".primary-nav").toggleClass("active");
    $(this).toggleClass("open");
  }); // on click function
}); // end doc ready
