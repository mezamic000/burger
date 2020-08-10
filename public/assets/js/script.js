$(document).ready(function () {

  $(".devour").on("click", function (event) {
    event.preventDefault();
    var id = $(this).data("burgerid");
    console.log(id);

    $.ajax({
      method: "PUT",
      url: "/api/burgers/" + id
    }).then(
      function () {
        console.log("devoured id ", id);
        location.reload();
      });
  });
});