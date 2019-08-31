$(document).on('turbolinks:load', function() {
  var search_input = $("#task-search-input");
  var search_list = $("#task-search-list");
  var task_list = $("#task-list");
  var preword;

  function appendSearchTask(task) {
    var html = `<div class="main-page__body__form__group__double-field__group__field-box__field">
                  <a class="main-page__body__form__group__double-field__group__field-box__field__text" href="/tasks/${ task.id }">${ task.name }</a>
                  <div class="main-page__body__form__group__double-field__group__field-box__field__btn main-page__body__form__group__double-field__group__field-box__field__btn--add" data-task-id="${ task.id }" data-task-name="${ task.name }">
                    <i class="fas fa-plus main-page__body__form__group__double-field__group__field-box__field__btn__icon"></i>
                  </div>
                </div>`
    search_list.append(html);
  }

  function appendTask(task) {
    var html = `<div class="main-page__body__form__group__double-field__group__field-box__field">
                  <a class="main-page__body__form__group__double-field__group__field-box__field__text" href="/tasks/${ task.id }">${ task.name }</a>
                  <div class="main-page__body__form__group__double-field__group__field-box__field__btn main-page__body__form__group__double-field__group__field-box__field__btn--remove" data-task-id="${ task.id }" data-task-name="${ task.name }">
                    <i class="fas fa-times main-page__body__form__group__double-field__group__field-box__field__btn__icon"></i>
                  </div>
                </div>`
    task_list.append(html);
  }

  function getTask(element) {
    var task = {
      id : element.data("task-id"),
      name : element.data("task-name")
    };
    return task;
  }

  function getTaskIds() {
    var task_ids = [];
    task_list.children(".main-page__body__form__group__double-field__group__field-box__field").each(function() {
      var task_id = $(this).children("input").prop("value");
      task_ids.push(task_id);
    });
    return task_ids;
  }

  function searchTask(eventClick) {
    var input = search_input.val().replace(/\s+/g, "");
    var task_ids = getTaskIds();

    if (input !== preword || eventClick === true) {
      $.ajax({
        type: 'GET',
        url: '/tasks/search',
        data: { keyword: input, task_ids: task_ids },
        dataType: 'json'
      })

      .done(function(tasks) {
        search_list.empty();
        if (tasks.length !== 0 && input.length !== 0) {
          tasks.forEach(function(task){
            appendSearchTask(task);
          });
        }
      })

      .fail(function() {
        alert('タスク検索に失敗しました');
      })
    }
    preword = input;
  }

  function addTaskToDb(task_id) {
    $.ajax({
      type: 'GET',
      url: '/people/add_task',
      data: { task_id: task_id },
      dataType: 'json'
    })

    .done(function() {
      // notice('タスクを追加しました');
    })

    .fail(function() {
      alert('タスク追加に失敗しました');
    })
  }

  function removeTaskToDb(task_id) {
    $.ajax({
      type: 'GET',
      url: '/people/remove_task',
      data: { task_id: task_id },
      dataType: 'json'
    })

    .done(function() {
      // notice('タスクメンバーから外れました');
    })

    .fail(function() {
      alert('タスクメンバーから外れるのに失敗しました');
    })
  }

  search_input.on("keyup", function() {
    searchTask(false);
  });

  search_list.on("click", ".main-page__body__form__group__double-field__group__field-box__field__btn--add", function() {
    var task = getTask($(this));
    var dbSave = task_list.data("save");
    if (dbSave === true) {
      addTaskToDb(task.id);
    }
    $(this).parent().remove();
    appendTask(task);
  })

  task_list.on("click", ".main-page__body__form__group__double-field__group__field-box__field__btn--remove", function() {
    var task = getTask($(this));
    var dbSave = task_list.data("save");
    if (dbSave === true) {
      removeTaskToDb(task.id);
    }
    $(this).parent().remove();
    preword = "";
    searchTask(true);
  })
})