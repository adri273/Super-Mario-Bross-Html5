define(function(){

	"use strict";

	var instance;

	// a singleton class object
	function Utility(){

		// object for storing all keys data
		this.version = '1.0.0';
		this.name = 'none';

	}

	function initialize(){
		return new Utility();
	}


	Utility.prototype = {

		constructor : Utility,

		setInstanceName : function(name){
			this.name = name;
		},

		getInstanceName : function(){
			return this.name;
		}

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