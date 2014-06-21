/**
* Add a Linkage class (path) and (if needed) baseclass to the library items
* Name of class is based upon folder structure in the library of the FLA
*
* @author		Matthijs Kamstra aka [mck]
* @version		
*				1.2		create functions to use from the flashPanel
*				1.1		fix selection error/folder select/filenames with spaces or dots in them
*				1.0		start class
*/


function autoClass (inSuffix,inClass){

	fl.outputPanel.clear();

	trace ("function autoClass (inSuffix:" + inSuffix + ", inClass: " +inClass+")");

	var selectArray = fl.getDocumentDOM().library.getSelectedItems(); 

	var len = selectArray.length;
	if (len == 0) {
		alert ('nothing selected'); 
	} else {
			for (var i=0;i<len;i++){
		
				var source = selectArray[i];
				// fl.getDocumentDOM().library.selectItem(source);
		
				////////// store data from original item ////////////
		
				//Read-only; a string that specifies the type of element.
				var _itemType = selectArray[i].itemType;

				//A string that specifies the ActionScript 3.0 class that will be associated with the symbol.
				var _linkageBaseClass = selectArray[i].linkageBaseClass;

				//A string that specifies the ActionScript 2.0 class that will be associated with the symbol.
				var _linkageClassName = selectArray[i].linkageClassName;

				//A Boolean value. If true, the item is exported for ActionScript.
				var _linkageExportForAS = selectArray[i].linkageExportForAS;

				//A Boolean value. If true, the item is exported for run-time sharing.
				var _linkageExportForRS = selectArray[i].linkageExportForRS;

				//A Boolean value. If true, the item is exported in the first frame.
				var _linkageExportInFirstFrame = selectArray[i].linkageExportInFirstFrame;

				//A string that specifies the name Flash will use to identify the asset when linking to the destination SWF file.
				var _linkageIdentifier = selectArray[i].linkageIdentifier;

				//A Boolean value. If true, the item is imported for run-time sharing.
				var _linkageImportForRS = selectArray[i].linkageImportForRS;

				//A string that specifies the URL where the SWF file containing the shared asset is located.
				var _linkageURL = selectArray[i].linkageURL;

				// A string that specifies the name of the library item, which includes the folder structure.
				var __name = selectArray[i].name; 
		
				/*
				trace ("_itemType: "+_itemType);
				trace ("_linkageBaseClass: " + _linkageBaseClass);
				trace ("_linkageClassName: " + _linkageClassName);
				trace ("_linkageExportForAS: " + _linkageExportForAS);
				trace ("_linkageExportForRS: " + _linkageExportForRS);
				trace ("_linkageExportInFirstFrame: " + _linkageExportInFirstFrame);
				trace ("_linkageIdentifier: " + _linkageIdentifier);
				trace ("_linkageImportForRS: " + _linkageImportForRS);
				trace ("_linkageURL: " + _linkageURL);
				trace ("__name: " + __name);
				*/
			
				if (_itemType == "folder") continue;
		
				//path+name :: View/DaarUitShortBtn
				var pathArray = source.name.split("/");
				var _nameInstance = pathArray[pathArray.length-1];
		
				var __linkageClassName = cleanUpString(__name).split("/").join(".") + inSuffix;
		
				var __linkageBaseClass = "";
				/*
				if (_nameInstance.toLowerCase().indexOf('view') != -1){
					__linkageBaseClass = "nl.noiselibrary.mvc.core.View";
				}
				if (_nameInstance.toLowerCase().indexOf('btn') != -1){
					__linkageBaseClass = "nl.noiselibrary.ui.buttons.HilightButton";
				}
				*/
				if (inClass != "Auto"){
					__linkageBaseClass = inClass;
				}

				//trace ("__linkageClassName: " + __linkageClassName);
				// trace ("__linkageBaseClass: " + __linkageBaseClass);

				selectArray[i].linkageExportForAS = true; 
				selectArray[i].linkageExportForRS = false;  
				selectArray[i].linkageExportInFirstFrame = true; 
		
				selectArray[i].linkageBaseClass = __linkageBaseClass; 
				selectArray[i].linkageClassName = __linkageClassName; 
		
	
				// copy original data to new file
				/*
				fl.getDocumentDOM().library.setItemProperty("itemType", _itemType);
				fl.getDocumentDOM().library.setItemProperty("linkageExportForAS", _linkageExportForAS); 
				fl.getDocumentDOM().library.setItemProperty("linkageExportForRS", _linkageExportForRS);  
				fl.getDocumentDOM().library.setItemProperty("linkageExportInFirstFrame", _linkageExportInFirstFrame); 
		
				fl.getDocumentDOM().library.setItemProperty("linkageBaseClass", _linkageBaseClass); 
				fl.getDocumentDOM().library.setItemProperty("linkageClassName", useName); 

				if (_linkageIdentifier != "") 	fl.getDocumentDOM().library.setItemProperty("linkageIdentifier", _linkageIdentifier); 
				if (_linkageImportForRS != null)	fl.getDocumentDOM().library.setItemProperty("linkageImportForRS", _linkageImportForRS); 
				if (_linkageURL != null)	fl.getDocumentDOM().library.setItemProperty("linkageURL", _linkageURL); 

				*/

				trace (i +" - Library item ("+__name+") | class: '" + __linkageClassName + "' | baseclass: '" + __linkageBaseClass + "'" );
		
			}
			
			trace ("--> Library items are done (total items: " + len + ")")
	}
}

function cleanUpString(inString){
	var _clean = inString;
	return _clean.split(".").join("_").split(" ").join("");
}

function trace (str){
	fl.trace (str);
}

// start the jsfl
autoClass ("FC","Auto");