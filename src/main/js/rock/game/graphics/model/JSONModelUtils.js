rock.namespace('rock.game.graphics.model');

/**
 * Utils for creating models from JSON
 *
 * @constructor
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.model.JSONModelUtils = function () {
};

rock.game.graphics.model.JSONModelUtils.createTextureModelGroup = function (JSONModelList, repository) {
    var groupModel = new rock.game.graphics.model.GroupModel();

    var i, JSONModel;
    for (i = 0; i < JSONModelList.length; i++) {
        JSONModel = JSONModelList[i];
        groupModel.addModel(this.createTextureModel(JSONModel, repository));
    }

    return groupModel;
};

rock.game.graphics.model.JSONModelUtils.createTextureModel = function (JSONModel, repository) {
    var model = new rock.game.graphics.model.TextureModel();
    model.loadFromJSON(JSONModel, repository);
    return model;
};

rock.game.graphics.model.JSONModelUtils.createPhongModelGroup = function (JSONModelList) {
    var groupModel = new rock.game.graphics.model.GroupModel();

    var i, JSONModel;
    for (i = 0; i < JSONModelList.length; i++) {
        JSONModel = JSONModelList[i];
        groupModel.addModel(this.createPhongModel(JSONModel));
    }

    return groupModel;
};

rock.game.graphics.model.JSONModelUtils.createPhongModel = function (JSONModel) {
    var model = new rock.game.graphics.model.PhongModel();
    model.loadFromJSON(JSONModel);
    return model;
};

rock.game.graphics.model.JSONModelUtils.createPhongTextureModelGroup = function (JSONModelList, repository) {
    var groupModel = new rock.game.graphics.model.GroupModel();

    var i, JSONModel;
    for (i = 0; i < JSONModelList.length; i++) {
        JSONModel = JSONModelList[i];
        groupModel.addModel(this.createPhongTextureModel(JSONModel, repository));
    }

    return groupModel;
};

rock.game.graphics.model.JSONModelUtils.createPhongTextureModel = function (JSONModel, repository) {
    var model = new rock.game.graphics.model.PhongTextureModel();
    model.loadFromJSON(JSONModel, repository);
    return model;
};

rock.game.graphics.model.JSONModelUtils.createWireframeModelGroup = function (JSONModelList) {
    var groupModel = new rock.game.graphics.model.GroupModel();

    var i, JSONModel;
    for (i = 0; i < JSONModelList.length; i++) {
        JSONModel = JSONModelList[i];
        groupModel.addModel(rock.game.graphics.model.JSONModelUtils.createWireframeColorModel(JSONModel));
    }

    return groupModel;
};

rock.game.graphics.model.JSONModelUtils.createWireframeColorModel = function (JSONModel) {
    var mesh = new rock.game.graphics.model.mesh.Mesh();
    mesh.loadFromJSON(JSONModel.mesh);

    return rock.game.graphics.model.JSONModelUtils.createWireframeColorModelFromMesh(mesh.getAsWireframeMesh());
};

rock.game.graphics.model.JSONModelUtils.createWireframeNormalsModelGroup = function (JSONModelList) {
    var groupModel = new rock.game.graphics.model.GroupModel();

    var i, JSONModel;
    for (i = 0; i < JSONModelList.length; i++) {
        JSONModel = JSONModelList[i];
        groupModel.addModel(rock.game.graphics.model.JSONModelUtils.createWireframeNormalsColorModel(JSONModel));
    }

    return groupModel;
};

rock.game.graphics.model.JSONModelUtils.createWireframeNormalsColorModel = function (JSONModel) {
    var mesh = new rock.game.graphics.model.mesh.NormalMesh();
    mesh.loadFromJSON(JSONModel.mesh);

    return rock.game.graphics.model.JSONModelUtils.createWireframeColorModelFromMesh(mesh.getNormalsAsMesh());
};

rock.game.graphics.model.JSONModelUtils.createWireframeBBOXColorModel = function (BBOX) {
    var mesh = rock.game.graphics.model.mesh.Mesh.createMeshFromBBOX(BBOX);
    return rock.game.graphics.model.JSONModelUtils.createWireframeColorModelFromMesh(mesh);
};


rock.game.graphics.model.JSONModelUtils.createWireframeColorModelFromMesh = function (wireframeMesh) {
    var wireframeColorModel = new rock.game.graphics.model.WireframeColorModel();
    wireframeColorModel.setMesh(wireframeMesh);

    var material = new rock.game.graphics.model.material.ColorMaterial();
    var color = new rock.graphics.Color(255, 0, 0);
    material.setColor(color);
    wireframeColorModel.setMaterial(material);

    return wireframeColorModel;
};