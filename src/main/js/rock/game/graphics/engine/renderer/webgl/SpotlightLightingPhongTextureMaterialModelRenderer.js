rock.namespace('rock.game.graphics.engine.renderer.webgl');

/**
 * Renderer for {@link rock.game.graphics.model.PhongTextureModel} with {@link rock.game.graphics.scene.SpotlightLighting}
 *
 * @param {rock.graphics.engine.webgl.WebGLContext} glContext
 *         the WebGL context
 *
 * @constructor
 * @extends rock.game.graphics.engine.renderer.webgl.ModelRenderer
 *
 * @author Luis Alberto Jiménez
 */
rock.game.graphics.engine.renderer.webgl.SpotlightLightingPhongTextureMaterialModelRenderer = function (glContext) {
    var lightingType= rock.game.constants.SPOTLIGHT_LIGHTING_TYPE;
    var modelType = rock.game.constants.PHONG_TEXTURE_MODEL_TYPE;
    var gl = glContext.getHTMLContext();
    var drawingMode = gl.TRIANGLES;
    var vertexShaderSrc = rock.game.graphics.engine.renderer.webgl.GLSL.TEXTURE_NORMAL_VERTEX_SHADER;
    var fragmentShaderSrc = rock.game.graphics.engine.renderer.webgl.SpotlightLightingPhongTextureMaterialModelRenderer.fragmentShaderSrc;

    var maxLights = rock.game.graphics.engine.renderer.webgl.SpotlightLightingPhongTextureMaterialModelRenderer.MAX_LIGHTS;
    var lightingSetter =
        new rock.game.graphics.engine.renderer.webgl.programsetter.setter.lighting.SpotlightLightingSetter(glContext, maxLights);
    var modelSetter =
        new rock.game.graphics.engine.renderer.webgl.programsetter.setter.model.PhongTextureModelSetter(glContext);

    var superParams = [lightingType, modelType, glContext, drawingMode,
        vertexShaderSrc, fragmentShaderSrc,
        lightingSetter, modelSetter];

    rock.super_(this, superParams);
};

rock.extends_(rock.game.graphics.engine.renderer.webgl.SpotlightLightingPhongTextureMaterialModelRenderer,
    rock.game.graphics.engine.renderer.webgl.ModelRenderer);

rock.game.graphics.engine.renderer.webgl.SpotlightLightingPhongTextureMaterialModelRenderer.MAX_LIGHTS = 10;

rock.game.graphics.engine.renderer.webgl.SpotlightLightingPhongTextureMaterialModelRenderer.fragmentShaderSrc = ''
    + rock.game.graphics.engine.renderer.webgl.GLSL_PRECISION.ROCK_PRECISION

    + ' #define MAX_LIGHTS ' + rock.game.graphics.engine.renderer.webgl.SpotlightLightingPhongTextureMaterialModelRenderer.MAX_LIGHTS + ' \n'

    + rock.game.graphics.engine.renderer.webgl.GLSL.STRUCT_MATERIAL

    + rock.game.graphics.engine.renderer.webgl.GLSL.STRUCT_SPOTLIGHT_LIGHT

    + rock.game.graphics.engine.renderer.webgl.GLSL.FUNCTION_CALCULATE_SPOTLIGHT_LIGHT_COLOR

    + ' uniform SpotlightLight u_spotlightLights[MAX_LIGHTS];                               \n'
    + ' uniform int u_spotlightLightsCount;                                                 \n'
    + ' uniform Material u_material;                                                        \n'
    + ' uniform sampler2D u_textureAmbient;                                                 \n'
    + ' uniform sampler2D u_textureDiffuse;                                                 \n'
    + ' uniform sampler2D u_textureSpecular;                                                \n'

    + ' varying vec4 v_modelViewVertex;                                                     \n'
    + ' varying vec3 v_normal;                                                              \n'
    + ' varying vec2 v_texCoord;                                                            \n'

    + ' void main() {                                                                       \n'
    + '     vec3 vertex = v_modelViewVertex.xyz;                                            \n'
    + '     vec3 normal = normalize(v_normal);                                              \n'
    + '     vec3 lightColor = vec3(0);                                                      \n'

    + '     Material textureMaterial;                                                       \n'
    + '     textureMaterial.ambient = u_material.ambient * texture2D(u_textureAmbient, v_texCoord).rgb;    \n'
    + '     textureMaterial.diffuse = u_material.diffuse * texture2D(u_textureDiffuse, v_texCoord).rgb;    \n'
    + '     textureMaterial.specular = u_material.specular * texture2D(u_textureSpecular, v_texCoord).rgb; \n'
    + '     textureMaterial.shininess = u_material.shininess;                               \n'

    + '     for (int i = 0; i < MAX_LIGHTS; i++) {                                          \n'
    + '         if (i < u_spotlightLightsCount) {                                           \n'
    + '             lightColor += calculatePointLightColor(u_spotlightLights[i], textureMaterial, vertex, normal);   \n'
    + '         }                                                                           \n'
    + '     }                                                                               \n'

    + '     gl_FragColor = vec4(lightColor, u_material.alpha);                              \n'
    + ' }                                                                                   \n';