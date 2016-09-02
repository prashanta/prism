/*
 * VIEW FOR INDIVIDUAL QUERY HISTORY ITEM
 */
define([    
    'marionette',
    'templates'
], function(Marionette, templates){
    return Marionette.ItemView.extend({    
        template: templates.history,
        tagName: 'li',		
        events: {
            'click #exec': 'executeQuery',
            'click #delete': 'deleteQuery'
        },
        
        onRender: function(){
        	this.$el.addClass("list-group-item");
        },
        
        executeQuery: function(){
            window.app.vent.trigger("executeQuery", this.model.get("query"));
        },

        deleteQuery: function(){
            window.app.vent.trigger("deleteQuery", this.model);		
            this.remove();
        }
    });
});

