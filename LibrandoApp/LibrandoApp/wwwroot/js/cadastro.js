document.addEventListener('deviceready', onDeviceReady, false)

function onDeviceReady() {

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version)
    document.getElementById('deviceready').classList.add('ready')
}

function cadastrarUsuario() {
    var url = "https://librando.azurewebsites.net/api/usuario/register";

    var nomeUsuario = $('#exampleDropdownFormNome1').val();
    var loginUsuario = $('#exampleDropdownFormEmail1').val();
    var senhaUsuario = $('#exampleDropdownFormPassword1').val();

    $.ajax({
        type: "POST",
        url: url,
        data: { login: loginUsuario, senha: senhaUsuario, nome: nomeUsuario },
        cache: false
    })
        .done(function (data) {
            console.log(data);

        })

        .fail(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        });
}
