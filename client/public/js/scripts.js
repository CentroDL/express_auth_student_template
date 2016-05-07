$(function() {
  console.log('scripts loaded...');

  $loginForm = $("#login-form");

  $loginForm.submit( function(e){
    e.preventDefault();

    $.post({    url: "/api/auth",
             method: "post",
             data: {
              username: $loginForm.find("[name=username]").val(),
              password: $loginForm.find("[name=password]").val()
             }
    }).success(function(data){
      console.log(data);
      if(data.token){
        Cookies.set("jwt_token", data.token);
      } else {
        console.log("ERROR LOGGING IN");
      }
    });

  });
});
