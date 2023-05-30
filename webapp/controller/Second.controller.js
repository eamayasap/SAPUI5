// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/base/Log",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.m.MessageToast} MessageToast
     * @param {typeof sap.base.Log} Log
     */
    function (Controller, MessageToast, Log) {
        "use strict";

        return Controller.extend("logali.invoices.controller.Second", {
            onInit: function () {

            },

            onBeforeRendering: function () {
                window.message = 'Log message - onBeforeRendering';
                Log.info(window.message);
                Log.error(window.message);
            },

            onAfterRendering: function () {
                //  debugger;
            },

            // Show Toast Message
            onShowHello: function () {
                // Reat text from i18n model
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                // Read property from data model
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                // Get i18n text with ID SecondViewInput1 and concatenate with recipient value
                var sMsg = oBundle.getText("AppViewInput1", [sRecipient]);
                // Display the message
                MessageToast.show(sMsg);
            },

            // Open Dialog View from Component.js 
            onOpenDialog: function () { this.getOwnerComponent().openDialog(); },

        });
    });