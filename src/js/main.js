
/**
 * app root oject with basic propertirs
 *@namespace app
 * @class app
 * @constructor
*/

window.addEventListener('load', function(e) {
   setTimeout(function() { window.scrollTo(0, 1); }, 1);
}, false);



var app = {
	title: crEl('span'),
	menuToggler: crEl('a', {href:'javascript:void(0)', d:{activates:'slide-out'}}, new Icon('menu')),
	menu: crEl('ul',{c:'side-nav', id:'slide-out'}),
	/**
	* Установка заголовка окна
	* @method app.setTitle
	* @param {String} title Заголовок
	* @example
	app.setTitle('Авторизация')
	*/
	setTitle: function(title){
		document.title = title;
		app.title.innerHTML = null;
		app.title.appendChild(document.createTextNode(title));
	},
	components:{}
};



/** Базовый класс для создания компонентов */
class Component {
	constructor(){
		
	}
}

/**
 * Иконка
 * @extends Component
*/	
class Icon extends Component{
	/**
	 * Создает иконку
	 * 
	 * @param {String} name - Имя иконки (Контент DOM элемента)
	 * @param {String} с - Классы через пробел
	 * @return {Node}
	 **/
	constructor(name, c){
		super();
		return crEl('i',{c:'material-icons' + (c?' '+c:'')},name);
	}
};


/**
 * Выезжающее меню
 * @extends Component
 */	
class SideNav extends Component {
	/**
	 * Создает выезжающее меню
	 * @param {Object} opts - Опции
	 * @return {Object}
	 **/	
	constructor(opts = {menuWidth: 300, closeOnClick: true }){
		super();
		this._toggler = crEl('a', {href:'javascript:void(0)', d:{activates:'slide-out'}}, new Icon('menu'));
		this._list = crEl('ul',{c:'side-nav', id:'slide-out'});
		this.el = this._toggler;
		document.body.appendChild(this._list);
		$(this._toggler).sideNav(opts)
		return this;
	}

    /**
     *  @type {Node}
     */
	get dom(){
		return this.el;
	}
    /** Показать меню */
	show(){
		$(this._toggler).sideNav('show');
	}
	/** Скрыть меню */
	hide(){
		$(this._toggler).sideNav('hide');
	}
	
	/** Очистить элементы меню */
	clear() {
		this._list.innerHTML = '';
	}
	
    /**
     * Добавить элемент в меню
     * @param {Node} inner - DOM который добавляем.
     */	
	add(inner){
		this._list.appendChild(inner);
	}

	
    /**
     * Добавить ссылку в меню
     * @param {Node} inner - DOM или строка (текст ссылки)
     * @param {Function} evclick - функция вызываемая по клику на ссылку
     */	
	addLink(inner, evclick){
		this.add(crEl('li', crEl('a',{href:'javascript:void(0)', e:{click:evclick},c:'waves-effect'}, inner)));
	}
	
	
    /**
     * Добавить заголовок в меню
     * @param {Node} inner - DOM или Строка.
     */	
	addHeader(inner){
		this.add(crEl('li', crEl('a',{c:'subheader'},inner)));
	}

	
    /**
     * Добавить разделитель в меню
     */		
	addDivider(){
		this.add(crEl('li', crEl('div',{c:'divider'})));
	}
	
}
	
	
	let sideNav = new SideNav();
	
	function Navbar(){
		return crEl('div',{c:'navbar-fixed'},crEl('nav',
			crEl('div',{c:'nav-wrapper'},
				crEl('a',{href:'javascript:void(0)', c:'brand-logo'}, 
					sideNav.dom,
					app.title
				)
			)
		))
	}
	

	sideNav.addHeader('Ololo')
	sideNav.addLink('link1', function(){alert(1)})
	sideNav.addLink('Link2', function(){alert(2)})

	
	

	app.setTitle('Привет');
	document.getElementById("main").innerHTML = "";
	document.getElementById("main").appendChild(app.menu)
	document.getElementById("main").appendChild(new Navbar())
	
		
	



