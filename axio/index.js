/**
 * Fuente: https://dev.to/aurelkurtula/introduction-to-web-scraping-with-nodejs-9h2
 * Este código extrae textos sobre la página dev.to, se siguío el código como tutorial
 *  
 * */

let request = require('request');
let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');

axios.get('https://dev.to/aurelkurtula')
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            var devtoList = [];
            $('.single-article').each(function(i, elem) {
                devtoList[i] = {
                    title: $(this).find('h3').text().trim(),
                    url: $(this).children('.highlights-featured-image').attr('href'),
                    tags: $(this).find('.tags').text().split('#')
                        .map(tag => tag.trim())
                        .filter(function(n) { return n != "" })
                }
            });
        }

        fs.writeFile(
            'json-info-articulos.json',
            JSON.stringify(
                devtoList.filter(n => n != undefined),
                null,
                4
            ),
            function(err) {
                if (err)
                    return console.log(err);
                console.log('Se escribió el archivo con la info extraída');
            }
        );


    }, (error) => console.log(err));