define([
    'backbone'
],function(Backbone){
    return Backbone.Model.extend({
        defaults:{		
		  query: "test",
		  data: [],
		  header: [],
		  message: "",
		  v: -1
	   },	
	   url : function(){				
           return "getData?q=" + encodeURIComponent(this.get('query'));
	   },	
    });  
});