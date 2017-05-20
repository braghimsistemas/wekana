$(function() {
    // https://en.wiktionary.org/wiki/Appendix:1000_Japanese_basic_words
    // http://www.openxrest.com/translatejs/

    // Dicionario
    var dic = [
        // Corpo
        {hiragana:'あし', mean:'foot, leg',romaji:'ashi'},
        {hiragana:'かかと', mean:'heel',romaji:'kakato'},
        {hiragana:'すね', mean:'shin',romaji:'sune'},
        {hiragana:'ひざ', mean:'knee',romaji:'hiza'},
        {hiragana:'もも', mean:'thigh',romaji:'momo'},
        {hiragana:'あたま', mean:'head',romaji:'atama'},
        {hiragana:'かお', mean:'face',romaji:'kao'},
        {hiragana:'くち', mean:'mouth',romaji:'kuchi'},
        {hiragana:'くちびる', mean:'lips',romaji:'kuchibiru'},
        {hiragana:'は', mean:'tooth',romaji:'ha'},
        {hiragana:'はな', mean:'nose',romaji:'hana'},
        {hiragana:'め', mean:'eye',romaji:'me'},
        {hiragana:'ひげ', mean:'moustache, beard',romaji:'hige'},
        {hiragana:'かみ', mean:'hair',romaji:'kami'},
        {hiragana:'みみ', mean:'ear',romaji:'mimi'},
        {hiragana:'い', mean:'stomach',romaji:'i'},
        {hiragana:'うで', mean:'arm',romaji:'ude'},
        {hiragana:'ひじ', mean:'elbow',romaji:'hiji'},
        {hiragana:'かた', mean:'shoulder',romaji:'kata'},
        {hiragana:'つめ', mean:'nail',romaji:'tsume'},
        {hiragana:'て', mean:'hand',romaji:'te'},
        {hiragana:'てくび', mean:'wrist',romaji:'tekubi'},
        {hiragana:'てのひら', mean:'palm of hand',romaji:'te-no-hira'},
        {hiragana:'ゆび', mean:'finger, toe',romaji:'yubi'},
        {hiragana:'しり', mean:'buttocks',romaji:'shiri'},
        {hiragana:'おなか', mean:'abdomen',romaji:'o-naka'},
        {hiragana:'きも', mean:'liver',romaji:'kimo'},
        {hiragana:'きんにく', mean:'muscle',romaji:'kinniku'},
        {hiragana:'くび', mean:'neck',romaji:'kubi'},
        {hiragana:'こころ', mean:'heart',romaji:'kokoro'},
        {hiragana:'こし', mean:'waist, hip',romaji:'koshi'},
        {hiragana:'せなか', mean:'back',romaji:'senaka'},
        {hiragana:'ち', mean:'blood',romaji:'chi'},
        {hiragana:'にく', mean:'meat',romaji:'niku'},
        {hiragana:'はだ', mean:'skin',romaji:'hada'},
        {hiragana:'ひふ', mean:'skin',romaji:'hifu'},
        {hiragana:'ほね', mean:'bone',romaji:'hone'},
        {hiragana:'むね', mean:'chest',romaji:'mune'},
        {hiragana:'かぜ', mean:'cold (illness)',romaji:'kaze'},
        {hiragana:'げり', mean:'diarrhea',romaji:'geri'},
        {hiragana:'びょうき', mean:'illness',romaji:'byouki'},
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
        $('#mod2level8-tips').append('<div class="col-xs-4">'+fuck[f]+'</div>');
    }
    $('#mod2level8-btn-tips').on('click', function() {
        $('#mod2level8-tips').slideToggle('fast');
        setTimeout(function() {
            $('#mod2level8-tips').slideUp('fast');
        }, 3000);
    });

    var currI = 0;
    var next = false;

    // Aqui mudamos a palavra no começo e depois de acertar
    var change = function() {
        $('#mod2level8-answere').focus();

        $('#mod2level8-answere').val('');

        var hiragana = dic[currI].hiragana;
        var mean = dic[currI].mean;
        var romaji = dic[currI].romaji;

        // Preenche a questao
        $('#mod2level8-question-hiragana').text(hiragana).hide();
        $('#mod2level8-question-mean').text(mean);
        $('#mod2level8-question-romaji').text(romaji).fadeTo(0, 0);
        
        // Avança para o próximo (isso tera efeito apenas depois de acertar)
        currI = (currI < (dic.length-1)) ? currI+1 : 0;

        // Não deixa pular de tela apertando enter
        next = false;
    };

    // Aqui começa a brincadeira
    $('#modalMod2Level8').on('show.bs.modal', function () {
        $('#mod2level8-answere').focus();

        currI = 0;
        change();
    });

    // Ao digitar no teclado o campo sera transformado para romaji
    wanakana.bind(document.getElementById('mod2level8-answere'));

    $('#mod2level8-answere').keyup(function() {
        if ($(this).val() == $('#mod2level8-question-hiragana').text()) {

            // Criamos um link <a> para o proximo item
            var a = $('<a>', {
                'id': 'mod2level8-btn-next',
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
            $('#mod2level8-answere').val('');

            // Mostra romaji e link para proximo
            $('#mod2level8-question-romaji').fadeTo('fast', 1);
            $('#mod2level8-question-romaji').append(a);
        }
    });

    // Muda de questao ao apertar o 'enter'
    document.addEventListener("keyup", function(e) {
        if (next && e.keyCode == 13) {
            change();

        } else if ($('#mod2level8-answere').val() == '' && e.keyCode == 8) {

            // Ao trocar de pergunta o sistema esconde o hiragana para dificultar
            // e forçar o usuário a tentar lembrar, mas ao apertar back space sem
            // ter respondido ainda ele aparece
            $('#mod2level8-question-hiragana').show();
        }

    }, false);

});

