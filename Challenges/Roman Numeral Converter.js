document.ready(function () {
    'use strict';
    function convertToRoman(num) {
        var answer = '';
        var numeralKey = {
            'M' : 1000,
            'CM' : 900,
            'D' : 500,
            'CD' : 400,
            'C' : 100,
            'XC' : 90,
            'L' : 50,
            'XL' : 40,
            'X' : 10,
            'IX' : 9,
            'V' : 5,
            'IV' : 4,
            '1' : 1
        };
        
        for (var numeral in numeralKey) {
            while (num >== numeralKey[numeral]) {
                answer += numeral;
                num -= numeralKey[numeral];
            }
        }
        
        $('#numerals').text(answer);
        
        return answer;
    }

    convertToRoman(35);
});