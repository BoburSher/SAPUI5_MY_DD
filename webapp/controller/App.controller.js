sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"opensap/myapp/model/formatter"

], function (Controller, MessageToast, Filter, FilterOperator,  formatter) {
	"user strict";

    return Controller.extend("opensap.myapp.controller.App", {

		formatter: formatter,
		_data: {
			"date": "01.01.2020"
		},
		onShowHello: function () {
			// read msg from i18n model
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			var sRecipient = this.getView().getModel("helloPanel").getProperty("/recipient/name");
			var sMsg = oBundle.getText("helloMsg", [sRecipient]);

			// show message
			MessageToast.show(sMsg);
		},
		onFilterProducts: function (oEvent) {

			var aFilter = [],
				sQuery = oEvent.getParameter("query"),
				oList = this.getView().byId("productsList"),
				oBinding = oList.getBinding("items");

			if (sQuery) {
				aFilter.push(new Filter("ProductID", FilterOperator.Contains, sQuery));
			}

			oBinding.filter(aFilter);
		},
		onItemSelected: function(oEvent){
			var oSelectedItem = oEvent.getParameter("listItem");
			var oContext = oSelectedItem.getBindingContext();
			var sPath = oContext.getPath();
			var oPanel = this.byId("productDetailsPanel");
			oPanel.bindElement({path: sPath});
			oPanel.setVisible(true);
		},
		onSDItemSelected: function(oEvent){
			 var oSelectedItem = oEvent.getParameter("listItem");
			 var oContext = oSelectedItem.getBindingContext();
			 var sPath = oContext.getPath();
			 var oPanel = this.byId("salesOrdersPanel");
			 oPanel.bindElement({path: sPath});
			 oPanel.setVisible(true);
		}
	});
});