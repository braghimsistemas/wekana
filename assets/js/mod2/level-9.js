$(function() {
    // https://en.wiktionary.org/wiki/Appendix:1000_Japanese_basic_words
    // http://www.openxrest.com/translatejs/

    // Dicionario
    var dic = [
        // Familia
        {hiragana:'かぞく', mean:'family',romaji:'kazoku'},
        {hiragana:'りょうしん', mean:'parents',romaji:'ryoushin'},
        {hiragana:'こども', mean:'children, child',romaji:'kodomo'},
        {hiragana:'ちち', mean:'father',romaji:'chichi'},
        {hiragana:'はは', mean:'mother',romaji:'haha'},
        {hiragana:'つま', mean:'wife',romaji:'tsuma'},
        {hiragana:'あに', mean:'older brother',romaji:'ani'},
        {hiragana:'あね', mean:'older sister',romaji:'ane'},
        {hiragana:'おとうと', mean:'younger brother',romaji:'otouto'},
        {hiragana:'いもうと', mean:'younger sister',romaji:'imouto'},
        {hiragana:'きょうだい', mean:'brothers, siblings',romaji:'kyoudai'},
        {hiragana:'しまい', mean:'sisters',romaji:'shimai'},
        {hiragana:'そふ', mean:'grandfather',romaji:'sofu'},
        {hiragana:'そぼ', mean:'grandmother',romaji:'sobo'},
        {hiragana:'まご', mean:'grandchild',romaji:'mago'},
        {hiragana:'おじ', mean:'uncle ',romaji:'oji'},
        {hiragana:'おば', mean:'aunt',romaji:'oba'},
        {hiragana:'いとこ', mean:'cousin',romaji:'itoko'},
        {hiragana:'めい', mean:'niece',romaji:'mei'},
        {hiragana:'おい', mean:'nephew',romaji:'oi'},
    ].sort(function() {
        return 0.5 - Math.random();
    });
    
    // Dicas
    // Letras mais dificeis de decorar
    var fuck = [
        'ぬ = nu', 'ね = ne', 'ふ = fu',
        'む = mu', 'め = me', 'る = ru',
        'れ = re', 'ろ = ro', 'わ = wa'
    ];
    for (var f in fuck) {
        $('#mod2level9-tips').append('<div class="col-xs-4">'+fuck[f]+'</div>');
    }
    $('#mod2level9-btn-tips').on('click', function() {
        $('#mod2level9-tips').slideToggle('fast');
        setTimeout(function() {
            $('#mod2level9-tips').slideUp('fast');
        }, 3000);
    });

    var currI = 0;
    var next = false;

    // Aqui mudamos a palavra no começo e depois de acertar
    var change = function() {
        $('#mod2level9-answere').focus();

        $('#mod2level9-answere').val('');

        var hiragana = dic[currI].hiragana;
        var mean = dic[currI].mean;
        var romaji = dic[currI].romaji;

        // Preenche a questao
        $('#mod2level9-question-hiragana').text(hiragana).hide();
        $('#mod2level9-question-mean').text(mean);
        $('#mod2level9-question-romaji').text(romaji).fadeTo(0, 0);
        
        // Avança para o próximo (isso tera efeito apenas depois de acertar)
        currI = (currI < (dic.length-1)) ? currI+1 : 0;

        // Não deixa pular de tela apertando enter
        next = false;
    };

    // Aqui começa a brincadeira
    $('#modalMod2Level9').on('show.bs.modal', function () {
        $('#mod2level9-answere').focus();

        currI = 0;
        change();
    });

    // Ao digitar no teclado o campo sera transformado para romaji
    wanakana.bind(document.getElementById('mod2level9-answere'));

    $('#mod2level9-answere').keyup(function() {
        if ($(this).val() == $('#mod2level9-question-hiragana').text()) {

            // Criamos um link <a> para o proximo item
            var a = $('<a>', {
                'id': 'mod2level9-btn-next',
                'href': 'javascript:void(0);',
                'class': 'btn btn-primary btn-xs',
                'style': 'font-size: 10pt; float: right; margin-top: 10px;'
            }).text('Next one [enter]').on('click', function(e) {
                change();
            });

            // Permite pular de tela apertando enter
            next = true;

            // Limpa primeiro, pois ao tocar no teclado
            // pode acontecer de ficar adicionando sem querer
            $('#mod2level9-answere').val('');

            // Mostra romaji e link para proximo
            $('#mod2level9-question-romaji').fadeTo('fast', 1);
            $('#mod2level9-question-romaji').append(a);
        }
    });

    // Muda de questao ao apertar o 'enter'
    document.addEventListener("keyup", function(e) {
        if (next && e.keyCode == 13) {
            change();

        } else if ($('#mod2level9-answere').val() == '' && e.keyCode == 8) {

            // Ao trocar de pergunta o sistema esconde o hiragana para dificultar
            // e forçar o usuário a tentar lembrar, mas ao apertar back space sem
            // ter respondido ainda ele aparece
            $('#mod2level9-question-hiragana').show();
        }

    }, false);

});

