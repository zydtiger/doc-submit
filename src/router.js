const express = require('express'),
  fs = require('fs'),
  lib = require('./lib'),
  auth = require('basic-auth'),
  safeCompare = require('safe-compare'),
  sha256 = require('sha256'),
  config = require('../config'),
  path = require('path'),
  formidable = require('formidable'),
  JObject = require('./utils/json/json_object')

const router = express.Router()

router.get('/', (req, res) => authenticate(req, res, () => res.render('index.html')))

router.get('/submit', (req, res) => {
  res.render('submit.html', {
    event: req.query.event
  })
})

router.post('/upload', (req, res) => {
  const form = formidable({
    keepExtensions: true,
    uploadDir: path.resolve(config.public, req.query.event),
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      config.err(err)
      return;
    }
    JObject.add(path.resolve(config.public, 'map.json'), [files.uploadFile.newFilename, files.uploadFile.originalFilename])
    config.log(files.uploadFile.newFilename, files.uploadFile.originalFilename)
    res.render('success.html')
  });
});

router.post('/makeevent', (req, res) => {
  let nevent = req.body.event
  try {
    fs.mkdirSync(path.resolve(config.public, nevent), {
      recursive: true
    })
    res.render('success.html')
  } catch (err) {
    config.err(err);
    res.render('404.html', {
      err
    })
  }
})

router.get(/\/files.*/, (req, res) => {
  let reqPath = decodeURI(req.path)
  authenticate(req, res, () => renderEntries(res, reqPath))
})

function renderEntries(res, reqPath) {
  let dirpath = path.resolve(config.public, reqPath.slice(7))
  config.log('[Accessing]\t', dirpath)
  try {
    if (fs.lstatSync(dirpath).isDirectory()) {
      res.render('files.html', {
        reqPath: '/' + reqPath.slice(7),
        entries: lib.initEntries(reqPath, dirpath)
      })
    }
  } catch (err) {
    config.err(err)
    res.render('404.html', {
      err
    })
  }
}

function validate(name, pass) {
  return safeCompare(sha256(name), config.name) && safeCompare(sha256(pass), config.pass)
}

function authenticate(req, res, done) {
  let credentials = auth(req)

  if (!credentials || !validate(credentials.name, credentials.pass)) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="secured content"')
    res.end('Access denied')
  } else done()
}

module.exports = router