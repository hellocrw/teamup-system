export interface PageResult<T> {
  pageNum?: number;
  pageSize?: number;
  totalSize?: number;
  totalPages?: number;
  content?: T;
}
