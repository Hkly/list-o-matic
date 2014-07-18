TrelloClone.Views.BoardsNew = Backbone.View.extend({
  template: JST['boards/new'],

  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },

  events: {
    "submit": "createBoard"
  },

  createBoard: function(event) {
    event.preventDefault();
    var params = $(event.target).serializeJSON();
    var newBoard = new TrelloClone.Models.Board(params);
    newBoard.save({}, {
      success: function() {
        TrelloClone.Collections.boards.add(newBoard);
        this.$('#board_title').val("");
      }
    });
  }

});
