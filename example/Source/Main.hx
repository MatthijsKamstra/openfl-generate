package;

import openfl.display.Sprite;
import openfl.Assets;

class Main extends Sprite {
		
	public function new () 
	{
		super ();
		Assets.loadLibrary("lib", swfAssetsLoadedTwo);		
	}
	
	/**
	 * when the swf-assets are load
	 * @param  library 
	 */
	private function swfAssetsLoaded(library:AssetLibrary):Void 
	{
		var _mc = Assets.getMovieClip("lib:assets.view.HulkFC");
		addChild(_mc);
		_mc.x = (stage.stageWidth - _mc.width) / 2;
		_mc.y = (stage.stageHeight - _mc.height) / 2;
	}	

	// [mck] OR	
	private function swfAssetsLoadedTwo(library:AssetLibrary):Void 
	{
		var _mc = new swf.assets.view.HulkFC();
		addChild(_mc);
		_mc.x = (stage.stageWidth - _mc.width) / 2;
		_mc.y = (stage.stageHeight - _mc.height) / 2;
	}	
}