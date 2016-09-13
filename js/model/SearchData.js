/* SearchData.js
 *
 * This model is used to store data relating to the list of pages returned from a search
 *
 *@author Thomas Laurie, September 13th 2016
 *@version 1.1
 *
 */
var SearchData = Backbone.Model.extend({
    defaults: {
        page: 1,
        results: -1,
        multiple: 1,
        query: " ",
        complete: false
    }
});
