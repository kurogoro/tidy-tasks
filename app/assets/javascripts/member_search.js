$(document).on('turbolinks:load', function() {
  var search_input = $("#member-search-input");
  var search_list = $("#member-search-list");
  var member_list = $("#member-list");
  var administrator_field = $("#group_administrator_id");
  var preword;

  function appendSearchMember(person) {
    var html = `<div class="main-page__body__form__group__double-field__group__field-box__field">
                  <div class="main-page__body__form__group__double-field__group__field-box__field__text">${ person.nickname }</div>
                  <div class="main-page__body__form__group__double-field__group__field-box__field__btn main-page__body__form__group__double-field__group__field-box__field__btn--add" data-person-id="${ person.id }" data-person-nickname="${ person.nickname }">
                    <i class="fas fa-plus main-page__body__form__group__double-field__group__field-box__field__btn__icon"></i>
                  </div>
                </div>`
    search_list.append(html);
  }

  function appendMember(person) {
    var html = `<div class="main-page__body__form__group__double-field__group__field-box__field">
                  <input name="group[member_ids][]" type="hidden" value="${ person.id }">
                  <div class="main-page__body__form__group__double-field__group__field-box__field__text">${ person.nickname }</div>
                  <div class="main-page__body__form__group__double-field__group__field-box__field__btn main-page__body__form__group__double-field__group__field-box__field__btn--remove" data-person-id="${ person.id }" data-person-nickname="${ person.nickname }">
                  <i class="fas fa-times main-page__body__form__group__double-field__group__field-box__field__btn__icon"></i>
                  </div>
                </div>`
    member_list.append(html);
  }

  function getPerson(element) {
    var person = {
      id : element.data("person-id"),
      nickname : element.data("person-nickname")
    };
    return person;
  }

  function getMemberIds() {
    var member_ids = [];
    member_ids.push(administrator_field.val());
    member_list.children(".main-page__body__form__group__double-field__group__field-box__field").each(function() {
      var person_id = $(this).children("input").prop("value");
      member_ids.push(person_id);
    });
    return member_ids;
  }

  function searchMember(eventClick) {
    var input = search_input.val().replace(/\s+/g, "");
    var member_ids = getMemberIds();

    if (input !== preword || eventClick === true) {
      $.ajax({
        type: 'GET',
        url: '/people/search',
        data: { keyword: input, member_ids: member_ids },
        dataType: 'json'
      })

      .done(function(people) {
        search_list.empty();
        if (people.length !== 0 && input.length !== 0) {
          people.forEach(function(person){
            appendSearchMember(person);
          });
        }
      })

      .fail(function() {
        alert('メンバー検索に失敗しました');
      })
    }
    preword = input;
  }

  search_input.on("keyup", function() {
    searchMember(false);
  });

  search_list.on("click", ".main-page__body__form__group__double-field__group__field-box__field__btn--add", function() {
    var person = getPerson($(this));
    $(this).parent().remove();
    appendMember(person);
  })

  member_list.on("click", ".main-page__body__form__group__double-field__group__field-box__field__btn--remove", function() {
    var person = getPerson($(this));
    $(this).parent().remove();
    preword = "";
    searchMember(true);
  })
})