// @ts-nocheck
/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */
sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "logali/invoices/model/models",
        "sap/ui/model/resource/ResourceModel",
        "./controller/Dialog"
    ],

    function (UIComponent, Device, models, ResourceModel, Dialog) {
        "use strict";

        return UIComponent.extend("logali.invoices.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                // Set data model on the view
                this.setModel(models.createRecipient());

                // Instantiate Dialog View passing the view instance where Dialog is called
                this._Dialog = new Dialog(this.getRootControl());

                // Initialize application routing
                this.getRouter().initialize();

            },

            openDialog: function () { this._Dialog.open(); },
            
            exit: function () {
                this._Dialog.destroy();
                delete this._Dialog;
            },

            getContentDensityClass : function () {
                if (!this._sContentDensityClass) {
                    if (!Device.support.touch) {
                        this._sContentDensityClass = "sapUiSizeCompact";
                    } else { this._sContentDensityClass = "sapUiSizeCozy"; }
                }
                return this._sContentDensityClass;
            }
        });
    });