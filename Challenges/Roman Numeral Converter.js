document.ready(function() {
    'use strict';
    /**
     * Returns the Roman Numeral representation of num
     * @param {Number} num - any positive whole Number
     * @returns {String} A String of Roman Numerals equal to num
     */
    function convertToRoman(num) {
        var answer = '';
        var numeralKey = {
            'M': 1000,
            'CM': 900,
            'D': 500,
            'CD': 400,
            'C': 100,
            'XC': 90,
            'L': 50,
            'XL': 40,
            'X': 10,
            'IX': 9,
            'V': 5,
            'IV': 4,
            '1': 1
        };
        /**
         * add Roman Numerals to answer one at a time
         * wile subtracting its value from num
         */
        for (var numeral in numeralKey) {
            while (num >= numeralKey[numeral]) {
                answer += numeral;
                num -= numeralKey[numeral];
            }
        }

        document.getElementById('numerals').innerHTML = answer;

        return answer;
    }

    convertToRoman(35);
});