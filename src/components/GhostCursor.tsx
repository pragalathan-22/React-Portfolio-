import { useEffect, useRef } from "react";

const vertexShader = `
  precision mediump float;
  attribute vec2 a_position;
  varying vec2 vUv;
  void main() {
    vUv = 0.5 * (a_position + 1.0);
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  varying vec2 vUv;
  uniform float u_time;
  uniform float u_ratio;
  uniform float u_size;
  uniform vec2 u_pointer;
  uniform float u_smile;
  uniform vec2 u_target_pointer;
  uniform vec3 u_main_color;
  uniform vec3 u_border_color;
  uniform float u_flat_color;
  uniform sampler2D u_texture;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m *= m;
    m *= m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  vec2 rotate(vec2 v, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(v.x * c - v.y * s, v.x * s + v.y * c);
  }
  float eyes(vec2 uv) {
    uv.y -= 0.5;
    uv.y *= 0.8;
    uv.x = abs(uv.x);
    uv.y += u_smile * 0.3 * pow(uv.x, 1.3);
    uv.x -= 0.6 + 0.2 * u_smile;
    float d = clamp(length(uv), 0.0, 1.0);
    return 1.0 - pow(d, 0.08);
  }
  float mouth(vec2 uv) {
    uv.y += 1.5;
    uv.x *= 0.5 + 0.5 * abs(1.0 - u_smile);
    uv.y *= 3.0 - 2.0 * abs(1.0 - u_smile);
    uv.y -= u_smile * 4.0 * pow(uv.x, 2.0);
    float d = clamp(length(uv), 0.0, 1.0);
    return 1.0 - pow(d, 0.07);
  }
  float faceShape(vec2 uv, float rotation) {
    uv = rotate(uv, rotation);
    uv /= 0.27 * u_size;
    float eyesShape = 10.0 * eyes(uv);
    float mouthShape = 20.0 * mouth(uv);
    float result = 0.0;
    result = mix(result, 1.0, eyesShape);
    result = mix(result, 1.0, mouthShape);
    return result;
  }
  void main() {
    vec2 point = u_pointer;
    point.x *= u_ratio;
    vec2 uv = vUv;
    uv.x *= u_ratio;
    uv -= point;
    float shape = texture2D(u_texture, vec2(vUv.x, 1.0 - vUv.y)).r;
    float noise = snoise(uv * vec2(0.7 / u_size, 0.6 / u_size) + vec2(0.0, 0.0015 * u_time));
    noise += 1.2;
    noise *= 2.1;
    noise += smoothstep(-0.8, -0.2, uv.y / u_size);
    float face = faceShape(uv, 5.0 * (u_target_pointer.x - u_pointer.x));
    shape = (shape - face) * noise;
    vec3 border = (1.0 - u_border_color);
    border.g += 0.2 * sin(0.005 * u_time);
    border *= 0.5;
    vec3 color = u_main_color - (1.0 - u_flat_color) * border * smoothstep(0.0, 0.01, shape);
    shape = u_flat_color * smoothstep(0.8, 1.0, shape) + (1.0 - u_flat_color) * shape;
    gl_FragColor = vec4(color * shape, shape);
  }
`;

type TrailPoint = { x: number; y: number; vx: number; vy: number; opacity: number; border: number; radius: number };

export function GhostCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: false });
    if (!canvas || !gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Ghost cursor shader error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };
    const vs = compile(gl.VERTEX_SHADER, vertexShader);
    const fs = compile(gl.FRAGMENT_SHADER, fragmentShader);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Ghost cursor program error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const uniforms = Object.fromEntries([
      "u_time", "u_ratio", "u_size", "u_pointer", "u_smile", "u_target_pointer",
      "u_main_color", "u_border_color", "u_flat_color", "u_texture",
    ].map((name) => [name, gl.getUniformLocation(program, name)]));
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const textureCanvas = document.createElement("canvas");
    const textureContext = textureCanvas.getContext("2d");
    const texture = gl.createTexture();
    if (!textureContext || !texture) return;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(uniforms.u_texture, 0);

    const size = window.matchMedia("(max-width: 640px)").matches ? 0.025 : 0.1;
    const count = 25;
    const points: TrailPoint[] = [];
    let x = window.innerWidth * 0.25;
    let y = window.innerHeight * 0.8;
    let targetX = x;
    let targetY = y;
    let smile = 1;
    let gravity = 0;
    let movingUntil = 0;
    let controlsPadding = 0;
    let frame = 0;
    let disposed = false;
    let lastTouch = 0;
    const radiusAt = (index: number) => size * window.innerHeight * (1 - 0.2 * Math.pow(3 * index / count - 1, 2));
    for (let i = 0; i < count; i++) {
      points.push({ x, y, vx: 0, vy: 0, opacity: 0.04 + 0.3 * Math.pow(1 - i / count, 4),
        border: 0.6 * (1 - i / count), radius: radiusAt(i) });
    }

    gl.uniform1f(uniforms.u_size, size);
    gl.uniform3f(uniforms.u_main_color, 0.98, 0.96, 0.96);
    gl.uniform3f(uniforms.u_border_color, 0.2, 0.5, 0.7);
    gl.uniform1f(uniforms.u_flat_color, 0);
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const updatePointer = (clientX: number, clientY: number) => {
      movingUntil = performance.now() + 300;
      targetX = clientX;
      const cursorSize = size * window.innerHeight;
      targetY = Math.max(cursorSize, clientY - 0.6 * cursorSize) - controlsPadding;
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") lastTouch = performance.now();
      updatePointer(event.clientX, event.clientY);
    };
    const onTouchMove = (event: TouchEvent) => {
      if (performance.now() - lastTouch < 500) return;
      const touch = event.touches[0];
      if (touch) updatePointer(touch.clientX, touch.clientY);
    };
    const onClick = (event: MouseEvent) => updatePointer(event.clientX, event.clientY);
    const onResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      textureCanvas.width = window.innerWidth;
      textureCanvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uniforms.u_ratio, canvas.width / canvas.height);
      points.forEach((point, index) => { point.radius = radiusAt(index); });
    };
    const drawTrail = () => {
      textureContext.fillStyle = "black";
      textureContext.fillRect(0, 0, textureCanvas.width, textureCanvas.height);
      points.forEach((point, index) => {
        if (index === 0) {
          point.x = x;
          point.y = y;
        } else {
          const previous = points[index - 1];
          point.vx += (previous.x - point.x) * 1.4;
          point.vx *= 0.3;
          point.vy += (previous.y - point.y) * 1.4;
          point.vy *= 0.3;
          point.vy += gravity;
          point.x += point.vx;
          point.y += point.vy;
        }
        const gradient = textureContext.createRadialGradient(point.x, point.y, point.radius * point.border, point.x, point.y, point.radius);
        gradient.addColorStop(0, `rgba(255,255,255,${point.opacity})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        textureContext.beginPath();
        textureContext.fillStyle = gradient;
        textureContext.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        textureContext.fill();
      });
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvas);
    };
    const render = (time: number) => {
      if (disposed) return;
      if (document.hidden) {
        frame = requestAnimationFrame(render);
        return;
      }
      const isMoving = time < movingUntil;
      if (isMoving) {
        smile = Math.max(-0.1, smile - 0.05);
        gravity = Math.max(0, gravity - 10 * size);
      } else {
        smile = Math.min(1, smile + 0.01);
        gravity = gravity > 25 * size ? (25 + 5 * (1 + Math.sin(0.002 * time))) * size : gravity + size;
      }
      x += (targetX - x) * 0.1;
      y += (targetY - y) * 0.1;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uniforms.u_time, time);
      gl.uniform1f(uniforms.u_smile, smile);
      gl.uniform2f(uniforms.u_pointer, x / window.innerWidth, 1 - y / window.innerHeight);
      gl.uniform2f(uniforms.u_target_pointer, targetX / window.innerWidth, 1 - targetY / window.innerHeight);
      drawTrail();
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frame = requestAnimationFrame(render);
    };

    const gui = document.querySelector<HTMLElement>(".lil-gui");
    const onGuiEnter = () => { if (gui) controlsPadding = -gui.getBoundingClientRect().height; };
    const onGuiLeave = () => { controlsPadding = 0; };
    gui?.addEventListener("mouseenter", onGuiEnter);
    gui?.addEventListener("mouseleave", onGuiLeave);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("click", onClick);
    onResize();
    frame = requestAnimationFrame(render);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      gui?.removeEventListener("mouseenter", onGuiEnter);
      gui?.removeEventListener("mouseleave", onGuiLeave);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("click", onClick);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas ref={canvasRef} className="ghost-cursor-canvas" aria-hidden="true" />;
}
