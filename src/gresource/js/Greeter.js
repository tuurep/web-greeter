/*
 * LightDMGreeter.js
 *
 * Copyright © 2016 Antergos Developers <dev@antergos.com>
 *
 * This file is part of lightdm-webkit2-greeter.
 *
 * lightdm-webkit2-greeter is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * lightdm-webkit2-greeter is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * The following additional terms are in effect as per Section 7 of the license:
 *
 * The preservation of all legal notices and author attributions in
 * the material or in the Appropriate Legal Notices displayed
 * by works containing it is required.
 *
 * You should have received a copy of the GNU General Public License
 * along with lightdm-webkit2-greeter; If not, see <http://www.gnu.org/licenses/>.
 */


/**
 * Base class for the greeter's Theme JavaScript API. Greeter themes will interact
 * directly with an object derived from this class to facilitate the user log-in process.
 * The greeter will automatically create an instance when it starts.
 * The instance can be accessed using the global variable: [`lightdm`](#dl-window-lightdm).
 *
 * @memberOf LightDM
 */
class Greeter {

	constructor() {
		if ( 'lightdm' in window ) {
			return window.lightdm;
		}

		window.lightdm = GreeterUtils.bind_this( this );

		return window.lightdm;
	}

	/**
	 * The username of the user being authenticated or {@link null}
	 * if there is no authentication in progress.
	 * @type {string|null}
	 * @readonly
	 */
	get authentication_user() {}

	/**
	 * Whether or not the guest account should be automatically logged
	 * into when the timer expires.
	 * @type {boolean}
	 * @readonly
	 */
	get autologin_guest() {}

	/**
	 * The number of seconds to wait before automatically logging in.
	 * @type {number}
	 * @readonly
	 */
	get autologin_timeout() {}

	/**
	 * The username with which to automatically log in when the timer expires.
	 * @type {string}
	 * @readonly
	 */
	get autologin_user() {}

	/**
	 * Whether or not the greeter can make the system hibernate.
	 * @type {boolean}
	 * @readonly
	 */
	get can_hibernate() {}

	/**
	 * Whether or not the greeter can make the system restart.
	 * @type {boolean}
	 * @readonly
	 */
	get can_restart() {}

	/**
	 * Whether or not the greeter can make the system shutdown.
	 * @type {boolean}
	 * @readonly
	 */
	get can_shutdown() {}

	/**
	 * Whether or not the greeter can make the system suspend/sleep.
	 * @type {boolean}
	 * @readonly
	 */
	get can_suspend() {}

	/**
	 * The name of the default session.
	 * @type {string}
	 * @readonly
	 */
	get default_session() {}

	/**
	 * Whether or not guest sessions are supported.
	 * @type {boolean}
	 * @readonly
	 */
	get has_guest_account() {}

	/**
	 * Whether or not user accounts should be hidden.
	 * @type {boolean}
	 * @readonly
	 */
	get hide_users() {}

	/**
	 * The system's hostname.
	 * @type {string}
	 * @readonly
	 */
	get hostname() {}

	/**
	 * Whether or not the greeter is in the process of authenticating.
	 * @type {boolean}
	 * @readonly
	 */
	get in_authentication() {}

	/**
	 * Whether or not the greeter has successfully authenticated.
	 * @type {boolean}
	 * @readonly
	 */
	get is_authenticated() {}

	/**
	 * The current language or {@link null} if no language.
	 * @type {LightDM.Language|null}
	 * @readonly
	 */
	get language() {}

	/**
	 * A list of languages to present to the user.
	 * @type {LightDM.Language[]}
	 * @readonly
	 */
	get languages() {}

	/**
	 * The currently active layout for the selected user.
	 * @type {LightDM.Layout}
	 */
	get layout() {}

	/**
	 * Set the active layout for the selected user.
	 * @param {LightDM.Layout} value
	 */
	set layout( value ) {}

	/**
	 * A list of keyboard layouts to present to the user.
	 * @type {LightDM.Layout[]}
	 * @readonly
	 */
	get layouts() {}

	/**
	 * Whether or not the greeter was started as a lock screen.
	 * @type {boolean}
	 * @readonly
	 */
	get lock_hint() {}

	/**
	 * The number of users able to log in.
	 * @type {number}
	 * @readonly
	 */
	get num_users() {
		return this.users.length;
	}

	/**
	 * Whether or not the guest account should be selected by default.
	 * @type {boolean}
	 * @readonly
	 */
	get select_guest_hint() {}

	/**
	 * The username to select by default.
	 * @type {string}
	 * @readonly
	 */
	get select_user_hint() {}

	/**
	 * List of available sessions.
	 * @type {LightDM.Session[]}
	 * @readonly
	 */
	get sessions() {}

	/**
	 * List of available users.
	 * @type {LightDM.User[]}
	 * @readonly
	 */
	get users() {}


	/**
	 * Starts the authentication procedure for a user.
	 *
	 * @arg {String|null} username A username or {@link null} to prompt for a username.
	 */
	authenticate( username = null ) {}

	/**
	 * Starts the authentication procedure for the guest user.
	 */
	authenticate_as_guest() {}

	/**
	 * Cancel the user authentication that is currently in progress.
	 */
	cancel_authentication() {}

	/**
	 * Cancel the automatic login.
	 */
	cancel_autologin() {}

	/**
	 * Get the value of a hint.
	 * @arg {string} name The name of the hint to get.
	 * @returns {string|boolean|number|null}
	 */
	get_hint( name ) {}

	/**
	 * Triggers the system to hibernate.
	 * @returns {boolean} {@link true} if hibernation initiated, otherwise {@link false}
	 */
	hibernate() {
		return this._do_mocked_system_action('hibernate');
	}

	/**
	 * Provide a response to a prompt.
	 * @arg {*} response
	 */
	respond( response ) {}

	/**
	 * Triggers the system to restart.
	 * @returns {boolean} {@link true} if restart initiated, otherwise {@link false}
	 */
	restart() {}

	/**
	 * Set the language for the currently authenticated user.
	 * @arg {string} language The language in the form of a locale specification (e.g. 'de_DE.UTF-8')
	 * @returns {boolean} {@link true} if successful, otherwise {@link false}
	 */
	set_language( language ) {}

	/**
	 * Triggers the system to shutdown.
	 * @returns {boolean} {@link true} if shutdown initiated, otherwise {@link false}
	 */
	shutdown() {}

	/**
	 * Start a session for the authenticated user.
	 * @arg {String|null} session The session to log into or {@link null} to use the default.
	 * @returns {boolean} {@link true} if successful, otherwise {@link false}
	 */
	start_session( session ) {}

	/**
	 * Triggers the system to suspend/sleep.
	 * @returns {boolean} {@link true} if suspend/sleep initiated, otherwise {@link false}
	 */
	suspend() {}

}


const __lightdm = new Promise( (resolve, reject) => {
	let waiting = 0;

	const check_window_prop = () => {
		if ( waiting > 15000 ) {
			return reject( 'Timeout Reached!');
		}

		setTimeout( () => {
			waiting += 1;

			if ( '__LightDMGreeter' in window ) {
				return resolve( window.__LightDMGreeter );
			}

			check_window_prop();
		}, 0 );
	};

	check_window_prop();
});


/**
 * Greeter Instance
 * @name lightdm
 * @type {LightDM.Greeter}
 * @memberOf window
 */
__lightdm.then( result => {
	result.start_authentication = function( user ) { return this.authenticate( user ); };
	result.start_authentication = result.start_authentication.bind(result);
	window.lightdm = result
} );


/**
 * Moment.js instance - Loaded and instantiated automatically by the greeter.
 * @name moment
 * @type {object}
 * @version 2.17.0
 * @memberOf window
 * @see [Moment.js Documentation](http://momentjs.com/docs)
 */

/**
 * jQuery instance - Themes must manually load the included vendor script in order to use this object.
 * @name jQuery
 * @type {object}
 * @version 3.1.1
 * @memberOf window
 * @see [jQuery Documentation](http://api.jquery.com)
 */

/**
 * @name $
 * @memberOf window
 * @see {@link window.jQuery}
 */

/**
 * JS-Cookie instance - Themes must manually load the included vendor script in order to use this object.
 * @name Cookies
 * @type {object}
 * @version 2.1.3
 * @memberOf window
 * @see [JS Cookie Documentation](https://github.com/js-cookie/js-cookie/tree/latest#readme)
 */


