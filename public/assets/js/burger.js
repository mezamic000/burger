$(function () {
	$(".create-form").on("submit", function (event) {
		event.preventDefault();

		var newBurger = {
			bureger_name: $("#newburger").val().trim,
			devoured: 0,
		};

		$ajax("/api/burgers", {
			type: "POST",
			data: newBurger,
		}).then(function () {
			console.log("Added new burger");
			// Reload the page to get the updated list
			location.reload();
		});
	});
});
$(".eatburger").on("click", function (event) {
	event.preventDefault();
	var id = $(this).data("id");

	var devouredState = {
		devoured: 1,
	};

	// Send the DELETE request.
	$.ajax("/api/burgers/" + id, {
		type: "PUT",
	}).then(function () {
		console.log("Burger devoured");
		// Reload the page to get the updated list
		location.reload();
	});
});
