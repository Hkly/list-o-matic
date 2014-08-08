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

    var that = this;

    $(".cards").sortable({
      connectWith: ".cards",
      stop: function() {
        var cardsData = $(this).sortable("toArray");
      }
    });

    $(".lists").sortable({ stop: function() {
      var listsData = $(this).sortable("toArray");
      that.assignOrd(that.model.lists(), listsData);
    }
    });

    return this;
  },

  assignOrd: function(obj, data) {
    obj.each(function(model) {
      var newOrd = data.indexOf(model.id.toString());
      model.set({'ord': newOrd});
      model.save();
      console.log(model.get('ord') + 'jhfdskjfhdsajkfhdsjfalkdsjflkjdsfljdsef')
    });
  },

  deleteBoard: function(event) {
    this.model.destroy({
      success: function() {
        Backbone.history.navigate("", {trigger: true});
      }
    });
  }
});
