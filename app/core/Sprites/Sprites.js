
define(function () {

	"use strict";

	// static properties

	/**
	* Constructor
	* it returns a new instance of the Class
	*/
	function Sprites(img) {

		// source of the sprite
		this.src = img;

		// sizes of the sprite element
		this.elWidth = 0;
		this.elHeight = 0;



	}





	/**
	* Blueprint for all instances
	*/
	Sprites.prototype = {

		constructor: Sprites,



	};

	 

	// return a reference to the constructor function
	return Sprites;
});