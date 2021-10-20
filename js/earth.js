/**
 * create earth
 * @returns 
 */
export default function() {
    const EARTH_RADIUS = 5;
    const EARTH_PATH = './assets/img/earth/';
    const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 16, 16);
    const textureLoader = new THREE.TextureLoader();
    const earthMaterial = new THREE.MeshPhongMaterial({
        specular: 0x333333,
        shininess: 5,
        map: textureLoader.load(EARTH_PATH + 'earth_atmos_2048.jpg'),
        specularMap: textureLoader.load(EARTH_PATH + 'earth_specular_2048.jpg'),
        normalMap: textureLoader.load(EARTH_PATH + 'earth_normal_2048.jpg'),
        normalScale: new THREE.Vector2(0.85, 0.85)
    });
    return new THREE.Mesh(earthGeometry, earthMaterial);
}