define([
	'core/utility', 
	'models/playerModel',
    'core/Renderers/Renderer', 
    'core/Renderers/RendererCharacter',
    'models/jumpingModel'
    ], function(Utility, Model, Renderer, RendererCharacter, JumpingModel){

	"use strict";

	function PlayerController(){

		// global utilities
		this._u = Utility.getInstance();
		this._model;
		this._renderer = new RendererCharacter();
		this._jumpingModel = new JumpingModel();

		// player position
		this.playerPosition = 110;

		// player jump
		this.playerPositionY = 600;

		// player move state
		this.playerMoveState = 'normal';

		// stricte mario char data
		this.playerData = {
			health	: 100,
			lives	: 5,
			risingLevel : 0, // after mushrooms
		};

		// subscribe
		this._u.subscribe('OnHeartbeat', 'PlayerCharacter', this.render, this);
	}

	/**
	*  Static constructor
	*/
	PlayerController.create = function(){
		var playerCtrl =  new PlayerController();
		playerCtrl.initialize();
		return playerCtrl;
	};


	/*
	* Prototype function
	*/
	PlayerController.prototype = {

		constructor : PlayerController,

		initialize : function(){
			this.keyBinding();
		},

		/** 
		* Bind key events to certain actions
		* moving, jumping, shooting etc
		*/
		keyBinding : function(){
			var self = this;
			$(this._u.$game).on('appKeypress', function(e){
				if(e.key === 39){
					self.charMove(1, e);
				}
				if(e.key === 37){
					self.charMove(-1, e);
				}
				if(e.key === 38){
					self.charJump(-1, e);
				}
			});
		},

		/* 
		* Calculate player moving
		*/
		charMove : function(dir, e){
			var force = (e.force > 8) ? 8 : e.force;
			var m = ( 1.2 * ( force ) / 1.2);
			this.playerPosition += m * dir;
		},

		/*
		* Calculate player jump 
		*/
		charJump : function(dir, e){
			var force = (e.force > 8) ? 8 : e.force;
			var m = ( 1.2 * ( force ) / 1.2);
			//this.playerPositionY += m * dir;
			this.playerPositionY = this._jumpingModel.jump();
		},

		render : function(){
			this._renderer.render({
				position : {
					x : this.playerPosition,
					y : this.playerPositionY
				},
				state : this.playerMoveState 
			});
		}
	};


	return PlayerController;

});