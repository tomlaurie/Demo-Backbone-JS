/* FoodsView.js
 *
 * This View controls the table of search results
 *
 *@author Thomas Laurie, September 13th 2016
 *@version 1.1
 *
 */
app.rendering = false;
var FoodsView = Backbone.View.extend({
    model: app.foods,
    //selectedFields: app.fieldsSelected,
    el: '.resultsContainer',
    /**
     * The View listens for records being added or removed from the search results
     * A delay is used following a search for performance reasons
     *
     *@return	none
     */
    initialize: function() {
        var self = this;
        this.model.on('add', function() {
            if (app.rendering === false) {
                app.rendering = true;
                setTimeout(function() {
                    self.render();
                }, 30);
            }
        }, this);
        this.model.on('remove', function() {
            if (app.rendering === false) {
                app.rendering = true;
                setTimeout(function() {
                    self.render();
                }, 30);
            }
        }, this);
    },


    /**
     * This function renders the table of search results
     *
     * @return      this
     */
    render: function() {
        app.rendering = false;
        if (app.displayBasket === false && app.fieldsSelected.get("canRender") === true) {
            var self = this;
            this.$el.html('');
            _.each(this.model.toArray(), function(food) {
                //self.$el.append("<tr><td colspan=\"3\"><hr /></td></tr>");
                self.$el.append((new FoodView({
                    model: food
                })).render().$el);

            });
        }
        return this;
    },
    /**
     * This function is used to hide search results when the basket is viewed
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