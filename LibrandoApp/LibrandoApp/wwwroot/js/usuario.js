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
            window.location = "https://librandoapp.azurewebsites.net/homeProfessor"
            console.log(data);

        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Usu�rio ou Senha inv�lido");
            console.log(errorThrown);
        });

}