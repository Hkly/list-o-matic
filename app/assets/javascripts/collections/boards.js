TrelloClone.Collections.Boards = Backbone.Collection.extend({
  url: "api/boards",
  model: TrelloClone.Models.Board
});

TrelloClone.Collections.boards = new TrelloClone.Collections.Boards();
