// filepath: c:\wamp64\www\wp-content\themes\WordPress-Theme-Educ-main\react-app\src\global.d.ts
declare module "*.module.scss" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }

  // Ajoutez cette ligne pour définir JSX.Element
  type Element = any;
}