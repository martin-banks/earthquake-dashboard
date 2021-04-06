import * as THREE from 'three'
import React, { useRef, useEffect, useMemo, useState } from 'react'
import { extend, useThree, useFrame } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'

extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass })

export default function Effects() {
  const [ bloom, setBloom ] = useState({
    resolution: null,
    strength: 0,
    radius: 0,
    threshold: 0,
  })
  const composer = useRef()
  const { scene, gl, size, camera } = useThree()

  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [
    size,
  ])

  useEffect(() => {
    setTimeout(() => {
      setBloom({
        // resolution: aspect,
        strength: 1,
        radius: 0.5,
        threshold: 0,
      })
    }, 1000)
  }, [])

  useEffect(() => {
    return void composer.current.setSize(size.width, size.height)
  }, [ size ])

  useFrame(() => composer.current.render(), 1)


  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />

      <unrealBloomPass
        attachArray="passes"
        args={[aspect, bloom.strength, bloom.radius, bloom.threshold]}
      />
      <shaderPass
        attachArray="passes"
        args={[FXAAShader]}
        material-uniforms-resolution-value={[1 / size.width, 1 / size.height]}
        renderToScreen
      />
    </effectComposer>
  )
}