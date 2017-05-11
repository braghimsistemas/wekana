var rnd = function(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
};

$(function() {
   
    var currI = 0;

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

    /** Muda a pergunta junto das dicas **/
    var change = function() {

        var romaji = Object.keys(basics[currI])[0];
        var value = Object.values(basics[currI])[0];

        // Adiciona o hiragana ao box da pergunta
        $('#mod2level4-question').text(value);

        // Temos 4 dicas, primeiro vamos escolher
        // aleatoriamente quem vai ter a resposta certa
        var rndi = rnd(0, 3);
        var already = [];

        // Loop sobre os td's da tabela
        $('table#mod2level4-table-tips tr td').each(function(a,b,c) {

            // Resposta certa
            if (parseInt($(b).data("key")) == rndi) {
                $(b).text(romaji);
                already.push(romaji);
            } else {
                // Dica errada
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
    
    // Ao clicar no botao para dicas
    $('#mod2level4-btn-tips').on('click', function() {
        $('#mod2level4-table-tips').fadeToggle('fast');
        $('input[name="mod2level4-answere"]').focus(); // Retorna o foco para o input de resposta
    });

    // Ao abrir o modal
    $('#modalMod2Level4').on('show.bs.modal', function () {
        $('input[name="mod2level4-answere"]').focus();

        // Reinicia o quiz
        currI = 0;
        $('#mod2level4-table-tips').hide();

        // Começa aqui
        change();

        // Zera pontuacao
        $('#mod2level4-pnts').text('0');
    });

    // O usuario vai responder por aqui
    $('#mod2level4-answere').keyup(function() {
        var value = $(this).val();
        var higana = wanakana.toHiragana(value);

        // Acerto mizeravi
        if (higana == $('#mod2level4-question').text()) {
            $('#mod2level4-table-tips').hide();
            change();
            $(this).val('');

            $('#mod2level4-pnts').text(parseInt($('#mod2level4-pnts').text()) + rnd(0,30));

            if (currI == 0) {
                alert('Parabéns! Você acertou tudo!');
            }
        }
    });
});
