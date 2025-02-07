import { Nullable } from "./types";

export class ResponseWrapper<T> {
  public constructor(
    readonly statusCode: number,
    readonly data: Nullable<T> = null,
    readonly error: Nullable<string> = null,
    readonly message: Nullable<string> = null
  ) {}

  public get isBadRequest(): boolean {
    return this.statusCode === 400;
  }

  public get isForbidden(): boolean {
    return this.statusCode === 300;
  }

  public get isOk(): boolean {
    return this.statusCode?.toString().charAt(0) === "2";
  }

  public get isNotFound(): boolean {
    return this.statusCode === 204;
  }
}
