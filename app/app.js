///=================================////
//         requireJS config         ////
///=================================////
		
require.config({
    baseUrl: 'app/',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        jquery        : '../libs/jquery',
        socket_io      : '../libs/socket.io.min',
        
        // helpers
        //Session             : 'helpers/sessions',
        image : '' //alias to plugin
        
    },
    shim: {

    }
});


///=================================////
//         App initialization       ////
///=================================////


define(['require', 'jquery', 'settings', 
    'controllers/walkingController', 
    'controllers/keyController',
    'core/engine', 
    'core/Renderers/Renderer', 
    'core/Renderers/RendererBackground', 
    'core/Renderers/RendererCharacter',

    'controllers/playerController',

    'core/utility',
    'socket_io'
    ], 
function(require, $, settings, walkingController, keyController, GameEngine, Renderer, RendererBackground, RendererCharacter, PlayerController, Utility, socket_io){

    function appController(){


        var USEDIPADRESS = 'remote';

        var ipAdress = {
            local : '127.0.0.1',
            remote :  '192.168.0.3'
        };


        var server = socket_io.connect('http://'+ipAdress[USEDIPADRESS]+':9191');
        server.on('connect', function(data){            
            console.log('Player connecting ...');
        });
        server.on('newplayer', function(data){
            console.log('Player - new player connected');
             var playerController = PlayerController.create();
        });


        var u = Utility.getInstance();
        u.setInstanceName('App.js');


        // moving model
        var playerController = PlayerController.create();


        var key = new keyController();
        key.init();

        var position = 0;

        var walk = new walkingController();

        var walkingDirectives = {
            position : position,
            character : 'mario',
            state : 'normal'
        };


        var bg = new RendererBackground();
        //var mario = new RendererCharacter();

        // Controller
        // main application controller
        // main game loop
        var AppController = function(){
            this.run = function(){
                bg.render(walkingDirectives.position);
                //mario.render(walkingDirectives);
                key.listener();

                u.publish('OnHeartbeat');
            };
        };

        // Controller
        // new AppController
        var app = new AppController();

        // Run game Engine
        // pass throught the App Controller
        // - execute AppController Run every frame
        var engine = new GameEngine(app.run);
        engine.run();

    }

    return appController;
 


});// requirejs

