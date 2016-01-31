sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
	"use strict";


	return UIComponent.extend("sap.ui.germanArticles.Component", {

		metadata : {
			manifest: "json"
		},

		init : function () {
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			// set data model
			var oModel = new JSONModel({
      });
      this.setModel(oModel);
      
			// set nouns model - local
			var oConfig = this.getMetadata().getConfig();
			var sNamespace = this.getMetadata().getManifestEntry("sap.app").id;
      //var sUrl = jQuery.sap.getModulePath(sNamespace, oConfig.nounsLocal);
      var sUrl = '/nouns.json';
			var oNounsModel = new JSONModel(sUrl);
			this.setModel(oNounsModel, "allNouns");
		},

    _nounsPerGame: 10,

    _articles: {
      "definite": {
          "nominativ": { "m": "Der", "f": "Die", "n": "Das", "p": "Die" },
          "akkusativ": { "m": "Den", "f": "Die", "n": "Das", "p": "Die" },
          "dativ":     { "m": "Dem", "f": "Der", "n": "Dem", "p": "Den" },
          "genitiv":   { "m": "Des", "f": "Der", "n": "Des", "p": "Der" }
      },

      "indefinite": {
          "nominativ": { "m": "Ein", "f": "Eine", "n": "Ein", "p": null },
          "akkusativ": { "m": "Einen", "f": "Eine", "n": "Ein", "p": null },
          "dativ":     { "m": "Einem", "f": "Einer", "n": "Einem", "p": null },
          "genitiv":   { "m": "Eines", "f": "Einer", "n": "Eines", "p": null }
      },

      "articles": {
          "nominativ": { "m": "-er", "f": "-e", "n": "-es", "p": "-e" },
          "akkusativ": { "m": "-en", "f": "-e", "n": "-es", "p": "-e" },
          "dativ":     { "m": "-em", "f": "-er", "n": "-em", "p": "-en" },
          "genitiv":   { "m": "-es", "f": "-er", "n": "-es", "p": "-er" }
      }
    }

	});

});
