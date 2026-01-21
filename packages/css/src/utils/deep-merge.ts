/**
 * Deep merge two plain objects.
 * - Objects are merged recursively
 * - Primitive values are overridden
 * - Arrays are replaced
 */
export function deepMerge(
  base: Record<string, any>,
  override: Record<string, any>
): Record<string, any> {
  const result: Record<string, any> = { ...base };

  for (const key of Object.keys(override)) {
    const baseValue = base[key];
    const overrideValue = override[key];

    if (
      isPlainObject(baseValue) &&
      isPlainObject(overrideValue)
    ) {
      result[key] = deepMerge(baseValue, overrideValue);
    } else if (overrideValue !== undefined) {
      result[key] = overrideValue;
    }
  }

  return result;
}

function isPlainObject(value: unknown): value is Record<string, any> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  );
}
