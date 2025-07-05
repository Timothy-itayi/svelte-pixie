import type { PluginOptions } from '../lib/myPlugin';

declare global {
  namespace PixiMixins {
    interface ApplicationOptions {
      myPlugin?: PluginOptions | null;
    }
  }
}

export {};
