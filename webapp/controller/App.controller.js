// @ts-nocheck
sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("logali.invoices.controller.App", {
            onInit: function () {
                this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
            },

            // Open Dialog View from Component.js 
            onOpenDialogHeader: function () { this.getOwnerComponent().openDialog(); },

        });
    });
