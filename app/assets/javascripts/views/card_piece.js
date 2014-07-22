TrelloClone.Views.CardPiece = Backbone.View.extend({
  template: JST["cards/piece"],
  className: "card-piece",

  events: {
    "mouseenter": "showDelete",
    "mouseleave": "showDelete",
    "click button.delete-card": "deleteCard"
  },

  render: function(){
    var renderedContent = this.template({
      card: this.model
    });

    this.$el.html(renderedContent);

    return this;
  },

  showDelete: function(event) {
    $(event.target).find('.delete-view').toggleClass('hidden');
  },

  deleteCard: function(event) {
    var that = this;
    this.model.destroy({
      success: function() {
        that.collection.remove(this.model);
      }
    });
  }
});
