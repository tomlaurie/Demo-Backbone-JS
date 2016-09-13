/* CalorieView.js
 *
 * This View reports the total calories in the basket
 * It also saves the basket contents to local storage whenever the contents changes
 *
 *@author Thomas Laurie, September 13th 2016
 *@version 1.1
 *
 */
app.totalCalories = 0;
var CalorieView = Backbone.View.extend({
    model: app.basket,
    el: '#calorieCount',
    /**
     * The remove is not listened to as records are only removed after
     * the amount field is changed to zero (a change event)
     *
     * @return      none
     */
    initialize: function() {
        this.model.on('change', this.render, this);
        this.model.on('add', this.render, this);
    },
    /**
     * This function renders the number of calories in the basket on the HTML page
     *
     * @return      this
     */
    render: function() {

        app.totalCalories = 0;
        _.each(this.model.toArray(), function(food) {
            app.totalCalories += (food.get("calories") * food.get("amount"));
        });

        this.$el.html(app.totalCalories.toFixed(2));

        //Save basket to local storage
        if (app.localStorageEnabled === true) {
            localStorage.setItem("basket", JSON.stringify(this.model.toJSON()));
        }
        return this;
    }
});