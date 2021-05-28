$(document).ready(function () {

    var token = localStorage.getItem('user_token').replaceAll("\"", "");

    $('#tabelaSalas').DataTable({
        dom: "Bfrtip",
        ajax: {
            url: "https://librando.azurewebsites.net/api/sala/",
            type: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            },
            "dataSrc": '',
        },
        columns: [
            {
                data: function (data, type, row) {
                    return '<a href="DetalhesSala?Id=' + data._id + '&NomeSala=' + data.roomName + '&TipoJogo=' + data.tipoJogo + '&Codigo=' + data.cod_acesso + '&DataCriacao=' + data.dataCriacao+ data.cod_acesso + '&Status=' + data.status + '">' +
                        '<img class="btnEdit" src="img/caneta-tinteiro.png"></img>' +
                        '</a>' +
                        '<span href=DetalhesSala?' + data._id + '>' +
                        '<img class="btnEdit" src="img/caderno.png"></img>' +
                        '</span >';
                }
            },
            { data: "cod_acesso" },
            { data: "roomName" },
            { data: "tipoJogo" },
            {
                data: function (data, type, row) {
                    var strStatus;
                    if (data.status == 0)
                        strStatus = 'Inativo'
                    else
                        strStatus = 'Ativo'
                    return strStatus;
                }
            },
            { data: "dataCriacao" },
        ],
    });
});