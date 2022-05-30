<template>
  <div
    id="threejs"
    class="outline-none cursor-move scene-container"
    ref="sceneContainer"
  ></div>
</template>
<script>
import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { IFCLoader } from 'three/examples/jsm/loaders/IFCLoader.js';
import authHeader from '@/services/auth-header';
import projectHeader from '@/services/project-header';

export default {
  name: 'ifc-port',
  data() {
    return {
      container: null,
      scene: null,
      camera: null,
      controls: null,
      renderer: null,
      raycaster: null,
      intersects: null,
      camPos: '',
      avatar: null,
    };
  },
  computed: {
    othercamPos() {
      return this.$store.state.viewport.othercamPos;
    },
    takeScreenshotNow() {
      return this.$store.state.viewport.takeScreenshot;
    },
    connectedPlayers() {
      return this.$store.state.viewport.players;
    },
    selectedSubprojects() {
      return this.$store.state.viewport.selectedSubprojects;
    },
  },
  methods: {
    init() {
      // set container
      this.container = this.$refs.sceneContainer;

      // add camera
      const fov = 45; // Field of view
      const aspect = this.container.clientWidth / this.container.clientHeight;
      const near = 0.1; // the near clipping plane
      const far = 1000; // the far clipping plane
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.camera = camera;

      //Scene
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color('#eeeeee');

      // add lights
      const ambientLight = new THREE.HemisphereLight(
        0xffffff, // bright sky color
        0x222222, // dim ground color
        1 // intensity
      );
      this.scene.add(ambientLight);

      this.dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
      this.dirLight.position.set(500, 500, 500);
      this.dirLight.castShadow = true;
      this.dirLight.shadow.mapSize.width = 2048; // default
      this.dirLight.shadow.mapSize.height = 2048; // default
      this.dirLight.shadow.camera = new THREE.OrthographicCamera(
        -100,
        100,
        100,
        -100,
        0.5,
        1000
      );
      this.dirLight.shadow.camera.near = near; // default
      this.dirLight.shadow.camera.far = far * 10; // default
      this.scene.add(this.dirLight);

      this.loadModel();

      //Controls
      this.controls = new OrbitControls(this.camera, this.container);
      this.controls.keys = {
        LEFT: 65, //left arrow
        UP: 87, // up arrow
        RIGHT: 68, // right arrow
        BOTTOM: 83, // down arrow
      };
      // create renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.outputEncoding = true;
      this.renderer.gammaFactor = 2.2;
      this.renderer.shadowMap.enabled = true;
      // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
      this.container.appendChild(this.renderer.domElement);

      // set aspect ratio to match the new browser window aspect ratio
      this.camera.aspect =
        this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );

      // create Vector to calculate Camera Direction
      this.vector = new THREE.Vector3();
      this.render();
    },

    resizeWindow() {
      this.container = this.$refs.sceneContainer;
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );
      this.camera.aspect =
        this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.render();
    },
    insertAvatar() {
      // sample Box from docs
      Array.prototype.forEach.call(this.connectedPlayers, (player) => {
        this.loadAvatar(1, player.username);
      });
    },
    updateAvatar() {
      Array.prototype.forEach.call(this.connectedPlayers, (player) => {
        this.moveAvatar(player.username, player.position);
      });
    },
    insertSubproject(addSubproject) {
      // sample Box from docs
      Array.prototype.forEach.call(addSubproject, (sb) => {
        this.loadSubproject(sb);
      });
    },
    removeSubproject(rmSubproject) {
      Array.prototype.forEach.call(rmSubproject, (sb) => {
        this.unloadSubproject(sb);
      });
    },
    loadAvatar(avatarId, name) {
      if (!this.scene.getObjectByName(name)) {
        const gltfLoader = new GLTFLoader();
        gltfLoader.setRequestHeader({ Authorization: authHeader() });
        gltfLoader.load(
          `${this.$app_url}/api/avatar/get_avatarfile/${avatarId}`,
          (gltf) => {
            gltf.scene.scale.set(0.4, 0.4, 0.4);
            gltf.scene.name = name;
            // add Text
            var myText = new SpriteText(name);
            myText.textHeight = 2;
            myText.strokeWidth = 1;
            myText.strokeColor = 'black';
            myText.position.y = gltf.scene.position.y - 3;
            gltf.scene.add(myText);
            this.scene.add(gltf.scene);
          }
        );
      }
    },
    loadSubproject(subprojectId) {
      if (!this.scene.getObjectByName(`subprojectId:${subprojectId}`)) {
        const gltfLoader = new GLTFLoader();
        gltfLoader.setRequestHeader({ Authorization: authHeader() });
        gltfLoader.load(
          `${this.$app_url}/api/project/get_projectfile/${subprojectId}`,
          (gltf) => {
            gltf.scene.name = `subprojectId:${subprojectId}`;
            this.scene.add(gltf.scene);
            console.log(
              this.scene.getObjectByName({ subprojectId: subprojectId })
            );
          }
        );
      }
    },
    unloadSubproject(subprojectId) {
      const group = this.scene.getObjectByName(`subprojectId:${subprojectId}`);
      if (group) {
        this.scene.remove(group);
      }
    },

    moveAvatar(avatarName, player) {
      const selAvatar = this.scene.getObjectByName(avatarName);
      if (selAvatar) {
        //selAvatar.rotation.x = player.dir.x;
        //selAvatar.rotation.y = player.dir.y;
        //selAvatar.rotation.z = player.dir.z;
        selAvatar.position.x = player.x;
        selAvatar.position.y = player.y;
        selAvatar.position.z = player.z;
      }
    },
    loadModel() {
      //Setup IFC Loader
      const ifcLoader = new IFCLoader();

      ifcLoader.setRequestHeader({ Authorization: authHeader() });
      ifcLoader.load(
        `${this.$app_url}/api/project/get_projectfileifc/${projectHeader()}`,
        (ifc) => {
          const box = new THREE.Box3().setFromObject(ifc.mesh);
          const size = box.getSize(new THREE.Vector3()).length();
          const center = box.getCenter(new THREE.Vector3());

          ifc.position.x += ifc.position.x - center.x;
          ifc.position.y += ifc.position.y - center.y;
          ifc.position.z += ifc.position.z - center.z;
          this.camera.near = size / 100;
          this.camera.far = size * 100;

          this.camera.updateProjectionMatrix();

          this.camera.position.copy(center);
          this.camera.position.x += size / 1.0;
          this.camera.position.y += size / 2.0;
          this.camera.position.z += size / -1.0;
          this.camera.lookAt(center);

          this.dirLight.shadow.camera = new THREE.OrthographicCamera(
            -size,
            size,
            size,
            -size,
            0.5,
            1000
          );

          this.controls.maxDistance = size * 10;
          this.controls.update();

          this.scene.add(ifc.mesh);
          this.render();
        }
      );
    },

    getCameraPosition() {
      this.camera.position.x = this.othercamPos.position.x;
      this.camera.position.y = this.othercamPos.position.y;
      this.camera.position.z = this.othercamPos.position.z;
      this.controls.update();
      this.render();
    },
    roundNumbers(obj) {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'number') {
          // obj[key] = value.toFixed(2) // 1.9999 -> "2.00"
          obj[key] = +value.toFixed(2); // 1.9999 -> 2
        }
      });
      return obj;
    },
    updateCamera() {
      this.updateAvatar();
      this.camPos = {
        x: this.camera.position.x.toFixed(2),
        y: this.camera.position.y.toFixed(2),
        z: this.camera.position.z.toFixed(2),
        dir: this.roundNumbers(this.camera.getWorldDirection(this.vector)),
      };
      //send camera position to Server
      this.$store.dispatch('viewport/setowncamPos', this.camPos);
      this.render();
    },
    takeScreenshot() {
      this.render();
      this.$store.dispatch(
        'viewport/imgStore',
        this.renderer.domElement.toDataURL()
      );
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
    handleMouseWheel(event) {
      if (event.deltaY < 0) {
        this.camera.position.z -= 1;
      } else if (event.deltaY > 0) {
        this.camera.position.z += 1;
      }
      this.updateCamera();
    },
  },
  watch: {
    connectedPlayers(oldval, newval) {
      if (oldval.length !== newval.length) {
        this.insertAvatar();
      }
      this.updateCamera();
    },
    selectedSubprojects(newval, oldval) {
      if (oldval.length !== newval.length) {
        const loadedSubprojects = this.scene.children
          .filter((x) => x.name.startsWith('subprojectId:'))
          .map((x) => x.name.replace('subprojectId:', ''));
        const addSubprojects = newval.filter(
          (x) => !loadedSubprojects.includes(x)
        );
        const rmSubprojects = loadedSubprojects.filter(
          (x) => !newval.includes(x)
        );

        this.insertSubproject(addSubprojects);
        this.removeSubproject(rmSubprojects);
      }

      this.updateCamera();
    },
    othercamPos() {
      // watch it
      this.getCameraPosition();
    },
    takeScreenshotNow() {
      this.takeScreenshot();
    },
  },
  mounted() {
    this.init();
    this.controls.addEventListener('change', this.updateCamera);
    // call this only in static scenes (i.e., if there is no animation loop)
  },
  created() {
    window.addEventListener('resize', this.resizeWindow);
  },
  destroyed() {
    this.scene.dispose();
    window.removeEventListener('resize', this.resizeWindow);
    this.controls.removeEventListener('change', this.updateCamera);
  },
};
</script>

<style>
.scene-container {
  height: 100%;
  width: 100%;
}
</style>
