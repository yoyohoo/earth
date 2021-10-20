import createEarth from './earth.js';
import createMoon from './moon.js';
import rotateSelf from './rotate.js';

window.onload = function() {

    var scene, camera, renderer, moon,
        earth, controls, manualRender, clock;

    function init() {

        /**
         * scene
         * camera 
         * renderer
         */
        {
            scene = new THREE.Scene();
            clock = new THREE.Clock();

            const axesHelper = new THREE.AxesHelper(5);
            scene.add(axesHelper);

            const width = window.innerWidth;
            const height = window.innerHeight;
            camera = new THREE.PerspectiveCamera(90, width / height, .1, 200);
            camera.position.set(20, 5, 2);
            camera.lookAt(scene.position);

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(width, height);
            renderer.setClearColor('black', 1);
            document.body.appendChild(renderer.domElement);
        }

        /**
         * create earth 
         */
        {
            earth = createEarth();
            scene.add(earth);
        }

        /**
         * earth label
         */
        {
            const earthDiv = document.createElement('div');
            earthDiv.className = 'label';
            earthDiv.textContent = '地球';
            earthDiv.style.color = '#fff';
            earthDiv.style.marginTop = '-1em';
            const earthLabel = new THREE.CSS2DObject(earthDiv);
            const EARTH_RADIUS = earth.geometry.parameters.radius;
            earthLabel.position.set(0, 2 * EARTH_RADIUS, 0);
            earth.add(earthLabel);
        }

        /**
         * create moon
         */
        {
            moon = createMoon();
            scene.add(moon);
        }

        /**
         * moon label
         */
        {
            const moonDiv = document.createElement('div');
            moonDiv.className = 'label';
            moonDiv.textContent = '月亮';
            moonDiv.style.color = '#fff';
            moonDiv.style.marginTop = '-1em';
            const moonLabel = new THREE.CSS2DObject(moonDiv);
            const MOON_RADIUS = moon.geometry.parameters.radius;
            moonLabel.position.set(0, MOON_RADIUS, 0);
            moon.add(moonLabel);
        }


        /**
         * light
         */
        {
            const color = 'gold';
            const intensity = 1;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(0, 20, 20);
            scene.add(light);
            scene.add(light.target);
        }


        controls = new THREE.OrbitControls(camera, renderer.domElement);
        manualRender = () => {
            controls.update();

            /**
             * 公转
             */
            {
                // if (mill) mill.rotateX(-Math.PI / 200)
                const elapsed = clock.getElapsedTime();
                moon.position.set(Math.sin(elapsed) * 10, 0, Math.cos(elapsed) * 10);
            }

            /**
             * 自转
             */
            {
                earth && rotateSelf(earth, { rx: -Math.PI / 500 });
            }

            // console.log(camera.position)

            renderer.render(scene, camera);
            requestAnimationFrame(manualRender);
        };
        window.onresize = function(r) {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
        };
    }

    init();
    manualRender();
}