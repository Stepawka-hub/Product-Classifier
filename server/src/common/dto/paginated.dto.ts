export class PaginatedResponseDto<T> {
  constructor(
    public readonly items: T[],
    public readonly total: number,
  ) {}
}
