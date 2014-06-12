window.ContactManagerApp = {
  initialize: function () {
    $.getJSON('/api/people').success(function (response) {
      var people = response._embedded.people;
      $.each(people, function (index, person) {
        var $div = $(JST['templates/display_people'](person));
        $div.data('person', this);
        $('[data-container=people]').append($div);
      });
    });

    var form = JST['templates/create_person'];
    $('[data-container=main]').append(form);

    $(document).on('submit', '.create-form', function (event) {
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
        var $div = $(JST['templates/display_people'](response));
        $('.create-form input[type=text]').val("");
        $div.data('person', response);
        $('[data-container=people]').append($div);
      });
    });

    $(document).on("click", "a.edit-link", function (event) {
      event.preventDefault();
      var person = $(event.target).closest(".person").data('person');
      var $editForm = $(JST['templates/edit_person'](person));
      $editForm.data('person', person);
      $(event.target).closest(".person").replaceWith($editForm);
    });

    $(document).on('submit', '.edit-form', function (event) {
      event.preventDefault();
      var inputs = $(this).serializeArray();
      var formParams = {};
      var $form = this;
      $.each(inputs, function () {
        formParams[this.name] = this.value;
      });
      var url = event.target.action;
      $.ajax({
        type: "PUT",
        url: url,
        dataType: "json",
        data: JSON.stringify(formParams)
      }).success(function (response) {
        var $html = $(JST['templates/show_person'](response));
        $html.data('person', response);
        $($form).replaceWith($html);
      });
    });

    $(document).on('click', '.cancel-button', function (event) {
      event.preventDefault();
      $(event.target).closest('div').parent().find("input[type=text]").val('');
      var person = $(event.target).closest("form").data('person');
      var $show = $(JST['templates/show_person'](person));
      $show.data('person', person);
      $(event.target).closest('div').parent().replaceWith($show);
    });

    $(document).on('click', '.delete-button', function (event) {
      event.preventDefault();
      if (window.confirm('Are you sure?')) {
        var person = $(event.target).closest('form').data('person');
        var url = person._links.self.href;
        $.ajax({
          type: "DELETE",
          url: url
        }).success(function () {
          $(event.target).closest('form').remove();
        });
      }
    });
  }
};