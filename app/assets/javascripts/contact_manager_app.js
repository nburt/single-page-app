window.ContactManagerApp = {
  initialize: function () {
    $.getJSON('/api/people').success(function (response) {
      var people = response._embedded.people;
      $.each(people, function(index, person) {
        var div = JST['templates/display_people'](person);
        $('main .container').append(div);
      });
    });
  }
};