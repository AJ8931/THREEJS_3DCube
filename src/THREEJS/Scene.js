import React, { useEffect, useRef, useState } from "react";
import classes from "./Scene.module.css";
// import { useRef } from "react";
import * as THREE from "three";

const ThreeScene = () => {
    const X = useRef();
    const Y = useRef();
    const Z = useRef();
    const [X_Axis, setX_Axis] = useState(0);
    const [Y_Axis, setY_Axis] = useState(0);
    const [Z_Axis, setZ_Axis] = useState(1);
    const submitHandler = (event) => {
        // for reading ref is useful
        event.preventDefault();
        let X1 = parseFloat(X.current.value);
        let Y1 = parseFloat(Y.current.value);
        let Z1 = parseFloat(Z.current.value);


        setX_Axis(X1);
        setY_Axis(Y1);
        setZ_Axis(Z1);
    }

    useEffect(() => {
        console.log(X_Axis, Y_Axis, Z_Axis);
        const box = document.getElementById("rooot");
        const scene = new THREE.Scene();

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(800, 300);


        const camera = new THREE.PerspectiveCamera(50, 800 / 300, 0.1, 100);
        camera.position.z = 1;
        const geometry = new THREE.BoxGeometry(0.1,0.1,0.1);
        // const material = new THREE.MeshBasicMaterial({ color: 0x556b2f });
        const material = new THREE.MeshNormalMaterial();
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        if (box.hasChildNodes()) {
            box.removeChild(box.children[0]);
        }
        box.appendChild(renderer.domElement);

        function animate() {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            camera.position.z = Z_Axis;
            cube.position.x = X_Axis;
            cube.position.y = Y_Axis;

            renderer.render(scene, camera);
        }
        animate();


    }, [X_Axis, Y_Axis, Z_Axis])





    return (<>
        <form className={classes.form}>
            <h1>
                3-D CUBE
            </h1>

            <div className={classes.control} >
                <label htmlFor='X' >X-Value</label>
                <input type="number" name="X" required ref={X} />
            </div>
            <div className={classes.control} >
                <label htmlFor='Y' >Y-Value</label>
                <input type="number" name="Y" ref={Y} />
            </div>
            <div className={classes.control} >
                <label htmlFor='Z' >Z-Value</label>
                <input type="number" name="Z" ref={Z} />
            </div>
            <div className={classes.actions} onClick={submitHandler}>
                <button>Add</button>
            </div>
            <div id="rooot" className={classes.cube}>
            </div>
        </form>
    </>
    );
}
export default ThreeScene;