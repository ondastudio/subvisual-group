document.addEventListener("DOMContentLoaded", () => {
    let pauseIt = false;
  
    const container = document.querySelector(".experience");
    let renderer = null;
    let scene = null;
    let camera = null;
  
    let width = container.getBoundingClientRect().width;
    let height = container.getBoundingClientRect().height;
    let fixedWidth = window.innerWidth;
    let fixedHeight = window.innerHeight;
    let dim = Math.min(width, height);
  
    let mouse = { x: width * 0.5, y: height * 0.5 };
    let tmouse = { x: width * 0.5, y: height * 0.5 };
    let time = 0;
    let perspective = 800;
  
    let mesh1, mesh2;
    let lightDist, lightOffset, spotLight, backLight1, backLight2;
  
    let updateID = -1;
  
    init();
  
    function init() {
      renderer = new THREE.WebGLRenderer({
        alpha: false,
        stencil: false,
        preserveDrawingBuffer: false // use TRUE to capture sceens;
      });
  
      renderer.setSize(width, height);
  
      container.appendChild(renderer.domElement);
  
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
  
      addEvents();
      setupQuality();
      createMesh();
      initLights();
      initCamera();
      update();
    }
  
    function addEvents() {
      window.addEventListener("resize", resize);
      window.addEventListener("mousemove", (e) => {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
      });
    }
  
    function initLights() {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
      scene.add(hemisphereLight);
  
      scene.add(new THREE.AmbientLight(0x111111));
  
      lightDist = 4;
      lightOffset = 2;
  
      backLight1 = new THREE.SpotLight(0xffffff, 2);
      backLight1.position.set(dim, dim, 0);
      backLight1.lookAt(0, 0, 0);
      scene.add(backLight1);
  
      backLight2 = new THREE.SpotLight(0xffffff, 2);
      backLight2.position.set(-dim, -dim, 0);
      backLight2.lookAt(0, 0, 0);
      scene.add(backLight2);
  
      backLight3 = new THREE.SpotLight(0xffffff, 0.5);
      backLight3.position.set(-dim * 3, dim * 3, -dim * 3);
      backLight3.lookAt(0, 0, 0);
      scene.add(backLight3);
  
      backLight4 = new THREE.SpotLight(0xffffff, 0.5);
      backLight4.position.set(dim * 4, -dim * 4, -dim);
      backLight4.lookAt(0, 0, 0);
      scene.add(backLight4);
    }
  
    function initCamera() {
      const fov = (180 * (2 * Math.atan(height / 2 / perspective))) / Math.PI;
  
      camera = new THREE.PerspectiveCamera(fov, width / height, 50, 900);
      camera.position.set(0, 0, perspective);
      camera.lookAt(0, 0, 0);
    }
  
    function createMesh() {
      const geometry = new THREE.SphereGeometry(dim * 0.5, 64, 64);
  
      const material = new THREE.MeshPhongMaterial({
        color: 0x090909,
        specular: 0x555555,
        shininess: 10
      });
  
      mesh1 = new THREE.Mesh(geometry, material);
      mesh2 = new THREE.Mesh(geometry, material);
  
      mesh1.position.x = -dim * 0.3525;
      mesh1.position.y = -dim * 0.3525;
      mesh2.position.x = dim * 0.3525;
      mesh2.position.y = dim * 0.3525;
  
      scene.add(mesh1, mesh2);
    }
  
    function setupQuality() {
      renderer.setClearColor(0x000000, 0);
      renderer.shadowMap.autoUpdate = true;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.gammaFactor = 2.1;
      renderer.physicallyCorrectLights = false;
      renderer.toneMappingExposure = 1;
      renderer.powerPreference = "high-performance";
      renderer.antialias = true;
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    }
  
    function update() {
      if (renderer === undefined || scene === undefined || camera === undefined)
        return;
  
      if (pauseIt) {
        cancelAnimationFrame(updateID);
      } else {
        updateID = requestAnimationFrame(() => update());
      }
  
      time += 0.01;
      tmouse.x += (mouse.x - tmouse.x) * 0.05;
      tmouse.y += (mouse.y - tmouse.y) * 0.05;
  
      mesh1.position.x = -dim * (0.425 + Math.sin(time) * 0.0725);
      mesh1.position.y = -dim * (0.425 + Math.sin(time) * 0.0725);
      mesh2.position.x = dim * (0.425 + Math.sin(time) * 0.0725);
      mesh2.position.y = dim * (0.425 + Math.sin(time) * 0.0725);
  
      backLight1.intensity = 1.25 - Math.sin(time) * 0.75;
      backLight2.intensity = 1.25 - Math.sin(time) * 0.75;
  
      backLight3.position.x = -dim * 3 + Math.sin(time * 0.3) * dim * 15;
      backLight3.position.y = dim * 3 + Math.cos(time * 0.5) * dim * 15;
      backLight3.position.z = -dim * 3 + Math.sin(time * 0.7) * dim * 15;
  
      backLight4.position.x = dim * 4 + Math.cos(time * 0.65) * dim * 15;
      backLight4.position.y = -dim * 4 + Math.sin(time * 0.35) * dim * 15;
      backLight4.position.z = -dim + Math.cos(time * 0.45) * dim * 15;
  
      camera.position.x = map(tmouse.x, 0, width, -dim * 0.3, dim * 0.3);
      camera.lookAt(0, 0, 0);
  
      camera.rotation.z = time * 0.1;
  
      renderer.render(scene, camera);
    }
  
    function resize() {
      width = container.getBoundingClientRect().width;
      height = container.getBoundingClientRect().height;
  
      dim = Math.min(width, height);
  
      renderer.setSize(width, height);
      camera.fov = (180 * (2 * Math.atan(height / 2 / perspective))) / Math.PI;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  
    function map(value, istart, istop, ostart, ostop) {
      return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
    }
  
    function pause() {
      pauseIt = true;
    }
  
    function start() {
      pauseIt = false;
      update();
    }
  });
  