TrelloClone.Views.ListsNew = Backbone.View.extend({
  template: JST['lists/new'],

  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  },

  events: {
    "submit": "createList"
  },

  createList: function(event) {
    event.preventDefault();
    var params = $(event.target).serializeJSON();
    params['board_id'] = this.model.id;
    var newList = new TrelloClone.Models.List(params);
    var that = this;
    newList.save( {}, {
      success: function() {
        that.collection.add(newList);
        that.$('#list_title').val("");
      }
    });
  }
});
