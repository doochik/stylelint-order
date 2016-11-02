# stylelint-order [![Build Status][ci-img]][ci]

A collection of order related linting rules for [stylelint] (in a form of a plugin).

## Installation

```
npm install stylelint-order
```

## Usage

Add `stylelint-order` to your stylelint config plugins array, then add rules you need to the rules list. All rules from stylelint-order need to be namespaced with `order`.

Like so:

```js
// .stylelintrc
{
	"plugins": [
		"stylelint-order"
	],
	"rules": {
		// ...
		"order/declaration-block-order": [
			"custom-properties",
			"declarations"
		],
		"order/property-groups-structure": [
			{
				"order": "strict",
				"properties": [
					"display"
				]
			},
			{
				"emptyLineBefore": "always",
				"order": "strict",
				"properties": [
					"position"
				]
			}
		]
		// ...
	}
}
```

## List of rules

* [`declaration-block-order`](./rules/declaration-block-order/README.md): Specify the order of content within declaration blocks.
* [`property-groups-structure`](./rules/property-groups-structure/README.md): Require or disallow an empty line before property groups.

[ci-img]: https://travis-ci.org/hudochenkov/stylelint-order.svg
[ci]: https://travis-ci.org/hudochenkov/stylelint-order

[stylelint]: http://stylelint.io/