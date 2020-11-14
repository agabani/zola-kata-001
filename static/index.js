const zola = {
  ready() {
    zola.search.ready();
    zola.userInterface.ready();
  },
  search: {
    ready() {
      const $search = $('.ui.search');

      const index = elasticlunr.Index.load(window.searchIndex);

      $search.search({
        type: 'category',
        apiSettings: {
          responseAsync(settings, callback) {
            const response = {
              success: true,
              results: {},
            };

            const results = index.search(settings.urlData.query);

            $.each(results, (_index, item) => {
              const category = 'AMD' || 'Unknown';

              if (response.results[category] === undefined) {
                response.results[category] = {
                  name: category,
                  results: [],
                };
              }

              response.results[category].results.push({
                title: item.doc.title,
                description: item.doc.body,
                url: item.ref,
              });
            });

            callback(response);
          },
        },
      });
    },
  },
  userInterface: {
    ready() {
      const $sidebar = $('.ui.sidebar');

      $sidebar
        .sidebar('setting', 'transition', 'scale down')
        .sidebar('attach events', '#menu', 'show');
    },
  },
};

$(document).ready(zola.ready);
