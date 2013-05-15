/*
 * Paginate.js 0.1
 * (c) 2013 Will McKenzie
 * Provided under the MIT License
 * See http://github.com/OiNutter/paginate.js for more details
 */

var paginate = function(element,gallery,opts){
	
	var container,
		options,
		current,
		start,
		numPages,
		handlers = {},
    	zid=1,

		// renders the pagination buttons
		render = function(){

			if(numPages==1)
				return

			var i,
				pageLimit = Math.min((start-1)+options.numPagesToShow,numPages)

			//render first button
			if(options.limitButtons)
				_renderButton('first','|&lt;')
		
			if(options.fastForwardButtons)
				_renderButton('jumpback','&lt;&lt;')
			
			//render prev button
			_renderButton('prev','|&lt;')
		
			for(i=start;i<=pageLimit;i++)
				_renderButton('page',i,i)
	
			//render next button
			_renderButton('next','&gt;')
			
			if(options.fastForwardButtons)
				_renderButton('jumpforward','&gt;&gt;')
			
			//render last button
			if(options.limitButtons)
				_renderButton('last','&gt;|')
			
		},

		//jumps to a specific page
		goToPage = function(e){

			var button = e.currentTarget,
				target = button['data-target'],
				page

			switch(target){
				case 'first': 
					page = 1 
					break
				case 'prev':
					page = Math.max(1,current-1)
					break
				case 'jumpback':
					page = Math.max(1,current - options.numPagesToShow)
					break
				case 'last':
					page = numPages
					break
				case 'next':
					page = Math.min(numPages,current+1)
					break
				case 'jumpforward':
					page = Math.min(numPages,current + options.numPagesToShow)
					break
				default:
					page = parseInt(target)
					break
			}

			if(page!=current){
				gallery.jumpTo(page)
				current=page
				if(current >= start && current <= Math.min((start-1)+options.numPagesToShow,numPages-(start-1))){
					_updateButtons()
				} else {
					if(current<start)
						start = current
					else
						start = current - (options.numPagesToShow-1)

					if(start<0)
						start == 0
					else if(start>numPages)
						start = numPages

					container.innerHTML = ''
					render()
				}
				options.onChange(page)
			}

		}

	function _renderButton(klass,label,target){
		var button = document.createElement('a')
		
		button['data-target'] = target || klass
		button.innerHTML = "<span>" + label + "</span>"

		button = _updateButton(button)	

		container.appendChild(button)
	}

	function _updateButtons(){

		var buttons = container.querySelectorAll('.paginate-bt'),
			i

		for(i=0;i<buttons.length;i++)
			_updateButton(buttons[i])

		// shift numbers up if necessary

	}

	function _updateButton(button){

		_detachEvent(button,'click')
		var target = button['data-target'],
			className = "paginate-" + target + "-bt paginate-bt",
			disabled,
			active

		switch(target){
				case 'first':
				case 'prev':
				case 'jumpback':
					if(current==1) 
						className += ' disabled'
					break
				case 'last':
				case 'next':
				case 'jumpforward':
					if(current==numPages)
						className += ' disabled'
					break
				default:
					if(current==parseInt(target))
						className += ' active'
					break
			}

		button.className = className
		if(!disabled && !active)
			_addEvent(button,'click',goToPage)

		return button

	}

	function _getObjKeys(obj){
		if(typeof obj != 'object')
			return []

		var keys = [],
			prop

		for(prop in obj)
			keys.push(prop)

		return keys
	}

	function _getObjVars(obj){
		if(typeof obj != 'object')
			return []

		var vars = [],
			prop

		for(prop in obj)
			vars.push(obj[prop])

		return vars
	}

	function _mergeOptions(destination,source){
		var property,prop
		for (property in source){
			if(_getObjVars(destination[property]).length>0 && _getObjVars(source[property]).length>0){
				for(prop in source[property])
					destination[property][prop] = source[property][prop]
			} else {
				destination[property] = source[property]
			}
		}
		return destination
	}

	function _isFunction(f){
		return f && {}.toString.call(f) === '[object Function]'
	}

	function _zid(el) {
    	return el._zid || (el._zid = zid++)
  	}

	function _addEvent(el,event,callback){
		
		var id = _zid(el)

		if(!handlers[id])
			handlers[id] = {}

		if(!handlers[id][event])
			handlers[id][event] = []

		handlers[id][event].push(callback)

		if(el.addEventListener)
			el.addEventListener(event,callback,false)
		else
			el.attachEvent(event,callback)
	}

	function _detachEvent(el,event,callback){
		if(el.removeEventListener)
			el.removeEventListener(event,callback,false)
		else
			el.detachEvent(event,callback)
	}

	function _removeEvent(el,event,callback){
		var id = _zid(el)
		if(handlers[id] && handlers[id][event]){
			for(var i=0;i<handlers[id][event].length;i++){
				if(callback==null || callback==handlers[id][event][i]){
					handlers[id][event].splice(i,1)
					_detachEvent(el,event,handlers[id][event][i])
				}
			}
		}
	}

	// Initialise

	if(typeof element == 'string' && document.querySelector(element)==null)
		throw 'Element ' + element + " does not exist!"

	container = (typeof element == 'string') ? document.querySelector(element): element
	
	if(!gallery)
		throw 'No gallery supplied'

	if(!gallery.numPages || !_isFunction(gallery.numPages))
		throw 'gallery has no method numPages'

	numPages = gallery.numPages()

	options = _mergeOptions({
		showDots:true,
		numPagesToShow:5,
		start:1,
		limitButtons: true,
		fastForwardButtons:false,
		onChange: function(page){}
	},opts)

	start = options.start
	current = start

	render()

	return {
		"goToPage":goToPage
	}

}