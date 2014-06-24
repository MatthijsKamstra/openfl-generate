package swf.assets.view;

import openfl.Assets;
import openfl.display.MovieClip;
import openfl.display.MovieClip;

/**
 * HulkFC Component
 * 
 * @author Matthijs Kamstra aka [mck]
 */
class HulkFC extends MovieClip 
{

	private var _mc:MovieClip;

	// children on stage
	//--------------------

	// Layer 1
	//public var UNNAMED_INSTANCE : MovieClip;


	// constructor
	public function new()
	{
		// trace( '+ HulkFC.HulkFC' );
		super();
		init();
	}
	
	private function init():Void
	{
		_mc = Assets.getMovieClip("lib:assets.view.HulkFC");
		this.addChild(_mc);
		
		
		// lime test flash -debug
		#if debug
			debug();
		#end
	}
	
	function debug():Void
	{
		for (i in 0..._mc.numChildren) {
			var temp = _mc.getChildAt(i);
			trace( "name: " + temp.name );
		}
	}

}