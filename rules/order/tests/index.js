'use strict';

const rule = require('..');
const ruleName = rule.ruleName;
const messages = rule.messages;

testRule(rule, {
	ruleName,
	config: [[
		'custom-properties',
		'dollar-variables',
		'declarations',
		'rules',
		'at-rules',
	]],

	accept: [
		{
			code: `
				a {
					--width: 10px;
					$height: 20px;
					display: none;

					span {}

					@media (min-width: 100px) {}
				}
			`,
		},
		{
			code: `
				a {
					span {}
					@media (min-width: 100px) {}
				}
			`,
		},
		{
			code: `
				a {
					$height: 20px;

					@media (min-width: 100px) {}
				}
			`,
		},
		{
			code: `
				a {
					$height: 20px;
					/* comment */
					display: block;
				}
			`,
		},
		{
			code: `
				div {
					a {
						$hello: 10px;
						color: blue;
						top: 0;
					}
				}
			`,
		},
	],

	reject: [
		{
			code: `
				a {
					display: none;
					--width: 10px;
				}
			`,
			message: messages.expected('custom property', 'declaration'),
		},
		{
			code: `
				a {
					--width: 10px;
					display: none;
					$height: 20px;
				}
			`,
		},
		{
			code: `
				div {
					a {
						color: blue;
						top: 0;
					}
					color: tomato;
				}
			`,
		},
		{
			code: `
				div {
					a {
						color: blue;
						top: 0;
						$hello: 10px;
					}
				}
			`,
		},
		{
			code: `
				a {
					--width: 10px;
					$height: 20px;
					display: none;

					span {}

					@media (min-width: 100px) {}

					span {}
				}
			`,
		},
	],
});

testRule(rule, {
	ruleName,
	config: [[
		{
			type: 'at-rule',
			name: 'include',
			parameter: 'media',
			hasBlock: true,
		},
		{
			type: 'at-rule',
			name: 'include',
			parameter: 'media',
		},
		{
			type: 'at-rule',
			name: 'include',
			hasBlock: true,
		},
		{
			type: 'at-rule',
			name: 'include',
		},
		{
			type: 'at-rule',
			hasBlock: true,
		},
		{
			type: 'at-rule',
		},
	]],

	accept: [
		{
			code: `
				a {
					@include media('palm') {
						display: block;
					}
					@include media('desk');
					@include hello {
						display: block;
					}
					@include hello;
					@mixin hiya {
						display: none;
					}
					@extend .something;
				}
			`,
		},
	],

	reject: [
		{
			code: `
				a {
					@include hello;
					@include hello {
						display: block;
					}
				}
			`,
		},
		{
			code: `
				a {
					@mixin hiya {
						display: none;
					}
					@include hello {
						display: block;
					}
				}
			`,
		},
		{
			code: `
				a {
					@mixin hiya {
						display: none;
					}
					@include media('palm') {
						display: block;
					}
				}
			`,
		},
		{
			code: `
				a {
					@extend .something;
					@mixin hiya {
						display: none;
					}
				}
			`,
		},
		{
			code: `
				a {
					@extend .something;
					@include hello;
				}
			`,
		},
	],
});

testRule(rule, {
	ruleName,
	config: [[
		{
			type: 'at-rule',
			name: 'include',
			hasBlock: true,
		},
		{
			type: 'at-rule',
			name: 'include',
		},
		{
			type: 'at-rule',
			hasBlock: true,
		},
		{
			type: 'at-rule',
			name: 'include',
			parameter: 'media',
		},
		{
			type: 'at-rule',
			name: 'include',
			parameter: 'media',
			hasBlock: true,
		},
	]],

	accept: [
		{
			code: `
				a {
					@include hello {
						display: block;
					}
					@include hello;
					@mixin hiya {
						display: none;
					}
					@extend .something;
					@include media('desk');
					@include media('palm') {
						display: block;
					}
				}
			`,
		},
		{
			code: `
				a {
					@include hello {
						display: block;
					}
					@include hello;
					@extend .something;
					@mixin hiya {
						display: none;
					}
				}
			`,
		},
		{
			code: `
				a {
					@extend .something;
					@include hello {
						display: block;
					}
					@include hello;
					@mixin hiya {
						display: none;
					}
				}
			`,
		},
	],

	reject: [
		{
			code: `
				a {
					@include hello;
					@extend .something;
					@include hello {
						display: block;
					}
				}
			`,
		},
		{
			code: `
				a {
					@include media('palm') {
						display: block;
					}
					@include media('desk');
				}
			`,
		},
		{
			code: `
				a {
					@include media('palm') {
						display: block;
					}
					@mixin media('palm') {
						color: red;
					}
				}
			`,
		},
	],
});

testRule(rule, {
	ruleName,
	config: [[
		'declarations',
		{
			type: 'at-rule',
		},
	]],

	accept: [
		{
			code: `
				a {
					display: none;
					@include hello;
				}
			`,
		},
	],

	reject: [
		{
			code: `
				a {
					@include hello;
					display: none;
				}
			`,
		},
	],
});

testRule(rule, {
	ruleName,
	config: [[
		'declarations',
		'at-rules',
	]],

	accept: [
		{
			code: `
				a {
					display: none;
					@include hello;
				}
			`,
		},
	],

	reject: [
		{
			code: `
				a {
					@include hello;
					display: none;
				}
			`,
		},
	],
});

testRule(rule, {
	ruleName,
	config: [
		[
			'custom-properties',
			'declarations',
		],
		{
			unspecified: 'top',
		},
	],

	accept: [
		{
			code: `
				a {
					$width: 5px;
					--height: 10px;
					display: none;
				}
			`,
		},
		{
			code: `
				a {
					$width: 5px;
					@include hello;
				}
			`,
		},
	],

	reject: [
		{
			code: `
				a {
					display: none;
					$width: 5px;
				}
			`,
		},
		{
			code: `
				a {
					--height: 10px;
					$width: 5px;
				}
			`,
		},
	],
});

testRule(rule, {
	ruleName,
	config: [
		[
			'custom-properties',
			'declarations',
		],
		{
			unspecified: 'bottom',
		},
	],

	accept: [
		{
			code: `
				a {
					--height: 10px;
					display: none;
					$width: 5px;
				}
			`,
		},
		{
			code: `
				a {
					$width: 5px;
					@include hello;
				}
			`,
		},
	],

	reject: [
		{
			code: `
				a {
					$width: 5px;
					display: none;
				}
			`,
		},
		{
			code: `
				a {
					$width: 5px;
					--height: 10px;
				}
			`,
		},
	],
});

testRule(rule, {
	ruleName,
	config: [[
		{
			type: 'rule',
			selector: '^a',
		},
		{
			type: 'rule',
			selector: /^&/,
		},
		{
			type: 'rule',
		},
	]],

	accept: [
		{
			code: `
				a {
					a {}
					abbr {}
					&:hover {}
					span {}
				}
			`,
		},
		{
			code: `
				a {
					abbr {}
					a {}
					&:hover {}
					span {}
				}
			`,
		},
		{
			code: `
				a {
					a {}
					span {}
				}
			`,
		},
	],

	reject: [
		{
			code: `
				a {
					a {}
					&:hover {}
					abbr {}
					span {}
				}
			`,
		},
		{
			code: `
				a {
					span {}
					&:hover {}
				}
			`,
		},
		{
			code: `
				a {
					span {}
					abbr {}
				}
			`,
		},
	],
});

testRule(rule, {
	ruleName,
	config: [[
		{
			type: 'rule',
			selector: /^&/,
		},
		{
			type: 'rule',
			selector: /^&:\w/,
		},
		{
			type: 'rule',
		},
	]],

	accept: [
		{
			code: `
				a {
					&:hover {}
					& b {}
					b & {}
				}
			`,
		},
		{
			code: `
				a {
					& b {}
					&:hover {}
					b & {}
				}
			`,
		},
	],

	reject: [
		{
			code: `
				a {
					& b {}
					b & {}
					&:hover {}
				}
			`,
		},
		{
			code: `
				a {
					&:hover {}
					b & {}
					& b {}
				}
			`,
		},
	],
});

testRule(rule, {
	ruleName,
	config: [[
		{
			type: 'rule',
		},
		{
			type: 'rule',
			selector: /^&:\w/,
		},
		{
			type: 'rule',
			selector: /^&/,
		},
	]],

	accept: [
		{
			code: `
				a {
					b & {}
					&:hover {}
					& b {}
				}
			`,
		},
		{
			code: `
				a {
					b & {}
					& b {}
				}
			`,
		},
	],

	reject: [
		{
			code: `
				a {
					b & {}
					& b {}
					&:hover {}
				}
			`,
		},
		{
			code: `
				a {
					&:hover {}
					b & {}
				}
			`,
		},
	],
});

testRule(rule, {
	ruleName,
	syntax: 'less',
	config: [[
		'custom-properties',
		'at-variables',
		'declarations',
		'rules',
		'at-rules',
	]],

	accept: [
		{
			code: `
				a {
					--width: 10px;
					@size: 30px;
					display: none;

					span {}

					@media (min-width: 100px) {}
				}
			`,
		},
		{
			code: `
				div {
					a {
						@hello: 10px;
						color: blue;
						top: 0;
					}
				}
			`,
		},
	],

	reject: [
		{
			code: `
				div {
					a {
						color: blue;
						top: 0;
						@hello: 10px;
					}
				}
			`,
		},
	],
});

testRule(rule, {
	ruleName,
	syntax: 'less',
	config: [[
		'less-mixins',
		'rules',
	]],

	accept: [
		{
			code: `
				a {
					.mixin();
					span {}
				}
			`,
		},
		{
			code: `
				a {
					.mixin();
					&:extend(.class1);
				}
			`,
		},
	],

	reject: [
		{
			code: `
				a {
					span {}
					.mixin();
				}
			`,
			message: messages.expected('Less mixin', 'rule'),
		},
		{
			code: `
				a {
					&:extend(.class1);
					.mixin();
				}
			`,
			message: messages.expected('Less mixin', 'rule'),
		},
	],
});

testRule(rule, {
	ruleName,
	syntax: 'scss',
	config: [[
		'declarations',
		'rules',
	]],

	accept: [
		{
			description: 'scss 1',
			code: `a {
				margin: {
					top: 3px;
					right: 6px;
					bottom: 3px;
					left: 7px;
				}
				padding: 0;

				b {}
			}`,
		},
		{
			description: 'scss 2',
			code: `a {
				padding: 0;
				margin: {
					top: 3px;
					right: 6px;
					bottom: 3px;
					left: 7px;
				}

				b {}
			}`,
		},
		{
			description: 'scss 3',
			code: `a {
				margin: 0 {
					left: 7px;
				}
				padding: 0;

				b {}
			}`,
		},
	],

	reject: [
		{
			description: 'scss 4',
			code: `a {
				padding: 0;
				b {}
				margin: {
					top: 3px;
					right: 6px;
					bottom: 3px;
					left: 7px;
				}
			}`,
			message: messages.expected('declaration', 'rule'),
		},
		{
			description: 'scss 5',
			code: `a {
				padding: 0;
				b {}
				margin: 0 {
					left: 7px;
				}
			}`,
			message: messages.expected('declaration', 'rule'),
		},
	],
});
