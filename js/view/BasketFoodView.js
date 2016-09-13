/* BasketFoodView.js
 *
 *This View corresponds to a single table element following a click on the basket button
 *
 *@author Thomas Laurie, September 13th 2016
 *@version 1.1
 *
 */
var BasketFoodView = Backbone.View.extend({
    model: new FoodItem(),
    tagName: 'span',
    /**
     * The View is set to use an Underscore JS template defined on index.html
     *
     * @return      none
     */
    initialize: function() {
        this.template = _.template($('.basket-list-template').html());
    },
    /**
     * The View listens for a click on the Update and Remove buttons
     */
    events: {
        'click .update-amount': 'updateAmount',
        'click .remove-this': 'removeThis'
    },
    /**
     * When the Update button is clicked, the model is updated according to the new amount
     * Re-rendering of this view is not needed
     *
     * @return      none
     */
    updateAmount: function() {
        var newAmount = this.$el.find(".setAmount").val();
        this.model.set("amount", newAmount);
        if (newAmount > 0) {
            this.render();
        }
    },
    /**
     * When the Remove button is clicked, the amount is set to zero
     * Re-rendering is controlled by the parent view, which removes this model from the basket collection
     *
     * @return      none
     */
    removeThis: function() {
        this.model.set("amount", 0);
    },
    /**
     * Renders this particular table element of the basket
     *
     * @return      this
     */
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});