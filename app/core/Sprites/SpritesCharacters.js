define(['core/Sprites/Sprites', 'image!public/img/characters/tilset_mario.png'], function (Sprites, img) {

	// Background Renderer
	// Inherit from Renderer
	// @Desc:	Render background - depends on the ViewPort position,
	//			and on the schoosen image. Need to implement resize functionality,
	//			as well as repeating backgrounds.



	var SpritesCharacters = function(){


		// Sprite source sizes
		// not changeable
		var spriteWidth = 93;
		var spriteHeight = 101;

		// define states of the sprites
		// first obj could be the character type
		// the state could be like start-running, end-running etc
		// 
		var spriteStates = {
			'mario' : {		// x y  width height
				'normal'	: [0,0, 93, 101],
				'run'		: [93,0, 93, 101]	
			}
		};

		/**
		* _Constructor
		*/
		this.initialize = function(){
			//this.createCanvas(canvasName);
		};
		
		// return values to modify the draw function
		// for getting the diffrent sprite
		this.getSpritesDrawModificator = function(char, state){
			return spriteStates[char][state];
		};


		// ensures that the callee has invoked our Class' constructor function 
		// with the `new` keyword
		if (!(this instanceof Sprites)) {
			throw new TypeError("SpritesCharacters constructor cannot be called as a function.");
		}

		// __constructor execute
		this.initialize();

	};

	// inheritate Renderer
	SpritesCharacters.prototype = new Sprites(img);

	// static functions
	// before obj is created
	SpritesCharacters.getImage = function(){
		return img;
	};

	return SpritesCharacters;
});