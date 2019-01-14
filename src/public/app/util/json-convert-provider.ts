import { JsonConvert, ValueCheckingMode } from 'json2typescript';
import * as _ from 'lodash';

/**
 * Implement this interface run a custom initilization task after parsing a json object.
 * For example sorting items in an array.
 */
export interface JsonInitialize<T> {
  initialize(): T;
}

/**
 * Custom implementation of JsonConvert that calls an initialize method if one exists
 * after deserialization.
 */
class JsonConvertCustom extends JsonConvert {

  public constructor(operationMode?: number, valueCheckingMode?: number, ignorePrimitiveChecks?: boolean) {
    super(operationMode, valueCheckingMode, ignorePrimitiveChecks);
  }

  public deserializeArray(jsonArray: any[], classReference: { new (): any; }): any[] {
    const instance = super.deserializeArray(jsonArray, classReference);
    return this.callInitialize(instance);
  }

  public deserializeObject(jsonObject: any, classReference: { new (): any; }): any {
    const instance = super.deserializeObject(jsonObject, classReference);
    return this.callInitialize(instance);
  }

  private callInitialize(instance?: any): any {
    // sadly, since typescript compiles in to javscript there is
    // no way actual way to check if an interface is implemented
    if (instance != null && _.isFunction(instance.initialize)) {
      return instance.initialize.call(instance);
    }
    return instance;
  }
}

const jsonConvert: JsonConvert = new JsonConvertCustom(null, ValueCheckingMode.ALLOW_NULL);

export { jsonConvert };
