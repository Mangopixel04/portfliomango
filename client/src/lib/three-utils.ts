// Three.js utility functions for 3D interactions
export interface ParticleSystemConfig {
  count: number;
  animation: string;
  interactivity: boolean;
  colors?: string[];
  size?: number;
}

export interface SceneConfig {
  background?: string;
  fog?: boolean;
  lights?: LightConfig[];
}

export interface LightConfig {
  type: 'ambient' | 'directional' | 'point' | 'spot';
  color: string;
  intensity: number;
  position?: [number, number, number];
}

// Placeholder implementations - would be expanded with actual Three.js integration
export class ParticleSystem {
  private config: ParticleSystemConfig;
  
  constructor(config: ParticleSystemConfig) {
    this.config = config;
    this.initialize();
  }

  private initialize() {
    // Initialize Three.js particle system
    console.log('Initializing particle system with config:', this.config);
  }

  animate() {
    // Animation loop
    requestAnimationFrame(() => this.animate());
  }

  dispose() {
    // Clean up resources
  }
}

export class WebGLScene {
  private config: SceneConfig;
  
  constructor(config: SceneConfig) {
    this.config = config;
    this.initialize();
  }

  private initialize() {
    // Initialize Three.js scene
    console.log('Initializing WebGL scene with config:', this.config);
  }

  addParticleSystem(particles: ParticleSystem) {
    // Add particle system to scene
  }

  render() {
    // Render the scene
  }

  dispose() {
    // Clean up resources
  }
}

export const createDefaultScene = (): WebGLScene => {
  return new WebGLScene({
    background: '#0a0a0a',
    fog: true,
    lights: [
      {
        type: 'ambient',
        color: '#404040',
        intensity: 0.4
      },
      {
        type: 'directional',
        color: '#ffffff',
        intensity: 0.8,
        position: [1, 1, 0.5]
      }
    ]
  });
};

export const createParticleSystem = (config?: Partial<ParticleSystemConfig>): ParticleSystem => {
  const defaultConfig: ParticleSystemConfig = {
    count: 1000,
    animation: 'floating',
    interactivity: true,
    colors: ['#3b82f6', '#06b6d4', '#8b5cf6'],
    size: 2
  };

  return new ParticleSystem({ ...defaultConfig, ...config });
};
