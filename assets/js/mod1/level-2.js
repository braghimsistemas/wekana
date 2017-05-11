var rnd = function(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
};

$(function() {

    // Lista basica já sortida
    var basics = [
        {a:'あ'}, {i:'い'}, {u:'う'}, {e:'え'}, {o:'お'},
        {ka:'か'}, {ki:'き'}, {ku:'く'}, {ke:'け'}, {ko:'こ'},
        {sa:'さ'}, {shi:'し'}, {su:'す'}, {se:'せ'}, {so:'そ'},
        {ta:'た'}, {chi:'ち'}, {tsu:'つ'}, {te:'て'}, {to:'と'},
        {na:'な'}, {ni:'に'}, {nu:'ぬ'}, {ne:'ね'}, {no:'の'},
        {ha:'は'}, {hi:'ひ'}, {fu:'ふ'}, {he:'へ'}, {ho:'ほ'},
        {ma:'ま'}, {mi:'み'}, {mu:'む'}, {me:'め'}, {mo:'も'},
        {ra:'ら'}, {ri:'り'}, {ru:'る'}, {re:'れ'}, {ro:'ろ'},
        {ya:'や'}, {yu:'ゆ'}, {yo:'よ'},
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
        $('#mod1level2-question').text(value);

        // Limpamos as 4 opcoes
        $('#mod1level2-answer .thumbnail').text('');

        // Nos temos 4 opcoes entao primeiro vamos escolher
        // aleatoriamente uma delas para a resposta certa
        var rndi = rnd(0, 3);
        var already = [];
        $('#mod1level2-answer .thumbnail').each(function(a,b,c) {

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
    $('#modalMod1Level2').on('show.bs.modal', function () {
        basics.sort(function(a,b) {
          return .5 - Math.random();
        })
        currI = 0;
        change(); // Start
        $('#mod1level2-pnts').text('0');
    });

    // Ao clicar para tentar respoder
    $('#mod1level2-answer .thumbnail').on('click', function() {
        var answer = $(this).text();
        var correct = wanakana.toRomaji($('#mod1level2-question').text());
        
        // Acerto mizeravi!
        if (answer == correct) {
            change();
            $('#mod1level2-pnts').text(parseInt($('#mod1level2-pnts').text()) + rnd(30, 50));
        } else {
            var score = parseInt($('#mod1level2-pnts').text()) - rnd(0, 10);
            $('#mod1level2-pnts').text((score < 0) ? 0 : score);
        }

    });

});
