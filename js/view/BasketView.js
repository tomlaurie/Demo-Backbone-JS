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
		
		if (typeof(Storage) !== "undefined") {
        app.localStorageEnabled = true;

			//get basket from local storage
			if (localStorage.getItem("basket") !== null) {
				var basketArray = JSON.parse(localStorage.getItem("basket"));
				for (var i = 0; i < basketArray.length; i++) {
					self.model.add(new FoodItem({
						id: basketArray[i].id,
						name: basketArray[i].name,
						calories: basketArray[i].calories,
						amount: basketArray[i].amount,
						brand_name: basketArray[i].brand_name,
						nf_total_fat: basketArray[i].nf_total_fat,
						nf_saturated_fat: basketArray[i].nf_saturated_fat,
						nf_monounsaturated_fat: basketArray[i].nf_monounsaturated_fat,
						nf_polyunsaturated_fat: basketArray[i].nf_polyunsaturated_fat,
						nf_trans_fatty_acid: basketArray[i].nf_trans_fatty_acid,
						nf_cholesterol: basketArray[i].nf_cholesterol,
						nf_sodium: basketArray[i].nf_sodium,
						nf_total_carbohydrate: basketArray[i].nf_total_carbohydrate,
						nf_dietary_fiber: basketArray[i].nf_dietary_fiber,
						nf_sugars: basketArray[i].nf_sugars,
						nf_protein: basketArray[i].nf_protein,
						nf_vitamin_a_dv: basketArray[i].nf_vitamin_a_dv,
						nf_vitamin_c_dv: basketArray[i].nf_vitamin_c_dv,
						nf_calcium_dv: basketArray[i].nf_calcium_dv,
						nf_iron_dv: basketArray[i].nf_iron_dv,
						cal_class: basketArray[i].cal_class,
						brand_class: basketArray[i].brand_class,
						nut_class: basketArray[i].nut_class
					}));
				}
			}
		}
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
