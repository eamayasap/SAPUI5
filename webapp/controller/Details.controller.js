// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.core.routing.History} History
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     * @param {typeof sap.ui.core.Fragment} Fragment
     */
    function (Controller, History, UIComponent, Filter, FilterOperator, Fragment) {
        "use strict";

        return Controller.extend("logali.invoices.controller.Details", {

            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Details").attachPatternMatched(this._onObjectMatch, this);

                var oView = this.getView();
                // var i18nBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

                // Cargamos datos de fichero, con false esperamos hasta que se carguen los datos en el fichero
                var oJSONModel = new sap.ui.model.json.JSONModel();
                oJSONModel.loadData("./localService/TestData/Employee.json", false);
                oView.setModel(oJSONModel, "jsonEmployees");

                var oJSONModel = new sap.ui.model.json.JSONModel();
                oJSONModel.loadData("./localService/TestData/Countries.json", false);
                oView.setModel(oJSONModel, "jsonCountries");

                var oJSONModelConfig = new sap.ui.model.json.JSONModel({
                    visibleID: true,
                    visibleName: true,
                    visibleCountry: true,
                    visibleCity: false,
                    visibleIDbtnShowCity: true,
                    visibleIDbtnHideCity: false
                });
                oView.setModel(oJSONModelConfig, "JSONModelConfig");
            },

            onFilter: function () {
                var oJSON = this.getView().getModel("jsonCountries").getData();
                var filters = [];
                if (oJSON.employeeId !== "") {
                    filters.push(new Filter("employeeID", FilterOperator.EQ, oJSON.employeeId));
                }
                if (oJSON.countryKey !== "") {
                    filters.push(new Filter("Country", FilterOperator.EQ, oJSON.countryKey));
                }
                var oList = this.getView().byId("IDDetailsTable1");
                var oBinding = oList.getBinding("items");
                oBinding.filter(filters);
            },

            onClearFilter: function () {
                var oModel = this.getView().getModel("jsonCountries");
                oModel.setProperty("/employeeId", "");
                oModel.setProperty("/countryKey", "");
            },

            onShowPostalCode: function (oEvent) {
                var itemPressed = oEvent.getSource();
                var oContext = itemPressed.getBindingContext("jsonEmployees");
                var objectContext = oContext.getObject();
                sap.m.MessageToast.show(objectContext.PostalCode);
            },

            onShowCity: function () {
                var oJSONModelConfig = this.getView().getModel("JSONModelConfig");
                oJSONModelConfig.setProperty("/visibleCity", true);
                oJSONModelConfig.setProperty("/visibleIDbtnShowCity", false);
                oJSONModelConfig.setProperty("/visibleIDbtnHideCity", true);
            },

            onHideCity: function () {
                var oJSONModelConfig = this.getView().getModel("JSONModelConfig");
                oJSONModelConfig.setProperty("/visibleCity", false);
                oJSONModelConfig.setProperty("/visibleIDbtnShowCity", true);
                oJSONModelConfig.setProperty("/visibleIDbtnHideCity", false);
            },

            onShowOrders: function (oEvent) {
                // Get selected controller
                var iconPressed = oEvent.getSource();
                // Context from the model
                var oContext = iconPressed.getBindingContext("jsonEmployees");
                var oView = this.getView();
                if (!this._oDialogOrders) {
                    this._oDialogOrders = Fragment.load({
                        id: oView.getId(),
                        name: "logali.invoices.Fragments.DialogOrders",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                } 
                this._oDialogOrders.then(function(oDialog){ 
                    oDialog.bindElement("jsonEmployees>" + oContext.getPath());
                    oDialog.open();
                });
            },

            onCloseDialogOrders: function () {
                this.byId("IDDialogOrdersDialog1").close();
            },

            // var ordersTable = this.getView().byId("ordersTable");
            // ordersTable.destroyItems();
            // var itemPressed = oEvent.getSource();
            // var oContext = itemPressed.getBindingContext("jsonEmployees");

            // //Opción 1
            // var objectContext = oContext.getObject();
            // var orders = objectContext.Orders;
            // var ordersItems = [];
            // for (var i in orders) {
            //     ordersItems.push(new sap.m.ColumnListItem({
            //         cells: [

            //             new sap.m.ObjectListItem({ title: orders[i].OrderID }),
            //             new sap.m.Label({ text: orders[i].Freight }),
            //             new sap.m.Label({ text: orders[i].ShipAddress })
            //         ]
            //     }));
            // }
            // var newTable = new sap.m.Table({
            //     width: "auto",
            //     columns: [
            //         new sap.m.Column({ header: new sap.m.Label({ text: "{i18n>OrderID}" }) }),
            //         new sap.m.Column({ header: new sap.m.Label({ text: "{i18n>Freight}" }) }),
            //         new sap.m.Column({ header: new sap.m.Label({ text: "{i18n>ShipAddress}" }) })
            //     ],
            //     items: ordersItems
            // }).addStyleClass("sapUiSmallMargin");
            // ordersTable.addItem(newTable);

            // //Opción 2
            // var newTableJSON = new sap.m.Table();
            // newTableJSON.setWidth("auto");
            // newTableJSON.addStyleClass("sapUiSmallMargin");

            // var columnOrderID = new sap.m.Column();
            // var labelOrderID = new sap.m.Label();
            // labelOrderID.bindProperty("text", "i18n>OrderID" );
            // columnOrderID.setHeader(labelOrderID);
            // newTableJSON.addColumn(columnOrderID);

            // var columnFreight = new sap.m.Column();
            // var labelFreight = new sap.m.Label();
            // labelFreight.bindProperty("text", "i18n>Freight" );
            // columnFreight.setHeader(labelFreight);
            // newTableJSON.addColumn(columnFreight);

            // var columnShipAddress = new sap.m.Column();
            // var labelShipAddress = new sap.m.Label();
            // labelShipAddress.bindProperty("text", "i18n>ShipAddress" );
            // columnShipAddress.setHeader(labelShipAddress);
            // newTableJSON.addColumn(columnShipAddress);

            // var ColumnListItem = new sap.m.ColumnListItem();

            // var cellOrderID = new sap.m.Label();
            // cellOrderID.bindProperty("text", "jsonEmployees>OrderID");
            // ColumnListItem.addCell(cellOrderID);

            // var cellFreight = new sap.m.Label();
            // cellFreight.bindProperty("text", "jsonEmployees>Freight");
            // ColumnListItem.addCell(cellFreight);

            // var cellShipAddress = new sap.m.Label();
            // cellShipAddress.bindProperty("text", "jsonEmployees>ShipAddress");
            // ColumnListItem.addCell(cellShipAddress);

            // var oBindingInfo = {
            //     model: "jsonEmployees",
            //     path: "Orders",
            //     template: ColumnListItem
            // }

            // newTableJSON.bindAggregation("items", oBindingInfo );
            // newTableJSON.bindElement("jsonEmployees>" + oContext.getPath());
            // ordersTable.addItem(newTableJSON);
            // },

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
                    inputEmployee.setDescription("OK");
                    this.byId("IDDetailsLabel2").setVisible(true);
                    this.byId("IDDetailsSelect1").setVisible(true);
                } else {
                    inputEmployee.setDescription("Not OK");
                    this.byId("IDDetailsLabel2").setVisible(false);
                    this.byId("IDDetailsSelect1").setVisible(false);
                }
            },
        });
    });
