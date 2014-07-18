TrelloClone.Routers.Boards = Backbone.Router.extend({
  routes: {
    "": 'boardsIndex'
  },

  boardsIndex: function(){
    TrelloClone.Collections.boards.fetch();
    var indexView = new TrelloClone.Views.BoardsIndex({
      collection: TrelloClone.Collections.boards
    });
    this._swapView(indexView);
  },

  _swapView: function (newView) {
    if (this.currentView) {
      this.currentView.remove();
    }

    $("#main").html(newView.render().$el);

    this.currentView = newView;
  }

});
