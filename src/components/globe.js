import React, { useState, useRef, useMemo } from 'react'
import Styled from 'styled-components'
import * as THREE from 'three'
import { Canvas, useFrame } from 'react-three-fiber'

import earthDaymap from '../textures/2k_earth_daymap.jpg'


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
  const mesh = useRef()

  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.002
  })

  const earthTexture = useMemo(() => new THREE.TextureLoader().load(earthDaymap), [])

  return <mesh
    { ...props }
    ref={ mesh }
    scale={ [2, 2, 2]}
  >
    <sphereGeometry args={ [1, 32, 32] } />
    <meshStandardMaterial side={ THREE.DoubleSide }>
      <primitive attach="map" object={ earthTexture } />
    </meshStandardMaterial>
  </mesh>

}



function Globe () {

  return <Container>
    <Canvas>
      <ambientLight intensity={ 0.1 } />
      <spotLight position={[20, 20, 20]} angle={0.15} penumbra={ 0.5 } />
      {/* <pointLight position={[-20, -20, -20]} /> */}
      <Box position={ [0, 0, 0] } />
    </Canvas>

  </Container>
}

export default Globe
