/* Nonresponsive - Media queries for the unsupportive. Authors & copyright (c) 2012: WebLinc, David Knight. */
/* NOTE: Depends on Media object. See https://github.com/weblinc/media-match */

// Nonresponsive
(function(win, source) {
    'use strict';

    // Check if we need to support this browser
    if (win.Media.supported) {
        win.Nonresponsive = {
            parse: function() {},
            apply: function() {}
        };

        return;
    }

    var _doc         = win.document,
        _style       = _doc.createElement('style'),
        _queryList   = [],
        _rulesList   = [], 
        _appliedCss  = '',
        _cssText     = '',
        _timer       = 0;

    _style.type  = "text/css";
    _style.id    = 'Nonresponsive';
    _doc.getElementsByTagName('head')[0].appendChild(_style);

    win.Nonresponsive = {
        /*
            parse
            Finds all @media blocks and creates a list to be evaluated.
            @param data <String>
            
                Input   : @media screen and (min-width: 300px) and (max-width: 600px), screen and (max-width: 1200px) { css rules }
                Output  : 
                            _queryList[screen and (min-width: 300px) and (max-width: 600px), screen and (max-width: 1200px)]
                            _rulesList[css rules]
         */
        parse: function(data, apply) {
            // Find all '@media type and (query) and (query), type and (query) { css rules }'
            data.replace(/@media\s*(\w[^\{]+)\{(([^\{\}]*\{[^\}\{]*\})+)?\}/gi, function(block, mql, rules) {
                if (mql && rules) {
                    _queryList.push(mql);
                    _rulesList.push(rules);
                }
            });

            apply && this.apply();
        },

        /*
            apply
         */
        apply: function() {
            clearTimeout(_timer);

            _timer = setTimeout(function() {
                _cssText = '';

                // Loop over query list and evaluate each query then build @media string
                for (var i = 0, il = _queryList.length; i < il; i++) {
                    var match = false;
                    if ((match = win.Media.parseMatch(_queryList[i], true))) {
                        _cssText += '@media ' + match.type + ' {' + _rulesList[i] + '}\n';
                    }
                }

                // Add style node if css is new
                if (_cssText != _appliedCss) {
                    if (_style.styleSheet) {
                        _style.styleSheet.cssText = _cssText;
                    } else {
                        _style.innerHTML = _cssText;
                    }
                    _appliedCss = _cssText;
                }
            }, 10);
        }
    };

    if (source) {
        win.Nonresponsive.parse(source);
        win.Nonresponsive.apply();
    }

    Media.listen(win.Nonresponsive.apply);
})(window /* [, css @media blocks] */);