rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.model');

/**
 * Setter for {@link rock.game.graphics.model.WireframeColorModel}
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
rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.WireframeColorModelSetter = function (glContext) {
    var meshSetter = new rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.MeshSetter(glContext);
    var materialSetter = new rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.ColorMaterialSetter(glContext);
    rock.super_(this, [glContext, meshSetter, materialSetter]);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.WireframeColorModelSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.ModelSetter);