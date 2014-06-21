package assets.view;

import openfl.Assets;
import openfl.display.MovieClip;
import openfl.display.MovieClip;

/**
 * ScreenOneFC Component
 * 
 * @author Matthijs Kamstra aka [mck]
 */
class ScreenOneFC extends MovieClip 
{

	private var _mc:MovieClip;

	// children on stage
	//--------------------

	// Btn3
	public var Btn3 : MovieClip;

	// Btn2
	public var Btn2 : MovieClip;

	// Btn1
	public var Btn1 : MovieClip;

	// tBg
	public var tBg : MovieClip;


	/**
	 * 
	 */
	public function new()
	{
		// trace( '+ ScreenOneFC.ScreenOneFC' );
		super();
		init();
	}
	
	private function init():Void
	{
		_mc = Assets.getMovieClip("lib:ScreenOneFC");
		this.addChild(_mc);
		
		Btn3 = cast (_mc.getChildByName("Btn3"), MovieClip);
		Btn2 = cast (_mc.getChildByName("Btn2"), MovieClip);
		Btn1 = cast (_mc.getChildByName("Btn1"), MovieClip);
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