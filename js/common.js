/*ハンバーガーナビ*/
$(function() {
    $('.nav_open_btn').click(function() {
		$(this).toggleClass('active');
		$('body').toggleClass('nav_open');
		if ($(this).hasClass('active')) {
            $('nav.slide_nav').addClass('active');
        } else {
            $('nav.slide_nav').removeClass('active');
        }
    });
});


/*スムーススクロール*/
jQuery(function($){
	var headerHeight = $('header').outerHeight();
	var urlHash = location.hash;
	if(urlHash) {
		$('body,html').stop().scrollTop(0);
		setTimeout(function(){
			var target = $(urlHash);
			var position = target.offset().top - headerHeight;
			$('body,html').stop().animate({scrollTop:position}, 500);
		}, 100);
	}
	$('a[href^="#"]:not(.noscloll)').click(function() {
		var href= $(this).attr("href");
		var target = $(href);
		var position = target.offset().top - headerHeight;
		$('body,html').stop().animate({scrollTop:position}, 500);	
	});
});



/*リロード時はURLからアンカーリンクの#削除*/
if(performance.navigation.type == 1 && location.hash){
	location.href = location.href.replace(/#.*/, "");
}


/*ハンバーガーボタンの色変更*/
$(window).on('scroll load', function() {
    const $target = $('.white_bg_box').first();
    if (!$target.length) {
        $('header').removeClass('white_mode');
        return;
    }
    const headerHeight = $('header').outerHeight();
    const targetTop = $target.offset().top;
    if ($(window).scrollTop() + headerHeight >= targetTop) {
        $('header').addClass('white_mode');
    } else {
        $('header').removeClass('white_mode');
    }
});

/*360px未満はviewport書き換え*/
!(function () {
  const viewport = document.querySelector('meta[name="viewport"]');
  function switchViewport() {
    const value =
      window.outerWidth > 360
        ? 'width=device-width,initial-scale=1'
        : 'width=360';
    if (viewport.getAttribute('content') !== value) {
      viewport.setAttribute('content', value);
    }
  }
  addEventListener('resize', switchViewport, false);
  switchViewport();
})();


/*Google Fontsを非同期で読み込み*/
window.WebFontConfig = {
  google: { families: ['Noto+Sans+JP','Noto+Serif+JP'] },
  active: function() {
    sessionStorage.fonts = true;
  }
};

(function() {
  var wf = document.createElement('script');
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();


/*フォントを読み込み出来ないまたは時間がかかる場合は、htmlのvisibility: hidden;を強制解除*/
setTimeout(function () {
  document.getElementsByTagName("html")[0].classList.add("wfno-load");
}, 2000);
