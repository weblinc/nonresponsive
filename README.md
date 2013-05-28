Nonresponsive
=============

CSS 3 media queries for the unsupportive (IE 6-8). Support more features with greater speed

* **Browsers**: IE 6-8 (Most any broser that does not support CSS3 media queries)
* **Features**: width, height, aspect-ratio, device-width, device-height, device-aspect-ratio, orientation. See https://github.com/weblinc/media-match for full list
* **Speed**: Parses a string of media queries rather than reloading linked stylesheets. Uses media-match to provide matchMedia api which allows for matchMedia.addListener.
* **Size**: 3.63KB minified (Nonresponsive: 900 bytes (482 bytes gzipped), media-match: 2.73KB minified (1.46KB gzipped))

##What Nonresponsive doesn't have

We've not implemented ajax requests for linked stylesheets. 
This may be added in the future or something like this but for now you can use your own or pass a string containing @media blocks.
We think this adds flexibility to use tools you already have available. 
Feedback is welcome and hope to see this in your next project.

##Examples

**Nonresponsive takes an optional second parameter on setup**
```
<script type="text/javascript">
    var mediaBlocks = '@media screen and (min-width: 600px) and (min-height: 400px), screen and (min-height: 400px) {body { background: green; }}';

    (function(win, source) {
        Nonresponsive core...
    })(window, mediaBlocks);
</script>
```

**Or call Nonresponsive.parse to init parsing and listening of media queries. Also, if additional media queries are added.**
```
<script type="text/javascript">
    var mediaBlocks = '@media screen and (min-width: 600px) and (min-height: 400px), screen and (min-height: 400px) {body { background: green; }}';
    Nonresponsive.parse(mediaBlocks);
</script>
```

###Dependencies
https://github.com/weblinc/media-match is the only dependancy thus far and we hope to keep it that way. Media-match is used to polyfill window.matchMedia which parses the media queries ex. matchMedia('(min-width: 200px) and (max-width: 600px)').
