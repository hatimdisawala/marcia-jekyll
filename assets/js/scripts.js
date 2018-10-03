/*
* Author: Hatim Disawala
* URL: http://www.hatimdisawala.com
* Template Name: Marcia
* Version: 2.0.0
*/

(function($) {
	"use strict";

	$(document).ready(function () {
		var $postContent = $(".post-content");
		$postContent.fitVids();
		mainSlider();

		$('.post-content img').attr('data-action', 'zoom');
		$('.post-content a img').removeAttr('data-action');
	});

	var $item = $('.main-slider.carousel .item');
	var $wHeight = $(window).height();
	$item.eq(0).addClass('active');
	$item.height($wHeight);
	$item.addClass('image-slider');
	$('.main-slider.carousel img').each(function() {
		var $src = $(this).attr('src');
		var $color = $(this).attr('data-color');
		$(this).parent().css({
			'background-image': 'url(' + $src + ')',
			'background-color': $color
		});
		$(this).remove();
	});
	$(window).on('resize', function() {
		$wHeight = $(window).height();
		$item.height($wHeight);
	});

	var objectFitInit = function() {
		if ($().objectFitPolyfill) {
			$(".img-cover").objectFitPolyfill({
				fit: "cover"
			});
		};
	};
	var masonryInit = function() {
		if ($().masonry) {
			$('.posts-grid').masonry({
				itemSelector: '.post-item',
				isFitWidth: true,
				gutter: 30
			});
		};
	};
	var popupInit = function() {
		if ($().magnificPopup) {
			$('.popup').magnificPopup({
				type: 'inline',
				fixedContentPos: false,
				fixedBgPos: true,
				overflowY: 'hidden',
				closeBtnInside: true,
				preloader: false,
				midClick: true,
				removalDelay: 300,
				mainClass: 'my-mfp-slide-bottom'
			});
		}
	};
	
	var featuredMedia = function(){
		/*if ($(".full-post").length > 0) {
			$(".full-post").each(function() {
				var thiseliment = $(this);
				var media_wrapper = $(this).find('featured');
				var media_content_embeded = media_wrapper.find('iframe');
				var container = thiseliment.find('.featured-media');
				container.find('.image-container').hide();
				if (media_content_embeded.length > 0) {
					container.find('.image-container').remove();
					container.addClass('has-iframe');
					container.prepend(media_content_embeded);
				} else {
					container.addClass('no-iframe');
					thiseliment.find('.featured-media').find('.image-container').show();
				}
			});
		}*/
	};

	
	var twitter = function() {
		/*if ($('.tweets').length && twitter_widget_id !== undefined) {
			var twitter_block = '<a class="twitter-timeline" href="'+twitter_url+'" data-widget-id="'+twitter_widget_id+'" data-link-color="#0062CC" data-chrome="nofooter noscrollbar" data-tweet-limit="'+number_of_tweet+'">Tweets</a>';
			twitter_block += "<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\"://platform.twitter.com/widgets.js\";fjs.parentNode.insertBefore(js,fjs);}}(document,\"script\",\"twitter-wjs\");</script>";
			$('.tweets').append(twitter_block);
		}*/
	};

	var mailchimp = function() {
		/*function IsEmail(email) {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return regex.test(email);
		}
		var form = $('#mc-embedded-subscribe-form');
		form.attr("action", mailchimp_form_url.replace('&amp;', '&'));
		var message = $('#mc-embedded-subscribe-form #message');
		var submit_button = $('#mc-embedded-subscribe');
		var email_input = $('#mce-EMAIL');
		form.submit(function(e){
			e.preventDefault();
			submit_button.attr('disabled','disabled');
			if(email_input.val() != '' && IsEmail(email_input.val())) {
				message.html('please wait...').fadeIn(1000);
				var url=form.attr('action');
				if(url=='' || url=='YOUR_MAILCHIMP_WEB_FORM_URL_HERE') {
					alert('Please config your mailchimp form url for this widget');
					return false;
				}
				else{
					url=url.replace('&amp;', '&');

					var data = {};
					var dataArray = form.serializeArray();
					$.each(dataArray, function (index, item) {
						data[item.name] = item.value;
					});
					$.ajax({
						url: url,
						type: "POST",
						data: data,
						dataType: 'json',
						success: function(response, text){
							if (response.result === 'success') {
								message.html(success_message).delay(10000).fadeOut(500).removeClass('hidden');
								submit_button.removeAttr('disabled');
								email_input.val('');
							}
							else{
								message.html(response.result+ ": " + response.msg).delay(10000).fadeOut(500).removeClass('hidden');
								console.log(response);
								submit_button.removeAttr('disabled');
								email_input.focus().select();
							}
						},
						dataType: 'jsonp',
						error: function (response, text) {
							console.log('mailchimp ajax submit error: ' + text);
							submit_button.removeAttr('disabled');
							email_input.focus().select();
						}
					});
					return false;
				}
			} else {
				message.html('Please provide valid email').fadeIn(1000).removeClass('hidden');
				submit_button.removeAttr('disabled');
				email_input.focus().select();
			}
		});*/
	};

	var wResize = function(){
		$(window).resize(function(){
			mainSlider();
		});
	}

	var mainSlider = function(){
		$('.main-slider').height($(window).height()).css({'margin-top':-$('.site-header').outerHeight()});
	}

	var instafeed = function() {
		if ($('#instafeed').length > 0) {
			var userFeed = new Instafeed({
				limit: instagram_count,
                get: 'user', // Get your Instagram Photo. Use - 'user' or 'tagged'
                //tagName: 'awesome', // Use your tag, unmarked this if get photo with tag
                userId: instagram_user_id, //Your user ID
                accessToken: instagram_access_token, //Your Access token on Instagram
                resolution: 'standard_resolution',
                template: '<div class="instagram-photo"><figure class="hover-block"><img src="{{image}}" alt=""><figcaption><div class="link-container"><a class="link-title" href="{{link}}" target="_blank"></a></div></figcaption></figure></div>'
            });
			userFeed.run();
		}
	};

	var contact_form = function() {
		/*if ($('#contact_form').length) {
			var $contactForm = $('#contact_form');
			var $contactFormUrl = $contactForm.attr('action');
			$contactForm.submit(function(e) {
				e.preventDefault();
				$.ajax({
					url: '//formspree.io/'+ contact_email +'',
					method: 'POST',
					data: $(this).serialize(),
					dataType: 'json',
					beforeSend: function() {
						$contactForm.before('<div class="alert alert-info">Sending message…</div>');
					},
					success: function(data) {
						$('.contact-form').find('.alert-info').hide();
						$contactForm.before('<div class="alert alert-success">Message sent!</div>');
					},
					error: function(err) {
						$('.contact-form').find('.alert-info').hide();
						$contactForm.before('<div class="alert alert-danger">Oops, there was an error.</div>');
					}
				});
			});
		}*/
	};

	$(window).scroll(function() {
		$(function() {
			if ($(this).scrollTop() > 50) {
				$('.fixed-header').addClass("sticky");
			} else {
				$('.fixed-header').removeClass("sticky");
			}
		});
	});
	$('a[href^="!#"]').on('click', function(e) {
		e.preventDefault();
		var target = this.hash;
		var $target = $(target);
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 900, 'swing', function() {
			window.location.hash = target;
		});
	});

	$('#search-input').ghostHunter({
		results: "#search-results ul",
		zeroResultsInfo: false,
		onKeyUp: false,
		onComplete: function( results ){
			$("#search-results").css('display','block');
		},
		info_template: "<li class=\"info\">Number of posts found: {{amount}}</li>",
		result_template: '<li><a href="{{link}}">{{title}}</a></li>',
	});

	$(function() {
		objectFitInit();
		masonryInit();
		popupInit();
		featuredMedia();
		wResize();
		mainSlider();
		mailchimp();
		instafeed();
		contact_form();
	});
})(jQuery);
document.documentElement.className += (("ontouchstart" in document.documentElement) ? ' touch' : ' no-touch');
var s = skrollr.init({
	forceHeight: false,
	mobileCheck: function() {
		return false;
	}
});