const whois = jest.genMockFromModule('whois');

// .mockdomain.defaultdateformat
const defaultdateformat_response = `
This is a line above the one we want
Expiry Line: 2018-09-21T04:00:00Z
Other line with info we don't care about

Bacon
`;

// .mockdomain.explicitdateformat
const explicitdateformat_response = `
This is a line above the one we want
Expiration: 29--09--2018
Other line with info we don't care about

Cheese
`;

// .mockdomain.lookuperror

// .mockdomain.nomatch
const nomatch_response = `
Make sure the tld patterns never match any line
in this chunk of text

Potato
`;

whois.lookup = (domain, cb) => {
    let response;
    if (domain.indexOf('defaultdateformat') > -1)
        response = defaultdateformat_response;
    else if (domain.indexOf('explicitdateformat') > -1)
        response = explicitdateformat_response;
    else if (domain.indexOf('lookuperror') > -1)
        return cb('this is error message, k?');
    else if (domain.indexOf('nomatch') > -1)
        response = nomatch_response;
    
    cb(null, response);
};

module.exports = whois;