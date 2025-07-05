export interface PluginOptions {
  customOption: boolean;
}

export function myPluginInit(options: PluginOptions | null | undefined) {
  if (options?.customOption) {
    console.log('MyPlugin initialized with customOption = true');
  } else {
    console.log('MyPlugin initialized with default or no options');
  }
}
