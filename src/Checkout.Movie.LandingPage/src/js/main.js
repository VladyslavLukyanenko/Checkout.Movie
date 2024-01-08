(function () {
  var slideout = new Slideout({
    'panel': document.querySelector('.Root'),
    'menu': document.querySelector('.MobileMenu'),
    'padding': 256,
    'tolerance': 70
  });

  var mainNav = document.querySelector(".MainNav");
  slideout.on("open", tryToggleSlideout);
  slideout.on("close", tryToggleSlideout);
  slideout.on('translatestart', function() {
    mainNav.classList.add("is-opening");
  });
// Toggle button
  document.querySelector('.MobileMenuToggle').addEventListener('click', function () {
    slideout.toggle();
    tryToggleSlideout();
  });


  new SmoothScroll('a[href*="#"]', {
    speed: 500,
    header: '[data-scroll-header]'
  });

  window.addEventListener("scroll", function () {
    mainNav.classList.toggle("is-scrolled", !!window.scrollY);
  });

  function tryToggleSlideout() {
    mainNav.classList.toggle("is-menuOpened", slideout.isOpen());
    mainNav.classList.remove("is-opening");
  }

  window.addEventListener("load", function () {
    AOS.init();
  });
  
  var questions = document.querySelector(".Questions");
  questions.addEventListener("click", function(e) {
    var target = findParentByClass(e.target, "Questions-item");
    if (!target) {
      return;
    }

    target.classList.toggle("is-open");
    console.log(target);
  });
  
  function findParentByClass(el, cls) {
    if (!el) {
      return false;
    }
    
    return el.classList.contains(cls) && el || findParentByClass(el.parentElement, cls);
  }
})();

