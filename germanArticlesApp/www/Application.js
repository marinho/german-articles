jQuery.sap.declare("Application");
jQuery.sap.require("sap.ui.app.Application"); 

sap.ui.app.Application.extend("Application", {

    init : function() {
    },
    
    main : function() {     
        // create app view and put to html root element
        var root = this.getRoot();
        sap.ui.xmlview("app", "view.App").placeAt(root);
    }
}); 
