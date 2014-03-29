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


require(['jquery', 'app'], 
function($, App){


    var app = new App();


});// requirejs

