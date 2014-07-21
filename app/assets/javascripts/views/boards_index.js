TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST["boards/index"],

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addBoard);
    var newFormView = new TrelloClone.Views.BoardsNew();
    this.addSubview('.new_form', newFormView);

    var that = this;
    this.collection.each(function(model) {
      that.addBoard(model);
    });
  },

  addBoard: function(board) {
    var boardPiece = new TrelloClone.Views.BoardPiece({model: board});
    this.addSubview('.boards', boardPiece);
  },

  render: function() {

    var renderedContent = this.template();
    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  }
});
