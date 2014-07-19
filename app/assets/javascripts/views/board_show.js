TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addList); // should i be listening for list collection?
  },

  addList: function(list) {
    var listPiece = new TrelloClone.Views.ListPiece({ model: list });
    this.addSubview('.lists', listPiece);
  },

  render: function() {
    var renderedContent = this.template({
      board: this.model
    });

    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  }
});
