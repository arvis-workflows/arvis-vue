import test from 'ava';
import arvishTest from 'arvish-test';

test(async t => {
	const arvish = arvishTest();

	const result = await arvish('node index.js v-on');

	t.deepEqual(result[0], {
		title: 'v-on',
		subtitle: 'API > API > Directives > v-on',
		arg: 'https://vuejs.org/v2/api/#v-on',
		quicklookurl: 'https://vuejs.org/v2/api/#v-on'
	});
});
