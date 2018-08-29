// /**
//  * demo.js
//  * http://www.codrops.com
//  *
//  * Licensed under the MIT license.
//  * http://www.opensource.org/licenses/mit-license.php
//  *
//  * Copyright 2016, Codrops
//  * http://www.codrops.com
//  */
// ;(function(window) {
//
// 	'use strict';
//
// 	// taken from mo.js demos
// 	function isIOSSafari() {
// 		var userAgent;
// 		userAgent = window.navigator.userAgent;
// 		return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
// 	};
//
// 	// taken from mo.js demos
// 	function isTouch() {
// 		var isIETouch;
// 		isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
// 		return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
// 	};
//
// 	// taken from mo.js demos
// 	var isIOS = isIOSSafari(),
// 		clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';
//
// 	function extend( a, b ) {
// 		for( var key in b ) {
// 			if( b.hasOwnProperty( key ) ) {
// 				a[key] = b[key];
// 			}
// 		}
// 		return a;
// 	}
//
// 	function Animocon(el, options) {
// 		this.el = el;
// 		this.options = extend( {}, this.options );
// 		extend( this.options, options );
//
// 		this.checked = false;
//
// 		this.timeline = new mojs.Timeline();
//
// 		for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
// 			this.timeline.add(this.options.tweens[i]);
// 		}
//
// 		var self = this;
// 		this.el.addEventListener(clickHandler, function() {
// 			if( self.checked ) {
// 				self.options.onUnCheck();
// 			}
// 			else {
// 				self.options.onCheck();
// 				self.timeline.start();
// 			}
// 			self.checked = !self.checked;
// 		});
// 	}
//
// 	Animocon.prototype.options = {
// 		tweens : [
// 			new mojs.Burst({
// 				shape : 'circle',
// 				isRunLess: true
// 			})
// 		],
// 		onCheck : function() { return false; },
// 		onUnCheck : function() { return false; }
// 	};
//
// 	// grid items:
// 	var items = [].slice.call(document.querySelectorAll('ol.grid > .grid__item'));
//
// 	function init() {
// 		/* Icon 1 */
// 		var el1 = document.querySelector('button.icobutton'), el1span = document.querySelector('button.icobutton span');
// 		alert(el1)
// 		new Animocon(el1, {
// 			tweens : [
// 				// burst animation
// 				new mojs.Burst({
// 					parent: el1,
// 					duration: 1700,
// 					shape : 'circle',
// 					fill: '#C0C1C3',
// 					x: '50%',
// 					y: '50%',
// 					opacity: 0.6,
// 					childOptions: { radius: {15:0} },
// 					radius: {30:90},
// 					count: 6,
// 					isRunLess: true,
// 					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
// 				}),
// 				// ring animation
// 				new mojs.Transit({
// 					parent: el1,
// 					duration: 700,
// 					type: 'circle',
// 					radius: {0: 60},
// 					fill: 'transparent',
// 					stroke: '#C0C1C3',
// 					strokeWidth: {20:0},
// 					opacity: 0.6,
// 					x: '50%',
// 					y: '50%',
// 					isRunLess: true,
// 					easing: mojs.easing.sin.out
// 				}),
// 				// icon scale animation
// 				new mojs.Tween({
// 					duration : 1200,
// 					onUpdate: function(progress) {
// 						if(progress > 0.3) {
// 							var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
// 							el1span.style.WebkitTransform = el1span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
// 						}
// 						else {
// 							el1span.style.WebkitTransform = el1span.style.transform = 'scale3d(0,0,1)';
// 						}
// 					}
// 				})
// 			],
// 			onCheck : function() {
// 				el1.style.color = 'red';
// 			},
// 			onUnCheck : function() {
// 				el1.style.color = '#C0C1C3';
// 			}
// 		});
// 		/* Icon 1 */
// 	}
//
// 	init();
//
// })(window);