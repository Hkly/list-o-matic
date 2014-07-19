TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addList);
    // CHECK: see if this.model.lists below needs to be invoked or not
    var newFormView = new TrelloClone.Views.ListsNew({
      collection: this.model.lists(),
      model: this.model 
      });
    this.addSubview('.new_form', newFormView);
  },

  addList: function(list) {
    var listPiece = new TrelloClone.Views.ListPiece({ model: list });
    this.addSubview('.lists', listPiece);
  },

  render: function() {
    var renderedContent = this.template({
      board: this.model
    });

    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  }
});
