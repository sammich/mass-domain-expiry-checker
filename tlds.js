/**
 * { [ tld: string ]: [ regex_match_expire_line, regex_extract_date, momentjs_parse ]
 *
 */
const patterns = {
    '.com': [
        /Registrar Registration Expiration Date/,
        /: (.+)/,
        // 2018-09-21T04:00:00Z - moment JS handles automatically
    ],
    '.co.uk': [
        /Expiry date:  /,
        /Expiry date:\s+(.+)/,
        'DD-MMM-YYYY'
    ]
};

// these TLDs don't have expiry info
const blacklist = [
    '.com.au'
];

module.exports = {
    patterns,
    blacklist
};