/**
 * Provides a single, consistent place for js files to get
 * relevant paths, globs, etc pertaining to the project structure.
 */

// node imports
var path = require('path')

// project root directory
var rootDir = path.join(__dirname, '..')
// configuration directory
var configDir = path.join(rootDir, 'config')
// source directory
var sourceDir = path.join(rootDir, 'src')
// build directory
var buildDir = path.join(rootDir, 'build')
// apps directory
var appsDir = path.join(sourceDir, 'apps')
// assets directory
var assetsDir = path.join(sourceDir, 'assets')
// frontend directory
var frontendDir = path.join(appsDir, 'frontend')
// templates directory
var templatesDir = path.join(frontendDir, 'templates')
// webpack configuration directory
var webpackDir = path.join(configDir, 'webpack')

// mongo db config file
var mongoConfig = path.join(configDir, 'mongo.yaml')

// export the project paths|globs object
module.exports = {
    // directories
    rootDir: rootDir,
    sourceDir: sourceDir,
    appsDir: appsDir,
    buildDir: buildDir,
    assetsDir: assetsDir,
    frontendDir: frontendDir,
    templatesDir: templatesDir,
    configDir: configDir,
    // entry points
    clientEntry: path.join(frontendDir, 'client.js'),
    serverEntry: path.join(sourceDir, 'server.js'),
    // built files
    clientBuild: path.join(buildDir, 'client.js'),
    serverBuild: path.join(buildDir, 'server.js'),
    // globs
    clientBuildGlob: path.join(buildDir, 'client', '*'),
    serverBuildGlob: path.join(buildDir, 'server', '*'),
    // configuration files
    mongoConfig: mongoConfig,
    eslintConfig: path.join(configDir, 'eslint.json'),
    karmaConfig: path.join(configDir, 'karma.js'),
    webpackBaseConfig: path.join(webpackDir, 'base.js'),
    webpackClientConfig: path.join(webpackDir, 'client.js'),
    webpackServerConfig: path.join(webpackDir, 'server.js'),
}


// end of file
