/*global QUnit*/
// @ts-nocheck
sap.ui.define([
	"sap/ui/test/opaQunit",
	"./pages/App",
	"./pages/App"
], 
function (opaTest) {
	"use strict";

	QUnit.module("Navigation Journey");

	opaTest("Should open the dialog", function (Given, When, Then) {
		// Arrangements
		// Given.iStartMyApp();
		Given.iStartMyUIComponent({ componentConfig: { name: "logali.invoices" } });

		// Actions
		When.onTheViewPage.iSeeDialogButton();

		// Assertions
		// Then.onTheAppPage.iShouldSeeTheApp();
      	Then.onTheViewPage.iSeeTheDialog();

		//Cleanup
		Then.iTeardownMyApp();
	});
});
