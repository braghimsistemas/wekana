$(function() {
   
    var currIn = 0;

    // sym = hiragana.js
    var basics = [
        'あ', 'い', 'う', 'え', 'お',
        'か', 'き', 'く', 'け', 'こ', // ka
        'さ', 'し', 'す', 'せ', 'そ', // sa
        'た', 'ち', 'つ', 'て', 'と', // ta
        'な', 'に', 'ぬ', 'ね', 'の', // na
        'は', 'ひ', 'ふ', 'へ', 'ほ', // ha
        'ま', 'み', 'む', 'め', 'も', // ma
        'ら', 'り', 'る', 'れ', 'ろ', // ra
        'や', 'ゆ', 'よ',
        'わ', 'を',
        'ん'
    ]

    // wanakana.js
    var wk = wanakana;

    var change = function() {
        $('#m1level1-h').text(basics[currIn]); // Hiragana
        $('#m1level1-s').text(wk.toRomaji(basics[currIn])); // Sound
    }
    
    // Ao abrir o modal
    $('#modalMod1Level1').on('show.bs.modal', function () {
        currIn = 0;
        change();
    });

    // Previous
    $('button#btn-m1level1-prev, #m1level1-h').on('click', function() {
        currIn--;
        if (currIn < 0) currIn = (basics.length-1);
        change();
    });

    // Next
    $('button#btn-m1level1-next, #m1level1-s').click(function() {
        currIn++;
        if (currIn > (basics.length-1)) currIn = 0;
        change();
    });

});

