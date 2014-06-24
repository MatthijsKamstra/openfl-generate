package swf.assets;

import openfl.Assets;
import openfl.display.MovieClip;
import openfl.display.MovieClip;

/**
 * ParentFC Component
 * 
 * @author Matthijs Kamstra aka [mck]
 */
class ParentFC extends MovieClip 
{

	private var _mc:MovieClip;

	// children on stage
	//--------------------

	// tBg
	public var tBg : MovieClip;


	// constructor
	public function new()
	{
		// trace( '+ ParentFC.ParentFC' );
		super();
		init();
	}
	
	private function init():Void
	{
		_mc = Assets.getMovieClip("lib:assets.ParentFC");
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