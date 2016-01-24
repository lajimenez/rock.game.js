rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.model');

/**
 * Setter for {@link rock.game.graphics.model.PhongTextureModel}
 *
 * @param {rock.graphics.engine.WebGLGraphicsEngine} glContext
 *         the WebGL context
 *
 * @constructor
 * @abstract
 * @extends {rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.ModelSetter}
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.PhongTextureModelSetter = function (glContext) {
    var meshSetter =
        new rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.TextureCoordNormalMeshSetter(glContext);
    var materialSetter =
        new rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.PhongTextureMaterialSetter(glContext);
    rock.super_(this, [glContext, meshSetter, materialSetter]);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.PhongTextureModelSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.ModelSetter);