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

    
	
	location.hash="";

});