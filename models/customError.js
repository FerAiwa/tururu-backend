class CustomErr extends Error {
  constructor(code, message, context) {
    super();
    this.code = code;
    this.message = message;
    this.context = context || '';
  }
}

export default CustomErr;
