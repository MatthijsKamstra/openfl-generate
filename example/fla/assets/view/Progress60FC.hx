package assets.view;

import openfl.Assets;
import openfl.display.MovieClip;
import openfl.text.TextField;
import openfl.display.MovieClip;

/**
 * Progress60FC Component
 * 
 * @author Matthijs Kamstra aka [mck]
 */
class Progress60FC extends MovieClip 
{

	private var _mc:MovieClip;

	// children on stage
	//--------------------

	// txt
	public var tTxt : TextField;

	// Layer 6
	//public var UNNAMED_INSTANCE : MovieClip;


	/**
	 * 
	 */
	public function new()
	{
		// trace( '+ Progress60FC.Progress60FC' );
		super();
		init();
	}
	
	private function init():Void
	{
		_mc = Assets.getMovieClip("lib:Progress60FC");
		this.addChild(_mc);
		
		tTxt = cast (_mc.getChildByName("tTxt"), TextField);
		
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