type ObjectType = {
  [key: string]: string;
};

type ResourceMapping = {
  resourceName: string;
  resourceIdKey?: string;
};

type PathGeneratorParams<K extends ObjectType, T extends ObjectType> = {
  resources?: K;
  queries?: T;
};

type PathGenerator<K extends ObjectType, T extends ObjectType> = (
  params?: PathGeneratorParams<K, T>,
) => string;

export function createPathGenerator<K extends ObjectType, T extends ObjectType>(
  ...resourceMappings: ResourceMapping[]
): PathGenerator<K, T> {
  if (resourceMappings.length === 0) {
    throw new Error('resourceMappings가 주어지지 않았습니다');
  }

  if (!resourceMappings.every(({ resourceName }) => resourceName)) {
    throw new Error('resourceName이 주어지지 않았습니다');
  }

  return (params) => {
    const { resources, queries } = params ?? {};

    let path = resourceMappings.reduce((path, mapping) => {
      const { resourceName, resourceIdKey = 'id' } = mapping;
      const resourceId = resources ? resources[resourceIdKey] : undefined;

      return path + `/${resourceName}` + (resourceId ? `/${resourceId}` : '');
    }, '');

    if (queries) {
      const queryParams = new URLSearchParams();
      Object.entries(queries).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });
      path += `?${queryParams.toString()}`;
    }

    return path;
  };
}
