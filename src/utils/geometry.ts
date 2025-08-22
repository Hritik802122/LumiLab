const SVG_WIDTH = 800;
const SVG_HEIGHT = 400;
const ORIGIN_X = SVG_WIDTH / 2;
const ORIGIN_Y = SVG_HEIGHT / 2;

interface RayParams {
  u: number;
  f: number;
  h: number;
  v: number;
  imageHeight: number;
  elementType: 'mirror' | 'lens';
  subtype: 'concave' | 'convex';
}

interface RayPath {
  path: { x: number, y: number }[];
  isVirtual: boolean;
  color: string;
}

export const getRayPaths = ({ u, f, h, v, imageHeight, elementType, subtype }: RayParams): RayPath[] => {
  const objX = ORIGIN_X - u;
  const objY = ORIGIN_Y - h;
  const imgX = ORIGIN_X + v;
  const imgY = ORIGIN_Y - imageHeight;

  const paths: RayPath[] = [];

  const isVirtualImage = (elementType === 'mirror' && v > 0) || (elementType === 'lens' && v < 0);

  // Ray 1: Parallel to principal axis
  const ray1: RayPath = { path: [], isVirtual: false, color: 'hsl(190, 80%, 60%)' };
  ray1.path.push({ x: objX, y: objY });
  ray1.path.push({ x: ORIGIN_X, y: objY });
  
  if (elementType === 'lens') {
    ray1.path.push({ x: imgX, y: imgY });
    if (isVirtualImage) {
        const virtualPart = [{ x: ORIGIN_X, y: objY }, { x: imgX, y: imgY }];
        paths.push({ path: virtualPart, isVirtual: true, color: 'hsl(190, 80%, 60%)' });
        ray1.path = [{ x: objX, y: objY }, { x: ORIGIN_X, y: objY }, { x: SVG_WIDTH, y: ORIGIN_Y - ((SVG_WIDTH-ORIGIN_X)/v) * imageHeight }];
    }
  } else { // Mirror
    ray1.path.push({ x: imgX, y: imgY });
    if(isVirtualImage){
        paths.push({path: [{x: ORIGIN_X, y: objY}, {x: imgX, y: imgY}], isVirtual: true, color: 'hsl(190, 80%, 60%)' });
        ray1.path = [{x: objX, y: objY}, {x: ORIGIN_X, y: objY}, {x: objX, y: ORIGIN_Y - (h/u) * (ORIGIN_X + 2*u) }]
    }
  }
  paths.push(ray1);
  
  // Ray 2: Through optical center/pole
  const ray2: RayPath = { path: [], isVirtual: false, color: 'hsl(30, 80%, 60%)' };
  ray2.path.push({ x: objX, y: objY });
  ray2.path.push({ x: ORIGIN_X, y: ORIGIN_Y });
  if (elementType === 'mirror' && !isVirtualImage){
      ray2.path.push({ x: imgX, y: imgY });
  } else if(elementType === 'lens') {
      ray2.path.push({ x: imgX, y: imgY });
  }
  if (isVirtualImage) {
    const virtualPart = [{ x: (elementType === 'lens' ? ORIGIN_X : imgX) , y: (elementType === 'lens' ? ORIGIN_Y : imgY)}, { x: (elementType === 'lens' ? imgX : ORIGIN_X), y: (elementType === 'lens' ? imgY : ORIGIN_Y) }];
    paths.push({ path: virtualPart, isVirtual: true, color: 'hsl(30, 80%, 60%)' });
    if (elementType === 'lens') ray2.path = [{ x: objX, y: objY }, { x: SVG_WIDTH, y: ORIGIN_Y - (SVG_WIDTH - objX) * h / (-u) }];
  }
  paths.push(ray2);

  // Ray 3: Through focus
  const ray3: RayPath = { path: [], isVirtual: false, color: 'hsl(100, 80%, 60%)' };
  const focusX = ORIGIN_X + (elementType === 'lens' ? -f : f);
  ray3.path.push({ x: objX, y: objY });

  if (Math.abs(objX - focusX) > 1) {
    const yAtLens = ORIGIN_Y - h * (ORIGIN_X - focusX) / (objX - focusX);
    ray3.path.push({ x: ORIGIN_X, y: yAtLens });
    ray3.path.push({ x: imgX, y: imgY });
    
    if (isVirtualImage) {
        const virtualPart = [{x: ORIGIN_X, y: yAtLens}, {x: imgX, y: imgY}];
        paths.push({ path: virtualPart, isVirtual: true, color: 'hsl(100, 80%, 60%)'});
        ray3.path = [{ x: objX, y: objY }, {x: ORIGIN_X, y: yAtLens}, {x: elementType === 'lens' ? SVG_WIDTH : 0, y: yAtLens}];
    }
    paths.push(ray3);
  }

  return paths.filter(p => p.path.length > 1);
};