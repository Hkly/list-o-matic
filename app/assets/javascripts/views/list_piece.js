TrelloClone.Views.ListPiece = Backbone.CompositeView.extend({
  template: JST['lists/piece'],
  className: "list-card container",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);

    var newFormView = new TrelloClone.Views.CardsForm({
      model: new TrelloClone.Models.Card(),
      list: this.model
    });
    this.addSubview('.news_form', newFormView);

    var that = this;
    this.model.cards().each(function(model) {
      that.addCard(model);
    });
  },

  render: function(){
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  },

  addCard: function(card) {
    var cardView = new TrelloClone.Views.CardPiece({
      model: card
    });
    this.addSubview('.cards', cardView);
  }
});
