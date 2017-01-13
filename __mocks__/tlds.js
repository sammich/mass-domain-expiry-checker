const patterns = {
    '.mockdomain.defaultdateformat': [
        /Expiry Line/,
        /: (.+)/
    ],
    '.mockdomain.explicitdateformat': [
        /Expiration/,
        /: (.+)/,
        'DD--MM--YYYY'
    ],
    '.mockdomain.lookuperror': [
        /zzzzzzzzzz/,
        /zzzzzzzzzz/,
        'zzzzzzzzzz'
    ]
};

const blacklist = [
    '.mockdomain.blacklisted'
];

module.exports = {
    patterns,
    blacklist
};