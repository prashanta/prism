define([
    'backbone',
    'templates',
    'bootbox',
    'handlebars'
], function(Backbone, templates, bootbox){
    return Backbone.View.extend({ 
        initialize: function() {
            this.listenTo(this.model, "change", this.render);		
        },
        
        render: function(){
            if(this.model.hasChanged('v')){
                if(this.model.get("v") == 0)
                    bootbox.alert(this.model.get('message'), function() {});
                this.model.set("v", -1);	
            }		
            if(this.model.hasChanged('data')){
                var template = Handlebars.compile(templates.result);
                this.$el.html(template(this.model.toJSON()));			
            }
            return this;
        }
    });
});    