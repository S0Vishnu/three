import './style.css'
import * as THREE from 'three'

//loader
const textureloader = new THREE.TextureLoader()
const normalTexture = textureloader.load('/textures/texture-5.png')

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// const mapCanvas = document.querySelector('canvas.mapCanvas')

// Scene
const scene = new THREE.Scene()

//variables
const Ri = .7
const Ro = 1.1
const Segments = 32
let Start = 0
let Length = 0

// Objects
const geometry = new THREE.BoxGeometry(.8, .8, .8);
const geometry2 = new THREE.RingGeometry(Ri, Ro, Segments, undefined, Start, Length)

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0
material.roughness = .8
material.normalMap = normalTexture
material.color = new THREE.Color(0x3A5BA0)

const material1 = new THREE.MeshStandardMaterial()
material1.color = new THREE.Color(0x3A5BA0)

// Mesh
const sphere = new THREE.Mesh(geometry, material)
    // sphere.position.x = 1
    // scene.add(sphere)

const ring = new THREE.Mesh(geometry2, material1)
ring.position.x = 0
ring.position.y = 0
ring.position.z = 0
scene.add(ring)

// ring.thetaStart = Math.PI * 0
// console.log(ring)

ring.geometry.dispose()

// const tl = gsap.timeline({ delay: 1, repeat: 0, defaults: { ease: "power2.inOut" } });
// tl.add(() =>
//     gsap.to(ring.position, { x: 1, duration: 2 })
// )

console.log(Length)

// gsap.to(ring, { delay: 2, duration: 2, Length: Math.PI })
// Length = Math.PI

// ring.geometry = new THREE.RingGeometry(Ri, Ro, Segments, undefined, Start, Length)

// Lights

const pointLight = new THREE.AmbientLight(0xffffff, .1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0x7F8487, 1)
pointLight2.position.set(1, -1, 1)
pointLight2.intensity = 5
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0x7F8487, 1)
pointLight3.position.set(-1, 1, .3)
pointLight3.intensity = 4
scene.add(pointLight3)

//Shape


// console.log(gsap)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

const camera2 = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera2.position.x = 0
camera2.position.y = 0
camera2.position.z = 1
scene.add(camera2)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.autoClear = false

/**
 * Animate
 */
let value = .5

document.getElementById("left").addEventListener("click", left)

function left() {
    value = -.5
}
document.getElementById("right").addEventListener("click", right)

function right() {
    value = .5
}

const mapheight = 200,
    mapwidth = 395

const clock = new THREE.Clock()

function render() {
    renderer.clear()

    renderer.setViewport(0, 0, sizes.width, sizes.height)

    renderer.render(scene, camera)

    renderer.setViewport(10, sizes.height - mapheight - 10, mapwidth, mapheight)

    // renderer.render(scene, camera2)
}

function update() {

    const elapsedTime = clock.getElapsedTime()

    // console.log(elapsedTime)

    // Update objects
    Length = elapsedTime - 2
    if (Length > (3 * Math.PI) / 2)
        Length = (3 * Math.PI) / 2

    // console.log(Math.PI)
    if (Length >= (3 * Math.PI) / 2) {
        Start = elapsedTime - 2 - ((3 * Math.PI) / 2)
        Length = ((3 * Math.PI) / 2) - (elapsedTime - 2 - ((3 * Math.PI) / 2))
        if (Length.toFixed(3) <= 0.785) {
            Start = (5 * Math.PI) / 4
            Length = Math.PI / 4
        }
    }

    if (elapsedTime > 1) {
        ring.geometry.dispose()
        ring.geometry = new THREE.RingGeometry(Ri, Ro, Segments, undefined, Start, Length)
    }
    sphere.rotation.y = value * elapsedTime



}

function animate() {

    // Render
    render()

    //update
    update()

    // Call tick again on the next frame
    window.requestAnimationFrame(animate)
}

animate()