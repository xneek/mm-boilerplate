'use strict';

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
	menuToggler: crEl('a', { href: 'javascript:void(0)', d: { activities: 'slide-out' } }, new Icon('menu')),
	menu: crEl('ul', { c: 'side-nav', id: 'slide-out' }),
	setTitle: function setTitle(title) {
		document.title = title;
		app.title.innerHTML = null;
		app.title.appendChild(document.createTextNode(title));
	}
};
(function () {
	function Navbar() {
		return crEl('nav', crEl('div', { c: 'nav-wrapper' }, crEl('a', { href: 'javascript:void(0)', c: 'brand-logo' }, app.menuToggler, app.title)));
	}

	app.menu.appendChild(crEl('li', crEl('a', { href: 'javascript:void(0)' }, 'Захватить мир')));
	app.menu.appendChild(crEl('li', crEl('a', { href: 'javascript:void(0)' }, 'Уйти спать')));

	$(app.menuToggler).sideNav({
		menuWidth: 300, // Default is 240
		edge: 'right', // Choose the horizontal origin
		closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
	});
	app.setTitle('Привет');
	document.getElementById("main").innerHTML = "";
	document.getElementById("main").appendChild(app.menu);
	document.getElementById("main").appendChild(new Navbar());
})();