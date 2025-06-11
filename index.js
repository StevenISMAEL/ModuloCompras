const express = require('express');
const { default: serverlessExpress } = require('@codegenie/serverless-express');
const app = require('../src/app'); // Reutilizamos todo tu código

module.exports = serverlessExpress({ app });