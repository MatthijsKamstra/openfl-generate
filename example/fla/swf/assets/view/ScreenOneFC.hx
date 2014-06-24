package swf.assets.view;

import openfl.Assets;
import openfl.display.MovieClip;
import openfl.text.TextField;
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

	// tTxt
	public var tTxt : TextField;

	// tInputTxt
	public var tInputTxt : TextField;

	// tBtn3
	public var tBtn3 : MovieClip;

	// tBtn2
	public var tBtn2 : MovieClip;

	// tBtn1
	public var tBtn1 : MovieClip;

	// tBg
	public var tBg : MovieClip;


	// constructor
	public function new()
	{
		// trace( '+ ScreenOneFC.ScreenOneFC' );
		super();
		init();
	}
	
	private function init():Void
	{
		_mc = Assets.getMovieClip("lib:assets.view.ScreenOneFC");
		this.addChild(_mc);
		
		tTxt = cast (_mc.getChildByName("tTxt"), TextField);
		tInputTxt = cast (_mc.getChildByName("tInputTxt"), TextField);
		tBtn3 = cast (_mc.getChildByName("tBtn3"), MovieClip);
		tBtn2 = cast (_mc.getChildByName("tBtn2"), MovieClip);
		tBtn1 = cast (_mc.getChildByName("tBtn1"), MovieClip);
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