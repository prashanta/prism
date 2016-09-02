define([
    'marionette',
    'templates',
    'bootbox',
    'ace'
], function(Marionette, templates, bootbox, ace){
	return Marionette.ItemView.extend({
        tagName: 'div',
        template: templates.explorer,
        ui :{
            editor : '#editor'
        },
        editor: {},
        events: {
            'click #submit': 'submitQuery',
            'click #history': 'toggleHistory',
            'click #save': 'saveQuery'
        },
        
        onRender: function(){
            this.editor = ace.edit(this.ui.editor.get(0));
            this.editor.setTheme("ace/theme/cobalt");
            this.editor.getSession().setMode("ace/mode/sql");
            this.editor.setOptions({ maxLines: Infinity });
        },

        submitQuery: function() {
            var query = this.editor.getSession().getValue();
            if(_.isEmpty(query)){
                bootbox.alert("Nothing to query", function() {});
            }
            else{
                this.model.set("query", query);				
                this.model.fetch();
            }
        },

        toggleHistory: function() {	
            console.log("Toggle History");
            window.app.vent.trigger('toggleHistory');            
        },

        saveQuery: function() {
        	var query = this.editor.getSession().getValue();
        	if(query)
        		window.app.vent.trigger("saveQuery", this.editor.getSession().getValue());
        	else
        		bootbox.alert("Nothing to save", function() {});
        },

        executeQuery: function(query) {
            this.editor.setValue(query, 1);		
        }
    });
});