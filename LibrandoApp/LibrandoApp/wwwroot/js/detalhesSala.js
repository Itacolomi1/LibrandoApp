$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    var nomeSala = urlParams.get('NomeSala');
    var codigo = urlParams.get('Codigo');
    var status = urlParams.get('Status');
    var tipoJogo = urlParams.get('TipoJogo');
    var dataCriacao = urlParams.get('DataCriacao');

    $('#NomeSala').val(nomeSala);
    $('#CodigoSala').val(codigo);
    $('#link_sala').text('http://librandoapp.azurewebsites.net/AcessoSala?code=' + codigo);
    $('#link_sala').attr('href', 'http://librandoapp.azurewebsites.net/AcessoSala?code=' + codigo);

    $("input[name=groupJogos][value=" + tipoJogo + "]").prop('checked', true);

    $(':radio').attr('disabled', true);

    if (status == "0")
        $("#Status").prop("checked", false);
    else
        $("#Status").prop("checked", true);
});

function editarSala() {
    const urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('Id');
    var token = localStorage.getItem('user_token').replaceAll("\"", "");

    var url = "https://librando.azurewebsites.net/api/sala/editarSala";

    var nomeSala = $('#NomeSala').val();
    var codigo = $('#CodigoSala').val();

    var ckStatus = $('#Status').is(":checked");

    var status = ckStatus ? 1 : 0;

    $.ajax({
        type: "PUT",
        url: url,
        data: { _id: id, roomName: nomeSala, status: status, cod_acesso: codigo },
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
        .done(function (data) {
            console.log(data);

        })

        .fail(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        })

        .always(function () {

            window.location = "https://librandoapp.azurewebsites.net/ListaSalas"
        });
}