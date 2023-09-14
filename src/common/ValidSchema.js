import Ajv from "ajv";
import ajvErrors from "ajv-errors";

const ajv = new Ajv({ coerceTypes: true, removeAdditional: true, allErrors: true });
ajvErrors(ajv /*, {singleError: true} */)

class validAlert {
  check(inputObject, inputSchema) {
    const validate = ajv.compile(inputSchema);
    const valid = validate(inputObject);
    if (!valid) {
      return validate.errors[0].message;
    }
    return '';
  }
}

export default new validAlert();