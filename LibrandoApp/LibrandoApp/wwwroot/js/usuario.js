function logarUsuario() {

   var url = "https://librando.azurewebsites.net/api/usuario/authenticate";
   

    var usuario = {};
    usuario.email = $('#email_user').val();
    usuario.senha = $('#password_user').val();

    $.ajax({
        type: "POST",
        url: url,
        data: usuario,
        cache: false
    })
        .done(function (data) {
            localStorage.setItem('user_token', JSON.stringify(data.token));
            console.log('a token é ' + JSON.parse(localStorage.getItem('user_token')));
            window.location = "https://librandoapp.azurewebsites.net/homeProfessor"
            console.log(data);

        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Usuário ou Senha inválido");
            console.log(errorThrown);
        });

}