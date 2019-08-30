$(document).on('turbolinks:load', function() {
  var search_input = $("#group-search-input");
  var search_list = $("#group-search-list");
  var group_list = $("#group-list");
  var preword;

  function appendSearchGroup(group) {
    var html = `<div class="main-page__body__form__group__double-field__group__field-box__field">
                  <div class="main-page__body__form__group__double-field__group__field-box__field__text">${ group.name }</div>
                  <div class="main-page__body__form__group__double-field__group__field-box__field__btn main-page__body__form__group__double-field__group__field-box__field__btn--add" data-group-id="${ group.id }" data-group-name="${ group.name }">
                    <i class="fas fa-plus main-page__body__form__group__double-field__group__field-box__field__btn__icon"></i>
                  </div>
                </div>`
    search_list.append(html);
  }

  function appendGroup(group) {
    var html = `<div class="main-page__body__form__group__double-field__group__field-box__field">
                  <input name="project[group_ids][]" type="hidden" value="${ group.id }">
                  <div class="main-page__body__form__group__double-field__group__field-box__field__text">${ group.name }</div>
                  <div class="main-page__body__form__group__double-field__group__field-box__field__btn main-page__body__form__group__double-field__group__field-box__field__btn--remove" data-group-id="${ group.id }" data-group-name="${ group.name }">
                  <i class="fas fa-times main-page__body__form__group__double-field__group__field-box__field__btn__icon"></i>
                  </div>
                </div>`
    group_list.append(html);
  }

  function getGroup(element) {
    var group = {
      id : element.data("group-id"),
      name : element.data("group-name")
    };
    return group;
  }

  function getGroupIds() {
    var group_ids = [];
    group_list.children(".main-page__body__form__group__double-field__group__field-box__field").each(function() {
      var group_id = $(this).children("input").prop("value");
      group_ids.push(group_id);
    });
    return group_ids;
  }

  function searchGroup(eventClick) {
    var input = search_input.val().replace(/\s+/g, "");
    var group_ids = getGroupIds();

    if (input !== preword || eventClick === true) {
      $.ajax({
        type: 'GET',
        url: '/groups/search',
        data: { keyword: input, group_ids: group_ids },
        dataType: 'json'
      })

      .done(function(groups) {
        search_list.empty();
        if (groups.length !== 0 && input.length !== 0) {
          groups.forEach(function(group){
            appendSearchGroup(group);
          });
        }
      })

      .fail(function() {
        alert('グループ検索に失敗しました');
      })
    }
    preword = input;
  }

  function addGroupToDb(group_id) {
    $.ajax({
      type: 'GET',
      url: '/people/add_group',
      data: { group_id: group_id },
      dataType: 'json'
    })

    .done(function() {
      // notice('グループを追加しました');
    })

    .fail(function() {
      // alert('グループ追加に失敗しました');
    })
  }

  function removeGroupToDb(group_id) {
    $.ajax({
      type: 'GET',
      url: '/people/remove_group',
      data: { group_id: group_id },
      dataType: 'json'
    })

    .done(function() {
      // notice('グループを脱退しました');
    })

    .fail(function() {
      console.log(8);
      // alert('グループ脱退に失敗しました');
    })
  }

  search_input.on("keyup", function() {
    searchGroup(false);
  });

  search_list.on("click", ".main-page__body__form__group__double-field__group__field-box__field__btn--add", function() {
    var group = getGroup($(this));
    var dbSave = group_list.data("save");
    if (dbSave === true) {
      addGroupToDb(group.id);
    }
    $(this).parent().remove();
    appendGroup(group);
  })

  group_list.on("click", ".main-page__body__form__group__double-field__group__field-box__field__btn--remove", function() {
    var group = getGroup($(this));
    var dbSave = group_list.data("save");
    if (dbSave === true) {
      removeGroupToDb(group.id);
    }
    $(this).parent().remove();
    preword = "";
    searchGroup(true);
  })
})