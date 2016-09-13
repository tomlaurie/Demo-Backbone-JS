/* FieldsView.js
 *
 * Takes infomation from the bootstrap options modal
 *
 *@author Thomas Laurie, September 13th 2016
 *@version 1.1
 *
 */
var FieldsView = Backbone.View.extend({
    model: app.fieldsSelected,
    el: "#fieldsModal",
    initialize: function() {
        var self = this;
        this.$el.on('hidden.bs.modal', function() {
            self.update();
        });
    },

    /**
     * Sets the display options according to user selection
     *
     * @return      none
     */
    update: function() {
        this.model.set("canRender", true);

        _.each(app.basket.toArray(), function(food) {

            if ($("input:radio[name=rad-brand]:checked").val() === "on") {
                food.set("brand_class", "brandOn");
            } else {
                food.set("brand_class", "brandOff");
            }
            if ($("input:radio[name=rad-cal]:checked").val() === "on") {
                food.set("cal_class", "calOn");
            } else {
                food.set("cal_class", "calOff");
            }
            if ($("input:radio[name=rad-nut]:checked").val() === "on") {
                food.set("nut_class", "nutOn");
            } else {
                food.set("nut_class", "nutOff");
            }
        });

        _.each(app.foods.toArray(), function(food) {

            if ($("input:radio[name=rad-brand]:checked").val() === "on") {
                food.set("brand_class", "brandOn");
            } else {
                food.set("brand_class", "brandOff");
            }
            if ($("input:radio[name=rad-cal]:checked").val() === "on") {
                food.set("cal_class", "calOn");
            } else {
                food.set("cal_class", "calOff");
            }
            if ($("input:radio[name=rad-nut]:checked").val() === "on") {
                food.set("nut_class", "nutOn");
            } else {
                food.set("nut_class", "nutOff");
            }
        });


        if ($("input:radio[name=rad-brand]:checked").val() === "on") {
            this.model.set("infoBrand", true);
        } else {
            this.model.set("infoBrand", false);
        }
        if ($("input:radio[name=rad-cal]:checked").val() === "on") {
            this.model.set("infoCalories", true);
        } else {
            this.model.set("infoCalories", false);
        }
        if ($("input:radio[name=rad-nut]:checked").val() === "on") {
            this.model.set("infoNut", true);
        } else {
            this.model.set("infoNut", false);
        }

        app.foodsView.render();
        app.tableButtons.render();
    }

});