package swf.assets.view;

import openfl.Assets;
import openfl.display.MovieClip;
import openfl.display.MovieClip;

/**
 * ActionScriptFC Component
 * 
 * @author Matthijs Kamstra aka [mck]
 */
class ActionScriptFC extends MovieClip 
{

	private var _mc:MovieClip;

	// children on stage
	//--------------------

	// tBg
	public var tBg : MovieClip;

	// AS on layer 'Layer 5'stop();
	// AS on layer 'as'
	public var  _number:Float = 1;

	public var  _Int:Int = 1;

	public var  _boolean:Bool = true;

	public var  _object:Dynamic = {};

	public var  _array:Array<Dynamic> = [];

	// constructor
	public function new()
	{
		// trace( '+ ActionScriptFC.ActionScriptFC' );
		super();
		init();
	}
	
	private function init():Void
	{
		_mc = Assets.getMovieClip("lib:assets.view.ActionScriptFC");
		this.addChild(_mc);
		
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