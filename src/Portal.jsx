
import { useFrame, useLoader } from "@react-three/fiber"
import { useEffect } from "react";
import { AlwaysStencilFunc, DoubleSide, EquirectangularReflectionMapping, LinearEncoding, ReplaceStencilOp, Scene, TextureLoader, WebGLRenderTarget } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import FillQuad from "./FillQuad";

const scene = new Scene();
scene.background = new TextureLoader().load(
    process.env.PUBLIC_URL + "/textures/galaxy.jpg",
    (texture) => {
        texture.encoding = LinearEncoding;
        texture.mapping = EquirectangularReflectionMapping;
    }
)

const target = new WebGLRenderTarget(window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => {
    target.setSize(window.innerWidth, window.innerHeight);
})


const Portal = () => {

    const portalGLTFModel = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/portal.glb");
    const portalGLTFMask = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/portal_mask.glb");

    useFrame((state) => {
        state.gl.setRenderTarget(target);
        state.gl.render(scene, state.camera);
        state.gl.setRenderTarget(null);
    })

    useEffect(() => {
        if(!portalGLTFModel) return;

        let mesh = portalGLTFModel.scene.children[0];
        let maskMesh = portalGLTFMask.scene.children[0];

        mesh.material.envMapIntensity = 3.5;
        maskMesh.material.side = DoubleSide;
        maskMesh.material.transparent = false;
        maskMesh.material.stencilWrite = true;
        maskMesh.material.stencilRef = 1;
        maskMesh.material.stencilFunc = AlwaysStencilFunc;
        maskMesh.material.stencilZPass = ReplaceStencilOp;
    }, [portalGLTFModel, portalGLTFMask])

    return(
        <>
            <primitive object={portalGLTFModel.scene} />
            <primitive object={portalGLTFMask.scene} />
            <FillQuad map={target.texture} maskId={1} />
        </>
    )

}

export default Portal