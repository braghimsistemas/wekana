var rnd = function(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
};

$(function() {

    // Lista basica já sortida
    var basics = [
        {a:'あ'}, {i:'い'}, {u:'う'}, {e:'え'}, {o:'お'},
        {ka:'か'}, {ki:'き'}, {ku:'く'}, {ke:'け'}, {ko:'こ'},
        {ga:'が'}, {gi:'ぎ'}, {gu:'ぐ'}, {ge:'げ'}, {go:'ご'},
        {sa:'さ'}, {shi:'し'}, {su:'す'}, {se:'せ'},{so:'そ'},
        {za:'ざ'}, {ji:'じ'}, {zu:'ず'}, {ze:'ぜ'}, {zo:'ぞ'},
        {ta:'た'}, {chi:'ち'}, {tsu:'つ'}, {te:'て'}, {to:'と'},
        {da:'だ'}, {dji:'ぢ'}, {du:'づ'}, {de:'で'}, {do:'ど'},
        {na:'な'}, {ni:'に'}, {nu:'ぬ'}, {ne:'ね'}, {no:'の'},
        {ha:'は'}, {hi:'ひ'}, {fu:'ふ'}, {he:'へ'}, {ho:'ほ'},
        {ba:'ば'}, {bi:'び'}, {bu:'ぶ'}, {be:'べ'}, {bo:'ぼ'},
        {pa:'ぱ'}, {pi:'ぴ'}, {pu:'ぷ'}, {pe:'ぺ'}, {po:'ぽ'},
        {ma:'ま'}, {mi:'み'}, {mu:'む'}, {me:'め'}, {mo:'も'},
        {ra:'ら'}, {ri:'り'}, {ru:'る'}, {re:'れ'}, {ro:'ろ'},
        
        {ya:'や'}, {yu:'ゆ'}, {yo:'よ'},
        {kya:'きゃ'}, {kyu:'きゅ'}, {kyo:'きょ'},
        {sha:'しゃ'}, {shu:'しゅ'}, {sho:'しょ'},
        {cha:'ちゃ'}, {chu:'ちゅ'}, {cho:'ちょ'},
        {nya:'にゃ'}, {nyu:'にゅ'}, {nyo:'にょ'},
        {hya:'ひゃ'}, {hyu:'ひゅ'}, {hyo:'ひょ'},
        {mya:'みゃ'}, {myu:'みゅ'}, {myo:'みょ'},
        {rya:'りゃ'}, {ryu:'りゅ'}, {ryo:'りょ'},
        {gya:'ぎゃ'}, {gyu:'ぎゅ'}, {gyo:'ぎょ'},
        {ja:'じゃ'}, {ju:'じゅ'}, {jo:'じょ'},
        {bya:'びゃ'}, {byu:'びゅ'}, {byo:'びょ'},
        {pya:'ぴゃ'}, {pyu:'ぴゅ'}, {pyo:'ぴょ'},
        
        {wa:'わ'}, {wo:'を'},
        {n:'ん'}
    ].sort(function(a,b) {
      return .5 - Math.random();
    });

    // Lista em Objeto para pegarmos dicas falsas
    var bIndexes = [];
    for (var i in basics) bIndexes.push(Object.keys(basics[i])[0]);
    
    var currI = 0;
    var change = function() {

        // Pega o valor da chave e do valor
        var romaji = Object.keys(basics[currI])[0];
        var value = Object.values(basics[currI])[0];

        // Preenche o texto do box
        $('#mod2level3-question').text(value);

        // Limpamos as 4 opcoes
        $('#mod2level3-answer .thumbnail').text('');

        // Nos temos 4 opcoes entao primeiro vamos escolher
        // aleatoriamente uma delas para a resposta certa
        var rndi = rnd(0, 3);
        var already = [];
        $('#mod2level3-answer .thumbnail').each(function(a,b,c) {

            if (parseInt($(b).data('key')) === rndi) {
                // Valor correto para a resposta
                $(b).text(romaji);
                already.push(romaji);

            } else {
                // Resposta errada
                for (var y=0; y<100; y++) {
                    var rndOpt = bIndexes[rnd(0, (bIndexes.length-1))];
                    if (already.indexOf(rndOpt) === -1) {
                        $(b).text(rndOpt);
                        already.push(rndOpt);
                        break;
                    }
                }
            }
        });

        // Avança para o próximo (isso tera efeito apenas depois de acertar)
        currI = (currI < (basics.length-1)) ? currI+1 : 0;
    };
    

    // Ao abrir o modal
    $('#modalMod2Level3').on('show.bs.modal', function () {
        basics.sort(function(a,b) {
          return .5 - Math.random();
        })
        currI = 0;
        change(); // Start
        $('#mod2level3-pnts').text('0');
    });

    // Ao clicar para tentar respoder
    $('#mod2level3-answer .thumbnail').on('click', function() {
        var answer = $(this).text();
        var correct = wanakana.toRomaji($('#mod2level3-question').text());
        
        // Acerto mizeravi!
        if (answer == correct) {
            change();
            $('#mod2level3-pnts').text(parseInt($('#mod2level3-pnts').text()) + rnd(30, 50));
        } else {
            var score = parseInt($('#mod2level3-pnts').text()) - rnd(0, 10);
            $('#mod2level3-pnts').text((score < 0) ? 0 : score);
        }

    });

});
