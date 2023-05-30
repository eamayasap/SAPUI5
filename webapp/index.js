// @ts-nocheck
sap.ui.define([
    "sap/ui/core/ComponentContainer" ],

    /**
     * 
     * @param {typeof sap.ui.core.ComponentContainer} ComponentContainer
     */

    function (ComponentContainer) {
        'use strict';

        new ComponentContainer({
            name: "logali.invoices",
            settings: { 
                id: "invoices"
             },
             async: true
        }).placeAt("content");

    });