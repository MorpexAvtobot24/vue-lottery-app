export interface Readable<T, TResponse = T[]> {
  getAll(params?: { limit?: number; skip?: number; q?: string }): Promise<TResponse>;
  getById(id: number): Promise<T>;
}

export interface Creatable<T, TCreate> {
  create(data: TCreate): Promise<T>;
}

export interface Editable<T, TUpdate> {
  update(id: number, data: TUpdate): Promise<T>;
}

export interface Deletable {
  delete(id: number): Promise<void>;
}