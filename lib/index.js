/**
 * @fileoverview Basic presets for eslint
 * @author dvcol
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require('requireindex');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + '/rules');

// import configs
module.exports.configs = requireIndex(__dirname + '/configs');
