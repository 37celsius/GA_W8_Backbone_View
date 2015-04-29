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

var Card = Backbone.Model.extend({

});

var FoodCardView = Backbone.View.extend({

	events: {
		"click figure": "addFavNum"
	},

	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
	},

	addFavNum: function(){

		// If using jQuery
		// var count = parseInt($(this.el).find('.food-fav-num').html());
		// count++;
		// this.$el.find('.food-fav-num').html(count);

		var count = this.model.get('food_fav_num') + 1;
		this.model.set('food_fav_num', count);

		
		// if we do not use model use below
		// this.model.food_fav_num = this.model.food_fav_num + 1;
		// this.render();
	},

	tagName: "li",
	className: "foodCard-Box medium-3 columns end",
	render: function(){
		var template = _.template($('#FoodCardTemplate').html());
		
		// New due to learning MODEL
		var html = template(this.model.toJSON());
		this.$el.html(html);
		
		// Below for learning VIEW
		// $(this.el).html(template(this.model));
	}


});


// Commenting due to learning backbone MODEL
// _.each(foods, function(food){
// 	var view = new FoodCardView({ model: food });
// 	view.render();
// 	$('.foodCard').append(view.el);
// });


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

		// Create a new card model object
	var cardModel = new Card(food);

	var view = new FoodCardView({ model: cardModel });
	view.render();
	$('.foodCard').append(view.el);
	
});



