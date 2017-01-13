/**
 * Please only modify this file if you know what you're doing.
 *
 * If you add any TLDs to `patterns` add tests for them as well.
 *
 * { [ tld: string ]: [ regex_match_expire_line, regex_extract_date, momentjs_parse ]
 */
const patterns = {
    '.com': [
        /Registrar Registration Expiration Date/,
        /: (.+)T/,
        // 2018-09-21T04:00:00Z - momentjs handles automatically
    ],
    '.co.uk': [
        /Expiry date:  /,
        /Expiry date:\s+(.+)/,
        'DD-MMM-YYYY'
    ]
};

/**
 * List of TLDs which shouldn't be checked for one reason or another
 *
 * @type String[]
 */
const blacklist = [
    '.com.au'
];

module.exports = {
    patterns,
    blacklist
};