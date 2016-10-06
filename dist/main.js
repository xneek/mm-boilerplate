'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * app root oject with basic propertirs
 *@namespace app
 * @class app
 * @constructor
*/

window.addEventListener('load', function (e) {
	setTimeout(function () {
		window.scrollTo(0, 1);
	}, 1);
}, false);

var app = {
	title: crEl('span'),
	menuToggler: crEl('a', { href: 'javascript:void(0)', d: { activates: 'slide-out' } }, new Icon('menu')),
	menu: crEl('ul', { c: 'side-nav', id: 'slide-out' }),
	/**
 * Установка заголовка окна
 * @method app.setTitle
 * @param {String} title Заголовок
 * @example
 app.setTitle('Авторизация')
 */
	setTitle: function setTitle(title) {
		document.title = title;
		app.title.innerHTML = null;
		app.title.appendChild(document.createTextNode(title));
	},
	components: {}
};

/** Базовый класс для создания компонентов */

var Component = function Component() {
	_classCallCheck(this, Component);
};

/**
 * Иконка
 * @extends Component
*/


var Icon = function (_Component) {
	_inherits(Icon, _Component);

	/**
  * Создает иконку
  * 
  * @param {String} name - Имя иконки (Контент DOM элемента)
  * @param {String} с - Классы через пробел
  * @return {Node}
  **/
	function Icon(name, c) {
		var _ret;

		_classCallCheck(this, Icon);

		var _this = _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).call(this));

		return _ret = crEl('i', { c: 'material-icons' + (c ? ' ' + c : '') }, name), _possibleConstructorReturn(_this, _ret);
	}

	return Icon;
}(Component);

;

/**
 * Выезжающее меню
 * @extends Component
 */

var SideNav = function (_Component2) {
	_inherits(SideNav, _Component2);

	/**
  * Создает выезжающее меню
  * @param {Object} opts - Опции
  * @return {Object}
  **/
	function SideNav() {
		var _ret2;

		var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { menuWidth: 300, closeOnClick: true };

		_classCallCheck(this, SideNav);

		var _this2 = _possibleConstructorReturn(this, (SideNav.__proto__ || Object.getPrototypeOf(SideNav)).call(this));

		_this2._toggler = crEl('a', { href: 'javascript:void(0)', d: { activates: 'slide-out' } }, new Icon('menu'));
		_this2._list = crEl('ul', { c: 'side-nav', id: 'slide-out' });
		_this2.el = _this2._toggler;
		document.body.appendChild(_this2._list);
		$(_this2._toggler).sideNav(opts);
		return _ret2 = _this2, _possibleConstructorReturn(_this2, _ret2);
	}

	/**
  *  @type {Node}
  */


	_createClass(SideNav, [{
		key: 'show',

		/** Показать меню */
		value: function show() {
			$(this._toggler).sideNav('show');
		}
		/** Скрыть меню */

	}, {
		key: 'hide',
		value: function hide() {
			$(this._toggler).sideNav('hide');
		}

		/** Очистить элементы меню */

	}, {
		key: 'clear',
		value: function clear() {
			this._list.innerHTML = '';
		}

		/**
   * Добавить элемент в меню
   * @param {Node} inner - DOM который добавляем.
   */

	}, {
		key: 'add',
		value: function add(inner) {
			this._list.appendChild(inner);
		}

		/**
   * Добавить ссылку в меню
   * @param {Node} inner - DOM или строка (текст ссылки)
   * @param {Function} evclick - функция вызываемая по клику на ссылку
   */

	}, {
		key: 'addLink',
		value: function addLink(inner, evclick) {
			this.add(crEl('li', crEl('a', { href: 'javascript:void(0)', e: { click: evclick }, c: 'waves-effect' }, inner)));
		}

		/**
   * Добавить заголовок в меню
   * @param {Node} inner - DOM или Строка.
   */

	}, {
		key: 'addHeader',
		value: function addHeader(inner) {
			this.add(crEl('li', crEl('a', { c: 'subheader' }, inner)));
		}

		/**
   * Добавить разделитель в меню
   */

	}, {
		key: 'addDivider',
		value: function addDivider() {
			this.add(crEl('li', crEl('div', { c: 'divider' })));
		}
	}, {
		key: 'dom',
		get: function get() {
			return this.el;
		}
	}]);

	return SideNav;
}(Component);

var sideNav = new SideNav();

function Navbar() {
	return crEl('div', { c: 'navbar-fixed' }, crEl('nav', crEl('div', { c: 'nav-wrapper' }, crEl('a', { href: 'javascript:void(0)', c: 'brand-logo' }, sideNav.dom, app.title))));
}

sideNav.addHeader('Ololo');
sideNav.addLink('link1', function () {
	alert(1);
});
sideNav.addLink('Link2', function () {
	alert(2);
});

app.setTitle('Привет');
document.getElementById("main").innerHTML = "";
document.getElementById("main").appendChild(app.menu);
document.getElementById("main").appendChild(new Navbar());