/*global define */
define(function (require) {
	'use strict';

	return {
		header: require('text!templates/header.tmpl'),
		explorer: require('text!templates/explorer.tmpl'),
		history: require('text!templates/history.tmpl'),
		result: require('text!templates/result.tmpl'),
	};
});