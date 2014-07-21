TrelloClone.Models.List = Backbone.Model.extend({
  urlRoot: "api/lists",

  cards: function() {
    if (!this._cards) {
      this._cards = new TrellowClone.Collections.Cards([], {list: this});
    }
    return this._cards;
  },

  parse: function(jsonResponse) {
    if (jsonResponse.cards) {
      this.cards().set(jsonResponse.cards, {parse: true});
    }
    return jsonResponse;
  }
});
