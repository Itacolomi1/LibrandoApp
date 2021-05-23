
$(document).ready(function () {
 
});

var aprendizado = function () {

    //Ids dos elementos da tela
    var controles = function () {
        return {
            imagem: "#imagem"    
        };
    }

    var Trocar_Imagem = function (letra) {
        
        var imagem = letra + '.png';

        $(controles().imagem).attr("src", "./img/alfabeto/" + imagem);

    }

    return {
        Trocar_Imagem: Trocar_Imagem     
       
    };
}();