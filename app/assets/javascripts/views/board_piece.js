TrelloClone.Views.BoardPiece = Backbone.View.extend({
  template: JST['boards/piece'],
  className: 'board-card',

  render: function() {
    var renderedContent = this.template({
      board: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },

  events: {
    "click": "goToCard"
  },

  goToCard: function(event){
    var url = '#/boards/' + this.model.id
    Backbone.history.navigate(url, {trigger: true})
  }

});
