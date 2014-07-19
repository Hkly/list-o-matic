TrelloClone.Models.Board = Backbone.Model.extend({
  urlRoot: "api/boards",

  lists: function() {
    if(!this._lists) {
      this._lists = new TrelloClone.Collections.Lists([], { board: this });
    }
    return this._lists;
  },

  parse: function(jsonResponse) {

    if(jsonResponse.lists) {
      this.lists().set(jsonResponse.lists, {parse: true});
    }

    return jsonResponse;
  }
});
