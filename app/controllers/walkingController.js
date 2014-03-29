define(function(){

	"use strict";

	function walkingController(){

		this.position = 0;

	}

	/**
	* Blueprint for all instances
	*/
	walkingController.prototype = {

		constructor: walkingController,

		walk : function(direction){
			
			//console.log('walking...'+this.position);
			if(direction === 'right')
			this.position += 10;
			else
				this.position -= 10;
			
			return {
				position : this.position,
				state : 'normal'
			}
		}

	};

	return walkingController;

});
