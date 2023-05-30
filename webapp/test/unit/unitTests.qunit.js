/* global QUnit */
// @ts-nocheck
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"logali/invoices/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
