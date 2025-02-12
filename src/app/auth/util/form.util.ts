export function mapObjectToInterface<T>(rawValue: Record<string, any>, defaultValue: string = ''): T {
  return Object.keys(rawValue).reduce((acc, key) => {
    acc[key as keyof T] = rawValue[key] ?? defaultValue;
    return acc;
  }, {} as T);
}
