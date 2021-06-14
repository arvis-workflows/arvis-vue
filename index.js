"use strict";

const arvish = require("arvish");

const config = {
	url: "bh4d9od16a-dsn.algolia.net/1/indexes/*/queries",
	appId: "BH4D9OD16A",
	apiKey: "85cc3221c9f23bfbaa4e3913dd7625ea",
};

const q = "query=" + arvish.input + "&hitsPerPage=10";

arvish
	.fetch(config.url, {
		method: "POST",
		headers: {
			"x-algolia-application-id": config.appId,
			"x-algolia-api-key": config.apiKey,
		},
		body: {
			requests: [
				{
					indexName: "vuejs",
					params: q,
				},
			],
		},
	})
	.then((data) => {
		const items = data.results[0].hits.map((x) => {
			const result = {
				title: x.anchor,
				subtitle: x.anchor,
				arg: x.url,
				quicklookurl: x.url,
			};

			if (x.hierarchy) {
				const hierarchy = Object.keys(x.hierarchy)
					.filter((objKey) => Boolean(x.hierarchy[objKey]))
					.sort();

				result.title = x.hierarchy[hierarchy[hierarchy.length - 1]];
				result.subtitle = hierarchy
					.map((level) => x.hierarchy[level])
					.join(" > ");
			}

			return result;
		});

		arvish.output(items);
	});
