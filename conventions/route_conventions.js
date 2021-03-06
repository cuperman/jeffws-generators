'use strict';

const { packageName } = require('../lib/packageJson');
const { camelCaps, camelCase, snakeCase } = require('../lib/casing');
const { capitalize, join, words } = require('lodash');

function typeName(type = '') {
  if (type.toLowerCase() === 'member') {
    return 'Member';
  }
  return 'Collection';
}

module.exports = {
  // package-specific
  restApiName: () => `${camelCaps(packageName)}RestApi`,
  restApiDeploymentName: () => `${camelCaps(packageName)}RestApiDeployment`,
  restApiHumanReadableName: () => capitalize(join(words(packageName), ' ')),
  restApiUrlName: (stage) => `${camelCaps(packageName)}RestApiUrl${camelCaps(stage)}`,

  // resource-specific
  restApiCollectionPathName: (resource) => `${camelCaps(resource)}RestApiCollection`,
  restApiMemberPathName: (resource) => `${camelCaps(resource)}RestApiMember`,
  restApiMethodName: (resource, method, type) => `${camelCaps(resource)}RestApiMethod${typeName(type)}${camelCaps(method)}`,
  restApiLambdaPermissionName: (resource, method, type) => `${camelCaps(resource)}RestApiPermitMethod${typeName(type)}${camelCaps(method)}`,
  restApiCollectionPathPart: (resource) => snakeCase(resource),
  restApiMemberPathPart: (resource, key = 'Key') => `{${camelCase(resource)}${camelCaps(key)}}`,
  restApiCollectionPathMatcher: (resource, prefix) => prefix ? `${prefix}/${snakeCase(resource)}` : snakeCase(resource),
  restApiMemberPathMatcher: (resource, prefix) => prefix ? `${prefix}/${snakeCase(resource)}/*` : `${snakeCase(resource)}/*`
};
