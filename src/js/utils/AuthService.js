/*global localStorage*/
/* ===== ./src/utils/AuthService.js ===== */
import Auth0Lock from 'auth0-lock'
import {browserHistory} from 'react-router';

export default class AuthService {
  constructor(clientId, domain, options) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, options)
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // this.lock.on('authorization_error', this._authorizationError.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult){
    // Saves the user token
    this.setToken(authResult.idToken)
    browserHistory.push(localStorage.getItem('last_url'));
    localStorage.removeItem('last_url');
    // Async loads the user profile data
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error);
      } else {
        this.setProfile(profile);
      }
    });
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    return this.getToken();
  }

  setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }
  // setProfile(profile){
  //   // Saves profile data to localStorage
  //   localStorage.setItem('profile', JSON.stringify(profile))
  //   // Triggers profile_updated event to update the UI
  //   this.emit('profile_updated', profile)
  // }

  // getProfile(){
  //   // Retrieves the profile data from localStorage
  //   const profile = localStorage.getItem('profile')
  //   return profile ? JSON.parse(localStorage.profile) : {}
  // }
  logout(){
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }
  
}