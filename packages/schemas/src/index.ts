import text, { readOnlyText } from './text/index.js';
import image, { readOnlyImage } from './graphics/image.js';
import svg, { readOnlySvg } from './graphics/svg.js';
import barcodes from './barcodes/index.js';
import line from './shapes/line.js';
import table from './tables/index.js';
import date from './date/index.js';
import { modifyTemplateForTable, getDynamicHeightForTable } from './tables/dynamicTemplate.js';
import { rectangle, ellipse } from './shapes/rectAndEllipse.js';
import { convertForPdfLayoutProps, rotatePoint } from './utils.js';

const tableBeta = table;

const builtInPlugins = { Text: text };

export {
  text,
  date,
  readOnlyText,
  image,
  readOnlyImage,
  getDynamicHeightForTable,
  svg,
  readOnlySvg,
  barcodes,
  line,
  tableBeta,
  modifyTemplateForTable,
  rectangle,
  ellipse,
  builtInPlugins,
  convertForPdfLayoutProps,
  rotatePoint,
};
