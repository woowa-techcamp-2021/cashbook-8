class HTTPError {
  status: number;

  constructor (status: number) {
    this.status = status;
  }

  static isHTTPError (status: number): boolean {
    if (status >= 400) {
      return true;
    }

    return false;
  }
}

export default HTTPError;
