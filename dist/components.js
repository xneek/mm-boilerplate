'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** 
*  Работа с компонентами
@class com 
*/

var Components = function () {
	function Components() {
		_classCallCheck(this, Components);

		this._list = {};
		return this;
	}

	_createClass(Components, [{
		key: 'define',
		value: function define(name, opts) {
			this._list[name] = opts;
		}
	}, {
		key: 'use',
		value: function (_use) {
			function use(_x, _x2) {
				return _use.apply(this, arguments);
			}

			use.toString = function () {
				return _use.toString();
			};

			return use;
		}(function (name, callback) {
			function loadDep(depNames, loadedCallback) {
				if (!depNames || depNames.length === 0) {
					if (typeof loadedCallback === 'function') {
						loadedCallback();
					}
					return false;
				}
				function loadOneDep(depss, index, cb1) {
					if (!depss) {
						cb1();
					}
					use(depss[index], function () {
						if (depss[index + 1]) {
							loadOneDep(depss, index + 1, cb1);
						} else {
							cb1();
						}
					});
				}
				loadOneDep(depNames, 0, loadedCallback);
			}
		})
	}, {
		key: 'list',
		get: function get() {
			return this._list;
		}
	}]);

	return Components;
}();

var com = {

	/**
 *  Список подключенных копонентов
 * @property com.list
 * @type {Object}
 */

	list: {},

	/**
 * Подключение компонента для дальнейшего использования
 * @method com.use
 * @param {String} name  'Имя компонента'
 * @param {callback} [callback] Лучше использовать promise
 * @return  {Promise} когда все файлы подключены
 * @example
 com.use('SideNav')
 .then(function(){
 	// ready fot use
 })
 */
	use: function use(name, callback) {

		return new Promise(function (good, bad) {
			function functionExist(s) {
				var f = s.split('.');
				var buf = window;
				for (i = 0; i < f.length; i++) {
					if (typeof buf[f[i]] === 'undefined') {
						return void 0;
					}
					buf = buf[f[i]];
				}
				return buf;
			}

			var loadDependencies = function loadDependencies(dependArr, cbld) {

				if (!dependArr || dependArr.length === 0) {
					cbld();return false;
				}
				console.log('Зависимости', dependArr);
				var loadOneDep = function loadOneDep(depss, index, cb1) {
					if (!depss) {
						cb1();
					}
					com.use(depss[index], function () {
						if (depss[index + 1]) {
							console.log("Next Dep", depss[index + 1]);
							loadOneDep(depss, index + 1, cb1);
						} else {
							cb1();
						}
					});
				};

				loadOneDep(dependArr, 0, cbld);
			};

			if (typeof com.list[name] === 'undefined') {
				console.log("Module -s is not defined", name);return false;
			}
			if (typeof com.list[name].beforeLoad === 'function') {
				com.list[name].beforeLoad(func);
			}
			var func = functionExist(com.list[name].func);
			if (typeof func != 'undefined') {
				if (typeof callback === 'function') {
					callback(func);
				}
				good.call(func);
			}

			if (com.list[name].folder && com.list[name].folder.length) {
				console.log("Module in folder", app.modules.list[name].folder);
				for (i = 0; i < app.modules.list[name].files.length; i++) {
					app.modules.list[name].files[i] = app.modules.list[name].folder + app.modules.list[name].files[i];
				}
				app.modules.list[name].folder = null;
			}

			loadDependencies(app.modules.list[name].depend || [], function () {
				console.time('LoadModule_' + name);

				app.include(app.modules.list[name].files, function () {
					console.timeEnd('LoadModule_' + name);
					var func = functionExist(app.modules.list[name].func);
					if (typeof app.modules.list[name].afterLoad === 'function') {
						app.modules.list[name].afterLoad();
					}
					if (typeof callback === 'function') {
						callback(func);
					}
					good.call(func);
				});
			});
		});
	},

	showDocs: function showDocs(name) {
		if (typeof app.modules.list[name] === 'undefined') {
			console.log("Module -s is not defined", name);return false;
		}
		if (typeof app.modules.list[name].docs != 'undefined' && app.modules.list[name].docs.length) {
			console.log('url', app.modules.list[name].docs);
			var win = window.open(app.modules.list[name].docs, '_blank');
			win.focus();
		}
	},

	/**
 * Определение модуля
 * @method app.modules.define
 * @param {String} name  Полное имя модуля
 * @param {Object} params Параметры модуля
 * @param {String} 	params.func !Важно! Строковое представление имени функции или свойства существование которой проверяется при инициализации модуля.
 * @param {Array} 	params.files Полный путь к фалым которые необходимы для работы модуля. Либо сокрашенный путь если указан аргумент params.folder
 * @param {String} 	[params.folder] Папка в которой производится поиск файлов params.files
 * @param {String} [docs] Ссылка на документацию по модулю или плагину
 * @example
 app.modules.define('toastr',{
 	folder:'assets/lib/toastr/',
 	files:['toastr.js', 'toastr.css'],
 	func: 'toastr'
 })
 */
	define: function define(name, params) {
		if (typeof app.modules.list[name] != 'undefined') {
			console.log("Module already exists", name);return false;
		}
		app.modules.list[name] = params;
	}
};

/* VENDORS */

app.modules.define('toastr', {
	desc: 'Всплывающие сообщения',
	folder: 'assets/lib/toastr/',
	files: ['toastr.js', 'toastr.css'],
	func: 'toastr',
	docs: 'https://github.com/CodeSeven/toastr'
});

app.modules.define('select2', {
	afterLoad: function afterLoad() {
		$.fn.select2.defaults.set("language", "ru");
	},
	desc: 'Замена стандартному выпадающему списку (с поиском и другими фишками)',
	folder: "assets/lib/select2/dist/",
	files: ['js/select2.full.js', 'css/select2.css'],
	func: '$.fn.select2',
	docs: 'https://select2.github.io/'
});

app.modules.define('eWysiwyg', {
	desc: 'Примитивнейший визуальный редактор для текста',
	files: ['assets/lib/eWysiwyg/eWysiwyg.js'],
	func: 'EWysiwyg'
});

app.modules.define('autocomplete', {
	desc: 'Подсказки при вводе текста в поле',
	folder: 'assets/lib/EasyAutocomplete/dist/',
	files: ['jquery.easy-autocomplete.js', 'easy-autocomplete.css'],
	func: '$.fn.easyAutocomplete',
	docs: 'http://easyautocomplete.com/guide'
});

app.modules.define('datepicker', {
	afterLoad: function afterLoad() {
		$.extend($.fn.datepicker.defaults, {
			language: 'ru',
			autoclose: true,
			todayHighlight: true
		});
	},
	desc: 'Выбор даты в выпадающем календаре',
	folder: 'assets/lib/bootstrap-datepicker/dist/',
	files: ['css/bootstrap-datepicker.css', 'js/bootstrap-datepicker.min.js', 'locales/bootstrap-datepicker.ru.min.js'],
	func: '$.fn.datepicker',
	docs: 'http://bootstrap-datepicker.readthedocs.org/en/stable/'
});

app.modules.define('moment', {
	afterLoad: function afterLoad() {
		moment.locale('ru');
	},
	desc: 'дата/время',
	folder: 'assets/lib/moment/',
	files: ['moment.js', 'locale/ru.js'],
	func: 'moment',
	docs: 'http://momentjs.com/docs/'
});

app.modules.define('daterangepicker', {
	depend: ['moment'],
	afterLoad: function afterLoad() {

		$.extend({}, $.fn.daterangepicker.defaults, { locale: {

				format: 'DD.MM.YYYY',
				separator: ' - ',
				applyLabel: 'Применить',
				cancelLabel: 'Отмена',
				weekLabel: 'W',
				customRangeLabel: 'Диапазон дат'

			} });
		$.extend({}, $.fn.daterangepicker.defaults, { singleDatePicker: true, showDropdowns: true });
	},
	desc: 'Выбор диапазона дат или даты',
	folder: 'assets/lib/bootstrap-daterangepicker/',
	files: ['daterangepicker.js', 'daterangepicker.css'],
	func: '$.fn.daterangepicker',
	docs: 'http://www.daterangepicker.com/'
});

app.modules.define('chosen', {
	afterLoad: function afterLoad() {
		$.extend({}, $.fn.chosen.defaults, {
			no_results_text: "Ничего не найдено!",
			placeholder_text_multiple: 'Выберите значения',
			placeholder_text_single: 'Выбрать',
			max_shown_results: 5
		});
	},
	desc: 'Замена стандарным селектам',
	folder: 'assets/lib/chosen/',
	files: ['chosen.css', 'chosen.jquery.js'],
	func: '$.fn.chosen',
	docs: 'https://harvesthq.github.io/chosen/'
});

app.modules.define('navigo', {
	desc: 'Роутер Navigo',
	files: ['assets/lib/navigo/lib/navigo.min.js'],
	func: 'Navigo',
	docs: 'https://github.com/krasimir/navigo'
});

/*





 */