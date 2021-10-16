export class ErrorHandler implements Error {
  public message: string;
  public status: number;
  public name: string;

  constructor(status: number, message: string, name?: string) {
    this.message = message;
    this.status = status;

    if (name) {
      this.name = name;
    }
  }
}
