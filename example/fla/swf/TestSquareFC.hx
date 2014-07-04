package swf;

import openfl.Assets;
import openfl.display.MovieClip;

/**
 * TestSquareFC Component
 * 
 * @author Matthijs Kamstra aka [mck]
 */
class TestSquareFC extends MovieClip 
{

	private var _mc:MovieClip;

	// children on stage
	//--------------------


	// constructor
	public function new()
	{
		// trace( '+ TestSquareFC.TestSquareFC' );
		super();
		init();
	}
	
	private function init():Void
	{
		_mc = Assets.getMovieClip("lib:TestSquareFC");
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