export class GenericObject {
  static keys<KeysType extends PropertyKey, ValuesType = unknown>(obj: { [T in KeysType]?: ValuesType }): KeysType[] {
    return Object.keys(obj) as KeysType[]
  }

  static values<KeysType extends PropertyKey, ValuesType = unknown>(obj: {
    [T in KeysType]?: ValuesType
  }): ValuesType[] {
    return Object.values(obj) as ValuesType[]
  }

  static entries<KeysType extends PropertyKey, ValuesType = unknown>(obj: {
    [T in KeysType]?: ValuesType
  }): [KeysType, ValuesType][] {
    return Object.entries(obj) as [KeysType, ValuesType][]
  }
}
