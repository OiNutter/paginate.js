Paginate.js
===========

Paginate.js is a Javascript pagination plugin for [Guggenheim.js](https://github.com/OiNutter/guggenheim.js). It can also
be configured to work with other javascript galleries. I decided to keep this seperate, rather than building it into 
Guggenheim as it lets people use their own pagination scripts if desired.

Usage
-----

Include the required javascript files in your page

```html
<script type="text/javascript" src="/path/to/guggenheim.js"></script>
<script type="text/javascript" src="/path/to/paginate.js"></script>
```

Set up your gallery and pagination div like this.

```html
<div id="guggenheim-container">
	<div class="guggenheim-slider">
		<div class='guggenheim-item'>1</div>
		<div class='guggenheim-item'>2</div>
		<div class='guggenheim-item'>3</div>
		<div class='guggenheim-item'>4</div>
		<div class='guggenheim-item'>5</div>
		<div class='guggenheim-item'>6</div>
		<div class='guggenheim-item'>7</div>
		<div class='guggenheim-item'>8</div>
		<div class='guggenheim-item'>9</div>
		<div class='guggenheim-item'>10</div>
		<div class='guggenheim-item'>11</div>
		<div class='guggenheim-item'>12</div>
		<div class='guggenheim-item'>13</div>
		<div class='guggenheim-item'>14</div>
		<div class='guggenheim-item'>15</div>
		<div class='guggenheim-item'>16</div>
		<div class='guggenheim-item'>17</div>
	</div>
</div>

<div id="pagination"></div>
```

Now initialise your gallery and pagination

```Javascript
var gallery = guggenheim(element[,options]),
	pagination = paginate(element,gallery[,options])
```

Where element is either the css selector of the pagination container, or the actual DOM element itself and gallery is the javascript gallery object. Options is an optional argument that will specify customisation variables. The full range of options is detailed 
below.

* showDots - `true` - Whether to show ellipsis dots if there are more pages before or after the currently shown buttons.
* limitButtons - `true` Whether to show the first and last page buttons.
* fastForwardbuttons - `false` Whether to show fast forward buttons that jump forward or back by the shown number of pages.
* numPagesToShow - `5` The number of page buttons to show.
* start - `1` The page to start drawing from.
* onChange - `function(){}` Function to call when page is changed.
* numPagesFunc - `numPages` Name of function on the gallery object that returns the number of pages in the gallery
* navFunc - `jumpTo` Name of the navigation function on the gallery object that changes the page.
* resetFuncs - `['filter','reset']` Array of functions on the gallery object that should trigger a refresh of the pagination.

The last 3 options are used to configure paginate to work with a gallery other than guggenheim.

Methods
-------

###render###

```Javascript
pagination.render()
```

Renders the pagination buttons. This is called automatically on initialisation so you should never need to call this but it is
provided just in case.

###goToPage###

```Javascript
pagination.goToPage(3)
pagination.goToPage(event)
pagination.goToPage('first')
```

Changes the page of the pagination and the associated gallery. Can take either an integer page number or one of the following keywords; `first`, `jumpback`, `prev`, `next`, `jumpforward`, `last`. This is the also the callback bound to the pagination buttons so it can take a Javascript Event object. The only requirement for this usage is that the `currentTarget` for the event has a `data-target` attribute which is either an integer page number or one of the previously mentioned keywords.

###refresh###

```Javascript
pagination.refresh()
```

Causes the pagination to reload the number of pages and re-render itself. This is called automatically whenever one of the `resetFuncs` are called, in the case of a Guggenheim gallery this is either `filter` or `reset`

Examples
--------

Check out the [demo page](http://oinutter.github.com/paginate.js)

Building
--------

[![Build Status](https://secure.travis-ci.org/OiNutter/paginate.js.png)](http://travis-ci.org/OiNutter/paginate.js)

To build guggenheim you will need to install Jake and uglify-js.

``` bash
npm install -g jake
npm instal uglify-js
```

Then just run

``` bash
jake paginate:build
```

This will minify the file and place it in the dist folder.

Contributing
------------

Please feel free to fork, fiddle, play with this as much as you like. If you add something useful or fix something broken and think it should be in the main repository then please by all means send me a Pull Request and I'll take a look. If possible please add tests.

TODO
----

* Add more tests

License
-------

Copyright (c) 2013 Will McKenzie
http://oinutter.co.uk

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



[![Endorse Me](http://api.coderwall.com/OiNutter/endorsecount.png)](http://coderwall.com/OiNutter)

