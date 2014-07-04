
// trace to output buffer
function dtrace( s ) {
	output+="\n"+s;
}

// shortcut to trace
trace = fl.outputPanel.trace;

// vars
var _genshape = '';	


function getDataFromTimeline(timeline){
	// process all layers
    for(l=0; l<timeline.layers.length; l++) 
    {     
       
        // process all frames
        for(f=0; f<timeline.layers[l].frames.length; f++) 
        {        
            elements=timeline.layers[l].frames[f].elements;
            for(e=0; e<elements.length; e++) {

			    var el = elements[e];
			    if (el.elementType == 'text'){
			    	trace ("// text");
			    } 
			    else if (el.elementType == 'shape')
			    {
			    	trace ("// shapes");
			    } else {
			    	trace ("el.elementType: " + el.elementType);
			    }
				
            }
        }
    }
 }


function main ()
{
	fl.outputPanel.clear();

	trace ("package ;\n\n");
	trace ("import flash.display.*;\n");
	trace ("import flash.text.*;\n");
	trace ("import openfl.Assets;\n\n");


	trace ("class GenerateView extends Sprite {\n\n");

	trace ("\tpublic function new () \n");
	trace ("\t{\n");
	trace ("\t\tsuper ();\n");
	trace ("\t\tbuild ();\n");
	trace ("\t}\n\n");

	trace ("\tprivate function build()\n");
	trace ("\t{\n\n");
	trace ("\t\t// lets build this\n\n");

	
	var timeline = fl.getDocumentDOM().getTimeline();

	// process all layers
    for(l=0; l<timeline.layers.length; l++) 
    {     
        // trace( "l: "  + l);
		   
        trace ("\t\t// Layer nr: " + l + " - name: " + timeline.layers[l].name + " - frame numbers: " + timeline.layers[l].frames.length);
		
        // process all frames
        // for(f=0; f<1; f++) 
        for(f=0; f<timeline.layers[l].frames.length; f++) 
        {        
            elements=timeline.layers[l].frames[f].elements;
            for(e=0; e<elements.length; e++) {
			    // varlines+=getVarForElement( elements[e] );

			    var el = elements[e];

			    // trace ('\n\ne: ' + e);
			    // trace ("el.elementType: " + el.elementType);
			    if (el.elementType == 'text'){
			    	// trace ("text.getTextAttr():  " + el.getTextAttr('face'));
			    	// trace ("text.getTextAttr():  " + el.getTextAttr("alignment"));
			    	// trace ("text.getTextString():  " + el.getTextString());
	
			    	// trace ("x: " + el.x);
			    	// trace ("y: " + el.y);
			    	
			    	// trace ("w: " + el.width);
			    	// trace ("h: " + el.height);
			    	// 
			    	// TextAttrs object
			    	// http://help.adobe.com/en_US/flash/cs/extend/WS5b3ccc516d4fbf351e63e3d118a9024f3f-7f59CS5.html
			    	// 
					_genshape += "\n// " + f + " - " + e;
					_genshape += "\nvar _format = new flash.text.TextFormat();";
					_genshape += "\n_format.size = "+el.getTextAttr('size')+";";
					_genshape += "\n_format.align = flash.text.TextFormatAlign."+el.getTextAttr("alignment").toUpperCase()+";";
					_genshape += "\n_format.font = '"+el.getTextAttr('face')+"';";
				    _genshape += "\n_format.color = 0x"+el.getTextAttr('fillColor').split("#").join("")+";";

					_genshape += "\nvar _txt = new flash.text.TextField();";
					_genshape += "\n_txt.defaultTextFormat = _format;";
					_genshape += "\n_txt.text = '"+el.getTextString()+"';";
					_genshape += "\n_txt.border = true; //"+el.border+";";
					_genshape += "\n//_txt.embedFonts = true; // read dummy code";
					// _genshape += "\n//_txt.wordWrap = "+el.getTextAttr('wordWrap')+";";
					_genshape += "\n//_txt.autoSize = flash.text.TextFieldAutoSize.LEFT;";
					_genshape += "\n//_txt.selectable = false;";
					_genshape += "\n_txt.x = "+el.x+";";
					_genshape += "\n_txt.y = "+el.y+";";
					_genshape += "\n_txt.width = "+el.width+";";
					_genshape += "\n_txt.height = "+el.height+";";
					_genshape += "\nthis.addChildAt(_txt,0);";

					
					_genshape += "\n/*";
					// _genshape += "\nimport flash.text.*;";
					// _genshape += "\nimport openfl.Assets;";
					_genshape += "\nprivate var _font:Font;";
					_genshape += "\nprivate var _format:TextFormat;";
					_genshape += "\n_font = Assets.getFont ('assets/"+el.getTextAttr('face')+".ttf');";
					_genshape += "\n_format = new TextFormat (_font.fontName, "+el.getTextAttr('size')+", 0x"+el.getTextAttr('fillColor').split("#").join("")+");";
					_genshape += "\n_format.align = TextFormatAlign."+el.getTextAttr("alignment").toUpperCase()+";";
					_genshape += "\nvar _textField = new TextField ();";
					_genshape += "\n_textField.autoSize = TextFieldAutoSize.LEFT;";
					_genshape += "\n_textField.defaultTextFormat = _format;";
					_genshape += "\nthis.addChild(_textField);";
					_genshape += "\n*/";
					


			    } 
			    else if (el.elementType == 'shape')
			    {

			    	_genshape += "\n// " + f + " - " + e;

					// trace ("el.contours: "+el.contours);
					var _contoursArray = el.contours;
					var fillcolor = undefined;
					// trace ("_contoursArray[1].fill: " + _contoursArray[1].fill.color)
					for (x=0; x<_contoursArray.length; x++){
						// trace (_contoursArray[x].fill.color);	
						if (_contoursArray[x].fill.color != undefined)
							fillcolor = _contoursArray[x].fill.color.split("#").join("");
					}

					_genshape += "\nvar _sprite = new flash.display.Sprite();";
					_genshape += "\n_sprite.graphics.beginFill(0x"+fillcolor+",1);";





					// trace ("el.edges: "+el.edges);

					var strokeColor;
					var thickness;
					var _edgeArary = el.edges;
					var nope = true;

					for (z=0; z<_edgeArary.length; z++){


						if(_edgeArary[z].stroke.color != undefined)
						{
							strokeColor = _edgeArary[z].stroke.color.split("#").join("");
							thickness = _edgeArary[z].stroke.thickness;	
						} else {
							nope = false;
						}
						// trace (_edgeArary[z].stroke.color);	
					}

					if(nope)_genshape += "\n_sprite.graphics.lineStyle("+thickness+", 0x"+strokeColor+", 1);";

					// trace ("el.isDrawingObject: "+el.isDrawingObject);
					// trace ("el.isFloating: " + el.isFloating);
					// trace ("el.isGroup: "+el.isGroup);
					// trace ("el.isOvalObject: "+el.isOvalObject);
					// trace ("el.isRectangleObject: "+el.isRectangleObject);
					// trace ("el.members: " + el.members);
					// trace ("el.numCubicSegments: " + el.numCubicSegments);

			


					// trace ("el.vertices: " + el.vertices);
					var _verticesArray = el.vertices;

					var yarray = [];
					var xarray = [];
					for (y=0; y<_verticesArray.length; y++){

						if(yarray.indexOf(_verticesArray[y].y) == -1){
							yarray.push (_verticesArray[y].y);
						}

						if(xarray.indexOf(_verticesArray[y].x) == -1){
							xarray.push (_verticesArray[y].x);
						}


					}

					// trace (xarray.length);
					// trace (yarray.length);

					// trace (xarray);
					// trace (yarray);


					xarray.sort(function(a, b){return a-b});
					yarray.sort(function(a, b){return a-b});


					// trace (xarray);
					// trace (yarray);


					// trace (_verticesArray.length);
					// niet helemaal waar...
					if( ( xarray.length == 2 && yarray.length == 2 )  || el.isRectangleObject)
					{	
						// _genshape += "\n// strange but the x,y is off";
						_genshape += "\n_sprite.graphics.drawRect("+xarray[0]+","+yarray[0]+","+(xarray[1]-xarray[0])+","+(yarray[1]-yarray[0])+");"

					} else {

						for (y=0; y<_verticesArray.length; y++){
							// trace ("x: " +_verticesArray[y].x + " - y: " +_verticesArray[y].y);	
							if(y == 0) 
								_genshape += "\n_sprite.graphics.moveTo("+_verticesArray[y].x+","+_verticesArray[y].y+");"
							else 
								_genshape += "\n_sprite.graphics.lineTo("+_verticesArray[y].x+","+_verticesArray[y].y+");"
						}
					}

					_genshape += "\n_sprite.graphics.endFill();";
					_genshape += "\nthis.addChildAt(_sprite,0);";
					

					// var temp = el.getCubicSegmentPoints()


			    } else {
			    	trace ("// el.elementType: " + el.elementType);
			    	trace("// el.libraryItem: " + el.libraryItem.name);
			    	// getDataFromTimeline(el.libraryItem.timeline);
			    }
            }

        }				
		
    }        

	trace (_genshape.split("_format").join("_format"+f+""+e).split("_txt").join("_txt"+f+""+e).split("_sprite").join("_sprite"+f+""+e).split("\n").join("\n\t\t"));
				
	// trace (_genshape);

    trace ("\t}\n");
	trace ("}");                                                 
  
}

main();