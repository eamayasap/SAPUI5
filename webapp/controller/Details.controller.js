// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.core.routing.History} History
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     */
    function (Controller, History, UIComponent) {
        "use strict";
        return Controller.extend("logali.invoices.controller.Details", {

            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Details").attachPatternMatched(this._onObjectMatch, this);
            },

            _onObjectMatch: function (oEvent) {
                this.byId("rating").reset();
                this.getView().bindElement({
                    path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                    model: "northwind"
                });
            },

            onNavBack: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();
                if (!sPreviousHash == undefined) {      //If App begins with App View, get first view from history
                    window.history.go(-1);
                } else {                                //If App begins with Details view, get first view from UIComponent 
                    var oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteApp", {}, true);
                }
            },

            onRatingChange: function (oEvent) {
                var fValue = oEvent.getParameter("value");
                var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                sap.m.MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
            },

            onValidate: function () {
                var inputEmployee = this.byId("IDDetailsInput1");
                var valueEmployee = inputEmployee.getValue();

                if (valueEmployee.length === 6) {
                    this.byId("IDDetailsLabel2").setVisible(true);
                    this.byId("IDDetailsSelect1").setVisible(true);
                } else {
                    this.byId("IDDetailsLabel2").setVisible(false);
                    this.byId("IDDetailsSelect1").setVisible(false);
                }
            }
        });
    });
