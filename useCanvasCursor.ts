import { useEffect } from 'react';

interface NoiseConfig {
  phase?: number;
  offset?: number;
  frequency?: number;
  amplitude?: number;
}

class Noise {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;

  constructor({ phase = 0, offset = 0, frequency = 0.001, amplitude = 1 }: NoiseConfig) {
    this.phase = phase;
    this.offset = offset;
    this.frequency = frequency;
    this.amplitude = amplitude;
  }

  update() {
    this.phase += this.frequency;
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface LineConfig {
  spring: number;
}

class Line {
  spring: number;
  friction: number;
  nodes: Node[];

  constructor({ spring }: LineConfig) {
    this.spring = spring + 0.1 * Math.random() - 0.02;
    this.friction = 0.5 + 0.01 * Math.random() - 0.002;
    this.nodes = [];
    for (let i = 0; i < 50; i++) {
      this.nodes.push({ x: 0, y: 0, vx: 0, vy: 0 });
    }
  }

  update(pos: { x: number; y: number }) {
    let spring = this.spring;
    let t = this.nodes[0];
    t.vx += (pos.x - t.x) * spring;
    t.vy += (pos.y - t.y) * spring;
    for (let i = 0; i < this.nodes.length; i++) {
      t = this.nodes[i];
      if (i > 0) {
        let n = this.nodes[i - 1];
        t.vx += (n.x - t.x) * spring;
        t.vy += (n.y - t.y) * spring;
        t.vx += n.vx * 0.25;
        t.vy += n.vy * 0.25;
      }
      t.vx *= this.friction;
      t.vy *= this.friction;
      t.x += t.vx;
      t.y += t.vy;
      spring *= 0.98;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.nodes[0].x, this.nodes[0].y);
    for (let i = 1; i < this.nodes.length - 2; i++) {
      const t = this.nodes[i];
      const next = this.nodes[i + 1];
      const x = 0.5 * (t.x + next.x);
      const y = 0.5 * (t.y + next.y);
      ctx.quadraticCurveTo(t.x, t.y, x, y);
    }
    const penultimate = this.nodes[this.nodes.length - 2];
    const last = this.nodes[this.nodes.length - 1];
    ctx.quadraticCurveTo(penultimate.x, penultimate.y, last.x, last.y);
    ctx.stroke();
  }
}

const useCanvasCursor = () => {
  useEffect(() => {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    let pos = { x: 0, y: 0 };
    let lines: Line[] = [];
    let noise = new Noise({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (e instanceof MouseEvent) {
        pos.x = e.clientX;
        pos.y = e.clientY;
      } else if (e instanceof TouchEvent) {
        pos.x = e.touches[0].clientX;
        pos.y = e.touches[0].clientY;
      }
      e.preventDefault();
      if (lines.length === 0) {
        for (let i = 0; i < 20; i++) {
          lines.push(new Line({ spring: 0.4 + (i / 20) * 0.025 }));
        }
      }
    };

    const render = () => {
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = `hsla(${Math.round(noise.update())}, 50%, 50%, 0.2)`;
        ctx.lineWidth = 1;
        lines.forEach((line) => {
          line.update(pos);
          line.draw(ctx);
        });
        requestAnimationFrame(render);
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth - 20;
      canvas.height = window.innerHeight;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onMouseMove);
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    render();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
};

export default useCanvasCursor;
