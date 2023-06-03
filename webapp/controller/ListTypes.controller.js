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

        return Controller.extend("logali.invoices.controller.App", {
            onInit: function () {
                var oJSONModel = new sap.ui.model.json.JSONModel();
                oJSONModel.loadData("./localService/TestData/ListData.json");
                this.getView().setModel(oJSONModel);
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

            getGroupHeader: function (oGroup) {
                var groupHeaderListItem = new sap.m.GroupHeaderListItem({
                    title: oGroup.key,
                    upperCase: true
                });
                return groupHeaderListItem;
            },

            onShowSelectedRow: function () {
                var standardList = this.getView().byId("IDListTypesViewList2");
                var selectedItems = standardList.getSelectedItems();
                var i18nModel = this.getView().getModel("i18n").getResourceBundle();
                if (selectedItems.length === 0) {
                    sap.m.MessageToast.show(i18nModel.getText("NoSelection"));
                } else {
                    var textMessage = i18nModel.getText("Selection");
                    for (var item in selectedItems) {
                        var context = selectedItems[item].getBindingContext();
                        var oContext = context.getObject();
                        textMessage = textMessage + " - " + oContext.Material;
                    }
                    sap.m.MessageToast.show(textMessage);
                }
            },

            onDeleteSelectedRow: function () {
                var standardList = this.getView().byId("IDListTypesViewList2");
                var selectedItems = standardList.getSelectedItems();
                var i18nModel = this.getView().getModel("i18n").getResourceBundle();
                if (selectedItems.length === 0) {
                    sap.m.MessageToast.show(i18nModel.getText("NoSelection"));
                } else {
                    var textMessage = i18nModel.getText("Selection");
                    var model = this.getView().getModel();
                    var products = model.getProperty("/Products");
                    var arrayId = [];
                    for (var i in selectedItems) {
                        var context = selectedItems[i].getBindingContext();
                        var oContext = context.getObject();
                        arrayId.push(oContext.Id);
                        textMessage = textMessage + " - " + oContext.Material;
                    }
                    products = products.filter(function (p) {
                        return !arrayId.includes(p.Id);
                    });
                    model.setProperty("/Products", products);
                    standardList.removeSelections();
                    sap.m.MessageToast.show(textMessage);
                }
            },

            onDeleteRow: function (oEvent) {
                var selectedRow = oEvent.getParameter("listItem");
                var context = selectedRow.getBindingContext();
                var splitPath = context.getPath().split("/");
                var indexSelectedRow = splitPath[splitPath.length - 1];
                var model = this.getView().getModel();
                var products = model.getProperty("/Products");
                products.splice(indexSelectedRow, 1);
                model.refresh();
            }
        });
    });