window.addEventListener("load", function() {	

    setTimeout(function() {
      var loaderBg = document.querySelector('.loader_bg');
      loaderBg.style.opacity = '0'; // Fade out the loader
      setTimeout(function() {
        loaderBg.style.display = 'none'; // Hide the loader after fading out
      }, 500);
    }, 1500);
  
  });