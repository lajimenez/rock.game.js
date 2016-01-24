rock.namespace('rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material');

/**
 * Setter for {@link rock.game.graphics.model.material.Material
 *
 * @constructor
 * @abstract
 * @extends rock.game.graphics.engine.renderer.webgl.programsetter.ProgramSetter
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.MaterialSetter = function (glContext) {
    rock.super_(this, arguments);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.material.MaterialSetter,
    rock.game.graphics.engine.renderer.webgl.programsetter.ProgramSetter);