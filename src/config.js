import { processTabConfig, invertNumArray, lovelace, subscribeRenderTemplate } from './helpers';
import { conditionalConfig } from './conditional-config';
import { styleHeader } from './style-header';

export const buildConfig = () => {
  const defaultConfig = {
    footer: false,
    background: 'var(--primary-color)',
    elements_color: 'var(--text-primary-color)',
    menu_color: '',
    voice_color: '',
    options_color: '',
    all_tabs_color: '',
    tabs_color: [],
    chevrons: true,
    indicator_top: false,
    hide_tabs: [],
    show_tabs: [],
  };

  let config = { ...defaultConfig, ...conditionalConfig(lovelace.config.custom_header) };

  subscribeRenderTemplate(
    result => {
      config = JSON.parse(result.replace('"true"', 'true').replace('"false"', 'false'));
      if (config.hide_tabs) config.hide_tabs = processTabConfig(config.hide_tabs);
      if (config.show_tabs) config.show_tabs = processTabConfig(config.show_tabs);
      if (config.show_tabs && config.show_tabs.length) config.hide_tabs = invertNumArray(config.show_tabs);
      delete config.show_tabs;
      styleHeader(config);
    },
    { template: JSON.stringify(config).replace(/\\/g, '') },
  );
};
