/* script.js
 *
 * This is the calorie counter application.  It uses the Nutritionix
 * API to grab Food Item details as JSON objects. It also uses the Backbone JS
 * library and jQuery.
 *
 *@author Thomas Laurie, September 9th 2016
 *@version 1.1
 *
 */
"use strict";



/**
 * This function is used for formatting
 *
 * @param  e	window resize event data
 * @return      none
 */
var title_height = '';
$(window).on("load resize", function(e) {
    var titleHeight = $('#header-title').height();
    if (titleHeight != title_height) {
        title_height = titleHeight;
        var separatorHeight = $('#header-separator').height();
        var difference = ((titleHeight - separatorHeight) / 2) + 5;
        $('#header-separator').css('margin-top', difference + 'px');
    }
});

/**
 * Backbone JS objects declared here, and instantiated when the DOM loads (at the bottom of the page)
 */

var app = app || {};
app.displayBasket = false;

/**
 * This constant sets the number of search results per page
 */
app.numberOfRequests = 12;

/**
 * This is used to store whether local storage is enabled in this browser
 */
app.localStorageEnabled = false;

/**
 * This is used to determine when to fade out the main image
 */
app.firstSearchStarted = false;

/**
 * Used to store data in the program
 */
app.searchData = new SearchData();
app.fieldsSelected = new FieldsSelected();

/**
 * Two food collections are created - one for search results and one for the basket
 */
app.foods = new FoodCollection();
app.basket = new FoodCollection();

/**
 * A latch to help control when the modal appears
 */
app.routerSearch=false;


/**
 * This router is activated when the basket button is clicked
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

/**
 * This function is run when the DOM is finished loading
 * It instatiates the Backbone JS objects
 * It also loads basket contents from the local storage if available
 *
 * @return      none
 */

$(document).ready(function() {


    app.foodsView = new FoodsView();
    app.calorieView = new CalorieView();
    app.tableButtons = new TableButtons();
    app.basketView = new BasketView();

    app.fieldsView = new FieldsView();
    app.mainView = new MainView();
    app.basketRouter = new BasketRouter();
    Backbone.history.start();

    $('#fieldsModal').modal({
        show: false
    });

    if (typeof(Storage) !== "undefined") {
        app.localStorageEnabled = true;

        //get basket from local storage
        if (localStorage.getItem("basket") !== null) {
            var basketArray = JSON.parse(localStorage.getItem("basket"));
            for (var i = 0; i < basketArray.length; i++) {
                app.basket.add(new FoodItem({
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
	
	location.hash="";

});