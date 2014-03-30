/**
* Renderer Class
* @Params :
* 	> render single data ? or render multiple data
*   > tilset to choose
*	> if single: layer to render
* need to include all the sprites types before executing
*/
define(['require', 'core/Sprites/SpritesCharacters'], function (require) {

	"use strict";

	// static properties

	/**
	* Constructor
	* it returns a new instance of the Class
	*/
	function Renderer(options) {

		// private property
		// Canvas object to draw on
		this._canvas;


		// private property
		// tilset or image - could be array if tilset or 
		// image if background or static image
		//this._img = img;


		// private property
		// canvas size width and height
		this._canvasCols = $(window).width();
		this._canvasRows = $(window).height();


		// level of the canvas layer 
		// in the scope of canvas
		this.layerLevel = options.layerLevel || 0;

		// using sprites or background ?
		this.usingSprites = false;

		// load sprites object by the specified string in options
		// if there is not object as options - set it straight as source src
		console.log(options);
		if(typeof options.sprites !== 'undefined'){
			var Sprites = require('core/Sprites/Sprites'+options.sprites);
			this._img = Sprites.getImage();
			this._sprites = new Sprites();
			this.spritesScale = options.spritesScale;
			this.usingSprites = true;
		}else this._img = options;
		
	}



	// Calculate by proportions
	// @param
	// a : biger height
	// b : smaller height
	// c : target proported value
	function propValue(a, b, c){
		// calc percantage diffrence
		var p =  ( 100 * a) / b;
		return Math.round((( c * 100 ) / p));
	};


	/**
	* Blueprint for all instances
	*/
	Renderer.prototype = {

		constructor: Renderer,


		/**
		* Create canvas element for current object
		* only one canvas element can exists for single object.
		* TODO: implement the layers between canvas in objects ( z-indexes )
		*/
		createCanvas : function(canvasName){
			var background = document.createElement('canvas');
			background.setAttribute("id", "gamecanvas" + canvasName);
			background.setAttribute("class", "gamecanvas");
			background.width = this._canvasCols;
			background.height = this._canvasRows;
			this._canvas = background.getContext('2d');
			var boardElement = $('#game'); 
			boardElement.append(background);

			$('canvas#' + 'gamecanvas' + canvasName).css({
				'z-index' : this.layerLevel
			});
		},

		/**
		* Clear everything from canvas
		* execute only if parent renderer calls it
		* TODO: add auto calling depends on the settings
		*/
		clear : function(){			
			//this._canvas.fillStyle = "rgba(255, 255, 255, 0.5)";
			//this._canvas.fillRect(0,0,this._canvasCols,this._canvasRows);
			this._canvas.clearRect(0,0,this._canvasCols,this._canvasRows);
		},


		/**
		* Draw - main drawing function
		* Draw single tilset, group of objects, or background
		* TODO: needs to be a bit more complicated, for now working on Backgrounds only
		*/
		draw : function(params){
			var self = this;

			// use drawSprites function if sprites
			if(this.usingSprites){
				this.drawSprites(params);
				return;
			}

			this._canvas.drawImage(
				this._img, 					// src

				params.i_startX,			// x coordinate where to start clipping
				params.i_startY,			// y coordinate where to start clipping

				params.i_width,				// The width of the clipped image
				params.i_height,			// The height of the clipped image

				params.c_startX,			// x coordinate where to place the image on the canvas
				params.c_startY,			// y coordinate where to place the image on the canvas

				params.c_width,				// width on the image
				params.c_height				// width on the image
			); 

		},

		// for drawing sprites only,
		// becouse using sprites force us to change some values,
		// with are fixed for backgrounds
		drawSprites : function(params){
			var spriteModificator = this._sprites.getSpritesDrawModificator(params.character, params.state);
			this._canvas.drawImage(
				this._img, 					// src

				params.i_startX+spriteModificator[0],			// x coordinate where to start clipping
				params.i_startY+spriteModificator[1],			// y coordinate where to start clipping

				spriteModificator[2],
				spriteModificator[3],

				params.c_startX,			// x coordinate where to place the image on the canvas
				params.c_startY,			// y coordinate where to place the image on the canvas

				spriteModificator[2] * this.spritesScale,
				spriteModificator[3] * this.spritesScale
			); 
		}

	};

	 

	// return a reference to the constructor function
	return Renderer;
});