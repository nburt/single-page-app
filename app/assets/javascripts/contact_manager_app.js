window.ContactManagerApp = {
  initialize: function () {
    $.getJSON('/api/people').success(function (response) {
      var people = response._embedded.people;
      $.each(people, function (index, person) {
        var div = JST['templates/display_people'](person);
        $('[data-container=people]').append(div);
      });
    });

    var form = JST['templates/create_person'];
    $('[data-container=main]').append(form);
    $('.create-form').submit(function (event) {
      var inputs = $(this).serializeArray();

      var formParams = {};
      $.each(inputs, function () {
        formParams[this.name] = this.value;
      });
      event.preventDefault();
      $.ajax({
        type: "POST",
        url: "/api/people",
        dataType: "json",
        data: JSON.stringify(formParams)
      }).success(function (response) {
        var div = JST['templates/display_people'](response);
        $('.create-form input[type=text]').val("");
        $('[data-container=people]').append(div);
      });
    });
  }
};