
import { Environment, Float, OrbitControls, PerspectiveCamera, SpotLight } from "@react-three/drei"
import { BrightnessContrast, ChromaticAberration, DepthOfField, EffectComposer, HueSaturation } from "@react-three/postprocessing"
import { Suspense } from "react"
import { Color } from "three"
import FloatingIsland from "./FloatingIsland"
import FloatingRocks from "./FloatingRocks"
import Grass from "./Grass"
import Portal from "./Portal"
import Rocks from "./Rocks"
import Trees from "./Trees"
import Words from "./Words"

let lightColor = new Color(1, 0.2, 0.1)


const SceneContainer = () => {

    return(
        <Suspense fallback={null}>
            <Environment background={"only"} files={process.env.PUBLIC_URL + "textures/bg.hdr"} />
            <Environment background={false} files={process.env.PUBLIC_URL + "textures/envmap.hdr"} />

            <PerspectiveCamera makeDefault fov={50} position={[ -1.75, 10.85, 20.35 ]} />
            <OrbitControls target={[ 1, 5, 0 ]} maxPolarAngle={Math.PI * 0.5} />

            <Float speed={0.5} rotationIntensity={0.6} floatIntensity={0.6}>
                <FloatingIsland />
                <Rocks />
                <Portal />
                <Words />
                <Trees />
                <Grass />

                <SpotLight 
                    penumbra={1} 
                    distance={500} 
                    angle={60.65} 
                    attenuation={1} 
                    anglePower={3} 
                    intensity={0.3} 
                    color={lightColor} 
                    position={[ 1.19, 10.85, -4.45 ]}
                    target-position={[ 0, 0, -1 ]}
                />
            </Float>

            <FloatingRocks />

            {/* <EffectComposer stencilBuffer={true}>
                <DepthOfField focusDistance={0.012} focalLength={0.015} bokehScale={7} />

                <HueSaturation hue={0} saturation={-0.15} />

                <BrightnessContrast brightness={0.0} contrast={0.35} />

                <ChromaticAberration radialModulation={true} offset={[ 0.00175, 0.00175 ]} /> 
            </EffectComposer> */}
        </Suspense>
    )

}

export default SceneContainer