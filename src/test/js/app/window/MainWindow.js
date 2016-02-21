rock.namespace('app.window');

/**
 * Start window for test application
 *
 * @constructor
 * @extends rock.window.Window
 *
 * @author Luis Alberto Jiménez
 */
app.window.MainWindow = function (windowSystem) {
    rock.super_(this, arguments);
    this.addComponents();
};

rock.extends_(app.window.MainWindow, rock.window.Window);

app.window.MainWindow.prototype.addComponents = function () {
    // Title (HTML Label)
    var htmlTitleLabelColor = new rock.graphics.Color(0, 0, 255);
    var htmlTitleLabelFont = new rock.graphics.Font('Arial', 18);
    var htmlTitleLabel = new rock.window.component.html.HTMLLabel(this, 'TITLE', true,
        htmlTitleLabelFont, htmlTitleLabelColor);
    htmlTitleLabel.id = 'htmlTitleLabel';
    htmlTitleLabel.setX(200);
    htmlTitleLabel.setY(65);
    this.addComponent(htmlTitleLabel);

    // Add buttons
    var showModelButton = new rock.window.component.Button(this, 'SHOW_MODEL_BUTTON', true);
    showModelButton.setId('showModelButton');
    showModelButton.setX(200);
    showModelButton.setY(100);
    showModelButton.setWidth(200);
    showModelButton.setHeight(30);
    showModelButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnShowModelButtonClick));
    this.addComponent(showModelButton);

    var showSceneButton = new rock.window.component.Button(this, 'SHOW_SCENE_BUTTON', true);
    showSceneButton.setId('showSceneButton');
    showSceneButton.setX(200);
    showSceneButton.setY(150);
    showSceneButton.setWidth(200);
    showSceneButton.setHeight(30);
    showSceneButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnShowSceneButtonClick));
    this.addComponent(showSceneButton);

    var executeGeometryTestButton = new rock.window.component.Button(this, 'EXECUTE_GEOMETRY_TEST_BUTTON', true);
    executeGeometryTestButton.setId('executeGeometryTestButton');
    executeGeometryTestButton.setX(200);
    executeGeometryTestButton.setY(300);
    executeGeometryTestButton.setWidth(200);
    executeGeometryTestButton.setHeight(30);
    executeGeometryTestButton.addEventListener(rock.constants.ROCK_EVENT_CLICK,
        rock.createEventHandler(this, this.handleOnExecuteGeometryTestButtonClick));
    //this.addComponent(executeGeometryTestButton);

};

app.window.MainWindow.prototype.handleOnShowModelButtonClick = function (event) {
    this.displayShowModelDiv();

    var showModelWindow = this.windowSystem.getWindow(app.constants.SHOW_MODEL_WINDOW);

    var jsonModel = this.application.getRepository().getJSONModel(app.constants.RES_ID_MODEL_TEAPOT);
    showModelWindow.loadAndShowMaterialModel(jsonModel);

    //var jsonModel = this.application.getRepository().getJSONModel(app.constants.RES_ID_MODEL_STORMTROOPER);
    //showModelWindow.loadAndShowMaterialTextureModel(jsonModel);

    //var jsonModel = this.application.getRepository().getJSONModel(app.constants.RES_ID_MODEL_SKYDOME);
    //showModelWindow.loadAndShowTextureModel(jsonModel);

    this.windowSystem.setCurrentWindow(showModelWindow);
};

app.window.MainWindow.prototype.displayShowModelDiv = function () {
    var divShowModelControlsInfo = rock.util.DOMUtils.getElementById('divShowModelControlsInfo');
    divShowModelControlsInfo.style.display = 'block';
};

app.window.MainWindow.prototype.handleOnShowSceneButtonClick = function (event) {
    this.displayShowSceneDiv();

    var showSceneWindow = this.windowSystem.getWindow(app.constants.SHOW_SCENE_WINDOW);
    showSceneWindow.loadScene();
    this.windowSystem.setCurrentWindow(showSceneWindow);
};

app.window.MainWindow.prototype.displayShowSceneDiv = function () {
    var divControls = rock.util.DOMUtils.getElementById('divShowSceneControls');
    divControls.style.display = 'block';
};

app.window.MainWindow.prototype.handleOnExecuteGeometryTestButtonClick = function (event) {
    var testRunner = new rock.test.TestRunner();
    var geometryTest = new app.test.GeometryTest();
    var result = testRunner.runTestSuite(geometryTest);
    alert(result.toString());
};