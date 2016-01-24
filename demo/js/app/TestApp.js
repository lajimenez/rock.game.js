rock.namespace('app');

/**
 * Test application
 *
 * @constructor
 * @extends rock.game.Game
 *
 * @author Luis Alberto Jiménez
 */
app.TestApp = function (idDiv, urlResources) {
    var initParams = new rock.app.InitApplicationParams(idDiv, 600, 500, rock.constants.CONTEXT_WEBGL, urlResources);
    rock.super_(this, [initParams]);
};

rock.extends_(app.TestApp, rock.game.Game);

/**
 * @override
 * @see rock.app.Application#start
 */
app.TestApp.prototype.start = function () {
    this.initResources();
};

app.TestApp.prototype.initResources = function () {
    this.resourceManager.loadStrings(app.test.i18n.en);

    var resourceLoaderWindow = new rock.window.ResourceLoaderWindow(this.windowSystem);
    this.windowSystem.registerWindow(app.constants.RESOURCE_LOADER_WINDOW, resourceLoaderWindow);

    this.windowSystem.setCurrentWindow(resourceLoaderWindow);

    resourceLoaderWindow.addEventListener(
        rock.resource.event.ResourceWindowCompleteEvent.RESOURCE_WINDOW_COMPLETE,
        rock.createEventHandler(this, this.onResourceLoaderWindowComplete));

    var elemsToLoad = this.getModelsToLoad();
    resourceLoaderWindow.loadResources(elemsToLoad);
};

app.TestApp.prototype.getModelsToLoad = function () {
    var urlResources = this.urlResources;

    var elemsToLoad = [];

    // Model
    var baseModelPath = urlResources + 'model/';
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_ID_MODEL_TEAPOT,
        rock.constants.RESOURCE_TYPE_JSON,
        new rock.network.HTTPRequestParams(baseModelPath + 'teapot.json', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_ID_MODEL_TEAPOT_TITLE,
        rock.constants.RESOURCE_TYPE_JSON,
        new rock.network.HTTPRequestParams(baseModelPath + 'teapotTitle.json', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_ID_MODEL_GROUND,
        rock.constants.RESOURCE_TYPE_JSON,
        new rock.network.HTTPRequestParams(baseModelPath + 'ground.json', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_ID_MODEL_SKYDOME,
        rock.constants.RESOURCE_TYPE_JSON,
        new rock.network.HTTPRequestParams(baseModelPath + 'skydome.json', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_ID_MODEL_STARWARS_TITLE,
        rock.constants.RESOURCE_TYPE_JSON,
        new rock.network.HTTPRequestParams(baseModelPath + 'starwarsTitle.json', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_ID_MODEL_STORMTROOPER,
        rock.constants.RESOURCE_TYPE_JSON,
        new rock.network.HTTPRequestParams(baseModelPath + 'stormtrooper.json', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_ID_MODEL_C3PO,
        rock.constants.RESOURCE_TYPE_JSON,
        new rock.network.HTTPRequestParams(baseModelPath + 'C-3PO.json', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_ID_MODEL_R2D2,
        rock.constants.RESOURCE_TYPE_JSON,
        new rock.network.HTTPRequestParams(baseModelPath + 'R2-D2.json', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_ID_MODEL_DARTHSIDIOUS,
        rock.constants.RESOURCE_TYPE_JSON,
        new rock.network.HTTPRequestParams(baseModelPath + 'DarthSidious.json', null, null)));

    // Texture Images
    var baseImgPath = urlResources + 'images/';
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_TEXTURE_TITLE_TEAPOT,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'teapotTitle.png', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_TEXTURE_TITLE_STARWARS,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'starwarsTitle.png', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_TEXTURE_SKYDOME,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'skydome.png', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_TEXTURE_STORMTROOPER,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'stormtrooper.png', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_TEXTURE_STORMTROOPER_S,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'stormtrooper_S.png', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_TEXTURE_C3PO,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'C-3PO.png', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_TEXTURE_C3PO_S,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'C-3PO_S.png', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_TEXTURE_R2D2,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'R2-D2.png', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_TEXTURE_R2D2_S,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'R2-D2_S.png', null, null)));
    elemsToLoad.push(new rock.resource.loader.ResourceLoaderElement(app.constants.RES_TEXTURE_DARTHSIDIOUS,
        rock.constants.RESOURCE_TYPE_IMAGE,
        new rock.network.HTTPRequestParams(baseImgPath + 'DarthSidious.png', null, null)));

    return elemsToLoad;
};

app.TestApp.prototype.onResourceLoaderWindowComplete = function (event) {
    var resourceLoaderWindow = event.getSource();
    var resourceLoaderManager = resourceLoaderWindow.getResourceLoaderManager();

    if (resourceLoaderManager.hasErrors()) {
        throw new rock.error.RockError(this.resourceManager.getString('ERROR_LOADING_RESOURCES'));
    }

    this.loadModels(resourceLoaderManager);

    var mainWindow = new app.window.MainWindow(this.windowSystem);
    var showModelWindow = new app.window.ShowModelWindow(this.windowSystem);
    var showSceneWindow = new app.window.ShowSceneWindow(this.windowSystem);

    this.windowSystem.registerWindow(app.constants.MAIN_WINDOW, mainWindow);
    this.windowSystem.registerWindow(app.constants.SHOW_MODEL_WINDOW, showModelWindow);
    this.windowSystem.registerWindow(app.constants.SHOW_SCENE_WINDOW, showSceneWindow);

    this.windowSystem.setCurrentWindow(mainWindow);
};

app.TestApp.prototype.loadModels = function (resourceLoaderManager) {
    var repository = this.repository;

    // Model
    var jsonTeapotModel = resourceLoaderManager.getLoadedResource(app.constants.RES_ID_MODEL_TEAPOT).getValue();
    repository.addJSONModel(app.constants.RES_ID_MODEL_TEAPOT, jsonTeapotModel);
    var jsonTeapotTitleModel = resourceLoaderManager.getLoadedResource(app.constants.RES_ID_MODEL_TEAPOT_TITLE).getValue();
    repository.addJSONModel(app.constants.RES_ID_MODEL_TEAPOT_TITLE, jsonTeapotTitleModel);
    var jsonStarwarsTitleModel = resourceLoaderManager.getLoadedResource(app.constants.RES_ID_MODEL_STARWARS_TITLE).getValue();
    repository.addJSONModel(app.constants.RES_ID_MODEL_STARWARS_TITLE, jsonStarwarsTitleModel);
    var jsonGroundModel = resourceLoaderManager.getLoadedResource(app.constants.RES_ID_MODEL_GROUND).getValue();
    repository.addJSONModel(app.constants.RES_ID_MODEL_GROUND, jsonGroundModel);
    var jsonSkydomeModel = resourceLoaderManager.getLoadedResource(app.constants.RES_ID_MODEL_SKYDOME).getValue();
    repository.addJSONModel(app.constants.RES_ID_MODEL_SKYDOME, jsonSkydomeModel);
    var jsonStormtrooperModel = resourceLoaderManager.getLoadedResource(app.constants.RES_ID_MODEL_STORMTROOPER).getValue();
    repository.addJSONModel(app.constants.RES_ID_MODEL_STORMTROOPER, jsonStormtrooperModel);
    var jsonC3POModel = resourceLoaderManager.getLoadedResource(app.constants.RES_ID_MODEL_C3PO).getValue();
    repository.addJSONModel(app.constants.RES_ID_MODEL_C3PO, jsonC3POModel);
    var jsonR2D2Model = resourceLoaderManager.getLoadedResource(app.constants.RES_ID_MODEL_R2D2).getValue();
    repository.addJSONModel(app.constants.RES_ID_MODEL_R2D2, jsonR2D2Model);
    var jsonDarthSidiousModel = resourceLoaderManager.getLoadedResource(app.constants.RES_ID_MODEL_DARTHSIDIOUS).getValue();
    repository.addJSONModel(app.constants.RES_ID_MODEL_DARTHSIDIOUS, jsonDarthSidiousModel);

    // Texture Images
    repository.addTextureImage(
        app.constants.RES_TEXTURE_TITLE_TEAPOT,
        resourceLoaderManager.getLoadedResource(app.constants.RES_TEXTURE_TITLE_TEAPOT).getValue());
    repository.addTextureImage(
        app.constants.RES_TEXTURE_TITLE_STARWARS,
        resourceLoaderManager.getLoadedResource(app.constants.RES_TEXTURE_TITLE_STARWARS).getValue());
    repository.addTextureImage(
        app.constants.RES_TEXTURE_SKYDOME,
        resourceLoaderManager.getLoadedResource(app.constants.RES_TEXTURE_SKYDOME).getValue());
    repository.addTextureImage(
        app.constants.RES_TEXTURE_STORMTROOPER,
        resourceLoaderManager.getLoadedResource(app.constants.RES_TEXTURE_STORMTROOPER).getValue());
    repository.addTextureImage(
        app.constants.RES_TEXTURE_STORMTROOPER_S,
        resourceLoaderManager.getLoadedResource(app.constants.RES_TEXTURE_STORMTROOPER_S).getValue());
    repository.addTextureImage(
        app.constants.RES_TEXTURE_C3PO,
        resourceLoaderManager.getLoadedResource(app.constants.RES_TEXTURE_C3PO).getValue());
    repository.addTextureImage(
        app.constants.RES_TEXTURE_C3PO_S,
        resourceLoaderManager.getLoadedResource(app.constants.RES_TEXTURE_C3PO_S).getValue());
    repository.addTextureImage(
        app.constants.RES_TEXTURE_R2D2,
        resourceLoaderManager.getLoadedResource(app.constants.RES_TEXTURE_R2D2).getValue());
    repository.addTextureImage(
        app.constants.RES_TEXTURE_R2D2_S,
        resourceLoaderManager.getLoadedResource(app.constants.RES_TEXTURE_R2D2_S).getValue());
    repository.addTextureImage(
        app.constants.RES_TEXTURE_DARTHSIDIOUS,
        resourceLoaderManager.getLoadedResource(app.constants.RES_TEXTURE_DARTHSIDIOUS).getValue());
};