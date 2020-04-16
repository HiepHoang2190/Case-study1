var login = login || {};
login.check = function () {
    let email = $('#email').val();
    let pass = $('#pass').val();
    let isLogged = false;
    $.ajax({
        url: "https://case-study1.herokuapp.com/users",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, v) {
                if (v.username == email && v.password == pass) {
                    isLogged = true;
                    window.location.href = "Product-management.html";
                }

            })
            if (!isLogged) {
                $('#loginFail').removeClass('d-none');
            }
        }
    });
}

$(document).ready(function(){

});