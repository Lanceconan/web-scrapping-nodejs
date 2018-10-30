/**
 *     
 * Este código sacará en bruto la información del sitio de noticias chilenius, obteniendo título, link, fecha, autor y cantidad de comentarios.
 * 
 * */

let request = require('request');
let axios = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');

axios.get('http://chilenius.cl/')
    .then((response) => {
        if (response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            var infoChileNius = [];
            $('.single-article').each(function(i, elem) {
                infoChileNius[i] = {
                    titulo: $(this).find('h3').text().trim(),
                    link: $(this).find('a').attr('href'),
                    fecha: $(this).find('time').attr('datetime').toString(),
                    autor: $(this).find('span.author').find('a').attr('title'),
                    comentarios: $(this).find('span.comments').find('a').text()
                }
            });
        }

        fs.writeFile(
            'info-chilenus.json',
            JSON.stringify(
                infoChileNius.filter(n => n != undefined),
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