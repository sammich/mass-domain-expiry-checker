const fs = require('fs');
const async = require('async');
const whois = require('whois');

const utils = require('./utils');
const checker = require('./checker');

let maxDomainLength = 0; // used for pretty print

// serial - don't want to flood registrars with requests
// small pause between subsequent queries
const execQueue = async.priorityQueue((domain, done) => {
    checker.lookupExpiryForDomain(domain).then(res => {
        utils.logTwoColumnPadded(domain, res, maxDomainLength);
        
        utils.delayCall(done, 250);
    }).catch(err => {
        if (err instanceof Error) {
            return console.error(err);
        }
    
        utils.logTwoColumnPadded(domain, err, maxDomainLength, true);
        utils.delayCall(done, 250);
    });
}, 1);

fs
.readFileSync('./domains.txt', 'utf-8')
.split('\n')
.forEach(d => {
    d = d.trim();
    
    if (d && d[0] !== '#') {
        maxDomainLength = Math.max(d.length, maxDomainLength);
        execQueue.push(d.toLowerCase());
    }
});