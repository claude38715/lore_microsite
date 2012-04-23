buildr = require 'buildr'
config = 
    srcPath: 'src'
    scriptsOrder: [
        'jquery-1.7.2.min.js'
        'jquery.scrollTo-1.4.2-min.js'
        'underscore.js'
        'modernizr.js'
        'jquery.mousewheel.js'
        'animation.coffee'
    ]
    stylesOrder: [
        'microsite.sass'
    ]
    bundleScriptPath: 'compiled/microsite.js'
    bundleStylePath: 'compiled/microsite.css'
myBuildr = buildr.createInstance(config)
myBuildr.process (err) ->
    throw err if err
    console.log 'Building completed'