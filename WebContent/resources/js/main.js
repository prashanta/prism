require.config({
    
    paths:{        
        jquery: '../libs/jquery-1.11.1.min',
        ace: '../libs/ace/ace',
        prism: '../libs/prism',        
        bootstrap: '../libs/bootstrap-3.1.1/js/bootstrap',
        bootbox: '../libs/bootbox-4.2.0.min',        
        underscore: '../libs/underscore-1.8.3.min',
        handlebars: '../libs/handlebars-v1.3.0',
        backbone: '../libs/backbone-1.1.2.min',
        marionette: '../libs/backbone.marionette-2.1.0.min',                
        text: '../libs/text'        
    },
    shim:{
        backbone: {
			exports: 'Backbone',
			deps: ['jquery', 'underscore', 'handlebars']
		},
        marionette: {
			exports: 'Marionette',
			deps: ['backbone']
		},		
        handlebars: {
			exports: 'Handlebars'			
		},
        prism: {
			exports: 'Prism'			
		},
        bootstrap: {			
            deps: ['jquery']
		},
        bootbox: {
            deps: ['bootstrap']
		},
		ace: {
			exports: 'ace',
			deps: ['jquery']
		}
		
    },
    deps: ['jquery', 'underscore', 'handlebars', 'bootstrap', 'ace', 'prism','bootbox']    
});

require(['app'], function(App){    
    App.start();
    Prism.highlightAll();
});