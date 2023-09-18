import type { GatsbyConfig } from "gatsby";
import adapter from 'gatsby-adapter-netlify';

const config: GatsbyConfig = {
  // necessary to explicitly load adapter since we're not building on NETLIFY
  // where it would be used automatically along with gatsby-plugin-netlify 
  // begin removed automatically both without any `stock` method of opting out
  adapter: adapter({
    excludeDatastoreFromEngineFunction: false,
  }),
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
