//@ts-nocheck
sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "sap/base/Log"
],  
    /**
     * @param{ typeof sap.ui.core.util.MockServer } MockServer
     * @param{ typeof sap.ui.model.json.JSONModel } JSONModel
     * @param{ typeof sap.base.util.UriParameters } UriParameters
     * @param{ typeof sap.base.Log } Log
     */
  
    function (MockServer, JSONModel, UriParameters, Log) {
      "use strict";
  
      var oMockServer,
        s_appPath = "logali/invoices/",
        s_JsonFilesPath = s_appPath + "localService.mockData";
  
      var oMockServerInterface = {
        /**
         * Initializes the Mock Server Asynchronously
         * @protected
         * @param{ object } oOptionsParameter
         * @returns{ promise } a promise that is resolved when the MockServer has been started inside InitMockServer.js
         */
  
        init: function (oOptionsParameter) {
          var oOptions = oOptionsParameter || {}; //If oOptionsParameter is initial left empty
          return new Promise(function (fnResolve, fnReject) {
            var sManifestUrl = sap.ui.require.toUrl(s_appPath + "manifest.json"),
              oManifestModel = new JSONModel(sManifestUrl);
  
            oManifestModel.attachRequestCompleted(function () {
              var oUriParameters = new UriParameters(window.location.href);
  
              // Parse manifest for local metadata URI
              var sJsonFilesUrl = sap.ui.require.toUrl(s_JsonFilesPath);
              var oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService");
              var sMetadataUrl = sap.ui.require.toUrl(s_appPath + oMainDataSource.settings.localUri);
  
              // Ensure there is a trailing slash (/)
              var sMockServerUrl = oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(s_appPath)).toString();
  
              // Create a Mock Server instance or stop the existing one to reinitialize
              if (!oMockServer) {
                oMockServer = new MockServer({ rootUri: sMockServerUrl })
              } else { oMockServer.stop(); }
  
              // Configure Mock Server with given options or a default delay of 0.5s
              MockServer.config({
                autoRespond: true,
                autoRespondAfter: (oOptions.delay || oUriParameters.get("serverDelay") || 500)
              });
  
              // Simulate all requests using mock data
              oMockServer.simulate(sMetadataUrl, {
                sMockdataBaseUrl: sJsonFilesUrl,
                bGenerateMissingMockData: true // If localService/mockdata doesn't exist, simulate and generate data
              });
  
              var aRequests = oMockServer.getRequests();
  
              // Compose an error response for each request
              var fnResponse = function (iErrCode, sMessage, aRequest) {
                aRequest.response = function (oXhr) {
                  oXhr.response(iErrCode, { "Content-Type": "text/plain;charset=utf-8" }, sMessage);
                };
              };
  
              // Simulate metadata errors
              if (oOptions.metadataError || oUriParameters.get("metadataError")) {
                aRequests.forEach(function (aEntry) {
                  if (aEntry.path.toString().indexOf("$metadata") > -1) {
                    fnResponse(500, "metadata Error", aEntry);
                  }
                });
              };
  
              // Simulate request errors
              var sErrorParam = oOptions.errorType || oUriParameters.get("errorType");
              var iErrorCode = sErrorParam === "bad request" ? 400 : 500;
  
              if (sErrorParam) {
                aRequests.forEach(function (aEntry) {
                  fnResponse(iErrorCode, sErrorParam, aEntry);
                });
              };
  
              // Set requests and start the server
              oMockServer.setRequests(aRequests);
              oMockServer.start();
              Log.info("Running the app with Mock Data");
              fnResolve();
            });
  
            oManifestModel.attachRequestFailed(function () {    //When an error exist
              var sError = "Failed to load the application manifest";
  
              Log.error(sError);
              fnReject(new Error(sError));
  
            });
          });
        }
      };
  
      return oMockServerInterface;
    });