# whois-domain-checker

If you're the type of person who needs to keep an eye on a lot of domain expiries, then this might
just be the tool for you!

This script simply requests whois information for all the domains you've entered into `domains.txt`
and tries to extract the expiry information and pretty prints the results.\

## Install

    npm install

## Run

    npm start

## More TLD support

This tool assumes that whois query results are consistent between all queries to a given TLD
(registrar).

To add support for more TLDs, simply add the corresponding regex' and MomentJS format string into
`tlds.js`.

## Sample output

    cnn.com           | 2018-09-21 - 617 days
    apple.com         | 2021-02-20 - 1500 days
    youtube.com       | 2017-02-14 - 33 days
    theregister.co.uk | 2018-03-14 - 426 days
