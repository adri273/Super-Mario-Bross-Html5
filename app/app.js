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
    'core/utility'
    ], 
function(require, $, settings, walkingController, keyController, GameEngine, Renderer, RendererBackground, RendererCharacter, Utility){



    function appController(){

        var utility = Utility.getInstance();
        utility.setInstanceName('App.js');
        console.log(utility.getInstanceName());


        var key = new keyController();
        key.init();

        var position = 0;

        var walk = new walkingController();

        var walkingDirectives = {
            position : position,
            character : 'mario',
            state : 'normal'
        };
        $(window).on('appKeypress', function(e) {
            if(e.key === 39)
            //position += 10;
            walkingDirectives = walk.walk('right');
            else if(e.key === 37)
            //position -= 10;
            walkingDirectives = walk.walk('left');
        });



        var bg = new RendererBackground();
        var mario = new RendererCharacter();

        // Controller
        // main application controller
        // main game loop
        var AppController = function(){
            this.run = function(){
                bg.render(walkingDirectives.position);
                mario.render(walkingDirectives);
                key.listener();
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

