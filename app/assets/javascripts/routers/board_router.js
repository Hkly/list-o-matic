TrelloClone.Routers.Boards = Backbone.Router.extend({
  routes: {
    "": 'boardsIndex',
    "boards/:id": 'boardShow'
  },

  boardsIndex: function(){
    TrelloClone.Collections.boards.fetch();
    console.log("oh hai");
    var indexView = new TrelloClone.Views.BoardsIndex({
      collection: TrelloClone.Collections.boards
    });
    this._swapView(indexView);
  },

  boardShow: function(id){

    var board = TrelloClone.Collections.boards.getOrFetch(id);
    var showView = new TrelloClone.Views.BoardShow({
      model: board
    });
    this._swapView(showView);
  },

  _swapView: function (newView) {
    if (this.currentView) {
      this.currentView.remove();
    }

    $("#main").html(newView.render().$el);

    this.currentView = newView;
  }

});
