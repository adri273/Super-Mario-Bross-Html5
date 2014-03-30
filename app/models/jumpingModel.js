define(function(){

	"use strict";

	var instance;

	function JumpingModel(){

		// starting position
		this.position = {
			x : 0,
			y : 0
		};



		// jump force
		this.force = 0;

		// speed
		this.speed = 0;

	}


	JumpingModel.prototype = {

		constructor : JumpingModel,

		jump : function(){
			return 650;
		}

	};


	return JumpingModel;

});