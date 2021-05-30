$(document).ready(function () {

    var token = localStorage.getItem('user_token').replaceAll("\"", "");

    $('#tabelaSalas').DataTable({
        dom: "Bfrtip",
        ajax: {
            //url: "http://localhost:9090/api/sala/",
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
                    return '<a href="DetalhesSala?Id=' + data._id + '&NomeSala=' + data.roomName + '&TipoJogo=' + data.tipoJogo + '&Codigo=' + data.cod_acesso + '&DataCriacao=' + data.dataCriacao + data.cod_acesso + '&Status=' + data.status + '">' +
                        '<img class="btnEdit" src="img/caneta-tinteiro.png"></img>' +
                        '</a>' +
                        '<a href="RelatorioSala?Id=' + data._id + '">' +
                        '<img class="btnRelatorio" src="img/caderno.png"></img>' +
                        '</a>';
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