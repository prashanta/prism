/* PRISM 
 * -----
 * A simple application to query database. Store favorite queries
 * in web local store. 
 *  
 *  Author: Prashanta.S
 * */

define([
    'backbone', 
    'marionette',
    'models/model.result',
    'views/header',
    'views/view.querybuilder',
    'views/view.result',
    'views/view.historylist'
], function(Backbone, Marionette, ResultModel, HeaderView, QueryBuilderView, ResultView, HistoryListView){
    // Replace underscore.js with handlebars.js template complier 
    Marionette.TemplateCache.prototype.compileTemplate = function (rawTemplate) {
        return Handlebars.compile(rawTemplate);        
    };
    // Loading animation stuff
    var $loading = $('#loadingDiv').hide();
	$(document).ajaxStart(function () { $loading.show(); }).ajaxStop(function () { $loading.hide(); });
    
    // Create new Marionette Application
    var app = new Marionette.Application();
    // Add regions
    app.addRegions({
        header: '#header',
        modal: '#modal',
        queryBuilder: '#queryBuilder',
        history: '#historyList',
        result: '#result',
    });    
    var model = new ResultModel();
    
    var headerView = new HeaderView();
    var queryView = new QueryBuilderView({model: model});
    var historyView = new HistoryListView();
    var resultView = new ResultView({model: model});
    
	app.header.show(headerView);			
	app.queryBuilder.show(queryView);			
	app.history.show(historyView);
	app.result.show(resultView);    
    
	app.vent.on('toggleHistory', function(){        
		historyView.toggleHistory();		
	});
    
    app.vent.on('saveQuery', function(val){        
		historyView.saveQuery(val);		
	});
    
    app.vent.on('deleteQuery', function(val){        
		historyView.deleteQuery(val);		
	});
    
    app.vent.on('executeQuery', function(val){        
		queryView.executeQuery(val);		
	});
    
    window.app = app;
    
    return app;
    
});