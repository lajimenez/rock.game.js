// Load all scripts

function loadRockGame(rockGameSourcePathParam) {
    
    var rockGamePath = 'rock/';
    
    if (rockGameSourcePathParam) {
        rockGamePath = rockGameSourcePathParam;
    }
    
    var rockGameScriptsToLoad = [
        'game/constants.js',

        'game/graphics/lighting/Light.js',
        'game/graphics/lighting/AttenuationLight.js',
        'game/graphics/lighting/DirectionalLight.js',
        'game/graphics/lighting/PointLight.js',
        'game/graphics/lighting/SpotlightLight.js',

        'game/graphics/model/mesh/Mesh.js',
        'game/graphics/model/mesh/NormalMesh.js',
        'game/graphics/model/mesh/TextureCoordMesh.js',
        'game/graphics/model/mesh/TextureCoordNormalMesh.js',
        'game/graphics/model/material/Material.js',
        'game/graphics/model/material/Texture.js',
        'game/graphics/model/material/ColorMaterial.js',
        'game/graphics/model/material/TextureMaterial.js',
        'game/graphics/model/material/PhongMaterial.js',
        'game/graphics/model/material/PhongTextureMaterial.js',
        'game/graphics/model/BaseModel.js',
        'game/graphics/model/Model.js',
        'game/graphics/model/WireframeColorModel.js',
        'game/graphics/model/TextureModel.js',
        'game/graphics/model/PhongModel.js',
        'game/graphics/model/PhongTextureModel.js',
        'game/graphics/model/GroupModel.js',
        'game/graphics/model/JSONModelUtils.js',

        'game/graphics/scene/Lighting.js',
        'game/graphics/scene/LightArrayLighting.js',
        'game/graphics/scene/Camera.js',
        'game/graphics/scene/Representation.js',
        'game/graphics/scene/DirectionalLighting.js',
        'game/graphics/scene/PointLighting.js',
        'game/graphics/scene/SpotlightLighting.js',
        'game/graphics/scene/AffineTransformationRepresentation.js',

        'game/graphics/engine/renderer/webgl/programsetter/settable/Settable.js',
        'game/graphics/engine/renderer/webgl/programsetter/settable/AdaptableSettable.js',
        'game/graphics/engine/renderer/webgl/programsetter/settable/MatricesSettable.js',
        'game/graphics/engine/renderer/webgl/programsetter/settable/LightingSettable.js',
        'game/graphics/engine/renderer/webgl/programsetter/settable/MeshSettable.js',
        'game/graphics/engine/renderer/webgl/programsetter/settable/MaterialSettable.js',
        'game/graphics/engine/renderer/webgl/programsetter/settable/ModelSettable.js',

        'game/graphics/engine/renderer/webgl/programsetter/adapter/Adapter.js',
        'game/graphics/engine/renderer/webgl/programsetter/adapter/BufferAdapter.js',
        'game/graphics/engine/renderer/webgl/programsetter/adapter/TextureAdapter.js',
        'game/graphics/engine/renderer/webgl/programsetter/adapter/model/mesh/MeshAdapter.js',
        'game/graphics/engine/renderer/webgl/programsetter/adapter/model/mesh/NormalMeshAdapter.js',
        'game/graphics/engine/renderer/webgl/programsetter/adapter/model/mesh/TextureCoordMeshAdapter.js',
        'game/graphics/engine/renderer/webgl/programsetter/adapter/model/mesh/TextureCoordNormalMeshAdapter.js',
        'game/graphics/engine/renderer/webgl/programsetter/adapter/model/material/MaterialAdapter.js',
        'game/graphics/engine/renderer/webgl/programsetter/adapter/model/material/TextureMaterialAdapter.js',
        'game/graphics/engine/renderer/webgl/programsetter/adapter/model/material/PhongTextureMaterialAdapter.js',
        'game/graphics/engine/renderer/webgl/programsetter/adapter/model/ModelAdapter.js',
        'game/graphics/engine/renderer/webgl/programsetter/adapter/model/WireframeModelAdapter.js',
        'game/graphics/engine/renderer/webgl/programsetter/adapter/model/TextureModelAdapter.js',
        'game/graphics/engine/renderer/webgl/programsetter/adapter/model/PhongModelAdapter.js',
        'game/graphics/engine/renderer/webgl/programsetter/adapter/model/PhongTextureModelAdapter.js',

        'game/graphics/engine/renderer/webgl/programsetter/setter/ProgramSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/lighting/LightingSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/lighting/NoLightingSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/lighting/LightArrayLightingSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/lighting/DirectionalLightingSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/lighting/AttenuationLightArrayLightingSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/lighting/PointLightingSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/lighting/SpotlightLightingSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/model/mesh/MeshSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/model/mesh/NormalMeshSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/model/mesh/TextureCoordMeshSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/model/mesh/TextureCoordNormalMeshSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/model/material/MaterialSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/model/material/ColorMaterialSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/model/material/TextureMaterialSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/model/material/PhongMaterialSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/model/material/PhongTextureMaterialSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/model/MatricesSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/model/ModelSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/model/WireframeColorModelSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/model/TextureModelSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/model/PhongModelSetter.js',
        'game/graphics/engine/renderer/webgl/programsetter/setter/model/PhongTextureModelSetter.js',

        'game/graphics/engine/renderer/ModelRenderable.js',
        'game/graphics/engine/renderer/ModelRenderer.js',
        'game/graphics/engine/renderer/RendererContext.js',
        'game/graphics/engine/renderer/webgl/GLSL.js',
        'game/graphics/engine/renderer/webgl/ModelRenderable.js',
        'game/graphics/engine/renderer/webgl/ModelRenderer.js',
        'game/graphics/engine/renderer/webgl/WireframeColorMaterialModelRenderer.js',
        'game/graphics/engine/renderer/webgl/TextureMaterialModelRenderer.js',
        'game/graphics/engine/renderer/webgl/DirectionalLightingPhongMaterialModelRenderer.js',
        'game/graphics/engine/renderer/webgl/DirectionalLightingPhongTextureMaterialModelRenderer.js',
        'game/graphics/engine/renderer/webgl/PointLightingPhongMaterialModelRenderer.js',
        'game/graphics/engine/renderer/webgl/PointLightingPhongTextureMaterialModelRenderer.js',
        'game/graphics/engine/renderer/webgl/SpotlightLightingPhongMaterialModelRenderer.js',
        'game/graphics/engine/renderer/webgl/SpotlightLightingPhongTextureMaterialModelRenderer.js',
        'game/graphics/engine/renderer/webgl/RendererContext.js',
        'game/graphics/engine/renderer/webgl/RockBasicRendererContext.js',

        'game/graphics/engine/RenderEngine.js',
        'game/graphics/engine/webgl/RenderEngine.js',
        'game/graphics/engine/webgl/RockBasicRenderEngine.js',

        'game/physics/Barrier.js',
        'game/physics/BBOXBarrier.js',
        'game/physics/CollisionDetector.js',

        'game/universe/Object.js',
        'game/universe/World.js',

        'game/engine/RepresentationAttendant.js',
        'game/engine/GameState.js',
        'game/engine/GameDirector.js',
        'game/engine/GameEngine.js',

        'game/Repository.js',
        'game/GameWindow.js',
        'game/GameEngineWindow.js',
        'game/Game.js'
    ];

    var rockSceneGraphScriptsToLoad = [
        'scene/constants.js',

        'scene/graphics/scene/ModelNodeRepresentation.js',

        'scene/engine/RepresentationAttendant.js',
        'scene/engine/SceneDirector.js',
        'scene/engine/SceneEngine.js',

        'scene/node/LightingNode.js',
        'scene/node/CameraNode.js',
        'scene/node/ModelNode.js',

        'scene/Scene.js',
        'scene/SceneEngineWindow.js'
    ];

    var i;
    for (i = 0; i < rockGameScriptsToLoad.length; i++) {
        document.write('<script src="' + rockGamePath + rockGameScriptsToLoad[i] + '"><\/script>');
    }

    for (i = 0; i < rockSceneGraphScriptsToLoad.length; i++) {
        document.write('<script src="' + rockGamePath + rockSceneGraphScriptsToLoad[i] + '"><\/script>');
    }
}