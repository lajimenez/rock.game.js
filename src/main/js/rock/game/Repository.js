rock.namespace('rock.game');

/**
 * Repository to store game resources and be easily accessed.
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.game.Repository = function () {
    this.JSONModels = {};
    this.models = {};
    this.textureImages = {};
    this.adapters = {};
    this.audios = {};
};

rock.game.Repository.prototype.addJSONModel = function (id, JSONModel) {
    this.JSONModels[id] = JSONModel;
};

rock.game.Repository.prototype.getJSONModel = function (id) {
    return this.getElement([id], this.JSONModels);
};

rock.game.Repository.prototype.addModel = function (id, model) {
    this.models[id] = model;
};

rock.game.Repository.prototype.getModel = function (id) {
    return this.getElement([id], this.models);
};

rock.game.Repository.prototype.addTextureImage = function (id, textureImage) {
    this.textureImages[id] = textureImage;
};

rock.game.Repository.prototype.getTextureImage = function (id) {
    return this.getElement([id], this.textureImages);
};

rock.game.Repository.prototype.addAdapter = function (id, adapter) {
    this.adapters[id] = adapter;
};

rock.game.Repository.prototype.getAdapter = function (id) {
    return this.getElement([id], this.adapters);
};

rock.game.Repository.prototype.getElement = function (id, elements) {
    var element = elements[id];
    if (rock.util.JsUtils.isNullOrUndefined(element)) {
        return null;
    } else {
        return element;
    }
};

rock.game.Repository.prototype.addAudio = function (id, audio) {
    this.audios[id] = audio;
};

rock.game.Repository.prototype.getAudio = function (id) {
    return this.getElement([id], this.audios);
};