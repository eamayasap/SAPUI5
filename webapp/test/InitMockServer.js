// @ts-nocheck
sap.ui.define([
    "../localService/MockServer",
    "sap/m/MessageBox"
],
    /**
     * @param{ typeof sap.m.MessageBox} MessageBox
     */
    function (MockServer, MessageBox) {
        'use strict';

        var aMockServers = [];

        // Initialize the Mock Server
        aMockServers.push(MockServer.init());

        Promise.all(aMockServers).catch(function (oError) {
            MessageBox.error(oError.message);
        }).finally(function () {
            sap.ui.require(["sap/ui/core/ComponentSupport"]);
        });
    });