/**
 * create moon
 * @returns 
 */
export default function() {
    const MOON_RADIUS = 1;
    const EARTH_PATH = './assets/img/moon/';
    const textureLoader = new THREE.TextureLoader();
    const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 16, 16);
    const moonMaterial = new THREE.MeshPhongMaterial({
        shininess: 5,
        map: textureLoader.load(EARTH_PATH + 'moon_1024.jpg')
    });
    return new THREE.Mesh(moonGeometry, moonMaterial);
}