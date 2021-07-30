class Cookie {
  get (key: string): string | undefined {
    return document.cookie.split('; ')
      .find(row => row.startsWith(key))
      ?.split('=')[1];
  }

  set (key: string, value: string, expires?: number) {
    let cookieString = `${key}=${value}`;
    if (expires !== undefined) {
      const expiresDate = new Date();
      cookieString = `${cookieString}; expires=${expiresDate.setDate(expiresDate.getDate() + expires)}`;
    }

    document.cookie = cookieString;
  }

  remove (key: string): void {
    this.set(key, '', -1);
  }
}

export default new Cookie();
