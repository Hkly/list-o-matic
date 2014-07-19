TrelloClone.Views.ListPiece = Backbone.View.extend({
  template: JST['lists/piece'],
  tagName: 'li',

  render: function(){
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    return this;
  }
});
