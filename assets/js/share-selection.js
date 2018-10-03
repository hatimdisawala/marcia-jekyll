jQuery(document).ready(function($) {
	"use strict";

	var icons = {"icon_fb":"<svg x=\"0px\" y=\"0px\" width=\"6.896px\" height=\"13px\" viewBox=\"0 0 6.896 13\" enable-background=\"new 0 0 6.896 13\"><path class=\"svg-fill\" fill=\"#4C66A4\" d=\"M6.789,2.19H5.565c-0.959,0-1.141,0.46-1.141,1.122v1.474H6.71L6.407,7.095h-1.98v5.919H2.04V7.095H0.052 V4.786H2.04V3.087c0-1.973,1.208-3.049,2.97-3.049c0.845,0,1.568,0.063,1.778,0.094L6.789,2.19L6.789,2.19z\"\/><\/svg>","icon_tw":"<svg x=\"0px\" y=\"0px\" width=\"13.5px\" height=\"10.957px\" viewBox=\"0 0 13.5 10.957\" enable-background=\"new 0 0 13.5 10.957\"><path class=\"svg-fill\" fill=\"#00b6f1\" d=\"M12.075,2.788c0.009,0.119,0.009,0.238,0.009,0.357c0,3.628-2.764,7.812-7.811,7.812 c-1.556,0-3.001-0.451-4.216-1.232C0.278,9.75,0.491,9.757,0.72,9.757c1.283,0,2.465-0.434,3.408-1.172 C2.922,8.559,1.91,7.77,1.562,6.682c0.17,0.024,0.341,0.041,0.519,0.041c0.247,0,0.493-0.033,0.723-0.095 C1.545,6.375,0.602,5.27,0.602,3.935c0-0.008,0-0.025,0-0.034c0.365,0.204,0.79,0.332,1.241,0.348 c-0.74-0.493-1.225-1.334-1.225-2.286c0-0.51,0.137-0.978,0.374-1.385c1.352,1.666,3.383,2.754,5.661,2.873 C6.61,3.247,6.585,3.034,6.585,2.822c0-1.513,1.224-2.745,2.745-2.745c0.79,0,1.504,0.332,2.006,0.867 c0.62-0.119,1.216-0.348,1.742-0.663c-0.204,0.637-0.639,1.173-1.207,1.513c0.553-0.06,1.088-0.212,1.581-0.425 C13.078,1.913,12.609,2.397,12.075,2.788z\"\/><\/svg>"};
	
	var fb = icons.icon_fb,
	tw = icons.icon_tw;

	$.fn.iconFill2Background = function() {
		$(this).each( function() {	
			var fill 	= $(this).find( '.svg-fill' ),
				stroke 	= $(this).find( '.svg-stroke' );
				
			if ( 0 < fill.length ) {
				$(this).css({ 'background-color':fill.attr('fill') });
				
			} else if ( 0 < stroke.length ) {
				$(this).css({ 'background-color':stroke.attr('stroke') });
			}
		});
	}
	
	function getRightClick(e) {
		var rightclick;
		
		if ( !e ) {
			var e = window.event;
		}
		
		if ( e.which ) {
			rightclick = (3 == e.which);
			
		} else if ( e.button ) {
			rightclick = ( 2 == e.button );
		}
		
		return rightclick;
	}

	function getSelectionText() {
		var text = "";
		
		if ( window.getSelection ) {
			text = window.getSelection().toString();
			
		} else if ( document.selection && "Control" != document.selection.type ) {
			text = document.selection.createRange().text;
		}
		
		return text;
	}
	
	// Init the share cloud when the user starts the selection
	$.fn.initShareCloud = function() {
		$(this).mousedown( function (event) {
			/*
			Take the position of the mouse,
			set up the top and the left value as attribute on body tag.
			*/
			$('body').attr( 'mouse-top', event.clientY+window.pageYOffset );
			$('body').attr( 'mouse-left', event.clientX );

			/*
			Remove share button and the old selection.
			( Happens only if the user clicks the left button of the mouse,
			so the right click is still reserved for the genuine browser menu. )
			*/
			if ( !getRightClick(event) && 0 < getSelectionText().length ) {
				$('.share-cloud').remove();
				document.getSelection().removeAllRanges();
			}
		});
	}
	
	// Open the share cloud when the user ends the selection
	$.fn.openShareCloud = function() {
		$(this).mouseup( function (event) {
			var t = $(event.target),
			st = getSelectionText();
			/*
			Continue with action,
			only if the user's click is a left mouse click
			and the selection length is grater than 3 characters.
			*/
			if ( 3 < st.length && ! getRightClick( event ) ) {
				// Get the top mouse position
				var mts = $('body').attr( 'mouse-top' ),
				mte = event.clientY+window.pageYOffset,
				mt;
				
				if( parseInt(mts) < parseInt(mte) ) {
					mt = mts;
					
				} else {
					mt = mte;
				}

				// Get the left mouse position
				var mlp = $('body').attr( 'mouse-left' ),
				mrp = event.clientX,
				ml = parseInt(mlp) + ( parseInt(mrp) - parseInt(mlp) )/2;
				
				/*
				Create the sharing link parameter that will be passed to social network,
				and set the maximum number of characters for the selection.
				*/
				var	sl = window.location.href.split('?')[0],
				maxl = 107;
				
				st = st.substring( 0, maxl );
				
				// Create the share cloud
				var share_cloud = '<span class="share-cloud">';
				
				// Twitter
				share_cloud += '<a class="social-icon round va-m" href="https://twitter.com/intent/tweet?url=' + encodeURIComponent(sl) + '&text=' + encodeURIComponent(st) + '" target="_blank" onclick="window.open(this.href, \'\', \'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600\');return false;">';
				share_cloud += tw;
				share_cloud += '</a>';
				
				// Facebook
				share_cloud += '<a class="social-icon round va-m" onClick="window.open(\'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(sl) + '&picture=&title=&quote=' + encodeURIComponent(st) + '\',\'sharer\',\'toolbar=0,status=0,width=548,height=500\');" href="javascript: void(0)">';
				share_cloud += fb;
				share_cloud += '</a>';
				
				share_cloud += '</span>';
				
				$( 'body' ).append( share_cloud );
				
				var cloud_w = $( '.share-cloud' ).outerWidth();
				$( '.share-cloud .social-icon' ).iconFill2Background();
				/*
				Position the share cloud on calculated position,
				(top of selection and middle of it horizontaly)
				and show it when its ready.
				*/	
				$( '.share-cloud' ).css({
					position: 'absolute',
					top: parseInt(mt) - 60,
					left: parseInt(ml) - cloud_w/2
					
				}).delay(10).queue(function(){					
					$( '.share-cloud .social-icon' ).css('display','inline-block').dequeue();
				});
			}
		});
	}	
	
	$( '.select-share' ).initShareCloud();
	$( '.select-share' ).openShareCloud();
	
	// Remove the share button on clicking outside the popout
	$(document).on( 'click', function(e) {
		if ( 0 === $(e.target).closest( $( '.select-share' ) ).length ) {
			$( '.share-cloud .social-icon' ).hide(200).delay(100).queue(function(){
				$( '.share-cloud' ).remove().dequeue();
			});
		}
	});	
	
	// Remove the share cloud on hitting the Esc key
	$(document).keyup(function(e) {
		if ( 27 === e.keyCode ) {
			$( '.share-cloud .social-icon' ).hide(200).delay(100).queue(function(){
				$( '.share-cloud' ).remove().dequeue();
			});
		}
	});
});