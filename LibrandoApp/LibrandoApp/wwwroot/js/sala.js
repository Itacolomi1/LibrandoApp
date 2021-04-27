function criarSala() {

   var url = "https://librando.azurewebsites.net/api/sala/register";

    var sala = {};
    sala.roomName = $('#exampleDropdownFormNome').val();
    
    $.ajax({
        type: "POST",
        url: url,
        data: sala,
        cache: false
    })
        .done(function (data) {
            
            alert("sala cadastrada");
            console.log("sala cadastrada");

        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            
            console.log(errorThrown);
        });

}