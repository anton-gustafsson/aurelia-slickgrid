import { AuSlickgridCustomElement } from './au-slickgrid';
import { SlickgridConfig } from './slickgrid-config';

export function configure(aurelia: any, callback: any) {
  aurelia.globalResources('./au-slickgrid');

  const config = new SlickgridConfig();

  if (typeof callback === 'function') {
    callback(config);
  }
}

export {
  AuSlickgridCustomElement,
  SlickgridConfig
};
