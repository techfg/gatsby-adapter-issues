import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  // we are not building on NETLIFY so no adapters
  // will be forced to be used.  If we were building
  // on NETLIFY, process.env.NETLIFY would be true
  // and the `gatsby-adapter-netlify` forced in to the build
  // and `gatsby-plugin-netlify` force removed with no `stock` 
  // way to opt-out of the adapter and keep the plugin resulting
  // in different build output.
  pathPrefix: process.env.ENABLE_PATH_PREFIX === `true` ? `/blog` : undefined,
  assetPrefix: process.env.ENABLE_ASSET_PREFIX === `true` ? `https://www.cdn.com` : undefined,
  siteMetadata: {
    title: "gatsby-typescript",
    siteUrl: "https://www.yourdomain.tld",
  },
  plugins: [{
    resolve: `gatsby-plugin-netlify`,
    options: {
      headers: {
        "/*": [`X-EveryResource: Gets this header`],
        "/": [`X-PageName: Home`, `Link: </../../../public/static/logo.png>; rel=preload; as=image`],
        "/test-page": [`X-PageName: Test-Page`],
        "/testpage": [`X-PageName: TestPage`],
      },
      allPageHeaders: [`X-PageSpecificHeader: This is a page`],
      mergeSecurityHeaders: true,
      mergeCachingHeaders: true,
      // NOTE!! - path is not currently passed in - see https://github.com/netlify/gatsby-plugin-netlify/issues/275
      transformHeaders: (headers: Array<string>, path: string) => [
        ...headers,
        ...[`X-TransformedHeader: This is transformed`],
      ],
      generateMatchPathRewrites: true,
    },
  }],
};

export default config;
