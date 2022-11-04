
import { useLoader } from "@react-three/fiber"
import { useEffect } from "react";
import { Color, DoubleSide } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"


const Grass = () => {

    const grassGLTF = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/grass.glb");

    useEffect(() => {
        if(!grassGLTF) return;

        let mesh = grassGLTF.scene.children[0];

        mesh.material.alphaToCoverage = true;
        mesh.material.transparent = true;
        mesh.material.map = mesh.material.emissiveMap;
        mesh.material.emissive = new Color(0.5, 0.5, 0.5);
        mesh.material.side = DoubleSide;
    }, [grassGLTF])


    return(
        <primitive object={grassGLTF.scene} />
    )

}

export default Grass