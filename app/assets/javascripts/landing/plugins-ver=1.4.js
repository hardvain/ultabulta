/**
 * Zephyr plugins initialization and main theme JavaScript code
 *
 * @requires jQuery
 */
jQuery(document).ready(function(){
	"use strict";

	// The commonly used DOM elements
	var $window = jQuery(window),
		$html = jQuery('html'),
		$body = jQuery('.l-body'),
		$canvas = jQuery('.l-canvas'),
		$header = jQuery('.l-header'),
		$headerNav = jQuery('.l-header .w-nav'),
		$subheaderTop = jQuery('.l-subheader.at_top'),
		$subheaderMiddle = jQuery('.l-subheader.at_middle'),
		$main = jQuery('.l-main'),
		$topLink = jQuery('.w-toplink');

	if (jQuery.magnificPopup){
		jQuery('.w-gallery-tnails').each(function(){
			jQuery(this).magnificPopup({
				type: 'image',
				delegate: 'a',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1]
				},
				removalDelay: 300,
				mainClass: 'mfp-fade',
				fixedContentPos: false
			});
		});

		if ( ! window.disable_wc_lightbox) {
			jQuery('.product .images').magnificPopup({
				type: 'image',
				delegate: 'a',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1]
				},
				removalDelay: 300,
				mainClass: 'mfp-fade',
				fixedContentPos: false

			});
		}

		jQuery('a[ref=magnificPopup][class!=direct-link]').magnificPopup({
			type: 'image',
			fixedContentPos: false
		});
	}

	if (jQuery().isotope){
		// Applying isotope to portfolio
		jQuery('.w-portfolio.type_sortable').each(function(index, container){
			var $container = jQuery(container),
				$list = $container.find('.w-portfolio-list'),
				$filterItems = $container.find('.w-filters-item');
			$container.imagesLoaded(function(){
				$list.isotope({
					itemSelector: '.w-portfolio-item',
					layoutMode: 'fitRows'
				});
				$filterItems.click(function(){
					var $item = jQuery(this);
					if ($item.hasClass('active')) return;
					$filterItems.removeClass('active');
					$item.addClass('active');
					$list.isotope({filter: $item.attr('data-filter')});
				});
			});
		});

		// Applying isotope to blog posts
		jQuery('.w-blog.type_masonry').each(function(index, container){
			var $container = jQuery(container),
				$list = $container.find('.w-blog-list');
			$list.imagesLoaded(function(){
				$list.isotope({
					itemSelector: '.w-blog-entry',
					layoutMode: 'masonry'
				});
			});
		});

		// Applying isotope to gallery
		jQuery('.w-gallery.type_masonry .w-gallery-tnails').each(function(index, container){
			var $container = jQuery(container);
			$container.imagesLoaded(function(){
				$container.isotope({
					layoutMode: 'masonry'
				});
			});
		});
	}

	if (jQuery().revolution){
		if (jQuery.fn.cssOriginal !== undefined) {
			jQuery.fn.css = jQuery.fn.cssOriginal;
		}
		jQuery('.fullwidthbanner').revolution({
			delay: 9000,
			startwidth: 1140,
			startheight: 500,
			soloArrowLeftHOffset: 20,
			soloArrowLeftVOffset: 0,
			soloArrowRightHOffset: 20,
			soloArrowRightVOffset: 0,
			onHoverStop: "on", // Stop Banner Timet at Hover on Slide on/off
			fullWidth: "on",
			hideThumbs: false,
			shadow: 0 //0 = no Shadow, 1,2,3 = 3 Different Art of Shadows -  (No Shadow in Fullwidth Version !)
		});
	}

	// Show grid items with hierarchical timing
	jQuery.fn.revealGridMD = function(){
		var items = jQuery(this);
		var shown = false;
		var countSz = function(){
			// The vector beetween the first item and max x/y
			var mx = 0,
				my = 0;
			// Retrieving items positions
			var sz = items.map(function(){
				var $this = jQuery(this),
					pos = $this.position();
				pos.width = $this.width();
				pos.height = $this.height();
				// Center point
				pos.cx = pos.left + parseInt(pos.width / 2);
				pos.cy = pos.top + parseInt(pos.height / 2);
				mx = Math.max(mx, pos.cx);
				my = Math.max(my, pos.cy);
				return pos;
			});
			var wx = mx - sz[0].cx,
				wy = my - sz[0].cy,
				wlen = Math.abs(wx * wx + wy * wy);
			// Counting projection lengths
			for (var i = 0; i < sz.length; i++){
				// Counting vector to this item
				var vx = sz[i].cx - sz[0].cx,
					vy = sz[i].cy - sz[0].cy;
				sz[i].delta = (vx * wx + vy * wy) / wlen;
			}
			return sz;
		};
		var sz = countSz();
		items.css('opacity', 0).each(function(i, item){
			var $item = jQuery(item);
			$item.performCSSTransition({
				opacity: 1
			}, 400, function(){
				$item.removeClass('animate_reveal');
			}, null, 750 * sz[i].delta);
		});
	};

	if (jQuery().waypoint){

		jQuery('.animate_fade, .animate_afc, .animate_afl, .animate_afr, .animate_aft, .animate_afb, .animate_wfc, ' +
		'.animate_hfc, .animate_rfc, .animate_rfl, .animate_rfr').each(function(){
			var $elm = jQuery(this);
			new Waypoint({
				element: this,
				handler: function(){
					if ( ! $elm.hasClass('animate_start')){
						setTimeout(function() {
							$elm.addClass('animate_start');
						}, 20);
						this.destroy();
					}
				},
				offset: '85%'
			});
		});

		jQuery('.wpb_animate_when_almost_visible').each(function(){
			var $elm = jQuery(this);
			new Waypoint({
				element: this,
				handler: function(){
					if ( ! $elm.hasClass('wpb_start_animation')){
						setTimeout(function() {
							$elm.addClass('wpb_start_animation');
						}, 20);
						this.destroy();
					}
				},
				offset: '85%'
			});
		});

		jQuery('.animate_revealgrid').each(function(){
			var $elm = jQuery(this);
			new Waypoint({
				element: this,
				handler: function(){
					var $items = $elm.find('.animate_reveal');
					if ($body.hasClass('disable_animation')) return $items.removeClass('animate_reveal');
					$items.revealGridMD();
					this.destroy();
				},
				offset: '85%'
			});
		});

		jQuery('.w-counter').each(function(index, elm){
			var $elm = jQuery(this),
				counter = $elm.find('.w-counter-number'),
				count = parseInt($elm.data('count') || 10),
				prefix = $elm.data('prefix') || '',
				suffix = $elm.data('suffix') || '',
				number = parseInt($elm.data('number') || 0);

			counter.html(prefix+number+suffix);

			new Waypoint({
				element: this,
				handler: function(){
					var	step = Math.ceil((count-number)/25),
						stepCount = Math.floor((count-number) / step),
						handler = setInterval(function(){
							number += step;
							stepCount--;
							counter.html(prefix+number+suffix);
							if (stepCount <= 0) {
								counter.html(prefix+count+suffix);
								window.clearInterval(handler);
							}
						}, 40);
					this.destroy();
				},
				offset: '85%'
			});
		});
	}

	var logoHeight = parseInt(window.logoHeight || 30),
		logoHeightSticky = parseInt(window.logoHeightSticky || 30),
		logoHeightTablets = parseInt(window.logoHeightTablets || 30),
		logoHeightMobiles = parseInt(window.logoHeightMobiles || 30),
		headerDisableStickyHeaderWidth = parseInt(window.headerDisableStickyHeaderWidth || 1023),
		headerDisableAnimationWidth = parseInt(window.headerDisableAnimationWidth || 1023),
		headerMainHeight = parseInt(window.headerMainHeight || 120),
		headerMainShrinkedHeight = parseInt(window.headerMainShrinkedHeight || 60),
		headerExtraHeight = parseInt(window.headerExtraHeight || 36),
		mobileNavWidth = parseInt(window.mobileNavWidth || 1000),
		firstSubmainPadding = parseInt(window.firstSubmainPadding || 0),
		fullscreenSections = jQuery('.l-submain.full_screen'),

		// Canvas modificators
		headerLayout = $canvas.mod('headerlayout'),
		headerPos = $canvas.mod('headerpos'),
		headerBg = $canvas.mod('headerbg'),

		// Window dimensions
		winHeight = parseInt($window.height()),
		winWidth = parseInt($window.width());

	if (firstSubmainPadding !== 0 && headerPos == 'fixed'){
		jQuery('.l-submain').first().css('padding-top', firstSubmainPadding+'px');
	}

	var handleScroll = function(){
		var scrollTop = parseInt($window.scrollTop(), 10);

		$topLink.toggleClass('active', (scrollTop >= winHeight));

		//Move trough each menu and check its position with scroll position then add current class
		jQuery('.w-nav-item a[href*=#]').parents('.w-nav-item').removeClass('current-menu-item');
		jQuery('.w-nav-item a[href*=#]').each(function() {
			var thisLink = jQuery(this),
				thisHref = thisLink.attr('href'),
				thisHash = thisLink.prop('hash');

			if ( ! (
				thisHref.charAt(0) == '#' ||
				(thisHref.charAt(0) == '/' && thisHref.test('^'+location.pathname+'#')) ||
				thisHref.indexOf(location.host+location.pathname+'#') > -1
				)) return;

			if (jQuery(thisHash).length) {

				var thisObj = jQuery(thisHash),
					thisTruePositionTop = parseInt(thisObj.offset().top, 10),
					thisTruePositionBottom = thisTruePositionTop+thisObj.outerHeight(false);

				if (headerPos == 'fixed' && winWidth > mobileNavWidth) {
					if (headerLayout == 'standard' || headerLayout == 'extended'){
						thisTruePositionTop = thisTruePositionTop-(headerMainShrinkedHeight-1);
						thisTruePositionBottom = thisTruePositionBottom-(headerMainShrinkedHeight-1);
					} else {
						thisTruePositionTop = thisTruePositionTop-(headerExtraHeight-1);
						thisTruePositionBottom = thisTruePositionBottom-(headerExtraHeight-1);
					}
				} else {
					thisTruePositionTop = thisTruePositionTop+1;
					thisTruePositionBottom = thisTruePositionBottom+1;
				}

				if(scrollTop >= thisTruePositionTop && scrollTop < thisTruePositionBottom) {
					thisLink.parents('.w-nav-item').addClass('current-menu-item');
				}
			}
		});

		// Fixed header behaviour
		if (headerPos == 'fixed'){
			var topHeaderHeight,
				middleHeaderHeight;

			if (headerBg == 'transparent'){
				var transparent = (scrollTop == 0 && winWidth > headerDisableStickyHeaderWidth);
				if (transparent && (headerLayout == 'advanced' || headerLayout == 'centered') && winWidth < 900) transparent = false;
				$header.toggleClass('transparent', transparent);
			}

			// Sticky header state
			if (scrollTop > 0 && winWidth > headerDisableStickyHeaderWidth){
				$header.addClass('sticky');

				if (headerLayout == 'extended'){
					if (scrollTop > (headerMainHeight-headerMainShrinkedHeight)){
						topHeaderHeight = Math.max(headerExtraHeight+(headerMainHeight-headerMainShrinkedHeight)-scrollTop, 0);
						$subheaderTop.css({'height': topHeaderHeight+'px', 'overflow': 'hidden'});
					} else {
						$subheaderTop.css({'height': headerExtraHeight+'px', 'overflow': ''});
					}

					middleHeaderHeight = Math.max(Math.round(headerMainHeight-scrollTop), headerMainShrinkedHeight);
					$subheaderMiddle.css({'line-height': middleHeaderHeight+'px'});

				} else if (headerLayout == 'advanced' || headerLayout == 'centered'){
					middleHeaderHeight = Math.max(Math.round(headerMainHeight-scrollTop), 0);
					$subheaderMiddle.css({'height': middleHeaderHeight+'px', 'line-height': middleHeaderHeight+'px'});
				} else if (headerLayout == 'standard'){
					middleHeaderHeight = Math.max(Math.round(headerMainHeight-scrollTop), headerMainShrinkedHeight);
					$subheaderMiddle.css({'line-height': middleHeaderHeight+'px'});
				}
			}
			// Static header state
			else {
				$header.removeClass('sticky');

				$subheaderTop.css({'height': headerExtraHeight+'px', 'overflow': ''});
				$subheaderMiddle.css({'height': '', 'line-height': headerMainHeight+'px'});
			}
		}

	};

	var renderMenu = function(){},
		setFixedMobileMaxHeight = function(){};
	if ($headerNav.length > 0){
		var touchMenuInited = $headerNav.hasClass('touch_enabled'),
			touchMenuOpened = false,
			navControl = $headerNav.find('.w-nav-control'),
			navItems = $headerNav.find('.w-nav-item'),
			navList = $headerNav.find('.w-nav-list.level_1'),
			navSubItems = navList.find('.w-nav-item.has_sublevel'),
			navSubAnchors = navList.find('.w-nav-item.has_sublevel > .w-nav-anchor'),
			navSubLists = navList.find('.w-nav-item.has_sublevel > .w-nav-list'),
			navAnchors = $headerNav.find('.w-nav-anchor'),
			togglable = window.headerMenuTogglable || false,
			navAnimation = $headerNav.mod('animation');
		// Count proper dimensions
		setFixedMobileMaxHeight = function(){
			if (winWidth > headerDisableStickyHeaderWidth){
				var headerOuterHeight = $header.outerHeight(),
					navListOuterHeight = Math.min(navList.outerHeight(), headerOuterHeight),
					menuOffset = headerOuterHeight - navListOuterHeight;
				navList.css('max-height', winHeight-menuOffset+'px');
			}
			else{
				navList.css('max-height', 'auto');
			}
		};
		if ( ! touchMenuInited){
			$headerNav.addClass('touch_disabled');
			navList.css('display', 'block');
		}
		// Mobile menu toggler
		navControl.on('click', function(){
			touchMenuOpened = ! touchMenuOpened;
			if (touchMenuOpened){
				// Closing opened sublists
				navItems.filter('.opened').removeClass('opened');
				navSubLists.css('height', 0);

				navList.slideDownCSS();
			}
			else{
				navList.slideUpCSS();
			}
			if (headerPos == 'fixed') setFixedMobileMaxHeight();
		});
		// Mobile submenu togglers
		var toggleEvent = function(e){
			if ( ! touchMenuInited) return;
			e.stopPropagation();
			e.preventDefault();
			var $item = jQuery(this).closest('.w-nav-item'),
				$sublist = $item.children('.w-nav-list');
			if ($item.hasClass('opened')){
				$item.removeClass('opened');
				$sublist.slideUpCSS();
			}
			else {
				$item.addClass('opened');
				$sublist.slideDownCSS();
			}
		};
		// Toggle on item clicks
		if (togglable){
			navSubAnchors.on('click', toggleEvent);
		}
		// Toggle on arrows
		else {
			navList.find('.w-nav-item.has_sublevel > .w-nav-anchor > .w-nav-arrow').on('click', toggleEvent);
		}
		// Mark all the togglable items
		navSubItems.each(function(){
			var $this = jQuery(this),
				$parentItem = $this.parent().closest('.w-nav-item');
			if ($parentItem.length == 0 || $parentItem.mod('columns') === false) $this.addClass('togglable');
		});
		// Touch device handling in default (notouch) layout
		if ( ! $html.hasClass('no-touch')){
			navList.find('.w-nav-item.has_sublevel.togglable > .w-nav-anchor').on('click', function(e){
				if (touchMenuInited) return;
				e.preventDefault();
				var $this = jQuery(this),
					$item = $this.parent(),
					$list = $item.children('.w-nav-list');

				// Second tap: going to the URL
				if ($item.hasClass('opened')) return location.assign($this.attr('href'));

				if (navAnimation == 'height'){
					$list.slideDownCSS();
				}
				else if (navAnimation == 'mdesign'){
					$list.showMD();
				}
				else /*if (navAnimation == 'opacity')*/{
					$list.fadeInCSS();
				}
				$item.addClass('opened');
				var outsideClickEvent = function(e){
					if (jQuery.contains($item[0], e.target)) return;
					$item.removeClass('opened');
					if (navAnimation == 'height'){
						$list.slideUpCSS();
					}
					else if (navAnimation == 'mdesign'){
						$list.hideMD();
					}
					else /*if (navAnimation == 'opacity')*/{
						$list.fadeOutCSS();
					}
					$body.off('touchstart', outsideClickEvent);
				};

				$body.on('touchstart', outsideClickEvent);
			});
		}
		// Desktop device hovers
		else {
			navSubItems
				.filter('.togglable')
				.on('mouseenter', function(){
					if (touchMenuInited) return;
					var $list = jQuery(this).children('.w-nav-list');
					if (navAnimation == 'height'){
						$list.slideDownCSS();
					}
					else if (navAnimation == 'mdesign'){
						$list.showMD();
					}
					else /*if (navAnimation == 'opacity')*/{
						$list.fadeInCSS();
					}
				})
				.on('mouseleave', function(){
					if (touchMenuInited) return;
					var $list = jQuery(this).children('.w-nav-list');
					if (navAnimation == 'height'){
						$list.slideUpCSS();
					}
					else if (navAnimation == 'mdesign'){
						$list.hideMD();
					}
					else /*if (navAnimation == 'opacity')*/{
						$list.fadeOutCSS();
					}
				});
		}
		// Close menu on anchor clicks
		navAnchors.on('click', function(){
			if (winWidth > mobileNavWidth) return;
			// Toggled the item
			if (togglable && jQuery(this).closest('.w-nav-item').hasClass('has_sublevel')) return;
			navList.slideUpCSS();
			touchMenuOpened = false;
		});
		renderMenu = function(){
			// Mobile layout
			if (winWidth <= mobileNavWidth){

				// Switching from desktop to mobile layout
				if ( ! touchMenuInited){
					touchMenuInited = true;
					touchMenuOpened = false;
					navList.css('height', 0);

					// Closing opened sublists
					navItems.filter('.opened').removeClass('opened');
					navSubLists.css('height', 0);

					$headerNav.removeClass('touch_disabled').addClass('touch_enabled');
				}

				// Max-height limitation for fixed header layouts
				if (headerPos == 'fixed') setFixedMobileMaxHeight();
			}

			// Switching from mobile to desktop layout
			else if (touchMenuInited){
				$headerNav.removeClass('touch_enabled').addClass('touch_disabled');

				// Clearing height-hiders
				navList.css({height: '', 'max-height': '', display: 'block', opacity: 1});

				// Closing opened sublists
				navItems.filter('.opened').removeClass('opened');
				navSubLists.css('height', '');
				navItems.filter('.togglable').children('.w-nav-list').css('display', 'none');

				touchMenuInited = false;
				touchMenuOpened = false;
			}

		};
	}

	var updateVideosSizes = function(){
		jQuery('.l-submain-video').each(function(){
			var container = jQuery(this);
			if (winWidth <= 1024) return jQuery(this).hide();
			var mejsContainer = container.find('.mejs-container'),
				poster = container.find('.mejs-mediaelement img'),
				video = container.find('video'),
				videoWidth = video.attr('width'),
				videoHeight = video.attr('height'),
				videoProportion = videoWidth / videoHeight,
				parent = container.parent(),
				parentWidth = parent.outerWidth(),
				parentHeight = parent.outerHeight(),
				proportion,
				centerX, centerY;
			if (mejsContainer.length == 0) return;
			// Proper sizing
//			if (video.length > 0 && video[0].player && video[0].player.media) videoWidth = video[0].player.media.videoWidth;
//			if (video.length > 0 && video[0].player && video[0].player.media) videoHeight = video[0].player.media.videoHeight;

			container.show();

			parent.find('span.mejs-offscreen').hide();

			proportion = (parentWidth/parentHeight > videoWidth/videoHeight)?parentWidth/videoWidth:parentHeight/videoHeight;

			container.width(proportion*videoWidth);
			container.height(proportion*videoHeight);

			video.width(proportion*videoWidth);
			video.height(proportion*videoHeight);

			mejsContainer.width(proportion*videoWidth);
			mejsContainer.height(proportion*videoHeight);

			poster.width(proportion*videoWidth);
			poster.height(proportion*videoHeight);

			centerX = (parentWidth < videoWidth*proportion)?(parentWidth - videoWidth*proportion)/2:0;
			centerY = (parentHeight < videoHeight*proportion)?(parentHeight - videoHeight*proportion)/2:0;

			container.css({ 'left': centerX, 'top': centerY });

//			mejsContainer.css({width: '100%', height: '100%'});
			video.css({'object-fit': 'cover'});
		});
	};

	var handleResize = function(){

		var scrollTop = parseInt($window.scrollTop(), 10);

		// Updating global information about window dimensions
		winHeight = parseInt($window.height());
		winWidth = parseInt($window.width());

		$header.toggleClass('no_fixed', (winWidth <= headerDisableStickyHeaderWidth));
		if (headerBg == 'transparent'){
			var transparent = (scrollTop == 0 && winWidth > headerDisableStickyHeaderWidth);
			if (transparent && (headerLayout == 'advanced' || headerLayout == 'centered') && winWidth < 900) transparent = false;
			$header.toggleClass('transparent', transparent);
		}

		// Disabling animation on mobile devices
		$body.toggleClass('disable_animation', (winWidth <= headerDisableAnimationWidth));

		// Updating fullscreen sections
		fullscreenSections.each(function(){
			var section = jQuery(this),
				spaceHeight = winHeight + 1,
				uavc_bg = null;

			if (section.is(':first-child')) {
				if (winWidth <= headerDisableStickyHeaderWidth) {
					spaceHeight = winHeight-($header.height()-1);
				} else if (headerPos != 'fixed') {
					if (headerLayout == 'standard'){
						spaceHeight = winHeight-(headerMainHeight-1);
					} else {
						spaceHeight = winHeight-(headerMainHeight+headerExtraHeight-1);
					}
				}

			} else {
				if (headerPos == 'fixed' && ( ! (winWidth <= headerDisableStickyHeaderWidth))) {
					if (headerLayout == 'standard' || headerLayout == 'extended'){
						spaceHeight = winHeight-(headerMainShrinkedHeight-1);
					} else {
						spaceHeight = winHeight-(headerExtraHeight-1);
					}
				}
			}

			section.css('min-height', spaceHeight);
			section.imagesLoaded(function() {
				if (section.hasClass('valign_center')) {
					var sectionH = section.find('.l-submain-h'),
						contentHeight;
					sectionH.css('margin-top', '');
					contentHeight = sectionH.outerHeight();
					var heightDifference = parseInt(section.height()) - contentHeight;
					sectionH.css('margin-top', (heightDifference > 0) ? (heightDifference / 2) : '');
				}
				if (uavc_bg = section.find('.upb_row_bg')) {
					uavc_bg.css({'min-height': section.height()});
				}
			});
		});

		// Resizing video properly
		if (window.MediaElementPlayer){
			updateVideosSizes();
		}

		// Redrawing all the Revolution Sliders
		if (window.revapi3 !== undefined){
			window.revapi3.revredraw();
		}

		handleScroll();
		renderMenu();
	};

	if (window.MediaElementPlayer){
		jQuery('.l-submain-video video').mediaelementplayer({
			enableKeyboard: false,
			iPadUseNativeControls: false,
			pauseOtherPlayers: false,
			iPhoneUseNativeControls: false,
			AndroidUseNativeControls: false,
			videoWidth: '100%',
			videoHeight: '100%',
			success: function(mediaElement, domObject){
				updateVideosSizes();
				jQuery(domObject).css('display', 'block');
			}
		});
	}

	/**
	 * Scrolling by hash links
	 */
	var $htmlBody = jQuery('html, body'),
		cancelHashScroll = function(){
			$htmlBody.stop();
			$window.off('keydown mousewheel DOMMouseScroll touchstart', cancelHashScroll);
		};
	$body.on('click', 'a.w-toplink[href*="#"], a.w-logo-link[href*="#"], a.w-nav-anchor[href*="#"], a.g-btn[href*="#"], ' +
		'a.smooth-scroll[href*="#"], a.w-icon-link[href*="#"], a.w-iconbox-link[href*="#"], a.bbp-reply-permalink[href*="#"], ' +
		'.menu-item > a[href*="#"], a.w-blogpost-meta-comments-h[href*="#"], .w-comments-title a[href*="#"], .w-team-link[href*="#"]',
		function(event){

			var href = this.href,
				hash = this.hash;

			// Handling to other URLs or pages
			if ( ! (
					href.charAt(0) == '#' ||
					(href.charAt(0) == '/' && href.test('^'+location.pathname+'#')) ||
					href.indexOf(location.host+location.pathname+'#') > -1
				)) return;

			event.preventDefault();
			event.stopPropagation();

			var scrollTop = 0;
			if (this && hash != '#'){
				// Removing absolute paths
				var $link = jQuery(this),
					$target = jQuery(this.hash);
				if ($target.length){
					scrollTop = $target.offset().top;
					if (winWidth <= mobileNavWidth){
						if ($link.hasClass('w-nav-anchor')){
							var menuHeight = $headerNav.find('.w-nav-list.level_1').height();
							scrollTop -= menuHeight+1;
						} else {
							scrollTop += 1;
						}
					} else {
						if (headerPos == 'fixed') {
							if (headerLayout == 'standard' || headerLayout == 'extended'){
								scrollTop -= (headerMainShrinkedHeight-1);
							} else {
								scrollTop -= (headerExtraHeight-1);
							}
						} else {
							scrollTop += 1;
						}
					}
				}
			}

			$htmlBody.animate({
				scrollTop: scrollTop+"px"
			}, {
				duration: 1200,
				easing: "easeInOutQuint",
				complete: cancelHashScroll
			});
			$window.on('keydown mousewheel DOMMouseScroll touchstart', cancelHashScroll);
		});

	var scrollToHash = function(hash, animate){
		var newOffset = jQuery(hash).offset().top;

		if (headerPos == 'fixed' && winWidth > mobileNavWidth) {
			if (headerLayout == 'standard' || headerLayout == 'extended'){
				newOffset = newOffset-(headerMainShrinkedHeight-1);
			} else {
				newOffset = newOffset-(headerExtraHeight-1);
			}
		} else {
			newOffset = newOffset+1;
		}

		if (animate){
			$htmlBody.animate({
				scrollTop: newOffset+'px'
			}, {
				duration: 1200,
				easing: "easeInOutQuint"
			})
		}
		else {
			$htmlBody.stop().scrollTop(newOffset);
		}
	};
	if (document.location.hash && jQuery(document.location.hash).length){
		scrollToHash(document.location.hash, true);
		// While page loads, its content changes, and we'll keep the proper scroll on each sufficient content change
		// until the page finishes loading or user scrolls the page manually
		var keepScrollPositionTimer = setInterval(function(){
			scrollToHash(document.location.hash);
		}, 100);
		var clearHashEvents = function(){
			clearInterval(keepScrollPositionTimer);
			scrollToHash(document.location.hash);
			$window.off('load touchstart mousewheel DOMMouseScroll touchstart', clearHashEvents);
		};
		$window.on('load touchstart mousewheel DOMMouseScroll touchstart', clearHashEvents);
	}

	handleResize();

	$window.scroll(handleScroll);

	// Recounting objects' positions when the resize is finished
	var resizeTimer = null;
	$window.resize(function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(handleResize, 100);
	});

	jQuery('.contact_form').each(function(){

		jQuery(this).submit(function(){
			var form = jQuery(this),
				name, email, phone, message, captcha, captchaResult,
				post_id = form.find('input[name=post_id]').val(),
				nameField = form.find('input[name=name]'),
				emailField = form.find('input[name=email]'),
				phoneField = form.find('input[name=phone]'),
				messageField = form.find('textarea[name=message]'),
				captchaField = form.find('input[name=captcha]'),
				captchaResultField = form.find('input[name=captcha_result]'),
				button = form.find('.g-btn'),
				errors = 0;

			button.addClass('loading');
			jQuery('.w-form-field-success').html('');

			if (nameField.length) {
				name = nameField.val();

				if (name === '' && nameField.data('required') === 1){
					jQuery('#name_row').addClass('check_wrong');
					jQuery('#name_state').html(window.nameFieldError);

					errors++;
				} else {
					jQuery('#name_row').removeClass('check_wrong');
					jQuery('#name_state').html('');
				}
			}

			if (emailField.length) {
				email = emailField.val();

				if (email === '' && emailField.data('required') === 1){
					jQuery('#email_row').addClass('check_wrong');
					jQuery('#email_state').html(window.emailFieldError);
					errors++;
				} else {
					jQuery('#email_row').removeClass('check_wrong');
					jQuery('#email_state').html('');
				}
			}

			if (phoneField.length) {
				phone = phoneField.val();

				if (phone === '' && phoneField.data('required') === 1){
					jQuery('#phone_row').addClass('check_wrong');
					jQuery('#phone_state').html(window.phoneFieldError);
					errors++;
				} else {
					jQuery('#phone_row').removeClass('check_wrong');
					jQuery('#phone_state').html('');
				}
			}

			if (messageField.length) {
				message = messageField.val();

				if (message === '' && messageField.data('required') === 1){
					jQuery('#message_row').addClass('check_wrong');
					jQuery('#message_state').html(window.messageFieldError);
					errors++;
				} else {
					jQuery('#message_row').removeClass('check_wrong');
					jQuery('#message_state').html('');
				}
			}

			if (captchaField.length){
				captcha = captchaField.val();
				captchaResult = captchaResultField.val();

				if (captcha === ''){
					jQuery('#captcha_row').addClass('check_wrong');
					jQuery('#captcha_state').html(window.captchaFieldError);
					errors++;
				} else {
					jQuery('#captcha_row').removeClass('check_wrong');
					jQuery('#captcha_state').html('');
				}
			}

			if (errors === 0){
				jQuery.ajax({
					type: 'POST',
					url: window.ajaxURL,
					dataType: 'json',
					data: {
						action: 'sendContact',
						post_id: post_id,
						name: name,
						email: email,
						phone: phone,
						message: message,
						captcha: captcha,
						captcha_result: captchaResult
					},
					success: function(data){
						if (data.success){
							jQuery('.w-form-field-success').html(window.messageFormSuccess);

							jQuery('#captcha_row').removeClass('check_wrong');
							jQuery('#captcha_state').html('');

							if (nameField.length) {
								nameField.val('');
								nameField.removeClass('not-empty');
							}
							if (emailField.length) {
								emailField.val('');
								emailField.removeClass('not-empty');
							}
							if (phoneField.length) {
								phoneField.val('');
								phoneField.removeClass('not-empty');
							}
							if (messageField.length) {
								messageField.val('');
								messageField.removeClass('not-empty');
							}
							if (captchaField.length) {
								captchaField.val('');
								captchaField.removeClass('not-empty');
							}

						} else {
							if (data.errors.captcha != undefined) {
								jQuery('#captcha_row').addClass('check_wrong');
								jQuery('#captcha_state').html(data.errors.captcha);
							}
						}

						button.removeClass('loading');
					},
					error: function(){
					}
				});
			} else {
				button.removeClass('loading');
			}

			return false;
		});

	});

	var checkInputEmptiness = function(){
		var $this = jQuery(this);
		if ($this.attr('type') == 'hidden') return;
		$this.toggleClass('not-empty', $this.val() != '');
	};
	jQuery('input, textarea').each(checkInputEmptiness).on('input', checkInputEmptiness);

	jQuery(".w-clients-list").each(function() {
		var clients = jQuery(this),
			autoPlay = clients.attr('data-autoPlay'),
			autoPlaySpeed = clients.attr('data-autoPlaySpeed'),
			columns = clients.attr('data-columns'),
			columns1300 = (columns < 4)?columns:4,
			columns1024 = (columns < 3)?columns:3,
			columns768 = (columns < 2)?columns:2,
			infinite = false,
			rtl = false;
		if ($body.hasClass('rtl')) {
			rtl = true;
		}
		if (autoPlay == 1) {
			autoPlay = infinite = true;
		} else {
			autoPlay = infinite = false;
		}
		clients.slick({
			rtl: rtl,
			infinite: infinite,
			autoplay: autoPlay,
			lazyLoad: 'progressive',
			autoplaySpeed: autoPlaySpeed,
			accessibility: false,
			slidesToShow: columns,
			responsive: [{
				breakpoint: 1300,
				settings: {
					slidesToShow: columns1300
				}
			},{
				breakpoint: 1024,
				settings: {
					slidesToShow: columns1024
				}
			},{
				breakpoint: 768,
				settings: {
					slidesToShow: columns768
				}
			},{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}]
		});
	});

	if (jQuery().fotorama){
		jQuery('.fotorama').fotorama({
			spinner: {
				lines: 13,
				color: 'rgba(0, 0, 0, .75)'
			}
		});
	}

	/* Ultimate Addons for Visual Composer integration */
	jQuery('.upb_bg_img, .upb_color, .upb_grad, .upb_content_iframe, .upb_content_video, .upb_no_bg').each(function() {
		var $bg = jQuery(this),
			$prev = $bg.prev();

		if ($prev.length == 0) {
			var $parent = $bg.parent(),
				$parentParent = $parent.parent(),
				$prevParentParent = $parentParent.prev();

			if ($prevParentParent.length) {
				$bg.insertAfter($prevParentParent);

				if ( $parent.children().length == 0 ) {
					$parentParent.remove();
				}
			}
		}


	});

	$window.load(function(){
		jQuery('.overlay-show').click(function() {
			window.setTimeout(function(){
				var $overlay = jQuery('.ult-overlay.ult-open');
				if ($overlay.length) {
					$overlay.find('.w-map').each(function(map){
						var mapObj = jQuery(this).data('gMap.reference'),
							center = mapObj.getCenter();

						google.maps.event.trigger(jQuery(this)[0], 'resize');
						if (jQuery(this).data('gMap.infoWindows').length) {
							jQuery(this).data('gMap.infoWindows')[0].open(mapObj, jQuery(this).data('gMap.overlays')[0]);
						}
						mapObj.setCenter(center);

					});
				}
			}, 1000);
		});
	});

	function update_cart_widget(event){
		if(typeof event != 'undefined')
		{
			var cart = jQuery('.w-cart'),
				notification = jQuery('.w-cart-notification'),
				productName = notification.find('.product-name'),
				quantity = cart.find('.w-cart-quantity'),
				quantity_val = parseInt(quantity.html(), 10);

			if ( ! cart.hasClass('has_items')) {
				cart.addClass('has_items');
			}

			quantity_val++;
			quantity.html(quantity_val);

			notification.css({display: 'block', opacity: 0});

			productName.html(addedProduct);
			notification.animate({opacity: 1}, 300, function(){
				window.setTimeout(function(){
					notification.animate({opacity: 0},300, function(){
						notification.css({display: 'none'});
					});
				}, 3000);
			});


		}
	}

	var addedProduct = 'Product';

	jQuery('.add_to_cart_button').click(function(){
		var productContainer = jQuery(this).parents('.product').eq(0);
		addedProduct = productContainer.find('h3').text();
	});

	jQuery('body').bind('added_to_cart', update_cart_widget);


});

// Disable FotoRama statistics usage
window.blockFotoramaData = true;

/**
 * CSS-analog of jQuery slideDown/slideUp/fadeIn/fadeOut functions (for better rendering)
 */
!function(){
	jQuery.fn.clearPreviousTransitions = function(){
		// Stopping previous events, if there were any
		var prevTimers = (this.data('animation-timers') || '').split(',');
		if (prevTimers.length == 2){
			this.css({
				transition: '',
				'-webkit-transition': ''
			});
			clearTimeout(prevTimers[0]);
			clearTimeout(prevTimers[1]);
			this.removeData('animation-timers');
		}
	};
	/**
	 *
	 * @param {Object} css key-value pairs of animated css
	 * @param {Number} duration in milliseconds
	 * @param {Function} onFinish
	 * @param {String} easing CSS easing name
	 * @param {Number} delay in milliseconds
	 */
	jQuery.fn.performCSSTransition = function(css, duration, onFinish, easing, delay){
		duration = duration || 250;
		delay = delay || 25;
		easing = easing || 'ease-in-out';
		var $this = this,
			transition = [];

		this.clearPreviousTransitions();

		for (var attr in css){
			if ( ! css.hasOwnProperty(attr)) continue;
			transition.push(attr+' '+(duration/1000)+'s '+easing);
		}
		transition = transition.join(', ');
		$this.css({
			transition: transition,
			'-webkit-transition': transition
		});

		// Starting the transition with a slight delay for the proper application of CSS transition properties
		var timer1 = setTimeout(function(){
			$this.css(css);
		}, delay);

		var timer2 = setTimeout(function(){
			if (typeof onFinish == 'function') onFinish();
			$this.css({
				transition: '',
				'-webkit-transition': ''
			});
		}, duration + delay);

		this.data('animation-timers', timer1+','+timer2);
	};
	// Height animations
	jQuery.fn.slideDownCSS = function(){
		if (this.length == 0) return;
		var $this = this;
		this.clearPreviousTransitions();
		// Grabbing paddings
		this.css({
			'padding-top': '',
			'padding-bottom': ''
		});
		var timer1 = setTimeout(function(){
			var paddingTop = parseInt($this.css('padding-top')),
				paddingBottom = parseInt($this.css('padding-bottom'));
			// Grabbing the "auto" height in px
			$this.css({
				visibility: 'hidden',
				position: 'absolute',
				height: 'auto',
				'padding-top': 0,
				'padding-bottom': 0,
				display: 'block'
			});
			var height = $this.height();
			$this.css({
				overflow: 'hidden',
				height: '0px',
				visibility: '',
				position: '',
				opacity: 0
			});
			$this.performCSSTransition({
				height: height + paddingTop + paddingBottom,
				opacity: 1,
				'padding-top': paddingTop,
				'padding-bottom': paddingBottom
			}, arguments[0] || 250, function(){
				$this.css({
					overflow: '',
					height: 'auto'
				});
			});
		}, 25);
		this.data('animation-timers', timer1+',null');
	};
	jQuery.fn.slideUpCSS = function(){
		if (this.length == 0) return;
		this.clearPreviousTransitions();
		this.css({
			height: this.outerHeight(),
			overflow: 'hidden',
			'padding-top': this.css('padding-top'),
			'padding-bottom': this.css('padding-bottom'),
			opacity: 1
		});
		var $this = this;
		this.performCSSTransition({
			height: 0,
			'padding-top': 0,
			'padding-bottom': 0,
			opacity: 0
		}, arguments[0] || 250, function(){
			$this.css({
				overflow: '',
				'padding-top': '',
				'padding-bottom': '',
				display: 'none'
			});
		});
	};
	// Opacity animations
	jQuery.fn.fadeInCSS = function(){
		if (this.length == 0) return;
		this.clearPreviousTransitions();
		this.css({
			opacity: 0,
			display: 'block'
		});
		this.performCSSTransition({
			opacity: 1
		}, arguments[0] || 250);
	};
	jQuery.fn.fadeOutCSS = function(){
		if (this.length == 0) return;
		var $this = this;
		this.performCSSTransition({
			opacity: 0
		}, arguments[0] || 250, function(){
			$this.css('display', 'none');
		});
	};
	// Material design animations
	jQuery.fn.showMD = function(){
		if (this.length == 0) return;
		this.clearPreviousTransitions();
		// Grabbing paddings
		this.css({
			'padding-top': '',
			'padding-bottom': ''
		});
		var paddingTop = parseInt(this.css('padding-top')),
			paddingBottom = parseInt(this.css('padding-bottom'));
		// Grabbing the "auto" height in px
		this.css({
			visibility: 'hidden',
			position: 'absolute',
			height: 'auto',
			'padding-top': 0,
			'padding-bottom': 0,
			'margin-top': -20,
			opacity: '',
			display: 'block'
		});
		var height = this.height();
		this.css({
			overflow: 'hidden',
			height: '0px',
			visibility: '',
			position: ''
		});
		var $this = this;
		this.performCSSTransition({
			height: height + paddingTop + paddingBottom,
			'margin-top': 0,
			'padding-top': paddingTop,
			'padding-bottom': paddingBottom
		}, arguments[0] || 350, function(){
			$this.css({
				overflow: '',
				height: 'auto',
				'margin-top': '',
				'padding-top': '',
				'padding-bottom': ''
			});
		}, 'cubic-bezier(.23,1,.32,1)', 150);
	};
	jQuery.fn.hideMD = function(){
		if (this.length == 0) return;
		this.clearPreviousTransitions();
		var $this = this;
		this.css({
			'margin-top': ''
		});
		this.performCSSTransition({
			opacity: 0
		}, arguments[0] || 100, function(){
			$this.css({
				display: 'none',
				opacity: ''
			});
		});
	};
}();

/**
 * Retrieve/set/erase modificator class <mod>_<value>
 * @param {String} mod Modificator namespace
 * @param {String} [value] Value
 * @returns {string|jQuery}
 */
jQuery.fn.mod = function(mod, value){
	if (this.length == 0) return this;
	// Remove class modificator
	if (value === false){
		this.get(0).className = this.get(0).className.replace(new RegExp('(^| )'+mod+'\_[a-z0-9]+( |$)'), '$2');
		return this;
	}
	var pcre = new RegExp('^.*?'+mod+'\_([a-z0-9]+).*?$'),
		arr;
	// Retrieve modificator
	if (value === undefined){
		return (arr = pcre.exec(this.get(0).className)) ? arr[1] : false;
	}
	// Set modificator
	else {
		this.mod(mod, false).get(0).className += ' '+mod+'_'+value;
		return this;
	}
};

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
// Fixing hovers for devices with both mouse and touch screen
if ( ! jQuery.browser.mobile) jQuery('html').addClass('no-touch');
