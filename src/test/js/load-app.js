// Load all scripts
function loadApp(sourcePath) {
    var scriptsToLoad = [
        'constants.js',
        'i18n/i18n.js',
        'TestApp.js',
        'test/GeometryTest.js',
        'engine/ShowModelSceneEngine.js',
        'engine/ShowSceneSceneEngine.js',
        'window/MainWindow.js',
        'window/ShowModelWindow.js',
        'window/ShowSceneWindow.js'
    ];

    var i;
    for (i = 0; i < scriptsToLoad.length; i++) {
        document.write('<script src="' + sourcePath + scriptsToLoad[i] + '"><\/script>');
    }
}