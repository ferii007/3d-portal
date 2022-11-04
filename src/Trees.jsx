import { useLoader } from "@react-three/fiber"
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const Trees = () => {

    const treesGLTF = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/trees.glb");

    useEffect(() => {
        if(!treesGLTF) return;

        let mesh = treesGLTF.scene.children[0];
        mesh.material.envMapIntensity = 2.5;
    }, [treesGLTF])


    return(
        <primitive object={treesGLTF.scene} />
    )
}

export default Trees