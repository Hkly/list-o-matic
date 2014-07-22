TrelloClone.Views.ListPiece = Backbone.CompositeView.extend({
  template: JST['lists/piece'],
  className: "list-card container",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.listenTo(this.model.cards(), "remove", this.removeCard);//what show when remove?

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

  events: {
    "click .delete-list": "deleteList"
  },

  render: function(){
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  },

  addCard: function(card) {
    var cardView = new TrelloClone.Views.CardPiece({
      model: card,
      collection: this.model.cards()
    });
    this.addSubview('.cards', cardView);
  },

  removeCard: function(card) {
    var views = this.subviews('.cards');
    var view = _.find(views, function(view){
      return view.model.id == card.id;
    });
    this.removeSubview('.cards', view);
  },

  deleteList: function(){
    var that = this;
    this.model.destroy({
      success: function() {
        that.collection.remove(this.model);
      }
    });
  }
});
