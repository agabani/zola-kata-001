zola = {};
zola.search = {};
zola.search.ready = function() {

    var $search = $('.ui.search');

    var index = elasticlunr.Index.load(window.searchIndex);

    $search.search({
        type: 'category',
        apiSettings: {
            responseAsync: function(settings, callback){
                var response = {
                    success: true,
                    results : {}
                };

                let results = index.search(settings.urlData.query);

                $.each(results, function(index, item) {
                    var category = 'AMD' || 'Unknown';

                    if (response.results[category] === undefined) {
                        response.results[category] = {
                            name: category,
                            results: []
                        }
                    }

                    response.results[category].results.push({
                        title: item.doc.title,
                        description: item.doc.body,
                        url: item.ref
                    });
                });

                callback(response);
            }
        }
    });
}

$(document).ready(zola.search.ready);
