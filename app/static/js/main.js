$(function () {
  // ******************************************************** //
  // show the add task bar
  let addTask = $(".addTask")
  $("nav i").click(() => {
    addTask.slideToggle(100);
    if (addTask.css("display") == "none") {
      $("header").css("height", 55);
    }
    console.log("clicked");
  });
  // end task bar

  // if no task txt input disable add button
  let addIn = $("#add");
  addIn.on('focus', () => {
    $(".addTask button").attr('disabled', true);
    let hund = setInterval(() => {
      if ($("#add").val() == "" || $("#add").val() == null) {
        $(".addTask button").attr('disabled', true);
      } else {
        $(".addTask button").removeAttr('disabled');
      }
      //  when input leave focus
      addIn.on('blur', () => {
        clearInterval(hund);
        // id input empty disable button
        if ($("#add").val() == "" || $("#add").val() == null) {
          $(".addTask button").attr('disabled', true);
        } else { // if not empty remove disabled
          $(".addTask button").removeAttr('disabled');
        }
      }) // end on blur
    }, 1); // end setInterval
  }) // end on focus


  // add task 
  $(".addTask button").click(() => {
    addTaskf();
  }) // end on click
  // add keypress event to input element
  $("#add").keypress((e) => {
    // console.log(e);
    if (e.which == 13 && $("#add").val() != "") {
      addTaskf();
    }
  }) // end keypress
  // end add task

  // delete task 
  // add evnt to all remove task button 
  $(document).on('click', (e) => {
    if (e.target.classList.contains('remove')) {
      // console.log(e.target);
      rmTask(e.target);
    } else if (e.target.classList.contains('iremove')) {
      // console.log(e.target.parentElement);
      rmTask(e.target.parentElement);
    } else if (e.target.classList.contains('check')) { // Update tasks if done 
      console.log(e.target.checked);
      // console.log(e.target.nextElementSibling.classList);
      let parent = e.target.parentElement.parentElement;
      console.log(parent.getAttribute("data-id"));
      $.ajax({
        method: 'UPDATE',
        data: {
          id: parent.getAttribute("data-id"),
          done: e.target.checked
        },
        success: (data) => {
          if (data == 'updated')
            e.target.nextElementSibling.classList.toggle('done');
        },
        error: () => {
          alert("error!!")
        }
      }) // end ajax
    }
  }) // end on  click
  // end Remove task



  // Declare function *********
  function rmTask(target) {
    let task = target.parentElement
    let id = task.getAttribute('data-id');
    // console.log("delete task");
    // console.log($(`li[data-id='${id}']`)[0]);
    $.ajax({
      method: 'DELETE',
      data: {
        id: id
      },
      success: (data) => {
        if (data == 'removed') {
          $(`li[data-id='${id}']`).remove();
        }
      },
      error: () => {
        alert("error!!")
      }
    }) // end ajax
  } // end rmTask

  function addTaskf() {
    // console.log($(".addTask button"));
    let txtTask = $("#add").val();
    $.ajax({
      method: 'POST',
      data: {
        body: txtTask
      },
      success: (data) => {
        // console.log(data);
        $("#base p").text("");
        $("#base p").text(txtTask); // insert txtTask in base hidden li
        let clone = $("#base li").clone()
        clone.attr('data-id', data); // add to task li id returned from server
        clone.appendTo(".tasks");
        $("#add").val(""); // reset the input to reserve a new task
      },
      error: () => {
        alert("error!!")
      }
    }) // end ajax
  } // end addTask
  // ******************************************************** //
}) // end page is ready 