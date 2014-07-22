TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addList);
    this.listenTo(this.model.lists(), "remove", this.removeList);
    var newFormView = new TrelloClone.Views.ListsNew({
      collection: this.model.lists(),
      model: this.model
      });
    this.addSubview('.new_form', newFormView);

    var that = this;
    this.model.lists().each(function(model) {
      that.addList(model);
    });
  },

  events: {
    "click button.delete-board": "deleteBoard"
  },

  addList: function(list) {
    var listPiece = new TrelloClone.Views.ListPiece({
      model: list,
      collection: this.model.lists()
      });
    this.addSubview('.lists', listPiece);
  },

  removeList: function(list) {
    var views = this.subviews('.lists');
    var view = _.find(views, function(view) {
      return view.model.id == list.id;
    });
    this.removeSubview('.lists', view);
  },

  render: function() {
    var renderedContent = this.template({
      board: this.model
    });

    this.$el.html(renderedContent);

    this.attachSubviews();

    return this;
  },

  deleteBoard: function(event) {
    this.model.destroy({
      success: function() {
        Backbone.history.navigate("", {trigger: true});
      }
    });
  }
});
