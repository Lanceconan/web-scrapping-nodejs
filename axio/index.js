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
                    url: $(this).children('.index-article-link').attr('href'),
                    tags: $(this).find('.tags').text().split('#')
                        .map(tag => tag.trim())
                        .filter(function(n) { return n != "" })
                }
            });
        }

        fs.writeFile('json-info-articulos.txt', JSON.stringify(devtoList), function(err) {
            if (err)
                return console.log(err);
            console.log('Se escribió el archivo con la info extraída');
        });


    }, (error) => console.log(err));