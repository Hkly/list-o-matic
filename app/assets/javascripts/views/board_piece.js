TrelloClone.Views.BoardPiece = Backbone.View.extend({
  template: JST['boards/piece'],
  tagName: "li",

  render: function() {
    var renderedContent = this.template({
      board: this.model
    });
    this.$el.html(renderedContent);
    return this;
  }
});
