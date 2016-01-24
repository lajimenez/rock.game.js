rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.model');

/**
 * Setter for {@link rock.game.graphics.model.Model}
 *
 * @param {rock.graphics.engine.WebGLGraphicsEngine} glContext
 *         the WebGL context
 * @param {rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.MeshSetter} meshSetter
 *         the mesh setter
 * @param {rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.MaterialSetter} materialSetter
 *         the material setter
 *
 * @constructor
 * @abstract
 * @extends {rock.game.graphics.engine.renderer.webgl.programsetter.ProgramSetter}
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.ModelSetter = function (glContext, meshSetter, materialSetter) {
    rock.super_(this, [glContext]);

    this.meshSetter = meshSetter;
    this.materialSetter = materialSetter;

    this.meshSettable = new rock.game.graphics.engine.renderer.webgl.programsetter.settable.MeshSettable();
    this.materialSettable = new rock.game.graphics.engine.renderer.webgl.programsetter.settable.MaterialSettable();
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.ModelSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.ProgramSetter);

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.ModelSetter.prototype.getAttributeNames = function () {
    var attributeNames = [];
    attributeNames = attributeNames.concat(this.meshSetter.getAttributeNames());
    attributeNames = attributeNames.concat(this.materialSetter.getAttributeNames());
    return attributeNames;
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.ModelSetter.prototype.getUniformNames = function () {
    var uniformNames = [];
    uniformNames = uniformNames.concat(this.meshSetter.getUniformNames());
    uniformNames = uniformNames.concat(this.materialSetter.getUniformNames());
    return uniformNames;
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.ModelSetter.prototype.getTextureNames =  function () {
    var textureNames = [];
    textureNames = textureNames.concat(this.meshSetter.getTextureNames());
    textureNames = textureNames.concat(this.materialSetter.getTextureNames());
    return textureNames;
};

rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.ModelSetter.prototype.setValues = function (program, settable) {
    var modelAdapter = settable.getAdapter();

    var meshSettable = this.meshSettable;
    var materialSettable = this.materialSettable;

    var model = settable.getModel();
    meshSettable.setMesh(model.getMesh());
    meshSettable.setAdapter(modelAdapter.getMeshAdapter());

    materialSettable.setMaterial(model.getMaterial());
    materialSettable.setAdapter(modelAdapter.getMaterialAdapter());

    this.meshSetter.setValues(program, meshSettable);
    this.materialSetter.setValues(program, materialSettable);
};