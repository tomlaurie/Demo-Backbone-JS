/* FoodItem.js
 *
 * This model stores food item data
 *
 *@author Thomas Laurie, September 13th 2016
 *@version 1.1
 *
 */
var FoodItem = Backbone.Model.extend({
    defaults: {
        id: "",
        name: 'Unknown',
        brand_name: 'Unknown',
        calories: 0,
        nf_total_fat: 0,
        nf_saturated_fat: 0,
        nf_monounsaturated_fat: 0,
        nf_polyunsaturated_fat: 0,
        nf_trans_fatty_acid: 0,
        nf_cholesterol: 0,
        nf_sodium: 0,
        nf_total_carbohydrate: 0,
        nf_dietary_fiber: 0,
        nf_sugars: 0,
        nf_protein: 0,
        nf_vitamin_a_dv: 0,
        nf_vitamin_c_dv: 0,
        nf_calcium_dv: 0,
        nf_iron_dv: 0,
        amount: 0,
        cal_class: "calOn",
        brand_class: "brandOn",
        nut_class: "nutOff"
    }
});

