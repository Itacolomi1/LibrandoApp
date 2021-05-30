function criarSala() {
    var url = "https://librando.azurewebsites.net/api/sala/register";
    //var url = "http://localhost:9090/api/sala/register";

    var token = localStorage.getItem('user_token').replaceAll("\"", "");

    var sala = {};
    sala.roomName = $('#exampleDropdownFormNome').val();
    sala.tipoJogo = $("input[name='groupJogos']:checked").val();
    sala.dataCriacao = getDate();

    if (sala.roomName != null && sala.tipoJogo != null) {
        $.ajax({
            type: "POST",
            url: url,
            data: sala,
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .done(function (data) {
                window.location = "https://librandoapp.azurewebsites.net/ListaSalas"
            })

            .fail(function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
            });
    }
}

function getDate() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    return date + ' ' + time;
}