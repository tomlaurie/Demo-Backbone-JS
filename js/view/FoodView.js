/* FoodView.js
 *
 * This View corresponds to a single table element following a search
 *
 *@author Thomas Laurie, September 13th 2016
 *@version 1.1
 *
 */
var FoodView = Backbone.View.extend({
    model: new FoodItem(),
    tagName: 'span',
    /**
     * The View is set to use an Underscore JS template defined on index.html
     *
     * @return      none
     */
    initialize: function() {
        this.template = _.template($('.foods-list-template').html());
    },
    /**
     * The View listens for a click on the Add To Basket button
     */
    events: {
        'click .add-to-basket': 'addItem'
    },
    /**
     * When the Add To Basket button is clicked, the model is updated
     * Re-rendering is not needed
     *
     * @return      none
     */
    addItem: function() {

        var alreadyInBasket = false;
        var amountToAdd = Number(this.$el.find(".setAmount").val());
        var self = this;

        _.each(app.basket.toArray(), function(food) {
            if (food.get("id") == self.model.get("id") && amountToAdd > 0) {
                amountToAdd += Number(food.get("amount"));
                food.set("amount", amountToAdd);
                alreadyInBasket = true;
            }

        });

        if (alreadyInBasket === false && amountToAdd > 0) {
            this.model.set({
                amount: amountToAdd
            });
            app.basket.add(this.model);
        }

        this.$el.find(".setAmount").val("");
    },
    /**
     * This function renders the html within a tr tag
     *
     * @return	this
     */
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});