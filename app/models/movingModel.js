define(function(){

	"use strict";

	var instance;

	// singleton class pattern
	// no point in having multiple keyControllers

	function initialize(){
		return new MovingModel();
	}


	function MovingModel(){


	}


	MovingModel.prototype = {

		constructor : MovingModel,

	};


	// singleton patter return func
	return {
		getInstance : function(){
			if(!instance){
				instance = initialize();
			}
			return instance;
		}
	};

});