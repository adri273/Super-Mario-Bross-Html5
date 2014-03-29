define(function(){

		var GameEngine = function(callback){

			var engine;

			this.run = function(){
				var animFrame = window.requestAnimationFrame	||
					window.webkitRequestAnimationFrame			||
					window.mozRequestAnimationFrame				||
					window.oRequestAnimationFrame				||
					window.msRequestAnimationFrame				||
					null;

				var recursiveAnim = function() {					
					callback();
					animFrame(recursiveAnim);
				};

				// start the mainloop
				animFrame(recursiveAnim);
			};	
		};

		return GameEngine;

});