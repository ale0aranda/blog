export function getSvgPoint(svg: SVGSVGElement, clientX: number, clientY: number) {
  const matrix = svg.getScreenCTM();

  if (!matrix) {
    return null;
  }

  const point = svg.createSVGPoint();

  point.x = clientX;
  point.y = clientY;

  return point.matrixTransform(matrix.inverse());
}
