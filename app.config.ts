import { ConfigContext, ExpoConfig } from '@expo/config'

export default ({ config }: ConfigContext): ExpoConfig => {
  if (process.env.ENVIRONMENT === 'production') {
    return {
      ...config,
      slug: `${config.slug}`,
      name: `${config.name}`,
      ios: { ...config.ios, bundleIdentifier: `${config.ios?.bundleIdentifier}` },
      android: { ...config.android, package: `${config.android?.package}` },
      extra: {
        eas: {
          projectId: "b5a939b2-987e-451d-819d-72c0ff2a8366"
        }
      }
    }
  } else {
    return {
      ...config,
      slug: `${config.slug}_dev`,
      name: `${config.name}_dev`,
      ios: { ...config.ios, bundleIdentifier: `${config.ios?.bundleIdentifier}.dev` },
      android: { ...config.android, package: `${config.android?.package}.dev` },
      extra: {
        eas: {
          projectId: "ab0cf838-f840-4b29-8c7a-2b431664461a"
        }
      }
    }
  }
}
