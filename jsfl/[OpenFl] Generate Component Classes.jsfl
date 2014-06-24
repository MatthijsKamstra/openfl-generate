/**
 * JSFL
 * 
 * Bumpslide AppComponent Class File Generator
 * 
 * Find all library items with class definitions that don't have class files 
 * and create the class files complete with imports and references for
 * clips on the timeline.
 * 
 * by David Knape
 * http://bumpslide.com/
 *
 */

/**
 * 
 * jsfl based upon the Bumpslide AppComponent Class File Generator
 * created by David Knape
 * source: http://bumpslide.googlecode.com/svn/trunk/as3/scripts/%5Bbumpslide%5D%20Generate%20Component%20Classes.jsfl
 * http://bumpslide.com/blog/2009/03/07/jsfl-class-generator/
 * http://bumpslide.googlecode.com/svn/trunk/as3/scripts/%5Bbumpslide%5D%20Generate%20Component%20Classes.jsfl
 *
 * converted/adjusted for Haxe/Openfl
 * by Matthijs Kamstra aka [mck]
 */

// Author name to display in code
var author = "Matthijs Kamstra aka [mck]";  


//-----------------------------
// GLOBALS
//-----------------------------


// output buffer
var output = ""; 

// classes to import
var imports = [];
 
var processedElements = [];
var processedElementsTwo = [];

// shortcut to trace
trace = fl.outputPanel.trace;

var prefix = "swf";


//-----------------------------
// FUNCTIONS
//-----------------------------


// trace to output buffer
function dtrace( s ) {
	output+="\n"+s;
}

// add class name to imports list if it isn't already there
function addToImports( className ) {
    for (var i=0; i<imports.length; i++) if(imports[i] == className) return;
    imports.push( className );
}            

function getPackage(item) {
	var s = item.linkageClassName;
	if(s==null) return "";
	var splat = s.split('.');
	if(splat.length) { splat.pop(); return splat.join('.'); }
	// split splat sputter
	return "";
}       

function getTimelineClass(item) {
	var s = item.linkageClassName;
	if(s==null) return null;
	var splat = s.split('.');
	if(splat.length) return splat.pop();
	else return s;
}

// Returns a "var" entry for a given timeline element
// example: "var instance_name : ClassName;"
function getVarForElement(el) {

    // check if we have already processed this element
    for(var i in processedElements) if(processedElements[i] == el.name) return "";
	processedElements.push( el.name );
	processedElementsTwo[el.name] = el.elementType;
    
	// local vars
	var propType=null;
	var classname = '';
	var output = "";
	
    switch( el.elementType ) 
    {
        case "instance": 
			// If class attached, import it and use the
			// base name, otherwise use the MovieClip class
            var classname = el.libraryItem.linkageClassName;  
            var baseclassName = el.libraryItem.linkageBaseClass;
            if(baseclassName!="") classname = baseclassName;
            if(classname!=null) {
                addToImports( classname );
                propType = " : " + classname.split('.').pop();
            } else {       
                addToImports( 'openfl.display.MovieClip' );
                propType = " : MovieClip";
            }
            break;
			
		// TextFields are easy
        case "text":
               if(el.textType=='static') { return ""; }
			   addToImports( 'openfl.text.TextField' );  
			   propType = " : TextField"; 
			   break;
			
		// Shapes don't apply, but grouped elements show up as shapes.
		// So, we should put out a warning when groups are found
        case "shape":
            if(el.isGroup) {
                // found a group of items, not supported
                return "\t// Warning: Grouped items found \n\t// (clips must be ungrouped to be identified by this JSFL script)";
            }
            break;
    }
    if(propType) {    
        if(el.name=="") {
            return "\n\t//public var UNNAMED_INSTANCE" + propType+";"
        } else  {
            return "\n\tpublic var "+el.name + propType+";";
        }       
	}
	return "";
}




// main subroutine
function main() {

	          
	var l,f,e;        // iterators
	var elements;

    fl.outputPanel.clear();
    trace( '------------------------\nHaxe/Openfl Class File Generator (Bumpslide original)\n------------------------\n');
    
    var docPath = document.path; 
    var profile = new XML(  fl.getDocumentDOM().exportPublishProfileString() );
    var classPaths = profile.PublishFlashProperties.AS3PackagePaths.split(';');

	if (classPaths[0] == ".") {
		// trace (classPaths[0]);
		classPaths[0] = "";
	}
	
	// trace ("docPath: " + docPath)
	//trace ("profile: " + profile)
	// trace ("classPaths: " + classPaths)
	
	
    // use first class path in the list
    
    // try first as absolute path
    var path = FLfile.platformPathToURI(classPaths[0]);
	trace ("#1 path: " + path);
	

	
    if( !FLfile.exists(path) ) {
                 
        // that doesn't work try as relative path
        	// OSX
		path = FLfile.platformPathToURI( docPath.substr( 0, document.path.lastIndexOf( "/" )+1 ) + classPaths[0]);


		// that doesn't work try as relative path
			// WINDOWS :: strange stuff that only happens on a windows machine
		// path = FLfile.platformPathToURI( docPath.substr( 0, document.path.lastIndexOf( "\\" )+1 ) + classPaths[0]);
		
		var _path = FLfile.platformPathToURI( docPath );
		
        trace ("#2 path: " + path);
		
        if( !FLfile.exists(path)) {
            
            // finally, just use default path
            path = FLfile.platformPathToURI( document.path.lastIndexOf( "/" )+1);   

			trace ("#3 path: " + path);

        }
    }             
    
    if(path.substr( -1, 1)!='/') path+='/';
    trace( "Classpath: " + FLfile.uriToPlatformPath( path ) + "\n" ); 
    
    var didAnything=false;   
    var items = fl.getDocumentDOM().library.items;
    for (var n=0; n<items.length; n++) { 
        var linkageClassName=items[n].linkageClassName;  
        
		// seems always be the case...
		if(linkageClassName==null) continue;                                                   

		// [mck] not really sure this does anything anymore....
		if (items[n].linkageBaseClass=="nl.mvc.core.View"){
			trace ("------------------------------------------------------------");
			trace( getClassFileContents( items[n] ) );
			trace ("------------------------------------------------------------");
			continue;

		} else if (items[n].linkageBaseClass!="" && items[n].linkageBaseClass!="openfl.display.MovieClip" ) continue;
        

		
		// trace ("-- items[n].linkageBaseClass: " + items[n].linkageBaseClass);
		
		// trace ("-- items[n].itemType: " + items[n].itemType);
		// The value is one of the following: "undefined", "component", "movie clip", "graphic", "button", "folder", "font", "sound", "bitmap", "compiled clip", "screen", or "video"
		// exclude BITMAP
		if (items[n].itemType == "bitmap"){
			items[n].linkageBaseClass = "openfl.display.BitmapData";
			// trace (">> bitmap :: " +items[n].linkageBaseClass );
			break;
		}
		// exclude SOUND
		if (items[n].itemType == "sound"){
			items[n].linkageBaseClass = "openfl.media.Sound";
			// trace (">> sound :: " +items[n].linkageBaseClass );
			break;
		}
		// exclude compiled clip
		if (items[n].itemType == "compiled clip"){
			//items[n].linkageBaseClass = "openfl.media.Sound";
			trace (">> compiled clip :: " +items[n].linkageBaseClass );
			break;
		}
		
        var folders=linkageClassName.split('.'); 
        var className = folders.pop();
                  
        
		// trace ("folders: " + folders);
		
		// [mck] hack a little prefix in the folder structure
		// folders[0] = prefix + folders[0]
		folders.unshift(prefix)

		// trace ("folders: " + folders);
		

        // check for folder  
        var folderPath = "";
        for( var i=0; i<folders.length; i++) {     
            folderPath += folders[i] + "/";
            if(!FLfile.exists( path + folderPath)) { 
                didAnything = true;
                FLfile.createFolder(path + folderPath);
                trace( '+ created folder  ' + folderPath );
            } else {
                trace( 'Found existing folder: ' +folderPath );
            }
        }
        // check for file    
        var classFile = path + folderPath + className +'.hx';
        if(!FLfile.exists( classFile )) {
            didAnything = true;
            // write file
            FLfile.write(classFile, getClassFileContents( items[n] ) );
            trace( '\t- created class   '+classFile.substr( path.length, classFile.length - path.length));
        }   else {
			var isChancel = confirm("Overwrite old class '"+classFile+"' ?");
			if (isChancel){
				didAnything = true;
				// write file	
				FLfile.write(classFile, getClassFileContents( items[n] ) );
				trace( '\t- overwrite old class '+classFile.substr( path.length, classFile.length - path.length));
			} else {
				// trace( getClassFileContents( items[n] ) );
			}
		}
        
               
        
    }       
    if(!didAnything) {
        trace('\nNothing to do here.\n---');
        
    } else {
        trace('\nAll done.\n\n---')
        
    }

    // [mck] publish just to be sure?
}

function getClassFileContents( item ) {
    
       
    var timelineClass = getTimelineClass(item);
    
    document.library.selectItem( item.name );
    document.library.editItem( item.name );
	
	var timeline = fl.getDocumentDOM().getTimeline();
	
	// print class header
	// dtrace sends to output buffer (var output)
    dtrace( "\n/**");
    dtrace( " * "+timelineClass + ' Component');
    dtrace( " * ");
    dtrace( " * @author "+author);
    dtrace( " */");
    dtrace( "class "+timelineClass+" extends MovieClip \n{");

    dtrace( "\n\tprivate var _mc:MovieClip;");
    
	// print vars
    dtrace("\n\t// children on stage\n\t//--------------------");
	
    var as = "";

	// process all layers
    for(l=0; l<timeline.layers.length; l++) 
    {     
        // print layer name as comment to pretty up our vars
                       
        var varlines = "";

        if(timeline.layers[l].frames[0].actionScript != ""){
        	as += "\n\t// AS on layer '"+timeline.layers[l].name+"'";
			// trace ("actionscript: " + timeline.layers[l].frames[0].actionScript);
			var _astemp = timeline.layers[l].frames[0].actionScript
			as += _astemp.split('var').join('\n\tpublic var ').split("Number").join("Float").split("Boolean").join("Bool").split("int").join("Int").split("Object").join("Dynamic").split("Array").join("Array<Dynamic>");
        }
		
        // process all frames
        for(f=0; f<timeline.layers[l].frames.length; f++) 
        {        
            elements=timeline.layers[l].frames[f].elements;
            for(e=0; e<elements.length; e++) {
			    varlines+=getVarForElement( elements[e] );
            }
        }
		
		// if layer had elements, output the var text with a
		// comment matching the layer name
		if(varlines!="") {
			dtrace( "\n\t// "+ timeline.layers[l].name + varlines );
		}
    }                                                         
    
    dtrace( as );

    // dtrace( "\n\n\t/**\n\t * \n\t */");
    dtrace( "\n\t// constructor");
	dtrace( "\tpublic function new()\n\t{"); 
	dtrace( "\t\t// trace( '+ "+timelineClass+"."+timelineClass+"' );");
	dtrace( "\t\tsuper();");
	dtrace( "\t\tinit();");
	dtrace( "\t}");
	dtrace( "\t");
	dtrace( "\tprivate function init():Void");
	dtrace( "\t{");
	// dtrace( "\t\t_mc = Assets.getMovieClip(\"lib:"+timelineClass+"\");");
	if (getPackage(item) == ""){
		dtrace( "\t\t_mc = Assets.getMovieClip(\"lib:"+timelineClass+"\");");
	} else {
		dtrace( "\t\t_mc = Assets.getMovieClip(\"lib:"+getPackage(item)+"."+timelineClass+"\");");
	}
	dtrace( "\t\tthis.addChild(_mc);");
	dtrace( "\t\t");

	for (var i=0;i<processedElements.length;i++){
		if(processedElements[i] == "") continue;


		// trace (processedElementsTwo[processedElements[i]]);

		if(processedElementsTwo[processedElements[i]] == 'text' ){

			dtrace( "\t\t" + processedElements[i] + " = cast (_mc.getChildByName(\"" + processedElements[i] + "\"), TextField);");

		} else {

			dtrace( "\t\t" + processedElements[i] + " = cast (_mc.getChildByName(\"" + processedElements[i] + "\"), MovieClip);");

		}

	}

	dtrace( "\t\t");
	dtrace( "\t\t// lime test flash -debug");
	dtrace( "\t\t#if debug");
	dtrace( "\t\t\tdebug();");
	dtrace( "\t\t#end");
	dtrace( "\t}");
	dtrace( "\t");
	dtrace( "\tfunction debug():Void");
	dtrace( "\t{");
	dtrace( "\t\tfor (i in 0..._mc.numChildren) {");
	dtrace( "\t\t\tvar temp = _mc.getChildAt(i);");
	dtrace( "\t\t\ttrace( \"name: \" + temp.name );");
	dtrace( "\t\t}");
	dtrace( "\t}");


	// dtrace( "\t\t// old skool clickhandler");
	// for (var i=0;i<processedElements.length;i++){
	// 	if(processedElements[i] == "") continue;
	// 	dtrace ("\t\t\// " + processedElements[i] + ".addEventListener(MouseEvent.CLICK, onClickHandler);" );
	// }
	
	
	

	
	// onclickhandler
	// dtrace( "\n\n\t// private function onClickHandler(e : MouseEvent) : void {var _name : String = e.target.name; switch (_name) {default:trace(\"case '\" + _name + \"':trace ('--- \" + _name + \"');break;\");}}");
	
	
    // end class
    dtrace( "\n}" );
	
	// OUTPUT...
    // [mck] hack a little prefix in the package  
	var retVal = "package " + prefix + "." + getPackage(item) + ";\n"; 
    if(getPackage(item) == ""){
    	retVal = "package " + prefix + ";\n"; 

    }                                    
    
    // print imports using regular trace
	retVal += "\nimport openfl.Assets;"
	retVal += "\nimport openfl.display.MovieClip;"
    for(var n=0; n<imports.length; n++) {
        retVal += "\nimport "+imports[n] + ";";
    }
	// trace buffered output
    retVal += output;
    
    output = ""; 
    imports = [];
    processedElements = [];
    
    return retVal;    
}

// run...
main();
