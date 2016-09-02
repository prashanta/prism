define([
    'backbone',
    'models/model.history'
], function(Backbone, History){
    return Backbone.Collection.extend({
        model: History
    });
});