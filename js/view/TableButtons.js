/* TableButton.js
 *
 * This View displays page navigation options following a search
 *
 *@author Thomas Laurie, September 13th 2016
 *@version 1.1
 *
 */
var TableButtons = Backbone.View.extend({
    model: app.searchData,
    //selectedFields: app.fieldsSelected,
    el: '.tableButtons',

    /**
     * The view listens to changes to a latch
     * The latch is used to indicate when a new search has returned a new page
     * This means that the page links and search results update simultaneously
     *
     * @return      none
     */
    initialize: function() {
        this.model.on('change:complete', this.render, this);
    },


    /**
     * Renders the page navigation links
     *
     * @return      this
     */
    render: function() {
        //The links are only displayed if there is more than one page
        if (this.model.get("results") <= app.numberOfRequests) {
            this.$el.html('');

            if (this.model.get("results") === 0 && app.firstSearchStarted === true) {
                this.$el.html("The search returned no results.");
                //app.mainView.render();
            }
        }

        //The links are only displayed for search results - not basket contents
        else if (app.displayBasket === false && app.fieldsSelected.get("canRender") === true) {
            var pageNumber = this.model.get("page");
            var pageResults = this.model.get("results");
            var maxPages = Math.ceil(pageResults / app.numberOfRequests);

            var multiple = 1;
            var found = false;

            var i = pageNumber;
            while (found === false && i > 0) {
                if (((i - 1) % 4 === 0)) {
                    found = true;
                    multiple = i;
                }

                i--;
            }
            //Multiple is the first page displayed in the list
            //For example: 1,2,3,4,5 (multiple=1)
            //5,6,7,8,9 (multiple=5)
            //Only five pages are displayed at once
            if (multiple > (maxPages + 1 - 5)) {
                multiple = maxPages + 1 - 5;
            }
            if (multiple < 1) {
                multiple = 1;
            }

            this.model.set("multiple", multiple);

            var pageString = "";
            var currentPage = multiple;
            for (i = 0; i < 5; i++) {
                currentPage = multiple + i;
                if (pageNumber == currentPage) {
                    pageString += " " + currentPage;
                } else if (currentPage < maxPages + 1) {
                    pageString += " <a href=\"#\" class=\"pages" + i + "\" data-pageid=\"" + currentPage + "\">" + currentPage + "</a>";
                }
            }



            this.$el.html('<br/><b>Search returned ' + maxPages + ' pages: <a href="#" class="prevPage"><<</a>' + pageString + ' <a href="#" class="nextPage">>></a></b><br/><br/>');


            return this;
        }
    },
    /**
     * Hides the navigation links when the basket button is clicked
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