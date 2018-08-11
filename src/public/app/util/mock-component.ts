import { Component } from '@angular/core';


export namespace MockComponent {

  /**
   * Examples:
   * MockComponent.mock({ selector: 'cranium' });
   * MockComponent.mock({ selector: 'arm', inputs: ['side'] });
   */
  export const mock = (options: Component): Component  => {
    const metadata: Component = {
      selector: options.selector,
      template: options.template || '',
      inputs: options.inputs,
      outputs: options.outputs
    };

    return Component(metadata)(<any> class M {});
  };

}
