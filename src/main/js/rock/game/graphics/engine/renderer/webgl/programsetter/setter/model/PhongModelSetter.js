rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.model');

/**
 * Setter for {@link rock.game.graphics.model.PhongModel}
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
rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.PhongModelSetter = function (glContext) {
    var meshSetter = new rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.mesh.NormalMeshSetter(glContext);
    var materialSetter = new rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.PhongMaterialSetter(glContext);
    rock.super_(this, [glContext, meshSetter, materialSetter]);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.PhongModelSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.ModelSetter);