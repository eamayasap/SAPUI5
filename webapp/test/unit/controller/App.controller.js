/*global QUnit*/
//@ts-nocheck
sap.ui.define([
	"logali/invoices/controller/App.controller",
	"logali/invoices/model/InvoicesFormatterModel",
	"sap/ui/model/resource/ResourceModel"],
	/**
	 * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
	 */
	function (Controller, InvoicesFormatterModel, ResourceModel) {
		"use strict";
		QUnit.module("App Controller", {
			beforeEach: function () {
				this._oResourceModel = new ResourceModel({
					bundleUrl: sap.ui.require.toUrl("logali/invoices") + "/i18n/i18n.properties"
				});
			},
			afterEach: function () { this._oResourceModel.destroy(); },
		});
		QUnit.test("Should return the invoice status", function (assert) {
			// Stub nos permite simular un controlador y una vista y se encuentra dentro del fichero html src: sinon-qunit.js
			let oModel = this.stub();
			oModel.withArgs("i18n").returns(this._oResourceModel);
			let oViewStub = { getModel: oModel };
			let oControllerStub = { getView: this.stub().returns(oViewStub) };
			let fnIsolatedFormatter = InvoicesFormatterModel.invoiceDiscount.bind(oControllerStub);
			// Assert
			assert.strictEqual(fnIsolatedFormatter(0), "+ Discount", "The Product has no discount");
		});
	});