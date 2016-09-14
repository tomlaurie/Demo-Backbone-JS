/* MainView.js
 *
 * This View deals with searching the API
 *
 *@author Thomas Laurie, September 13th 2016
 *@version 1.1
 *
 */
var calorieItem, brandItem, totalFatItem, saturatedItem, monoItem, polyItem, transItem, cholItem, sodiumItem, carbItem, fibreItem, sugarItem, proteinItem, vitAItem, vitCItem, calciumItem, ironItem, brandClass, nutClass, calClass, sizeUnit, sizeQty = "";


var MainView = Backbone.View.extend({
    model: app.searchData,
    el: '#application',
    /**
     * This view listens for click events on the numbered page links
     * and forward/reverse buttons
     * and the search button.
     * The Basket button is only listened to to fade out the main image if it is clicked on
     */
    events: {
        'click .container .row-search .row-search2 .row-search3 .search-button': 'newSearch',
        'click .basket-button': 'clickBasket',
        'click .nextPage': 'goNext',
        'click .prevPage': 'goPrev',
        'click .pages0': 'goPage',
        'click .pages1': 'goPage',
        'click .pages2': 'goPage',
        'click .pages3': 'goPage',
        'click .pages4': 'goPage'
    },
    /**
     * Starts search when search button is clicked
     *
     * @return      none
     */
    newSearch: function() {
        if (app.firstSearchStarted === false) {
            app.firstSearchStarted = true;
            this.hideMainImage();
        }
        this.searchFoods(0, "");

    },
    /**
     * When the basket button is clicked, the main image should be hidden if it is not already
     *
     * @return      none
     */
    clickBasket: function() {
        if (app.firstSearchStarted === false) {
            app.firstSearchStarted = true;
            this.hideMainImage();
        }
        location.hash = "basket";
    },
    /**
     * Hides the main placeholder image
     *
     * @return      none
     */
    hideMainImage: function() {
        this.$el.find(".imageContainer").fadeOut("slow");
    },
    /**
     * Navigate to the previous search results page
     *
     * @return      none
     */
    goPrev: function() {
        var pageNumber = this.model.get("page");
        if (pageNumber > 1) {
            pageNumber--;
            this.model.set("page", pageNumber);
        }
        this.searchFoods(((pageNumber - 1) * app.numberOfRequests), this.model.get("query"));
    },
    /**
     * Navigate to the next search results page
     *
     * @return      none
     */
    goNext: function() {
        var pageNumber = this.model.get("page");
        var pageResults = this.model.get("results");
        var maxPages = Math.ceil(pageResults / app.numberOfRequests);
        if (pageNumber < maxPages + 1) {
            pageNumber++;
            this.model.set("page", pageNumber);
        }
        this.searchFoods(((pageNumber - 1) * app.numberOfRequests), this.model.get("query"));
    },
    /**
     * Navigate to a particular search results page
     *
     * @return      none
     */
    goPage: function(ev) {
        var pageid = $(ev.currentTarget).data('pageid');
        this.model.set("page", pageid);
        this.searchFoods(((pageid - 1) * app.numberOfRequests), this.model.get("query"));
    },
    /**
     * Navigate to the previous search results page
     *
     * @param	theOffset	The offset of the search results - used to select different pages
     * @param	theSearch	The search query
     * @return      none
     */

    searchFoods: function(theOffset, theSearch) {
        //The basket is deactivated when a search is performed
        app.basketView.deactivate();
        app.displayBasket = false;
        app.firstSearchStarted = true;
        location.hash = "";

        if (app.routerSearch === true) {
            app.fieldsSelected.set("canRender", false);
            app.routerSearch = false;
        }

        var self = this;

        self.$el.find("#loadingImg").removeClass("loaderOff");
        self.$el.find("#loadingImg").addClass("loaderOn");


        //An empty query is sent from the index page
        //But not when a new page is clicked using page navigation
        var searchQuery = theSearch;
        if (searchQuery === "") {
            app.searchData.set("page", 1);
            app.searchData.set("multiple", 1);

            searchQuery = $("#new-search").val();
            if (searchQuery === "") {
                searchQuery = " ";
            }
            app.searchData.set("query", searchQuery);
            app.fieldsSelected.set("canRender", false);

            app.searchData.set("results", -1);
            //This triggers the search navigation links to re-render
            var completeSwitch = app.searchData.get("complete");
            if (completeSwitch === true) {
                completeSwitch = false;
            } else {
                completeSwitch = true;
            }
            app.searchData.set("complete", completeSwitch);
        } else {

        }

        var jsonQuery = {
            "appId": "b26efe88",
            "appKey": "43464f6aee94a16c14d1d334da9fe18d",
            "offset": theOffset,
            "limit": app.numberOfRequests,
            "fields": [
                "item_name",
                "brand_name",
                "nf_calories",
                "nf_serving_size_qty",
                "nf_serving_size_unit",
                "brand_name",
                "calories",
                "nf_total_fat",
                "nf_saturated_fat",
                "nf_monounsaturated_fat",
                "nf_polyunsaturated_fat",
                "nf_trans_fatty_acid",
                "nf_cholesterol",
                "nf_sodium",
                "nf_total_carbohydrate",
                "nf_dietary_fiber",
                "nf_sugars",
                "nf_protein",
                "nf_vitamin_a_dv",
                "nf_vitamin_c_dv",
                "nf_calcium_dv",
                "nf_iron_dv"
            ],
            "query": searchQuery
        };

        // if (searchQuery === "") {
        _.each(app.foods.toArray(), function(food) {
            app.foods.remove(food);
        });
        //  } else {
        $.ajax({
            type: "POST",
            url: "https://api.nutritionix.com/v1_1/search",
            contentType: "application/json",
            data: JSON.stringify(jsonQuery),

            success: function(data) {

                self.$el.find("#loadingImg").removeClass("loaderOn");
                self.$el.find("#loadingImg").addClass("loaderOff");

                //The max number of results available

                if (app.routerSearch === true) {
                    app.fieldsSelected.set("canRender", false);
                    app.routerSearch = false;
                }

                if (app.fieldsSelected.get("canRender") === false && data.total > 0) {
                    $('#fieldsModal').modal('show');

                }

                app.searchData.set("results", data.total);


                //This triggers the search navigation links to re-render
                var completeSwitch = app.searchData.get("complete");
                if (completeSwitch === true) {
                    completeSwitch = false;
                } else {
                    completeSwitch = true;
                }
                app.searchData.set("complete", completeSwitch);

                //The existing search results are cleared
                _.each(app.foods.toArray(), function(food) {
                    app.foods.remove(food);
                });

                //New search results are added to the foods Collection
                for (var i = 0; i < data.hits.length; i++) {


                    (data.hits[i].fields.nf_serving_size_unit === null) ? sizeUnit = "": sizeUnit = data.hits[i].fields.nf_serving_size_unit;
                    (data.hits[i].fields.nf_serving_size_qty === null) ? sizeQty = "": sizeQty = data.hits[i].fields.nf_serving_size_qty;

                    var nameField = data.hits[i].fields.item_name + " - " + sizeQty + " " + sizeUnit;

                    (data.hits[i].fields.nf_calories === null) ? calorieItem = 0: calorieItem = data.hits[i].fields.nf_calories;
                    (data.hits[i].fields.brand_name === null) ? brandItem = "No data": brandItem = data.hits[i].fields.brand_name;
                    (data.hits[i].fields.nf_total_fat === null) ? totalFatItem = "No data": totalFatItem = data.hits[i].fields.nf_total_fat;
                    (data.hits[i].fields.nf_saturated_fat === null) ? saturatedItem = "No data": saturatedItem = data.hits[i].fields.nf_saturated_fat;
                    (data.hits[i].fields.nf_monounsaturated_fat === null) ? monoItem = "No data": monoItem = data.hits[i].fields.nf_monounsaturated_fat;
                    (data.hits[i].fields.nf_polyunsaturated_fat === null) ? polyItem = "No data": polyItem = data.hits[i].fields.nf_polyunsaturated_fat;
                    (data.hits[i].fields.nf_trans_fatty_acid === null) ? transItem = "No data": transItem = data.hits[i].fields.nf_trans_fatty_acid;
                    (data.hits[i].fields.nf_cholesterol === null) ? cholItem = "No data": cholItem = data.hits[i].fields.nf_cholesterol;
                    (data.hits[i].fields.nf_sodium === null) ? sodiumItem = "No data": sodiumItem = data.hits[i].fields.nf_sodium;
                    (data.hits[i].fields.nf_total_carbohydrate === null) ? carbItem = "No data": carbItem = data.hits[i].fields.nf_total_carbohydrate;
                    (data.hits[i].fields.nf_dietary_fiber === null) ? fibreItem = "No data": fibreItem = data.hits[i].fields.nf_dietary_fiber;
                    (data.hits[i].fields.nf_sugars === null) ? sugarItem = "No data": sugarItem = data.hits[i].fields.nf_sugars;
                    (data.hits[i].fields.nf_protein === null) ? proteinItem = "No data": proteinItem = data.hits[i].fields.nf_protein;
                    (data.hits[i].fields.nf_vitamin_a_dv === null) ? vitAItem = "No data": vitAItem = data.hits[i].fields.nf_vitamin_a_dv;
                    (data.hits[i].fields.nf_vitamin_c_dv === null) ? vitCItem = "No data": vitCItem = data.hits[i].fields.nf_vitamin_c_dv;
                    (data.hits[i].fields.nf_calcium_dv === null) ? calciumItem = "No data": calciumItem = data.hits[i].fields.nf_calcium_dv;
                    (data.hits[i].fields.nf_iron_dv === null) ? ironItem = "No data": ironItem = data.hits[i].fields.nf_iron_dv;

                    (app.fieldsSelected.get("infoCalories") === true) ? calClass = "calOn": calClass = "calOff";
                    (app.fieldsSelected.get("infoBrand") === true) ? brandClass = "brandOn": brandClass = "brandOff";
                    (app.fieldsSelected.get("infoNut") === true) ? nutClass = "nutOn": nutClass = "nutOff";

                    var food = new FoodItem({
                        id: data.hits[i]._id,
                        name: nameField,
                        calories: calorieItem,
                        amount: 0,
                        brand_name: brandItem,
                        nf_total_fat: totalFatItem,
                        nf_saturated_fat: saturatedItem,
                        nf_monounsaturated_fat: monoItem,
                        nf_polyunsaturated_fat: polyItem,
                        nf_trans_fatty_acid: transItem,
                        nf_cholesterol: cholItem,
                        nf_sodium: sodiumItem,
                        nf_total_carbohydrate: carbItem,
                        nf_dietary_fiber: fibreItem,
                        nf_sugars: sugarItem,
                        nf_protein: proteinItem,
                        nf_vitamin_a_dv: vitAItem,
                        nf_vitamin_c_dv: vitCItem,
                        nf_calcium_dv: calciumItem,
                        nf_iron_dv: ironItem,
                        cal_class: calClass,
                        brand_class: brandClass,
                        nut_class: nutClass
                    });

                    app.foods.add(food);

                }
            },
            error: function() {
                alert("Error retrieving search data.  Check Internet connection.");

                self.$el.find("#loadingImg").removeClass("loaderOn");
                self.$el.find("#loadingImg").addClass("loaderOff");
            }
        });
        //  }


    }

});