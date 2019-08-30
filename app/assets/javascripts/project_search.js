$(document).on('turbolinks:load', function() {
  var search_input = $("#project-search-input");
  var search_list = $("#project-search-list");
  var project_list = $("#project-list");
  var preword;

  function appendSearchProject(project) {
    var html = `<div class="main-page__body__form__group__double-field__group__field-box__field">
                  <div class="main-page__body__form__group__double-field__group__field-box__field__text">${ project.name }</div>
                  <div class="main-page__body__form__group__double-field__group__field-box__field__btn main-page__body__form__group__double-field__group__field-box__field__btn--add" data-project-id="${ project.id }" data-project-name="${ project.name }">
                    <i class="fas fa-plus main-page__body__form__group__double-field__group__field-box__field__btn__icon"></i>
                  </div>
                </div>`
    search_list.append(html);
  }

  function appendProject(project) {
    var html = `<div class="main-page__body__form__group__double-field__group__field-box__field">
                  <input name="project[group_ids][]" type="hidden" value="${ project.id }">
                  <div class="main-page__body__form__group__double-field__group__field-box__field__text">${ project.name }</div>
                  <div class="main-page__body__form__group__double-field__group__field-box__field__btn main-page__body__form__group__double-field__group__field-box__field__btn--remove" data-project-id="${ project.id }" data-project-name="${ project.name }">
                  <i class="fas fa-times main-page__body__form__group__double-field__group__field-box__field__btn__icon"></i>
                  </div>
                </div>`
    project_list.append(html);
  }

  function getProject(element) {
    var project = {
      id : element.data("project-id"),
      name : element.data("project-name")
    };
    return project;
  }

  function getProjectIds() {
    var project_ids = [];
    project_list.children(".main-page__body__form__group__double-field__group__field-box__field").each(function() {
      var project_id = $(this).children("input").prop("value");
      project_ids.push(project_id);
    });
    return project_ids;
  }

  function searchProject(eventClick) {
    var input = search_input.val().replace(/\s+/g, "");
    var project_ids = getProjectIds();

    if (input !== preword || eventClick === true) {
      $.ajax({
        type: 'GET',
        url: '/projects/search',
        data: { keyword: input, project_ids: project_ids },
        dataType: 'json'
      })

      .done(function(projects) {
        search_list.empty();
        if (projects.length !== 0 && input.length !== 0) {
          projects.forEach(function(project){
            appendSearchProject(project);
          });
        }
      })

      .fail(function() {
        alert('グループ検索に失敗しました');
      })
    }
    preword = input;
  }

  function addProjectToDb(project_id) {
    $.ajax({
      type: 'GET',
      url: '/people/add_project',
      data: { project_id: project_id },
      dataType: 'json'
    })

    .done(function() {
      // notice('プロジェクトを追加しました');
    })

    .fail(function() {
      // alert('プロジェクト追加に失敗しました');
    })
  }

  function removeProjectToDb(project_id) {
    $.ajax({
      type: 'GET',
      url: '/people/remove_project',
      data: { project_id: project_id },
      dataType: 'json'
    })

    .done(function() {
      // notice('プロジェクトを脱退しました');
    })

    .fail(function() {
      // alert('プロジェクト脱退に失敗しました');
    })
  }

  search_input.on("keyup", function() {
    searchProject(false);
  });

  search_list.on("click", ".main-page__body__form__group__double-field__group__field-box__field__btn--add", function() {
    var project = getProject($(this));
    var dbSave = project_list.data("save");
    if (dbSave === true) {
      addProjectToDb(project.id);
    }
    $(this).parent().remove();
    appendProject(project);
  })

  project_list.on("click", ".main-page__body__form__group__double-field__group__field-box__field__btn--remove", function() {
    var project = getProject($(this));
    var dbSave = project_list.data("save");
    if (dbSave === true) {
      removeProjectToDb(project.id);
    }
    $(this).parent().remove();
    preword = "";
    searchProject(true);
  })
})