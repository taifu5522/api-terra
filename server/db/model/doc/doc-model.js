
'use strict';

let mongoose = require('mongoose');
let schemas = require('../../schema/schemas');
let docModel = mongoose.model('doc', schemas.docSchema);

module.exports = docModel;
