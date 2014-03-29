define(['core/Renderers/Renderer'], function(Renderer){

	// Options for Inherited object
	// pass this to Renderer Constructor
	// you could pass src streight away without using objects
	var RendererOptions = {
		sprites : 'Characters', // with sprite class should use : its js file. Ex. SpritesCharacters.js -> Characters
		spritesScale : 0.65
	};


	// Background Renderer
	// Inherit from Renderer
	// @Desc:	Render background - depends on the ViewPort position,
	//			and on the schoosen image. Need to implement resize functionality,
	//			as well as repeating backgrounds.
	var RendererCharacter = function(){

		// id name of the created canvas
		var canvasName = 'character';

		// Sprite source sizes
		// not changeable
		var spriteWidth = 93;
		var spriteHeight = 101;

		// Char target sizes
		// changeable for resizing character
		var charWidth = spriteWidth;
		var charHeight = spriteHeight;

		// Canvas width - get instance
		var canvasWidth = this._canvasCols;

		// position modificator
		var posMod = 0;



		/**
		* _Constructor
		*/
		this.initialize = function(){
			this.createCanvas(canvasName);
			//scaleSprite();
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


			
			// draw two backgrounds
			
				this.draw({
					i_startX : 0,
					i_startY : 0,
					i_width : spriteWidth,
					i_height : spriteHeight,
					c_startX : 100,
					c_startY: 650,
					c_width : charWidth, // not used 
					c_height : charHeight, // not used,
					character : 'mario',
					state : position.state
				});

		};


		calcBgHeight = function(){

		};


		// ensures that the callee has invoked our Class' constructor function 
		// with the `new` keyword
		if (!(this instanceof Renderer)) {
			throw new TypeError("RendererCharacter constructor cannot be called as a function.");
		}

		// __constructor execute
		this.initialize();

	};

	// inheritate Renderer
	// getImage before Sprites are created
	RendererCharacter.prototype = new Renderer(RendererOptions);

	return RendererCharacter;

});