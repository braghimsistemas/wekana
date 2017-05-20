$(function() {
    // https://en.wiktionary.org/wiki/Appendix:1000_Japanese_basic_words
    // http://www.openxrest.com/translatejs/

    // Dicionario
    var dic = [
        // Plantas
        {hiragana:'しょくぶつ', mean:'plants',romaji:'shokubutsu'},
        {hiragana:'くさ', mean:'grass',romaji:'kusa'},
        {hiragana:'はな', mean:'flower',romaji:'hana'},
        {hiragana:'み', mean:'fruit',romaji:'mi'},
        {hiragana:'き', mean:'tree',romaji:'ki'},
        {hiragana:'は', mean:'leaf',romaji:'ha'},
        {hiragana:'ね', mean:'root',romaji:'ne'},
        {hiragana:'くき', mean:'stem',romaji:'kuki'},
        {hiragana:'きのこ', mean:'mushroom',romaji:'kinoko'},
        {hiragana:'さくら', mean:'cherry blossom',romaji:'sakura'},

        // Comida
        {hiragana:'たべもの', mean:'food',romaji:'tabemono'},
        {hiragana:'ちょうしょく', mean:'breakfast',romaji:'choushoku'},
        {hiragana:'ひるごはん', mean:'lunch',romaji:'hirugohan'},
        {hiragana:'ばんごはん', mean:'diner',romaji:'bangohan'},
        {hiragana:'ごはん', mean:'cooked rice or food',romaji:'gohan'},
        {hiragana:'りょうり', mean:'cooking',romaji:'ryouri'},
        {hiragana:'さらだ', mean:'salad',romaji:'sarada (サラダ)'},
        {hiragana:'ぱん', mean:'bread',romaji:'pan (パン)'},

        // Bebida
        {hiragana:'のみもの', mean:'drink/beverage',romaji:'nomimono'},
        {hiragana:'ちゃ', mean:'tea',romaji:'cha'},
        {hiragana:'おちゃ', mean:'green tea',romaji:'ocha'},
        {hiragana:'ぎゅうにゅう', mean:'milk',romaji:'gyounyou'},
        {hiragana:'みず', mean:'water',romaji:'mizu'},

        // Tempero
        {hiragana:'さとう', mean:'sugar',romaji:'satou'},
        {hiragana:'しお', mean:'salt',romaji:'shio'},
        {hiragana:'しょうゆ', mean:'soy sauce',romaji:'shouyu'},

        // Tempo
        {hiragana:'じかん', mean:'time',romaji:'jikan'},
        {hiragana:'とき', mean:'hours',romaji:'toki'},
        {hiragana:'こよみ', mean:'calendar',romaji:'koyomi'},
        {hiragana:'ふん', mean:'minute',romaji:'fun'},
        {hiragana:'びょう', mean:'second',romaji:'byou'},
        {hiragana:'ひ', mean:'day',romaji:'hi'},
        {hiragana:'つき', mean:'month',romaji:'tsuki'},
        {hiragana:'とし', mean:'year',romaji:'toshi'},
        {hiragana:'きょうねん', mean:'last year',romaji:'kyounen'},
        {hiragana:'ことし', mean:'this year',romaji:'kotoshi'},
        {hiragana:'らいねん', mean:'next year',romaji:'rainen'},
        {hiragana:'きのう', mean:'yesterday',romaji:'kinou'},
        {hiragana:'きょう', mean:'today',romaji:'kyou'},
        {hiragana:'あした', mean:'tomorrow',romaji:'ashita'},
        {hiragana:'あさ', mean:'morning',romaji:'asa'},
        {hiragana:'ひる', mean:'afternoon',romaji:'hiru'},
        {hiragana:'ゆうがた', mean:'evening',romaji:'yougata'},
        {hiragana:'ばん', mean:'evening',romaji:'ban'},
        {hiragana:'よる', mean:'night',romaji:'yoru'},
        {hiragana:'ようび', mean:'day',romaji:'youbi'},
        {hiragana:'しゅう', mean:'week',romaji:'shuu'},
        {hiragana:'いっしゅうかん', mean:'one week',romaji:'isshuukan'},

        // Dias da semana
        {hiragana:'にちようび', mean:'Sunday',romaji:'nichi youbi'},
        {hiragana:'げつようび', mean:'Monday',romaji:'getsu youbi'},
        {hiragana:'かようび', mean:'Tuesday',romaji:'ka youbi'},
        {hiragana:'すいようび', mean:'Wednesday',romaji:'sui youbi'},
        {hiragana:'もくようび', mean:'Thursday',romaji:'moku youbi'},
        {hiragana:'きんようび', mean:'Friday',romaji:'kin youbi'},
        {hiragana:'どようび', mean:'',romaji:'do youbi'},

        // Clima
        {hiragana:'たいよう', mean:'sun',romaji:'taiyou'},
        {hiragana:'つき', mean:'moon',romaji:'tsuki'},
        {hiragana:'ほし', mean:'star',romaji:'hoshi'},
        {hiragana:'てんき', mean:'weather',romaji:'tenki'},
        {hiragana:'はれ', mean:'clear weather',romaji:'hare'},
        {hiragana:'あめ', mean:'rain',romaji:'ame'},
        {hiragana:'くもり', mean:'cloudy',romaji:'kumori'},
        {hiragana:'ゆき', mean:'snow',romaji:'yuki'},
        {hiragana:'かぜ', mean:'wind',romaji:'kaze'},
        {hiragana:'かみなり', mean:'thunder, lightning',romaji:'kaminari'},
        {hiragana:'たいふう', mean:'typhoon',romaji:'taifuu'},
        {hiragana:'あらし', mean:'storm',romaji:'arashi'},
        {hiragana:'そら', mean:'sky',romaji:'sora'},

        // Direcoes e posicoes
        {hiragana:'きた', mean:'north',romaji:'kita'},
        {hiragana:'ひがし', mean:'east',romaji:'higashi'},
        {hiragana:'みなみ', mean:'south',romaji:'minami'},
        {hiragana:'にし', mean:'west',romaji:'nishi'},
        {hiragana:'ここ', mean:'here',romaji:'koko'},
        {hiragana:'そこ', mean:'there',romaji:'soko'},
        {hiragana:'あそこ', mean:'over there',romaji:'asoko'},
        {hiragana:'みぎ', mean:'right',romaji:'migi'},
        {hiragana:'ひだり', mean:'left',romaji:'hidari'},
        {hiragana:'うえ', mean:'above, up',romaji:'ue'},
        {hiragana:'した', mean:'below, down',romaji:'shita'},
        {hiragana:'まえ', mean:'front',romaji:'mae'},
        {hiragana:'うしろ', mean:'behind',romaji:'ushiro'},
        {hiragana:'むこう', mean:'the other side, opposite side',romaji:'mukou'},
        {hiragana:'ななめ', mean:'diagonal',romaji:'naname'},
        {hiragana:'てまえ', mean:'nearer, more in front',romaji:'temae'},
        {hiragana:'とおい', mean:'far',romaji:'tooi'},
        {hiragana:'ちかい', mean:'near,close',romaji:'chikai'},

        // Materiais
        {hiragana:'みず', mean:'water',romaji:'mizu'},
        {hiragana:'ゆ', mean:'hot water',romaji:'yu'},
        {hiragana:'こおり', mean:'ice',romaji:'kouri'},
        {hiragana:'ゆげ', mean:'steam',romaji:'yuge'},
        {hiragana:'ひ', mean:'fire',romaji:'hi'},
        {hiragana:'くうき', mean:'air, atmosphere',romaji:'kouki'},
        {hiragana:'つち', mean:'earth, ground',romaji:'tsuchi'},
        {hiragana:'きんぞく', mean:'metal, metallic',romaji:'kinzoku'},
        {hiragana:'どろ', mean:'mud, mire, clay, plaster',romaji:'doro'},
        {hiragana:'けむり', mean:'smoke, tobacco, opium',romaji:'kemuri'},
        {hiragana:'てつ', mean:'iron [Fe]',romaji:'tetsu'},
        {hiragana:'どう', mean:'copper [Cu]',romaji:'dō'},
        {hiragana:'きん', mean:'gold [Au]; money',romaji:'kin'},
        {hiragana:'ぎん', mean:'silver [Ag]; wealth',romaji:'gin'},

        /*
        {hiragana:'', mean:'',romaji:''},
        {hiragana:'', mean:'',romaji:''},
        {hiragana:'', mean:'',romaji:''},
        {hiragana:'', mean:'',romaji:''},
        {hiragana:'', mean:'',romaji:''},
        {hiragana:'', mean:'',romaji:''},

        //**/
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
        $('#mod2level6-tips').append('<div class="col-xs-4">'+fuck[f]+'</div>');
    }
    $('#mod2level6-btn-tips').on('click', function() {
        $('#mod2level6-tips').slideToggle('fast');
        setTimeout(function() {
            $('#mod2level6-tips').slideUp('fast');
        }, 3000);
    });

    var currI = 0;
    var next = false;

    // Aqui mudamos a palavra no começo e depois de acertar
    var change = function() {
        $('#mod2level6-answere').focus();

        $('#mod2level6-answere').val('');

        var hiragana = dic[currI].hiragana;
        var mean = dic[currI].mean;
        var romaji = dic[currI].romaji;

        // Preenche a questao
        $('#mod2level6-question-hiragana').text(hiragana).hide();
        $('#mod2level6-question-mean').text(mean);
        $('#mod2level6-question-romaji').text(romaji).fadeTo(0, 0);
        
        // Avança para o próximo (isso tera efeito apenas depois de acertar)
        currI = (currI < (dic.length-1)) ? currI+1 : 0;

        // Não deixa pular de tela apertando enter
        next = false;
    };

    // Aqui começa a brincadeira
    $('#modalMod2Level6').on('show.bs.modal', function () {
        $('#mod2level6-answere').focus();

        currI = 0;
        change();
    });

    // Ao digitar no teclado o campo sera transformado para romaji
    wanakana.bind(document.getElementById('mod2level6-answere'));

    $('#mod2level6-answere').keyup(function() {
        if ($(this).val() == $('#mod2level6-question-hiragana').text()) {

            // Criamos um link <a> para o proximo item
            var a = $('<a>', {
                'id': 'mod2level6-btn-next',
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
            $('#mod2level6-answere').val('');

            // Mostra romaji e link para proximo
            $('#mod2level6-question-romaji').fadeTo('fast', 1);
            $('#mod2level6-question-romaji').append(a);
        }
    });

    // Muda de questao ao apertar o 'enter'
    document.addEventListener("keyup", function(e) {
        if (next && e.keyCode == 13) {
            change();

        } else if ($('#mod2level6-answere').val() == '' && e.keyCode == 8) {

            // Ao trocar de pergunta o sistema esconde o hiragana para dificultar
            // e forçar o usuário a tentar lembrar, mas ao apertar back space sem
            // ter respondido ainda ele aparece
            $('#mod2level6-question-hiragana').show();
        }

    }, false);

});

