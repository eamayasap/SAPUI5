// @ts-nocheck
sap.ui.define([
],
    function () {
        return {
            invoiceDiscount: function (vDiscount) {
                var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
                if (vDiscount == 0) {
                    return resourceBundle.getText("InvoiceWithoutDiscount");
                } else { 
                    return resourceBundle.getText("InvoiceWithDiscount");
                }
            }
        }
    });