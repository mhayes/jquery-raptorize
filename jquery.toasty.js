/*
 * jQuery Toasty! Plugin 1.0
 * https://github.com/joepurdy/jquery-toasty
 * Copyright 2014, Joe Purdy
 * Inspired by ZURB's jQuery Raptorize Plugin 1.0 (http://www.ZURB.com/playground)
 * This is a redesigned version of their plugin in the style of Mortal Kombat's Toasty! easter egg
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/


(function($) {

    $.fn.toasty = function(options) {

        //Yo' defaults
        var defaults = {  
            enterOn: 'click', //timer, konami-code, click
            delayTime: 5000 //time before Dan attacks on timer mode
            };  
        
        //Extend those options
        var options = $.extend(defaults, options); 
  
        return this.each(function() {

      var _this = $(this);
      var audioSupported = false;
      //Stupid Browser Checking which should be in jQuery Support
      if ($.browser.mozilla && $.browser.version.substr(0, 5) >= "1.9.2" || $.browser.webkit) { 
        audioSupported = true;
      }
      
      //Toasty Vars
      var toastyImageMarkup = '<img id="elDan" style="display: none" src="toasty.png" />'
      var toastyAudioMarkup = '<audio id="Toasty!" preload="auto"><source src="toasty-sound.mp3" /><source src="toasty-sound.ogg" /></audio>'; 
      var locked = false;
      
      //Append Toasty and Style
      $('body').append(toastyImageMarkup);
      if(audioSupported) { $('body').append(toastyAudioMarkup); }
      var DanForden = $('#elDan').css({
        "position":"fixed",
        "bottom": "0",
        "right" : "-700px",
        "display" : "block"
      })
      
      // Animating Code
      function init() {
      
        //Sound Hilarity
        if(audioSupported) { 
          function playSound() {
            document.getElementById('Toasty!').play();
          }
          playSound();
        }
                
        // Movement Hilarity  
        DanForden.animate({
		"left" : "-=695px"
		}, "fast").delay(500).animate({
		"left" : "+=695px"
		}, "slow"
		);
		}
      
      //Determine Entrance
      if(options.enterOn == 'timer') {
        setTimeout(init, options.delayTime);
      } else if(options.enterOn == 'click') {
        _this.bind('click', function(e) {
          e.preventDefault();
          if(!locked) {
            init();
          }
        })
      } else if(options.enterOn == 'konami-code'){
          
          var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
          $(document).keydown(function(e) {
            kkeys.push( e.keyCode );
            if ( kkeys.toString().indexOf( konami ) >= 0 ){
              $(document).unbind('keydown',arguments.callee);
              init();         
            }
          });
  
      }
      
        });//each call
    }//orbit plugin call
})(jQuery);

