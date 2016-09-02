define([    
    'backbone',
    'marionette',
    'templates'
], function(Backbone, Marionette, templates){
    return Marionette.ItemView.extend({    
        template: templates.header,
        tagName: 'div',
        model: new Backbone.Model({title:"PRISM", version:"0.2.2"})
    });
});