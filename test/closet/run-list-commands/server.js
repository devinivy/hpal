'use strict';

const { Hapi } = require('../../run-util');

exports.deployment = async () => {

    const server = Hapi.server();

    const registerX = (srv, options) => {

        srv.expose('commands', {
            default: () => null,
            camelCased: () => null,
            described: {
                description: 'This is what I do',
                command: () => null
            },
            describedFn: {
                description: (ctx) => JSON.stringify({ ctx: Object.keys(ctx).sort() }),
                command: () => null
            }
        });
    };

    const pluginX = {
        name: 'x',
        register: registerX
    };

    // hpal-prefixed plugin name

    const registerY = (srv, options) => {

        srv.expose('commands', {
            default: () => null,
            camelCased: () => null,
            described: {
                description: 'This is what I do',
                command: () => null
            },
            describedFn: {
                description: (ctx) => JSON.stringify({ ctx: Object.keys(ctx).sort() }),
                command: () => null
            }
        });
    };

    const pluginY = {
        name: 'hpal-y',
        register: registerY
    };

    // Exposes something but no commands

    const registerZ = (srv, options) => {

        srv.expose('irrelevant', null);
    };

    const pluginZ = {
        name: 'z',
        register: registerZ
    };

    await server.register([pluginX, pluginY, pluginZ]);

    return server;
};
