$(document).ready(function () {
    var token = localStorage.getItem('user_token').replaceAll("\"", "");

    const urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('Id');

    $('#tabelaRelatorio').DataTable({
        dom: "Bfrtip",
        ajax: {
            url: "https://librando.azurewebsites.net/api/sala/jogadores",
            //url: "http://localhost:9090/api/sala/jogadores",
            type: 'POST',
            data: { _id: id },
            headers: {
                Authorization: 'Bearer ' + token
            },
            "dataSrc": '',
        },
        columns: [
            { data: "personName" },
            { data: "pontos" },
        ],
    });
});