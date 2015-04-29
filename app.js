// From underscore.js
_.templateSettings = {
	interpolate: /\{\{(.+?)\}\}/g // Template setting to change from <%= %> get it from the underscore website under template setting
};

var foodCat = ["animals", "food", "cats", "city", "business", "food", "nightlife", "fashion", "people", "nature", "technics", "transport"];

function randFood(firstTitle, secondTitle){
	firstTitle = ['beer', 'ale', 'barley', 'wine', 'cider', 'rum'];
	secondTitle = ['bonda', 'cereal', 'crepe', 'gulha', 'pizza', 'waffle'];

	var food_random_title = firstTitle[Math.floor(Math.random() * firstTitle.length)] + " " + secondTitle[Math.floor(Math.random() * secondTitle.length)];
	return food_random_title;
}

var foods = [{
	img_url: 'http://lorempixel.com/400/400/',
	at_ga: 'at General Assembly',
	food_fav_num: Math.floor(Math.random() * 500),
	food_random_title: randFood()
}];

var FoodCardView = Backbone.View.extend({

	events: {
		"click figure": "addFavNum"
	},

	addFavNum: function(){
		// var count = parseInt($(this.el).find('.food-fav-num').html());
		// count++;
		// this.$el.find('.food-fav-num').html(count);

		this.model.food_fav_num = this.model.food_fav_num + 1;
		this.render();
	},

	tagName: "li",
	className: "foodCard-Box medium-3 columns end",
	render: function(){
		var template = _.template($('#FoodCardTemplate').html());
		$(this.el).html(template(this.model));
	}


});

_.each(foods, function(food){
	var view = new FoodCardView({ model: food });
	view.render();
	$('.foodCard').append(view.el);
});


$('.addFoodCard').on('click', function(){

	// Because the VARIABLE food is already defined the first one,
	// Thus the random title won't generate, because we just calling that object
	// The solution is to create a new object inside this

	var food = {
		img_url: "http://lorempixel.com/400/400/" + _.sample(foodCat),
		at_ga: 'at General Assembly',
		food_fav_num: Math.floor(Math.random() * 500),
		food_random_title: randFood()
	}
	

	var view = new FoodCardView({ model: food });
	view.render();
	$('.foodCard').append(view.el);
	
});



