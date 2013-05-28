/* Nonresponsive v2.0.0 - Media queries for the unsupportive. Authors & copyright (c) 2012: WebLinc, David Knight. */
/* NOTE: Depends on media-match polyfill. See https://github.com/weblinc/media-match */

// Nonresponsive
(function(win, source/* [css @media blocks] */) {
    'use strict';

    var _doc    = win.document,
        _head   = _doc.getElementsByTagName('head')[0],
        _style  = _doc.createElement('style'),
        _test   = '@media (width) { #nonresponsivejs { position: relative; z-index: 1; } }',
        _supported  = false,

        /*
            watch
        */
        _watch = function(mql, rules) {
            var style = _doc.createElement('style');

            style.type  = "text/css";
            style.disabled = !mql.matches;
            _head.appendChild(style);

            if (style.styleSheet) {
                style.styleSheet.cssText = rules;
            } else {
                style.innerHTML = rules;
            }

            return function(mql) {
                style.disabled = !mql.matches;
            };
        };

        // Check if we need to support this browser
        _style.type  = 'text/css';
        _style.id    = 'nonresponsivejs';

        _head.appendChild(_style);

        // Add rules to style element
        if (_style.styleSheet) {
            _style.styleSheet.cssText = _test;
        } else {
            _style.textContent = _test;
        }

        // Must be placed after style is inserted into the DOM for IE
        // Get test results
        _supported = (((win.getComputedStyle && win.getComputedStyle(_style)) || _style.currentStyle).zIndex * 1) === 1;

        _head.removeChild(_style);
        _style = null;

        if (_supported) {
            win.Nonresponsive = {
                parse: function() {}
            };

            return;
        }

    win.Nonresponsive = {
        /*
            parse
            Finds all @media blocks and creates a MediaQueryList with matchMedia then calls '_watch' which adds a MediaQueryListListener.
            @param data <String>
                Input   : @media screen and (min-width: 300px) and (max-width: 600px), screen and (max-width: 1200px) { css rules }
         */
        parse: function(data) {
            // Find all '@media type and (query) and (query), type and (query) { css rules }'
            data.replace(/@media\s*(\w[^\{]+)\{(([^\{\}]*\{[^\}\{]*\})+)?\}/gi, function(block, media, rules) {
                if (media && rules) {
                    // Requires media-match polyfill. See https://github.com/weblinc/media-match
                    var mql = win.matchMedia(media);
                    mql.addListener(_watch(mql, rules));
                }
            });
        }
    };

    source && win.Nonresponsive.parse(source);
})(window, '');