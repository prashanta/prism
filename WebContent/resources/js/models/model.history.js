define([
    'backbone'
], function(Backbone){
    return Backbone.Model.extend({
	   defaults:{
		  title: '',
		  query: false
	   }	
    });
});    