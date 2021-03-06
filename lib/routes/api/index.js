/**
 * Api routes
 * @module
 */

const Config = require('config');
const Version = require('routes/api/version');
const Login = require('modules/authorization/routes/api/login');
const Profile = require('modules/authorization/routes/api/profile');
const Contacts = require('modules/authorization/routes/api/contacts');
const Register = require('modules/authorization/routes/api/register');
const User = require('modules/authorization/routes/api/user');
const Role = require('modules/authorization/routes/api/role');
const Resource = require('modules/authorization/routes/api/resource');

exports.endpoints = [
    { method: 'GET', path: '/version', config: Version.get },

    { method: 'POST', path: Config.prefixes.login, config: Login.login },
    { method: 'GET', path: Config.prefixes.logout, config: Login.logout },
    { method: 'GET', path: Config.prefixes.renew, config: Login.renew },

    { method: 'POST', path: Config.prefixes.signup, config: Contacts.signup },
    { method: 'POST', path: Config.prefixes.register, config: Register.register },
    { method: 'POST', path: Config.prefixes.passwordReset, config: Login.passwordReset },
    { method: 'POST', path: Config.prefixes.passwordUpdate, config: Login.passwordUpdate },

    { method: 'GET', path: '/profile', config: Profile.get },
    { method: 'PUT', path: '/profile', config: Profile.update },

    { method: 'GET', path: '/user', config: User.list },
    { method: 'GET', path: '/user/{id}', config: User.get },
    { method: 'POST', path: '/user', config: User.create },
    { method: 'PUT', path: '/user/{id}', config: User.update },
    { method: 'DELETE', path: '/user/{id}', config: User.delete },

    { method: 'GET', path: '/role', config: Role.list },
    { method: 'GET', path: '/resource', config: Resource.list },
    { method: 'GET', path: '/permission', config: Role.listPermissions },
    { method: 'GET', path: '/role/{id}', config: Role.get },
    { method: 'POST', path: '/role', config: Role.create },
    { method: 'PUT', path: '/role/{id}', config: Role.update },
    { method: 'DELETE', path: '/role/{id}', config: Role.delete },
    { method: 'PUT', path: '/role/{id}/users', config: Role.addUsers },
    { method: 'DELETE', path: '/role/{id}/users', config: Role.removeUsers },
    { method: 'POST', path: '/role/{id}/permissions', config: Role.addPermission },
    { method: 'PUT', path: '/role/{id}/permissions', config: Role.updatePermissions },

    { method: 'GET', path: '/contact', config: Contacts.list },
    { method: 'GET', path: '/contact/{id}', config: Contacts.get },
    { method: 'DELETE', path: '/contact/{id}', config: Contacts.delete }
];
