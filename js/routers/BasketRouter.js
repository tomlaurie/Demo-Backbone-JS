/* script.js
 *
 * This router is activated when the basket button is clicked
 *
 *@author Thomas Laurie, September 9th 2016
 *@version 1.1
 *
 */

var BasketRouter = Backbone.Router.extend({
    routes: {
        'basket': 'viewBasket',
        '': 'viewSearch'
    },
    /**
     * When the basket is clicked, a latch is set to determine which
     * Backbone JS view should be visible
     *
     * @return      none
     */
    viewBasket: function() {

        app.tableButtons.deactivate();
        app.foodsView.deactivate();
        app.displayBasket = true;
        app.basketView.activate();
    },
    viewSearch: function() {
		app.routerSearch=true;
        app.fieldsSelected.set("canRender", true);
        app.basketView.deactivate();
        app.displayBasket = false;
        app.foodsView.activate();
        app.tableButtons.activate();

    }
});