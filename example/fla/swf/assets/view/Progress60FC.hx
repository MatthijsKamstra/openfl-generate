package swf.assets.view;

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

	// tTxt
	public var tTxt : TextField;

	// tWhiteCircle
	public var tWhiteCircle : MovieClip;

	// Layer 4
	//public var UNNAMED_INSTANCE : MovieClip;

	// tBg
	public var tBg : MovieClip;


	// constructor
	public function new()
	{
		// trace( '+ Progress60FC.Progress60FC' );
		super();
		init();
	}
	
	private function init():Void
	{
		_mc = Assets.getMovieClip("lib:assets.view.Progress60FC");
		this.addChild(_mc);
		
		tTxt = cast (_mc.getChildByName("tTxt"), TextField);
		tWhiteCircle = cast (_mc.getChildByName("tWhiteCircle"), MovieClip);
		tBg = cast (_mc.getChildByName("tBg"), MovieClip);
		
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