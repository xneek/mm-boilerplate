'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.addEventListener('load', function (e) {
	setTimeout(function () {
		window.scrollTo(0, 1);
	}, 1);
}, false);

function Icon(name) {
	return crEl('i', { c: 'material-icons' }, name);
};
var app = {
	title: crEl('span'),
	menuToggler: crEl('a', { href: 'javascript:void(0)', d: { activates: 'slide-out' } }, new Icon('menu')),
	menu: crEl('ul', { c: 'side-nav', id: 'slide-out' }),
	setTitle: function setTitle(title) {
		document.title = title;
		app.title.innerHTML = null;
		app.title.appendChild(document.createTextNode(title));
	}
};

var SideNav = function () {
	function SideNav(opts) {
		_classCallCheck(this, SideNav);

		this._toggler = crEl('a', { href: 'javascript:void(0)', d: { activates: 'slide-out' } }, new Icon('menu'));
		this._list = crEl('ul', { c: 'side-nav', id: 'slide-out' });
		this.el = this._toggler;
		document.body.appendChild(this._list);
		return this;
	}

	_createClass(SideNav, [{
		key: 'init',
		value: function init() {
			var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { menuWidth: 300, closeOnClick: true };

			$(this._toggler).sideNav(opts);
		}
	}, {
		key: 'show',
		value: function show() {
			$(this._toggler).sideNav('show');
		}
	}, {
		key: 'hide',
		value: function hide() {
			$(this._toggler).sideNav('hide');
		}
	}, {
		key: 'clear',
		value: function clear() {
			this._list.innerHTML = '';
		}
	}, {
		key: 'add',
		value: function add(inner) {
			this._list.appendChild(inner);
		}
	}, {
		key: 'addItem',
		value: function addItem(inner, evclick) {
			this.add(crEl('li', crEl('a', { href: 'javascript:void(0)', e: { click: evclick }, c: 'waves-effect' }, inner)));
		}
	}, {
		key: 'addHeader',
		value: function addHeader(inner) {
			this.add(crEl('li', crEl('a', { c: 'subheader' }, inner)));
		}
	}, {
		key: 'addDivider',
		value: function addDivider() {
			this.add(crEl('li', crEl('div', { c: 'divider' })));
		}
	}]);

	return SideNav;
}();

var sideNav = new SideNav();

function Navbar() {
	return crEl('div', { c: 'navbar-fixed' }, crEl('nav', crEl('div', { c: 'nav-wrapper' }, crEl('a', { href: 'javascript:void(0)', c: 'brand-logo' }, sideNav.el, app.title))));
}

sideNav.addHeader('Ololo');
sideNav.addItem('link1', function () {
	alert(1);
});
sideNav.addItem('Link2', function () {
	alert(2);
});
sideNav.init();

app.setTitle('Привет');
document.getElementById("main").innerHTML = "";
document.getElementById("main").appendChild(app.menu);
document.getElementById("main").appendChild(new Navbar());