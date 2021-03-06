/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const express = require('express');
const path = require('path');
const playgroundAPI = require('composer-playground-api');

/**
 * Create an Express.js application that hosts all of the Composer
 * Playground components.
 * @param {number} port The port for the Express.js application.
 * @param {testMode} testMode Is the api started in test mode
 * @param {Object} [config] The configuration.
 * @return {Object} The Express.js application.
 */
function createServer (port, testMode, config) {

    // Create the playground API server.
    const app = playgroundAPI(port, testMode);

    // Parse and load the configuration, if any specified.
    if (config) {
        app.get('/config.json', (req, res, next) => {
            res.json(config);
        });
    }
    
    const dist = path.resolve(__dirname, 'dist');
    app.use(express.static(dist));
    app.all('/*', (req, res, next) => {
        res.sendFile('index.html', { root: dist });
    });

    return app;
}

module.exports = createServer;