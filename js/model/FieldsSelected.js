/* FieldsSelected.js
 *
 * Stores information selected from the options bootstrap modal
 *
 *@author Thomas Laurie, September 13th 2016
 *@version 1.1
 *
 */
var FieldsSelected = Backbone.Model.extend({
    defaults: {
        infoBrand: true,
        infoCalories: true,
        infoNut: false,
        canRender: false
    }
});