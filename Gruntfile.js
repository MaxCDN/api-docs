var exec = require('child_process').exec

module.exports = function(grunt){
  var log = function (msg) {
        grunt.log.writeln(msg)
      }
    , dirExec = function (cmd, cb) {
        exec(cmd, {
          cwd: grunt.config('dir')
        }, cb)
      }

  grunt.initConfig({
      dir: './_deploy'
    , gitUrl: 'git@github.com:MaxCDN/api-docs.git'
  })

  grunt.registerTask('setup', 'Setup deploy directory and initiate git repository', function () {
    var config = grunt.config
      , _done = this.async()
      , done = function (err) {
          if (err) grunt.log.error(err.message)
          _done(err ? false : true)
        }
      , mkdirp = require('mkdirp')

    log('Creating ' + config('dir') + ' folder')
    mkdirp(config('dir'), madeDir)

    function madeDir(err) {
      if (err) return done(err)

      log('Initiating git repo')
      dirExec('git init', gitInit)
    }

    function gitInit(err) {
      if (err) return done(err)

      log('Adding github to remotes as origin')
      dirExec('git remote add origin ' + config('gitUrl'), setRemote)
    }

    function setRemote(err) {
      if (err && !/exists/.test(err.message)) return done(err.message)

      log('Setting master branch remote')
      dirExec('git config branch.master.remote master', setMasterBranch)
    }

    function setMasterBranch(err) {
      if (err) return done(err)

      log('Setting master branch merge')
      dirExec('git config branch.master.merge refs/heads/master', done)
    }
  })

  grunt.registerTask('deploy', 'Deploy content to github', function () {
    var config = grunt.config
      , _done = this.async()
      , done = function (err) {
          if (err) grunt.log.error(err.message)
          _done(err ? false : true)
        }

    this.requires('setup')

    log('Resetting repo')
    dirExec('git fetch --all && git reset --hard origin/master', resetRepo)

    function resetRepo(err) {
      if (err) return done(err)

      log('Building site')
      exec('node_modules/.bin/wintersmith build -o ' + config('dir'), builtDeploy)
    }

    function builtDeploy(err) {
      if (err) return done(err)

      log('Adding all files from ' + config('dir'))
      dirExec('git add .', addedFiles)
    }

    function addedFiles(err) {
      if (err) return done(err)

      log('Getting last commit from source branch')
      exec('git log -1 HEAD --pretty=format:%s', gotLastCommit)
    }

    function gotLastCommit(err, stdout) {
      if (err) return done(err)

      if (process.env.NODE_ENV === 'travis-ci') {
        log('Add email/name to git config if deploying from travis ci')
        dirExec('git config user.email "travis-ci@startupsupper.com" && git config user.name "Travis CI Bot"', makeCommit.bind(null, stdout))
      } else {
        makeCommit(stdout)
      }
    }

    function makeCommit(commit, err) {
      if (err) return done(err)

      log('Make commit of changes with last commit msg from source branch')
      dirExec('git commit -am "' + commit + ' [ci skip]"', madeCommit)
    }

    function madeCommit(err, stdout) {
      if (err) {
        if (/nothing\ to\ commit/.test(stdout)) {
          log('No changes so nothing to push')
          err = null
        }
        return done(err)
      }

      log('Push changes to github')
      dirExec('git push origin master', done)
    }
  })

  grunt.registerTask('default', ['setup', 'deploy'])
}
