define(['core/Renderers/Renderer', 'image!public/img/backgrounds/1.jpg'], function(Renderer, img){

	// Background Renderer
	// Inherit from Renderer
	// @Desc:	Render background - depends on the ViewPort position,
	//			and on the schoosen image. Need to implement resize functionality,
	//			as well as repeating backgrounds.



	var RendererBackground = function(){

		// id name of the created canvas
		var canvasName = 'background';

		// Background default size
		// currently fixed values
		var bgWidth = 2000;
		var bgHeight = 880;

		// Canvas width - get instance
		var canvasWidth = this._canvasCols;
		var canvasHeight = this._canvasRows;

		// position modificator
		var posMod = 0;

		/**
		* _Constructor
		*/
		this.initialize = function(){
			this.createCanvas(canvasName);
		};
		
		/**
		* Render function
		* Controll what should be rendered and with which paremeters
		* In case of backgrounds, currently we need to have to objects,
		* for repeating background when moving character
		* TODO: implement responsive design 
		*/
		this.render = function(position){

			// clear background everytime
			this.clear();

			// make a loop by changing position to 0
			// when sequence is ended
			position = position - posMod;
			if(position == bgWidth){
				posMod = bgWidth + ( ( posMod / bgWidth ) * bgWidth );
			}

			var bg1 = - ( position );
			var bg2 = ( bgWidth - position );
			var Exceeded = ((bgWidth - canvasWidth) - position > 0) ? (bgWidth - canvasWidth) - position : 0;
			
			// draw two backgrounds
			
				this.draw({
					i_startX : 0,
					i_startY : 0,
					i_width : (canvasWidth + position > bgWidth) ? bgWidth : canvasWidth + position,
					i_height : bgHeight,
					c_startX : bg1,
					c_startY: 0,
					c_width : (canvasWidth + position > bgWidth) ? bgWidth - Exceeded : ( canvasWidth + position ) ,
					c_height : canvasHeight
				});

				this.draw({
					i_startX : 0,
					i_startY : 0,
					i_width : (canvasWidth + position > bgWidth) ? bgWidth : canvasWidth + position,
					i_height : bgHeight,
					c_startX : bg2,
					c_startY: 0,
					c_width : (canvasWidth + position > bgWidth) ? bgWidth - Exceeded : ( canvasWidth + position ) ,
					c_height : canvasHeight
				});

		};


		calcBgHeight = function(){

		};


		// ensures that the callee has invoked our Class' constructor function 
		// with the `new` keyword
		if (!(this instanceof Renderer)) {
			throw new TypeError("RendererBackground constructor cannot be called as a function.");
		}

		// __constructor execute
		this.initialize();

	};

	// inheritate Renderer
	RendererBackground.prototype = new Renderer(img);

	return RendererBackground;

});