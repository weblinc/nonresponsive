Nonresponsive
=============

CSS 3 media queries for the unsupportive (IE 6-8). Support more features with greater speed

* **Browsers**: IE 6-8
* **Features**: width, height, aspect-ratio, device-width, device-height, device-aspect-ratio, orientation. See https://github.com/weblinc/media-match for full list
* **Speed**: Better ops/sec when compared to Respond.js under JSLitmus with more feature support
* **Size**: 4kb minified (Nonresponsive: < 1kb, Media: 3kb)

## Speed test (IE9 in IE7 standards mode)

This was a difficult test to run due to timed throttling occurring in both implementations.
Notice the throttled vs non-throttled ops/sec. 
Respond shows a slight edge when throttled but based on the unthrottled result, 
Nonresponsive's underlying code executes more than 20 times faster.
Nonresponsive is without a doubt fast and feature rich. We'd like your help to make it even better.

* **Nonresponsive.parse/Respond translate**: Cleared query and rule arrays on each iteration
* **Nonresponsive.apply/Respond.callMedia**: Ran tests with throttle and without

###Nonresponsive.parse/Respond translate

* **Nonresponsive**: **3414 ops/sec**
* **Respond**: 164 ops/sec

###Nonresponsive.apply/Respond.callMedia (with default throttle)

* **Nonresponsive**: 10551 ops/sec (10 ms throttle)
* **Respond**: **12792 ops/sec (30 ms throttle)**

###Nonresponsive.apply/Respond.callMedia (without throttle)

* **Nonresponsive**: **4058 ops/sec**
* **Respond**: 176 ops/sec

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

**Parses @media blocks then waits for a resize/orientation event to apply styles**
```
<script type="text/javascript">
    var mediaBlocks = '@media screen and (min-width: 600px) and (min-height: 400px), screen and (min-height: 400px) {body { background: green; }}';
    Nonresponsive.parse(mediaBlocks);
</script>
```

**Parses @media blocks then calls Nonresponsive.apply() without waiting for a resize/orientation event**
```
<script type="text/javascript">
    var mediaBlocks = '@media screen and (min-width: 600px) and (min-height: 400px), screen and (min-height: 400px) {body { background: green; }}';
    Nonresponsive.parse(mediaBlocks, true);
</script>
```

**Forces a check of all media queries and applies style rules if matches are found**
```
<script type="text/javascript">
    Nonresponsive.apply();
</script>
```

###Dependencies
https://github.com/weblinc/media-match is the only dependancy thus far and we hope to keep it that way. Media is used to parse the media queries array ex. Media.parseMatch('(min-width: 200px) and (max-width: 600px)').
