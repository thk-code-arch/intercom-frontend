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
      vector: null,
      camPos: '',
      avatar: null,
      highlightMaterial: null,
      isDragging: false,
      dragObject: null,
      plane: null,
      pNormal: null,
      raycaster: null,
      shift: null,
      found: null,
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
    loadedSubprojects() {
      return this.scene.children
        .filter((x) => x.name.startsWith('subprojectId:'))
        .map((x) => parseInt(x.name.replace('subprojectId:', '')));
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
      const directionalLight1 = new THREE.DirectionalLight(0xffeeff, 0.8);
      directionalLight1.position.set(1, 1, 1);
      this.scene.add(directionalLight1);
      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight2.position.set(-1, 0.5, -1);
      this.scene.add(directionalLight2);
      const ambientLight = new THREE.AmbientLight(0xffffee, 0.25);
      this.scene.add(ambientLight);
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
      // selectingModelsColor
      this.highlightMaterial = new THREE.MeshPhongMaterial({
        color: 0x00b1ff,
        depthTest: false,
        transparent: true,
        opacity: 0.3,
      });

      //moving objects intersecting
      this.plane = new THREE.Plane();
      this.pNormal = new THREE.Vector3(0, 1, 0);
      this.raycaster = new THREE.Raycaster();
      this.shift = new THREE.Vector3();

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
        const ifcLoader = new IFCLoader();
        ifcLoader.setRequestHeader({ Authorization: authHeader() });
        try {
          ifcLoader.load(
            `${this.$app_url}/api/project/get_projectfileifc/${subprojectId}`,
            (ifc, progress, error) => {
              console.log(error);
              console.log(ifc);
              ifc.name = `subprojectId:${subprojectId}`;

              const lastLoaded = this.scene.children.find((x) =>
                x.name.match(/projectId/)
              );
              console.log(lastLoaded);
              const box = new THREE.Box3().setFromObject(ifc.mesh);
              const center = box.getCenter(new THREE.Vector3());

              ifc.position.x += ifc.position.x - center.x;
              ifc.position.y += ifc.position.y - center.y;
              ifc.position.z += ifc.position.z - center.z;
              ifc.position.setFromMatrixPosition(lastLoaded.matrixWorld);
              this.scene.add(ifc.mesh);
              this.updateCamera();
            }
          );
        } catch (err) {
          console.log('Error loading IFC.');
          console.log(err);
        }
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
      try {
        ifcLoader.load(
          `${this.$app_url}/api/project/get_projectfileifc/${projectHeader()}`,
          (ifc) => {
            const box = new THREE.Box3().setFromObject(ifc.mesh);
            const size = box.getSize(new THREE.Vector3()).length();
            const center = box.getCenter(new THREE.Vector3());

            ifc.name = 'projectId';

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

            this.controls.maxDistance = size * 10;
            this.controls.update();

            this.scene.add(ifc.mesh);
            this.render();
          }
        );
      } catch (err) {
        console.error('Error loading IFC.');
        console.error(err);
      }
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
    pointerMove(event) {
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(mouse, this.camera);
      const planeIntersect = new THREE.Vector3();

      if (this.isDragging) {
        console.log('drgging');
        this.raycaster.ray.intersectPlane(this.plane, planeIntersect);
        this.dragObject.position.addVectors(planeIntersect, this.shift);
        this.updateCamera();
      }
    },
    pointerDown() {
      const intersects = this.raycaster.intersectObjects(
        this.scene.children,
        false
      );
      console.log('pointerDown', intersects);
      var pIntersect = new THREE.Vector3();
      if (intersects.length) {
        this.found = intersects[0];
        console.log('pointedObject', this.found.point);
        this.controls.enabled = false;
        pIntersect.copy(this.found.point);
        this.plane.setFromNormalAndCoplanarPoint(this.pNormal, pIntersect);
        this.shift.subVectors(this.found.object.position, this.found.point);
        this.isDragging = true;
        this.dragObject = this.found.object;
        this.found.object.userData.color = this.found.object.material;
        this.found.object.material = this.highlightMaterial;
      }
    },
    pointerUp() {
      if (this.isDragging) {
        this.isDragging = false;
        this.dragObject = null;
        this.controls.enabled = true;
        this.found.object.material = this.found.object.userData.color;
        this.updateCamera();
      }
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
        this.insertSubproject(this.selectedSubprojects);
        const rmProjects = this.loadedSubprojects.filter(
          (x) => !this.selectedSubprojects.includes(x)
        );
        console.log(rmProjects);
        this.removeSubproject(rmProjects);
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
    this.container.addEventListener('pointerdown', this.pointerDown);
    this.container.addEventListener('pointermove', this.pointerMove);
    this.container.addEventListener('pointerup', this.pointerUp);
    // call this only in static scenes (i.e., if there is no animation loop)
  },
  created() {
    window.addEventListener('resize', this.resizeWindow);
  },
  destroyed() {
    this.scene.dispose();
    window.removeEventListener('resize', this.resizeWindow);
    this.controls.removeEventListener('change', this.updateCamera);
    this.container.removeEventListener('pointerdown', this.pointerDown);
    this.container.removeEventListener('pointermove', this.pointerMove);
    this.container.removeEventListener('pointerup', this.pointerUp);
  },
};
</script>

<style>
.scene-container {
  height: 100%;
  width: 100%;
}
</style>
