/**
 * Documentation plugin, works as a wrapper around lout
 * @module
 */
const Lout = require('lout');
const Inert = require('inert');
const Vision = require('vision');
const Package = require('package.json');
const Config = require('config');

/**
 * Plugin registration function
 * @async
 * @param {Hapi.Server} server the hapi server
 */
const register = async function(server) {
    if (Config.environment === 'production') {
        return;
    }

    await server.register([
        Inert,
        Vision,
        {
            plugin: Lout,
            options: {
                apiVersion: Package.version
            }
        }
    ]);

    server
        .logger()
        .child({ plugin: exports.plugin.name })
        .debug('started');
};

exports.plugin = {
    name: 'docs',
    pkg: Package,
    register
};
