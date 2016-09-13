/* BasketView.js
 *
 *This View controls the table of items in the basket
 *
 *@author Thomas Laurie, September 13th 2016
 *@version 1.1
 *
 */
app.renderingBasket = false;
var BasketView = Backbone.View.extend({
    model: app.basket,
    el: '.resultsContainer',
    /**
     * When the Update button is clicked, the model is updated according to the new amount
     * Re-rendering of this view is not needed
     *
     * @return      none
     */
    initialize: function() {
        var self = this;
        /**
         * Listens for changes to the basket
         */
        this.model.on('change', function() {
            if (app.renderingBasket === false) {
                app.renderingBasket = true;
                setTimeout(function() {
                    self.render();
                }, 30);
            }
        }, this);
    },
    /**
     * Renders the basket contents on the HTML page
     *
     * @return      this
     */
    render: function() {
        app.renderingBasket = false;
        if (app.displayBasket === true) {
            var self = this;
            this.$el.html('');
            _.each(this.model.toArray(), function(food) {

                if (food.get("amount") === 0) {
                    self.model.remove(food);
                } else {
                    //self.$el.append("<tr><td colspan=\"3\"><hr /></td></tr>");
                    self.$el.append((new BasketFoodView({
                        model: food
                    })).render().$el);
                }

            });
        }
        return this;
    },
    /**
     * These two functions relate to whether the search results or basket are being viewed
     *
     * @return      none
     */
    deactivate: function() {
        this.$el.html('');
    },
    activate: function() {
        this.render();
    }
});
