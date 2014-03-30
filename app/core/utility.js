define(function(){

	"use strict";

	var instance;

	// a singleton class object
	function Utility(){

		// object for storing all keys data
		this.version = '1.0.0';
		this.name = 'none';

		this.subscribed = {};

		// object for storing events
		this.$game = $('div#game');
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
		},

		// subscribe function
		// eventName - type of the event, 
		//			- events are fired depend on the type
		// name - name of the event, like PlayerCharRender
		// func - the function
		subscribe : function(eventName, name, func, scope){
			this.subscribed[eventName] = this.subscribed[eventName] || [];
			this.subscribed[eventName].push({
				function : func,
				scope : scope
			});
		},

		// Publish all the functions by the eventName
		publish : function(eventName){
			$.each(this.subscribed[eventName], function(index, obj){
				obj.function.apply(obj.scope);
			});
		},
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