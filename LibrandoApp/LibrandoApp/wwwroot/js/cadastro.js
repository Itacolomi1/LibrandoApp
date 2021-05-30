document.addEventListener('deviceready', onDeviceReady, false)
var campo_branco = false;
function onDeviceReady() {

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version)
    document.getElementById('deviceready').classList.add('ready')
}

function cadastrarUsuario() {
    campo_branco = false;
    var url = "https://librando.azurewebsites.net/api/usuario/register";

    var nomeUsuario = $('#exampleDropdownFormNome1').val();
    var loginUsuario = $('#exampleDropdownFormEmail1').val();
    var senhaUsuario = $('#exampleDropdownFormPassword1').val();

   valida_campo(nomeUsuario);
   valida_campo(loginUsuario);
   valida_campo(senhaUsuario);

    if (!campo_branco) {

        $.ajax({
            type: "POST",
            url: url,
            data: { login: loginUsuario, senha: senhaUsuario, nome: nomeUsuario },
            cache: false
        })
            .done(function (data) {
                alert("Usuario cadastrado com sucesso");
                window.location = "https://librandoapp.azurewebsites.net/Login";

            })

            .fail(function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
            });

    }
    else {

        alert("Todos os campos sao obrigatorios!");
    }

  
}

function valida_campo(campo) {

    if (campo == "") {
        campo_branco = true;
    }   

}
