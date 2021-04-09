import React, { useState, useEffect, useRef, useMemo } from 'react'
import Styled from 'styled-components'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { Canvas, useFrame, useThree } from 'react-three-fiber'

import convertLatLong from '../functions/convert-lat-long'
import magnitudeColor from '../functions/magnitude-color'

// import earthDaymap from '../textures/2k_earth_daymap.jpg'
import earthDaymap from '../textures/8081_earthmap2k.jpg'
import earthBumpMap from '../textures/8081_earthbump4k.jpg'

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


function Quake (props) {
  const {
    lat,
    long,
    mag,
    activeId,
    emitActive,
    event,
  } = props

  const boxRef = useRef()
  const [ coords, setCoords ] = useState(null)
  const [ matrix, setMatrix ] = useState(null)
  const [ color, setColor ] = useState('#fff')
  const [ opacity, setOpacity ] = useState(0.1)

  useEffect(() => {
    setColor(magnitudeColor({ mag }))
  }, [ mag ])

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

  useEffect(() => {
    if (activeId === event.id) {
      setColor('cyan')
      setOpacity(1)
    } else {
      setColor(magnitudeColor({ mag }))
      setOpacity(0.2)
    }
  }, [ activeId ])

  const handleClick = () => {
    if (event.id === activeId) return
    emitActive(event.id)
  }

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
    onClick={ handleClick }
    // onPointerEnter={ handleClick }
  >
    <boxGeometry args={ [1, 1, 1] } />
    <meshLambertMaterial
      attach="material"
      color={ color }
      opacity={ opacity }
      transparent
      emissive={ color }
    />
  </mesh>
}


function Sphere (props) {
  const {
    quakes,
    setPopup,
    activeId,
    setActiveId,
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
  const earthBump = useMemo(() => new THREE.TextureLoader().load(earthBumpMap), [])

  return <>
    <mesh
      { ...props }
      ref={ mesh }
      scale={ [1, 1, 1]}
      castShadow
      receiveShadow
      onPointerMove={ () => null }
    >
      <sphereGeometry args={ [5, 500, 500] } />
      <meshStandardMaterial
        // side={ THREE.DoubleSide }
        color="#888"
        // emissive="#888"
        displacementMap={ earthBump }
        map={ earthTexture }
        displacementScale={ 0.2 }
        metalness={ 0.1 }
        roughness={ 1 }
        castShadow
        receiveShadow
      >
        {/* <primitive attach="map" object={ earthTexture } /> */}
        {/* <primitive attach="displacementMap" displacementScale={0.1} object={ earthBump } /> */}
      </meshStandardMaterial>

      { quakes &&
          quakes.map(q => <Quake
            key={ `quake-3d-box-${q.id}` }
            lat={ q.geometry.coordinates[1] }
            long={ q.geometry.coordinates[0] }
            mag={ q.properties.mag }
            activeId={ activeId }
            emitActive={ setActiveId }
            event={ q }
          />)
      }

      {/* <Box /> */}
    </mesh>
  </>
}


const CameraController = () => {
  const { camera, gl } = useThree()
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement)

    controls.minDistance = 15
    controls.maxDistance = 30
    controls.minPolarAngle = Math.PI * -0.5
    controls.maxPolarAngle = Math.PI * 1
    return () => {
      controls.dispose()
    }
  },[camera, gl])
  return null
}


function Scene (props) {
  const {
    quakes,
    activeId,
    setActiveId,
  } = props

  return <>
    { quakes && <Sphere
        position={ [0, 0, 0] }
        quakes={ quakes }
        activeId={ activeId }
        setActiveId={ setActiveId }
      />
    }
  </>
}


function Camera (props) {
  const ref = useRef()
  const { setDefaultCamera } = useThree()
  useEffect(() => void setDefaultCamera(ref.current), [])
  useFrame(() => ref.current.updateMatrixWorld())

  return <perspectiveCamera ref={ref} {...props} />
}



function Globe (props) {
  const {
    quakes,
    activeId,
    setActiveId,
  } = props
  const [ shadowmap, setShadowmap ] = useState(512)

  useEffect(() => {
    setTimeout(() => {
      setShadowmap(1024)
    }, 1000)
  }, [])

  return <Container>
    <Canvas
      shadowMap
      // camera={{
      //   position: [0, 0, -20],
      //   fov: 70,
      // }}
    >
      <Camera
        position={ [0, -5, -20] }
      >
        <pointLight
          position={ [0, 20, 5] }
          color="#fff"
          intensity={ 1 }
          castShadow
          shadow-mapSize-height={ shadowmap }
          shadow-mapSize-width={ shadowmap }
        />
        <pointLight
          position={ [0, -50, 0] }
          color="white"
          intensity={ 0.6 }
          castShadow
          shadow-mapSize-height={ shadowmap }
          shadow-mapSize-width={ shadowmap }
        />

        {/* <spotLight
          position={ [0, 20, -0] }
          intensity={ 1.0 }
          // angle={ 0.5 }
          penumbra={ 1 }
          castShadow
          shadow-mapSize-height={ shadowmap }
          shadow-mapSize-width={ shadowmap }
        /> */}
      </Camera>
      <CameraController />
      <ambientLight intensity={ 0.2 } />
      {/* <pointLight position={ [-50, -50, -50] } /> */}
      {/* <spotLight
        position={ [-20, 20, -20] }
        angle={ 0.15 }
        penumbra={ 0.5 }
        castShadow
        shadow-mapSize-height={ shadowmap }
        shadow-mapSize-width={ shadowmap }
      /> */}
      <Scene
        quakes={ quakes }
        activeId={ activeId }
        setActiveId={ setActiveId }
      />
      <Effects />
    </Canvas>

  </Container>
}

export default Globe
