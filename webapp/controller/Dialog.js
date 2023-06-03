// @ts-nocheck
sap.ui.define([
    "sap/ui/base/ManagedObject",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.base.ManagedObject} ManagedObject
     * @param {typeof sap.ui.core.Fragment} Fragment
     */
    function (ManagedObject, Fragment) {
        "use strict";

        return ManagedObject.extend("logali.invoices.controller.Dialog", {

            constructor: function (oView) { this._oView = oView; },

            open: function () {
                var oView = this._oView;

                if (!oView.byId("IDDialogDialog1")) {

                    let oFragmentController = {
                        onCloseDialog: function () { oView.byId("IDDialogDialog1").close(); }
                    };

                    Fragment.load({
                        id: oView.getId(),
                        name: "logali.invoices.Fragments.Dialog",
                        controller: oFragmentController
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        oDialog.open();
                    });
                } else { oView.byId("IDDialogDialog1").open(); }
            },

            exit: function () { delete this._oView; },

        });
    });