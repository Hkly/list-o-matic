TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({

  template: JST["boards/index"],

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {

    var renderedContent = this.template();
    this.$el.html(renderedContent);

    var that = this;
    this.collection.each(function(board){
      var boardPiece = new TrelloClone.Views.BoardPiece({model: board});
      that.addSubview('.boards', boardPiece);
    })

    this.attachSubviews();

    return this;
  }
});
