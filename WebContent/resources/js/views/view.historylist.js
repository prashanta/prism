define([
    'marionette',    
    'collections/collection.historylist',
    'views/view.history'
], function(Marionette, HistoryList, History){
    
    return Marionette.CollectionView.extend({
        tagName: 'ul',
        childView: History,
        collectionEvents:{
            "remove" : "cleanUp"
        },

        initialize: function(){            
            // Copy stuffs from local storage to Collection
            var history = localStorage.getItem("prismQueryHistory");
            var jHistory = [];
            if(!_.isNull(history)){			
                jHistory = JSON.parse(history);
            }           
            this.collection = new HistoryList(jHistory);		
            this.$el.hide();
        },
        
        onRender: function(){
        	this.$el.addClass("list-group");
        },
        
        onAddChild: function(childView){            
            Prism.highlightAll();
        },

        toggleHistory: function(){	            
            if(this.$el.is(":visible")) 		
                this.$el.slideUp();
            else
                this.$el.slideDown();
        },	

        saveQuery: function(query){			
        	var history = localStorage.getItem("prismQueryHistory");
	   		var data = {'title': '', 'query': query};		
            this.collection.add(data);

            var jHistory = [];
            if(!_.isNull(history)){			
                jHistory = JSON.parse(history);			
            }
            jHistory[jHistory.length] = data;
            localStorage.setItem("prismQueryHistory", JSON.stringify(jHistory));
        },	

        deleteQuery: function(model){		
            this.collection.remove(model);
        },

        cleanUp: function(mode, collection, options){		
            var history = localStorage.getItem("prismQueryHistory");
            var jHistory = [];
            if(!_.isNull(history)){			
                jHistory = JSON.parse(history);								
                jHistory = _.reject(jHistory, function(item, index) {  return index == options.index; });			
                localStorage.setItem("prismQueryHistory", JSON.stringify(jHistory));
            }
        }		
    });
});


