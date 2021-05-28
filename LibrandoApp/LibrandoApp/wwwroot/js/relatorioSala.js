$(document).ready(function () {

    var token = localStorage.getItem('user_token');

    $('#tabelaRelatorio').DataTable({
        dom: "Bfrtip",
        ajax: {
            // url: "https://librando.azurewebsites.net/api/sala/",
            url: "http://localhost:9090/api/sala/",
            type: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            },
            "dataSrc": '',
        },
        columns: [
            { data: "cod_acesso" },
            { data: "roomName" },
        ],
    });
});