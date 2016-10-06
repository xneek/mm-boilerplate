/**
	* Сообщения выводимые пользователю (уведомления)
	* Работает на основе плагина toastr
	* {@link http://codeseven.github.io/toastr/demo.htm l toastr}

	* @method app.msg
	* @param {String} msg Текст сообщения
	* @param {String} [options.type=info] Тип сообщения (по умолчанию info)
	* @example
	app.msg("Привет, Мир!"); // сообщение инфо
	app.msg("Привет, Мир!","success"); // сообщение успех
app.msg('ololo','danger').then(function(notify){
notify.pct=0; setInterval( function(){ notify.pct += 1; notify.update({ 'message': '<strong>' + notify.pct +'%</strong> Your page has been saved!', 'progress': notify.pct}); }, 500)
})
	*/

window.addEventListener('load', function(e) {
   setTimeout(function() { window.scrollTo(0, 1); }, 1);
}, false);

function Icon(name){
	return crEl('i',{c:'material-icons'},name);
};
var app = {
	title: crEl('span'),
	menuToggler: crEl('a', {href:'javascript:void(0)', d:{activates:'slide-out'}}, new Icon('menu')),
	menu: crEl('ul',{c:'side-nav', id:'slide-out'}),
	setTitle: function(title){
		document.title = title;
		app.title.innerHTML = null;
		app.title.appendChild(document.createTextNode(title));
	}
};

		class SideNav {
			
		constructor(opts){
	
			this._toggler = crEl('a', {href:'javascript:void(0)', d:{activates:'slide-out'}}, new Icon('menu'));
			this._list = crEl('ul',{c:'side-nav', id:'slide-out'});
			this.el = this._toggler;
			document.body.appendChild(this._list);
			return this;
		}
		
		init (opts = {menuWidth: 300, closeOnClick: true }) {
			$(this._toggler).sideNav(opts)
		}

		show(){
			$(this._toggler).sideNav('show');
		}
		hide(){
			$(this._toggler).sideNav('hide');
		}
		
		clear() {
			this._list.innerHTML = '';
		}
		add(inner){
			this._list.appendChild(inner);
		}
		addItem(inner, evclick){
			this.add(crEl('li', crEl('a',{href:'javascript:void(0)', e:{click:evclick},c:'waves-effect'}, inner)));
		}
		addHeader(inner){
			this.add(crEl('li', crEl('a',{c:'subheader'},inner)));
		}		
		addDivider(){
			this.add(crEl('li', crEl('div',{c:'divider'})));
		}
		
	}
	
	
	let sideNav = new SideNav();
	
	function Navbar(){
		return crEl('div',{c:'navbar-fixed'},crEl('nav',
			crEl('div',{c:'nav-wrapper'},
				crEl('a',{href:'javascript:void(0)', c:'brand-logo'}, 
					sideNav.el,
					app.title
				)
			)
		))
	}
	

	sideNav.addHeader('Ololo')
	sideNav.addItem('link1', function(){alert(1)})
	sideNav.addItem('Link2', function(){alert(2)})
	sideNav.init();
	
	

	app.setTitle('Привет');
	document.getElementById("main").innerHTML = "";
	document.getElementById("main").appendChild(app.menu)
	document.getElementById("main").appendChild(new Navbar())
	
		
	



