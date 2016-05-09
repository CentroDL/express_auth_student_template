$(function() {
  console.log('scripts loaded...');

  $loginForm = $("#login-form");

  $loginForm.submit(function(event){

    event.preventDefault();

    $.ajax({ method: "post",
                url: "/api/auth",
               data: {
                username: $loginForm.find("[name=username]").val(),
                password: $loginForm.find("[name=password]").val()
               }
    }).success( function(data){

      Cookies.set("jwt_token", data.token);
      console.log("logged in");

    } );



  }); // login form


});



















