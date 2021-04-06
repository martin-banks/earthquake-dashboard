import React, { useState, useEffect, useRef, useMemo } from 'react'
import Styled from 'styled-components'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { Canvas, useFrame, useThree } from 'react-three-fiber'

import convertLatLong from '../functions/convert-lat-long'
import magnitudeColor from '../functions/magnitude-color'
import earthDaymap from '../textures/2k_earth_daymap.jpg'

import Effects from './quake-effects'


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
  const {
    lat,
    long,
    mag,
  } = props

  const boxRef = useRef()
  const [ coords, setCoords ] = useState(null)
  const [ matrix, setMatrix ] = useState(null)

  useEffect(() => {
    const converted = convertLatLong({ lat, long })
    setCoords(converted)
  }, [])

  useEffect(() => {
    if (!coords) return
    const childVector = new THREE.Vector3(0, 1, 0)
    const childMatrix = new THREE.Matrix4()
      .lookAt(
        boxRef.current.position,
        childVector,
        boxRef.current.up
      )
    boxRef.current.quaternion.setFromRotationMatrix(childMatrix)
    setMatrix(childMatrix)

  }, [ coords ])

  return coords && <mesh
    ref={ boxRef }
    // { ...props }
    scale={ [0.05, 0.05, Math.pow(mag + 3, 3) * 0.008 ]} // Math.pow((mag + 3), 3) * 0.01] }
    castShadow
    receiveShadow
    position={ [
      (coords.x * 5),
      (coords.y * 5),
      (coords.z * 5),
    ] }
  >
    <boxGeometry args={ [1, 1, 1] } />
    <meshLambertMaterial
      attach="material"
      color={ magnitudeColor({ mag }) }
      // color="white"
      opacity={ ((mag + 3) / 13) * 0.4 }
      transparent
      emissive={ magnitudeColor({ mag }) }
    />
  </mesh>
}


function Sphere (props) {
  const {
    quakes,
    setPopup,
  } = props
  const mesh = useRef()

  useEffect(() => {
    if (!quakes) return
    console.log({ quakes })

  }, [ quakes ])

  useFrame(() => {
    // mesh.current.rotation.y = mesh.current.rotation.y += 0.005
  })

  const earthTexture = useMemo(() => new THREE.TextureLoader().load(earthDaymap), [])

  return <>
    <mesh
      { ...props }
      ref={ mesh }
      scale={ [1, 1, 1]}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={ [5, 32, 32] } />
      <meshLambertMaterial
        side={ THREE.DoubleSide }
        color="#888"
        emissive="#111"
      >
        <primitive attach="map" object={ earthTexture } />
      </meshLambertMaterial>

      { quakes &&
          quakes.map(q => <Box
            key={ `quake-3d-box-${q.id}` }
            lat={ q.geometry.coordinates[1] }
            long={ q.geometry.coordinates[0] }
            mag={ q.properties.mag }
          />)
      }

      <Box />
    </mesh>
  </>
}


const CameraController = () => {
  const { camera, gl } = useThree()
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement)

    controls.minDistance = 10
    controls.maxDistance = 20
    controls.minPolarAngle = Math.PI * -0.5
    controls.maxPolarAngle = Math.PI * 1
    return () => {
      controls.dispose()
    }
  },[camera, gl])
  return null
}


function Scene (props) {
  const { quakes } = props

  return <>
    { quakes && <Sphere position={ [0, 0, 0] } quakes={ quakes } /> }
  </>
}




function Globe (props) {
  const { quakes } = props
  const [ shadowmap, setShadowmap ] = useState(512)

  useEffect(() => {
    setTimeout(() => {
      setShadowmap(1024)
    }, 1000)
  }, [])

  return <Container>
    <Canvas
      shadowMap
      camera={{
        position: [0, 0, -20],
        fov: 70,
      }}
    >
      <CameraController />
      <ambientLight intensity={ 0.4 } />
      {/* <spotLight
        position={ [-20, 20, -20] }
        angle={ 0.15 }
        penumbra={ 0.5 }
        castShadow
        shadow-mapSize-height={ shadowmap }
        shadow-mapSize-width={ shadowmap }
      /> */}
      {/* <pointLight position={ [-20, -20, -20] } /> */}
      <Scene quakes={ quakes } />
      <Effects />
    </Canvas>

  </Container>
}

export default Globe
