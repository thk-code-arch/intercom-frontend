<template>
  <div id="scene-container" ref="sceneContainer"></div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default {
  name: 'ThreeViewport',
  data () {
    return {
      container: null,
      scene: null,
      camera: null,
      controls: null,
      renderer: null    }
  },
  methods: {
    init () {
      // set container
      this.container = this.$refs.sceneContainer

      // add camera
      const fov = 45 // Field of view
      const aspect = this.container.clientWidth / this.container.clientHeight
      const near = 0.1 // the near clipping plane
      const far = 1000 // the far clipping plane
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
      this.camera = camera

      // create scene
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color('#eeeeee')

      // add lights
      const ambientLight = new THREE.HemisphereLight(
        0xffffff, // bright sky color
        0x222222, // dim ground color
        1 // intensity
      )
      this.scene.add(ambientLight)

      this.dirLight = new THREE.DirectionalLight(0xffffff, 1.0)
      this.dirLight.position.set(500, 500, 500)
      this.dirLight.castShadow = true
      this.dirLight.shadow.mapSize.width = 2048;  // default
      this.dirLight.shadow.mapSize.height = 2048; // default
      this.dirLight.shadow.camera = new THREE.OrthographicCamera( -100, 100, 100, -100, 0.5, 1000 ); 
      this.dirLight.shadow.camera.near = near;    // default
      this.dirLight.shadow.camera.far = far * 10;     // default
      this.scene.add(this.dirLight)

      // add controls
      this.controls = new OrbitControls(this.camera, this.container)
      // call this only in static scenes (i.e., if there is no animation loop)
      this.controls.addEventListener( 'change', this.updateCamera )

      // create renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.gammaOutput = true
      this.renderer.gammaFactor = 2.2
      this.renderer.shadowMap.enabled = true
      // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
      this.container.appendChild(this.renderer.domElement)

      // set aspect ratio to match the new browser window aspect ratio
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)

      // create Vector to calculate Camera Direction
      this.vector = new THREE.Vector3();

      this.loadModel()
      
      this.render()
    },
    loadModel() {
      const gltfLoader = new GLTFLoader()

      this.gltf = gltfLoader.load(
        'https://icapi.bim-cloud.org/files/interact.gltf',
        gltf => {
          gltf.scene.traverse((o) => {
            if (o.isMesh) {
              o.castShadow = true;
              o.receiveShadow = true;
              o.matrixAutoUpdate = false // this object is static
            }
          });

          const box = new THREE.Box3().setFromObject( gltf.scene );
          const size = box.getSize( new THREE.Vector3() ).length();
          const center = box.getCenter( new THREE.Vector3() );

          gltf.scene.position.x += ( gltf.scene.position.x - center.x );
          gltf.scene.position.y += ( gltf.scene.position.y - center.y );
          gltf.scene.position.z += ( gltf.scene.position.z - center.z );

          this.camera.near = size / 100;
          this.camera.far = size * 100;

          this.camera.updateProjectionMatrix();

          this.camera.position.copy( center );
          this.camera.position.x += size / 1.0;
          this.camera.position.y += size / 2.0;
          this.camera.position.z += size / -1.0;
          this.camera.lookAt( center );

          this.dirLight.shadow.camera = new THREE.OrthographicCamera( -size, size, size, -size, 0.5, 1000 ); 

          this.controls.maxDistance = size * 10;
          this.controls.update();

          this.scene.add(gltf.scene)
          this.render()
        },
        undefined,
        undefined
      )
    },
    updateCamera () {
      this.render()
      this.camPos = {
        x: this.camera.position.x,
        y: this.camera.position.y,
        z: this.camera.position.z,
        dir: this.camera.getWorldDirection ( this.vector )
      }
      // TODO: send camera position to Server
      console.log(this.camPos)
    },
    render () {
      this.renderer.render(this.scene, this.camera)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>
#scene-container {
  height: 95%;
  width: 100%
}
</style>
