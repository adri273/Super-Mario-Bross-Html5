define(['jquery','core/utility'], function($, Utility){

	"use strict";

	var keys = [];


	// singleton class pattern
	// no point in having multiple keyControllers
	function keyController(){

		// object for storing all keys data
		this._keys = {};

		this.u = Utility.getInstance();

		console.log(this.u.getInstanceName());

	}

	function getTimeDiff(time){
		return new Date().getTime() - time;
	};

	keyController.prototype = {

		constructor : keyController,

		init : function(){
			var self = this;
			$(window).stop(true, false).on('keydown', function(e) {
				self.keydown(e.keyCode);
			}).stop(true, false).on('keyup', function(e){
				self.keyup(e.keyCode);
			});
		},

		// listen for the pressed keys
		listener : function(){
			this.calcForce();

		},

		// on key down
		keydown : function(key){
			this.registerKey(key);
		},

		// on key up
		keyup : function(key){
			this.unregisterKey(key);
		},

		// register new key on key press
		registerKey : function(key){
			if(typeof this._keys[key] === 'undefined'){
				this._keys[key] = {
					registered : new Date().getTime(),
					key : key,
					force : 0
				};
			}
		},

		// unregister key on key up
		unregisterKey : function(key){
			delete this._keys[key];
		},

		calcForce : function(){
			var self = this;
			$.each(this._keys, function(index, key){
				var diff = getTimeDiff(key.registered);
				key.force = diff/100;
				self.emmitKeys(key);
			});
		},

		getKeys : function(){
			$.each(this._keys, function(index, key){
				console.log(key.key);
			});
		},








		///////////////////////////////
		///////////////////////////////
		///////////////////////////////


		emmitKeys : function(key){
			$(window).trigger({
				type : 'appKeypress',
				key : key.key,
				force : key.force
			});
		}
	};


	return keyController;

});