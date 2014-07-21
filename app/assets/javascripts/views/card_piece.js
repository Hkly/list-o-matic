TrelloClone.Views.CardPiece = Backbone.View.extend({
  template: JST["cards/piece"],

  render: function(){
    var renderedContent = this.template({
      card: this.model
    });

    this.$el.html(renderedContent);

    return this;
  }
});
