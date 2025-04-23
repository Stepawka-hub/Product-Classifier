export class BaseResponseDto {
  resultCode: number;
  message: string;

  constructor(resultCode: number, message: string = '') {
    this.resultCode = resultCode;
    this.message = message;
  }

  static Success(): BaseResponseDto {
    return new BaseResponseDto(0);
  }

  static Error(message: string, code: number = 1): BaseResponseDto {
    return new BaseResponseDto(code, message);
  }
}
