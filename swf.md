Welcome to the openfl-generate-component-class wiki!

**unofficial [swf](https://github.com/openfl/swf) documentation**

**swf**
_Provides SWF parsing and rendering for C++, Flash and HTML5_

# WIP

Swf works great with Flash!
Don't use embedded fonts for C++!

# source

source [https://github.com/openfl/swf](https://github.com/openfl/swf)

nice talk about animation:
[using-swf-animation-in-haxe-openfl-applications](http://stackoverflow.com/questions/18222008/using-swf-animation-in-haxe-openfl-applications)

[embedding-swfs-makes-nme-meme-friendly](http://www.joshuagranick.com/blog/2012/01/24/embedding-swfs-makes-nme-meme-friendly/)

[quick-notes-on-the-swf-library-for-nme](http://www.joshuagranick.com/blog/2012/02/08/quick-notes-on-the-swf-library-for-nme/)

[http://www.joshuagranick.com/blog/?s=swf](http://www.joshuagranick.com/blog/?s=swf)

# swf
Support for SWF assets
Provides SWF parsing and rendering for C++, Flash and HTML5

only example I could find:
[SimpleSWFLayout](https://github.com/openfl/openfl-samples/tree/master/SimpleSWFLayout)

project.xml
```
<?xml version="1.0" encoding="utf-8"?>
<project>

	<meta title="SWF assets" package="ex.ample" version="1.0.0" company="Acme Corporation" />
	<app main="Main" path="Export" file="SWFassets" />

	<window width="0" height="0" if="web" />

	<source path="Source" />

	<haxelib name="openfl" />
	<haxelib name="swf" />

	<library path="Assets/layout.swf" />

	<source path="Assets" />
	<icon path="Assets/openfl.svg" />

</project>
```
Main.hx
```
Assets.loadLibrary ("layout", function (_) {

	var layout = Assets.getMovieClip ("layout:Layout");
	addChild (layout);

	var bg = layout.getChildByName ("Background");
	var header = layout.getChildByName ("Header");
	var column = layout.getChildByName ("Column");
});
```



***

I had an asset called "library.swf" containing that animation, exported as class "Oluv"

This requires the "swf" library which is now free, and can be installed with "haxelib install swf"

In my example, I added this to my application.xml file:
```
<haxelib name="swf" />
<library id="oluvLib" path="assets/library.swf" type="swf"/>
```
Then put this in a standard OpenFL template project:
```
Assets.loadLibrary("oluvLib", swfAssetsLoaded);

private function swfAssetsLoaded(library:AssetLibrary):Void {
    var oluv = Assets.getMovieClip("oluvLib:Oluv");
    addChild(oluv);
    oluv.x = (stage.stageWidth - oluv.width) / 2;
    oluv.y = (stage.stageHeight - oluv.height) / 2;
}
```
Tweens do not seem to work on neko target, but they work fine in C++, and flash (of course).



***
project.xml
```
<haxelib name="swf" />	
<library id="lib" path="Fla/assets.swf" rename="assets/library.swf" />
```

Main.hx
```
Assets.loadLibrary("lib", swfAssetsLoadedTrue);
private function swfAssetsLoadedTrue(library:AssetLibrary):Void 
{
	// trace( "library: " + library );
	var _mc = Assets.getMovieClip("lib:ScreenOneFC");
	this.addChild(_mc);
}
```

***