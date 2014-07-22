TrelloClone.Views.CardsForm = Backbone.View.extend({
  template: JST["cards/form"],
  tagName: "form",
  className: "card-form form-group",

  initialize: function(options) {
    this.list = options.list;
  },

  render: function() {
    var renderedContent = this.template({
      card: this.model
    });

    this.$el.html(renderedContent);
    return this;
  },

  events: {
    "submit": "createOrSaveCard"
  },

  createOrSaveCard: function(event) {
    event.preventDefault();
    var params = this.$el.serializeJSON();
    var card = this.model;
    if (card.id) {
      card.set(params);
      card.save({}, {
        success: function() {
          //switch back to plain view
        }
      });
    } else {
      params['list_id'] = this.list.id;
      card.set(params);
      var that = this;
      card.save( {}, {
        success: function() {
          that.list.cards().add(card);

          that.$('#card-title').val("");
          that.model =new TrelloClone.Models.Card();
        }
      });
    }
  }
});
