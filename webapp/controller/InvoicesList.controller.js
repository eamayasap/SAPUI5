// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/InvoicesFormatterModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller, JSONModel, InvoicesFormatterModel, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("logali.invoices.controller.InvoncesList", {

            formatter: InvoicesFormatterModel,

            onInit: function () {
                var oViewModel = new JSONModel({
                    usd: 'USD',
                    eur: 'EUR'
                });
                this.getView().setModel(oViewModel, "currency");
            },

            onSearchInvoices: function (oEvent) {
                var aFilter = [];
                var sQuery = oEvent.getParameter("query");
                if (sQuery) {
                    aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
                };
                var oList = this.getView().byId("IDInvoicesList1");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilter);
            },

            navigateToDetails: function (oEvent) {
                var oItem = oEvent.getSource();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Details", { 
                    invoicePath: window.encodeURIComponent(oItem.getBindingContext("northwind").getPath().substr(1))
                });
            }
        });
    });