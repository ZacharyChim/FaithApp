import { ConfigContext, ExpoConfig } from '@expo/config'

export default ({ config }: ConfigContext): ExpoConfig => {
  if (process.env.ENVIRONMENT === 'production') {
    return {
      ...config,
      slug: `${config.slug}`,
      name: `${config.name}`,
      ios: { ...config.ios, bundleIdentifier: `${config.ios?.bundleIdentifier}` },
      android: { ...config.android, package: `${config.android?.package}` },
    }
  } else {
    return {
      ...config,
      slug: `${config.slug}_dev`,
      name: `${config.name}_dev`,
      ios: { ...config.ios, bundleIdentifier: `${config.ios?.bundleIdentifier}.dev` },
      android: { ...config.android, package: `${config.android?.package}.dev` },
    }
  }
}
