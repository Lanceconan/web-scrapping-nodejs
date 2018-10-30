const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

let images = [];

request("http://securityinterservic.cl/instalacion_alarmas.html",
    function(err, res, body) {
        if (!err && res.statusCode == 200) {
            var $ = cheerio.load(body);
            $('img', 'div.wrapper').each(function() {
                var img = $(this).attr('src');
                images.push('http://securityinterservic.cl/' + img);
            });
            for (let i = 0; i < images.length; i++) {
                if (images[i]) {
                    console.log(images[i]);
                    request(images[i]).pipe(fs.createWriteStream('images/photo_' + i + '.jpg'));
                }
            }
        }
    });