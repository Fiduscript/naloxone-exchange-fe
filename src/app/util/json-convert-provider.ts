import { JsonConvert, ValueCheckingMode } from 'json2typescript';

const jsonConvert: JsonConvert = new JsonConvert();
jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;

export { jsonConvert };