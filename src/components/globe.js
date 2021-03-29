import React, { useState, useEffect, useRef, useMemo } from 'react'
import Styled from 'styled-components'
import * as THREE from 'three'
import { Canvas, useFrame } from 'react-three-fiber'
// import { softShadows } from 'drei'

import earthDaymap from '../textures/2k_earth_daymap.jpg'

// softShadows()


const Container = Styled.section`
  box-sizing: border-box;
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  background: black;
`


function Box (props) {
  return <mesh
    { ...props }
    scale={ [1, 1, 1]}
    castShadow
    receiveShadow
  >
    <boxGeometry args={ [1, 1, 1] } />
    <meshStandardMaterial attach="material" color="hotpink" />
  </mesh>
}

function Sphere (props) {
  const mesh = useRef()

  useFrame(() => {
    mesh.current.rotation.y = mesh.current.rotation.y += 0.01
  })

  const earthTexture = useMemo(() => new THREE.TextureLoader().load(earthDaymap), [])

  return <mesh
    { ...props }
    ref={ mesh }
    scale={ [1, 1, 1]}
    castShadow
    receiveShadow
  >
    <sphereGeometry args={ [1, 32, 32] } />
    <meshStandardMaterial side={ THREE.DoubleSide }  >
      <primitive attach="map" object={ earthTexture } />
    </meshStandardMaterial>

    <Box position={ [-1, -1, -1] } />

  </mesh>
}





function Globe () {
  const [ shadowmap, setShadowmap ] = useState(1024)

  useEffect(() => {
    setTimeout(() => {
      setShadowmap(2048)
    }, 500)
  }, [])

  return <Container>
    <Canvas
      shadowMap
      camera={{
        position: [0, 0, -5],
        fov: 70,
      }}
    >
      <ambientLight intensity={ 0.05 } />
      <spotLight
        position={ [-20, 20, -20] }
        angle={0.15}
        penumbra={ 0.5 }
        castShadow
        shadow-mapSize-height={ shadowmap }
        shadow-mapSize-width={ shadowmap }
      />
      {/* <pointLight position={[-20, -20, -20]} /> */}
      <Sphere position={ [0, 0, 0] } />
      {/* <Box position={ [-1, -1, -1] } /> */}
    </Canvas>

  </Container>
}

export default Globe
