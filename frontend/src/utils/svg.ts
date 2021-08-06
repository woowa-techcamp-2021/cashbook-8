export const getSVGElement = (tag: string, attr: {[key: string]: string}): SVGElement => {
  const elem = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const key in attr) {
    elem.setAttribute(key, attr[key]);
  }
  return elem;
};
