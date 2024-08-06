
import * as THREE from "three";

import { OrbitControls as e } from "three/addons/controls/OrbitControls.js";

import { RGBELoader as t } from "three/addons/loaders/RGBELoader.js";

import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

import { MeshSurfaceSampler as o } from "three/addons/math/MeshSurfaceSampler.js";

import { EffectComposer as n } from "three/addons/postprocessing/EffectComposer.js";

import { RenderPass as r } from "three/addons/postprocessing/RenderPass.js";

import { ShaderPass as a } from "three/addons/postprocessing/ShaderPass.js";

import { UnrealBloomPass as s } from "three/addons/postprocessing/UnrealBloomPass.js";

import { SVGLoader as i } from "three/addons/loaders/SVGLoader.js";

import { Flow as l } from "three/addons/modifiers/CurveModifier.js";

let h = await new t().loadAsync(
  "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/equirectangular/blouberg_sunrise_2_1k.hdr"
);

(h.mapping = THREE.EquirectangularReflectionMapping),
  (function () {
    function t(e, t, o) {
      let n,
        r = t.length,
        a = new THREE.InstancedMesh(y.geometry, y.material, r);
      oe.set(0, 0, 0, 0), ne.set(1, 1, 1);
      for (let s = 0; s < r; s++) {
        if (
          (K.set(t[s][0], t[s][1], t[s][2]),
          (ee = K),
          ("ribbon" != o && "twist" != o) ||
            (ae.lookAt(K.x, 0, K.z), (oe = ae.quaternion)),
          1 != e && ne.set(e, e, e),
          $.compose(ee, oe, ne),
          "ribbon" == o)
        )
          n = new THREE.Color("red");
        else if ("light" == o || "light2" == o)
          n = new THREE.Color("burlywood");
        else if ("sphere" == o) {
          let e = ["white", "red"];
          n = new THREE.Color(e[Math.floor(Math.random() * e.length)]);
        } else "twist" == o && (n = new THREE.Color(getRandomColor(70)));
        a.setMatrixAt(s, $), a.setColorAt(s, n);
      }
      return a;
    }
    function d(e) {
      /*! this function from https://stackoverflow.com/questions/69025167/threejs-how-can-i-add-tetrahedron-geometry-to-the-surface */
      let t = this.attributes.position;
      if (null != this.index) return;
      let o = t.count / 3,
        n = [],
        r = new THREE.Triangle(),
        a = new THREE.Vector3(),
        s = new THREE.Vector3(),
        i = new THREE.Vector3();
      for (let l = 0; l < o; l++) {
        a.fromBufferAttribute(t, 3 * l + 0),
          s.fromBufferAttribute(t, 3 * l + 1),
          i.fromBufferAttribute(t, 3 * l + 2),
          r.set(a, s, i);
        let o = new THREE.Vector3();
        r.getMidpoint(o);
        let h = a.distanceTo(s),
          d = (Math.sqrt(3) / 2) * h * e,
          c = o.clone().normalize().setLength(d);
        o.add(c),
          n.push(
            o.clone(),
            a.clone(),
            s.clone(),
            o.clone(),
            s.clone(),
            i.clone(),
            o.clone(),
            i.clone(),
            a.clone()
          );
      }
      let l = new THREE.BufferGeometry().setFromPoints(n);
      return l.computeVertexNormals(), l;
    }
    function c() {
      const e = window.innerWidth,
        t = window.innerHeight;
      (M.aspect = e / t),
        M.updateProjectionMatrix(),
        w.setSize(e, t),
        q.setSize(e, t),
        D.setSize(e, t),
        p();
    }
    function E(e) {
      (e.isMesh || e.isInstancedMesh) &&
        !1 === N.test(e.layers) &&
        ((X[e.uuid] = e.material), (e.material = O));
    }
    function u(e) {
      X[e.uuid] && ((e.material = X[e.uuid]), delete X[e.uuid]);
    }
    function m() {
      requestAnimationFrame(m), R.update(), Q && Q.moveAlongCurve(7e-4), p();
    }
    function p() {
      _.getElapsedTime() > Y / 1e3 &&
        (B.layers.toggle(L), I.layers.toggle(L), _.stop(), _.start()),
        S &&
          (function (e) {
            for (let t = 0; t < e.count; t++)
              e.getMatrixAt(t, $),
                $.decompose(Z.position, Z.quaternion, Z.scale),
                (Z.position.y -= j * ((t % 4) + 1)),
                Z.position.y < -V
                  ? ((Z.position.y = V),
                    (Z.position.x = THREE.MathUtils.randFloat(-V, V)),
                    (Z.position.z = THREE.MathUtils.randFloat(-V, V)))
                  : t % 4 == 1
                  ? ((Z.position.x += F), (Z.position.z += k))
                  : t % 4 == 2
                  ? ((Z.position.x += F), (Z.position.z -= k))
                  : t % 4 == 3
                  ? ((Z.position.x -= F), (Z.position.z += k))
                  : ((Z.position.x -= F), (Z.position.z -= k)),
                (Z.rotation.x += THREE.MathUtils.randFloat(0, z)),
                (Z.rotation.z += THREE.MathUtils.randFloat(0, A)),
                Z.updateMatrix(),
                e.setMatrixAt(t, Z.matrix);
            e.instanceMatrix.needsUpdate = !0;
          })(S),
        f.traverse(E),
        q.render(),
        f.traverse(u),
        D.render();
    }
    let M,
      f,
      w,
      R,
      T,
      H,
      g,
      b,
      y,
      x,
      P,
      v,
      B,
      I,
      S,
      G,
      U = 1,
      C = [],
      V = 12;
    const z = Math.PI / 30,
      A = Math.PI / 50,
      j = 0.007,
      F = 0.005,
      k = 0.005,
      Z = new THREE.Object3D();
    let q, D;
    const L = 1,
      N = new THREE.Layers();
    N.set(L);
    const W = {
        exposure: 0,
        bloomStrength: 1,
        bloomThreshold: 0,
        bloomRadius: 0.1
      },
      O = new THREE.MeshBasicMaterial({
        color: "black"
      }),
      X = {},
      Y = 1e3,
      _ = new THREE.Clock();
    let Q, J;
    const K = new THREE.Vector3(),
      $ = new THREE.Matrix4();
    let ee = new THREE.Vector3(),
      te = new THREE.Euler(),
      oe = new THREE.Quaternion();
    const ne = new THREE.Vector3(1, 1, 1),
      re = new THREE.Vector3(0, 0, 0),
      ae = new THREE.Object3D();
    !(function () {
      const E = document.createElement("div");
      document.body.appendChild(E),
        ((f = new THREE.Scene()).background = "black"),
        (f.environment = h),
        (w = new THREE.WebGLRenderer({
          antialias: !0
        })).setPixelRatio(window.devicePixelRatio),
        w.setSize(window.innerWidth, window.innerHeight),
        (w.toneMapping = THREE.ReinhardToneMapping),
        E.appendChild(w.domElement),
        (M = new THREE.PerspectiveCamera(
          35,
          window.innerWidth / window.innerHeight,
          0.01,
          500
        )).position.set(0, 0.8, 25),
        M.lookAt(0, 0, 0);
      const u = new r(f, M),
        p = new s(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          W.bloomStrength,
          W.bloomRadius,
          W.bloomThreshold
        );
      ((q = new n(w)).renderToScreen = !1), q.addPass(u), q.addPass(p);
      const z = new a(
        new THREE.ShaderMaterial({
          uniforms: {
            baseTexture: {
              value: null
            },
            bloomTexture: {
              value: q.renderTarget2.texture
            }
          },
          vertexShader: document.getElementById("vertexshader").textContent,
          fragmentShader: document.getElementById("fragmentshader").textContent,
          defines: {}
        }),
        "baseTexture"
      );
      (z.needsSwap = !0),
        (D = new n(w)).addPass(u),
        D.addPass(z),
        (b = new THREE.MeshBasicMaterial({
          color: "white",
          reflectivity: 0.8,
          envMap: h
        })),
        (J = (function () {
          let e,
            t = new THREE.Vector3();
          (C = []), (T = new THREE.PlaneGeometry(0.05, 0.05));
          for (let o = 0; o < 700; o++) {
            const o = Math.acos(THREE.MathUtils.randFloatSpread(2)),
              n = THREE.MathUtils.randFloatSpread(360);
            (t.x = 2 * Math.sin(o) * Math.cos(n)),
              (t.y = 15 * Math.abs(2 * Math.sin(o) * Math.sin(n)) - 30),
              (t.z = 2 * Math.cos(o)),
              (e = Math.random()),
              t.copy(t).multiplyScalar(e);
            let r = T.clone();
            r.rotateX(Math.random() * Math.PI),
              r.rotateY(Math.random() * Math.PI),
              r.rotateZ(Math.random() * Math.PI),
              r.translate(t.x, t.y, t.z),
              C.push(r);
          }
          return (
            (T = BufferGeometryUtils.mergeGeometries(C)).rotateZ(-Math.PI / 2),
            (T.attributes.position.needsUpdate = !0),
            T.center(),
            T.computeBoundingBox(),
            T.computeVertexNormals(),
            (H = b.clone()).color.set("khaki"),
            (H.side = THREE.DoubleSide),
            (g = new THREE.Mesh(T, H))
          );
        })());
      let A = (function (e = 1, t = 1, o = 100, n) {
        const r = [];
        let a, s, i, l;
        for (let h = 0; h <= o; h++)
          (s = (a = e * h) * Math.cos(h)),
            (l = a * Math.sin(h)),
            (i = t * -h + n),
            r.push(new THREE.Vector3(s, i, l));
        for (let h = o; h >= 0; h--)
          (s = (a = e * h) * Math.cos(-h)),
            (l = a * Math.sin(-h)),
            (i = t * -h + n),
            r.push(new THREE.Vector3(s, i, l));
        return new THREE.CatmullRomCurve3(r, !0, "centripetal", 0);
      })(0.24, 0.2 * 3, 25, 10);
      A.getPoints(25),
        new THREE.Mesh(T, H),
        (Q = new l(J)).updateCurve(0, A),
        f.add(Q.object3D),
        (function () {
          const e = document.querySelector("svg#snowflake").outerHTML,
            t = new i().parse(e).paths[0],
            o = i.createShapes(t)[0];
          let n = new THREE.ExtrudeGeometry(o, {
            steps: 1,
            depth: 10,
            bevelEnabled: !0,
            bevelThickness: 0,
            bevelSize: 0,
            bevelOffset: -3,
            bevelSegments: 0
          });
          n.scale(0.002, 0.002, 0.002),
            (n = BufferGeometryUtils.mergeVertices(n, 1e-4)).center(),
            (n.attributes.position.needsUpdate = !0),
            n.computeBoundingBox(),
            n.computeVertexNormals(),
            (H = b.clone()).color.set("white"),
            (H.reflectivity = 0.8),
            (S = new THREE.InstancedMesh(n, H, 128)),
            oe.set(0, 0, 0, 0),
            ne.set(1, 1, 1);
          for (let e = 0; e < 128; e++)
            K.set(
              THREE.MathUtils.randFloat(-V, V),
              THREE.MathUtils.randFloat(-V, V),
              THREE.MathUtils.randFloat(-V, V)
            ),
              (ee = K),
              te.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
              ),
              oe.setFromEuler(te),
              (ne.x = ne.y = ne.z = 0.5 * Math.random() + 0.5),
              $.compose(ee, oe, ne),
              S.setMatrixAt(e, $);
          f.add(S);
        })(),
        (T = (function (e, t, o) {
          let n = [];
          for (let r = 0; r < 2 * e; r++) {
            let a, s;
            n.push(0, 0, -o / 2),
              r % 2 == 0 ? ((a = t), (s = 1)) : ((a = 1), (s = t));
            let i = ((r + 1) / e) * Math.PI;
            n.push(Math.cos(i) * a, Math.sin(i) * a, 0),
              (i = (r / e) * Math.PI),
              n.push(Math.cos(i) * s, Math.sin(i) * s, 0),
              n.push(0, 0, o / 2),
              (i = (r / e) * Math.PI),
              n.push(Math.cos(i) * s, Math.sin(i) * s, 0),
              (i = ((r + 1) / e) * Math.PI),
              n.push(Math.cos(i) * a, Math.sin(i) * a, 0);
          }
          return (
            (n = new Float32Array(n)),
            (T = new THREE.BufferGeometry()).setAttribute(
              "position",
              new THREE.BufferAttribute(n, 3)
            ),
            T.rotateZ(-Math.PI / e / 2),
            (T.attributes.position.needsUpdate = !0),
            T.computeVertexNormals(),
            T.center(),
            T
          );
        })(5, 2, 1.78)),
        (H = b.clone()).color.set("yellow"),
        (H.reflectivity = 1);
      const j = new THREE.Mesh(T, H);
      let F;
      (j.position.y = 5.7), (U = 0.35), j.scale.set(U, U, U), f.add(j);
      let k = [],
        Z = [];
      (T = new THREE.CylinderGeometry(0.1, 4.5, 10, 8, 1, !0)),
        (g = new THREE.Mesh(T, new THREE.MeshBasicMaterial())),
        (F = new o(g).build()),
        (G = 0.1),
        (U = 3),
        (THREE.BufferGeometry.prototype.tripleFace = d);
      let N = new THREE.IcosahedronGeometry(G, 0).tripleFace(U);
      C = [];
      for (let e = 0; e < 2e3; e++)
        F.sample(K, re),
          (T = N.clone()).rotateX(Math.random() * Math.PI),
          T.rotateY(Math.random() * Math.PI),
          T.rotateZ(Math.random() * Math.PI),
          T.translate(K.x, K.y, K.z),
          C.push(T);
      (T = BufferGeometryUtils.mergeGeometries(C)).computeVertexNormals(),
        (H = b.clone()).color.set("#5f8f00"),
        (H.reflectivity = 0.8),
        (x = new THREE.Mesh(T, H)),
        f.add(x),
        (T = new THREE.CylinderGeometry(0.6, 5, 10, 8, 1, !0)),
        (k = []),
        (Z = []),
        (g = new THREE.Mesh(T, new THREE.MeshBasicMaterial())),
        (F = new o(g).build());
      for (let e = 0; e < 2282; e++) F.sample(K, re), k.push([K.x, K.y, K.z]);
      let O = [];
      for (let e = 0; e < 70; e++) {
        let e = Math.floor(Math.random() * k.length);
        O.push(k.splice(e, 1)[0]);
      }
      let X = [];
      for (let e = 0; e < 70; e++) {
        let e = Math.floor(Math.random() * k.length);
        X.push(k.splice(e, 1)[0]);
      }
      let Y = [];
      for (let e = 0; e < 22; e++) {
        let e = Math.floor(Math.random() * k.length);
        Y.push(k.splice(e, 1)[0]);
      }
      let _ = [];
      for (let e = 0; e < 0; e++) {
        let e = Math.floor(Math.random() * k.length);
        _.push(k.splice(e, 1)[0]);
      }
      let ae = [];
      for (let e = 0; e < 120; e++) {
        let e = Math.floor(Math.random() * k.length);
        ae.push(k.splice(e, 1)[0]);
      }
      (G = 0.24),
        (U = 1),
        (T = new THREE.SphereGeometry(G, 20, 20)),
        (H = b.clone()),
        (y = new THREE.Mesh(T, H)),
        (P = t(U, ae, "sphere")),
        f.add(P),
        (U = 1),
        (T = (function (e) {
          let t = 1.5 * e,
            o = new THREE.SphereGeometry(e, 10, 10);
          const n = o.attributes.position;
          for (let r = 0; r < n.count; r++)
            n.getY(r) > e / 3 &&
              (o.attributes.position.setX(r, 0),
              o.attributes.position.setY(r, t),
              o.attributes.position.setZ(r, 0));
          (C = []), o.translate(0, -t, 0);
          let r = o.clone();
          return (
            r.rotateZ(Math.PI / 2),
            C.push(r),
            (r = o.clone()).rotateZ(-Math.PI / 2),
            C.push(r),
            (r = o.clone()).scale(0.7, 1.5, 0.7),
            r.rotateZ(Math.PI / 8),
            C.push(r),
            (r = o.clone()).scale(0.7, 1.5, 0.7),
            r.rotateZ(-Math.PI / 8),
            C.push(r),
            (r = new THREE.SphereGeometry(t / 2.3, 5, 5)),
            C.push(r),
            (o = BufferGeometryUtils.mergeGeometries(C)),
            (o = BufferGeometryUtils.mergeVertices(o, e / 10)).scale(1, 1, 0.7),
            o.rotateX(-Math.PI / 7),
            (o.attributes.position.needsUpdate = !0),
            o.computeBoundingBox(),
            o.computeVertexNormals(),
            o
          );
        })((G = 0.15))),
        ((H = b.clone()).reflectivity = 0.4),
        (y = new THREE.Mesh(T, H)),
        (v = t(U, Y, "ribbon")),
        f.add(v),
        (G = 0.11),
        (U = 1),
        (T = new THREE.SphereGeometry(G, 10, 10)),
        (y = new THREE.Mesh(T, new THREE.MeshBasicMaterial())),
        (B = t(U, O, "light")),
        f.add(B),
        (I = t(U, X, "light2")).layers.toggle(L),
        f.add(I),
        ((R = new e(M, w.domElement)).autoRotate = !0),
        (R.autoRotateSpeed = 1),
        (R.enableDamping = !0),
        (R.enablePan = !1),
        (R.minDistance = 8),
        (R.maxDistance = 30),
        (R.minPolarAngle = 0),
        (R.maxPolarAngle = Math.PI / 2),
        R.target.set(0, 0, 0),
        R.update(),
        m(),
        window.addEventListener("resize", c);
    })();
  })();