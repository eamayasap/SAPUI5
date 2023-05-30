// @ts-nocheck
sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press"
],
	/**
	 * @param {typeof sap.ui.test.Opa5} Opa5
	 * @param {typeof sap.ui.test.actions.Press} Press
	 */
	function (Opa5, Press) {
		"use strict";
		var sViewName = "App";

		Opa5.createPageObjects({
			onTheViewPage: {
				actions: {
					iSeeDialogButton: function () {
						return this.waitFor({
							id: "IDAppViewButton2",
							viewName: "logali.invoices.view.Second",
							actions: new Press(),
							errorMessage: "Didn't find the 'Dialog Button' on the View"
						});
					}
				},
				assertions: {
					// iShouldSeeThePageView: function () {
					// 	return this.waitFor({
					// 		id: "page",
					// 		viewName: sViewName,
					// 		success: function () {
					// 			Opa5.assert.ok(true, "The " + sViewName + " view is displayed");
					// 		},
					// 		errorMessage: "Did not find the " + sViewName + " view"
					// 	});
					// },
					iSeeTheDialog: function () {
						return this.waitFor({
							controlType: "sap.m.Dialog",
							success: function () { Opa5.assert.ok(true, "The dialog was opened") },
							errorMessage: "Did not find the dialog control"
						});
					}
				}
			}
		});
	});
