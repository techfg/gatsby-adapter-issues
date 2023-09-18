import { GatsbyNode } from "gatsby"
import path from "path"

export const createPages: GatsbyNode["createPages"] = async ({
  actions,
}) => {
  const { createRedirect, createPage } = actions

  if (process.env.ENABLE_EXTRA_PAGES === `true`) {
    for (let i = 1; i <= 100; i++)
    createPage({
      path: `/extra-page-${i}`,
      component: path.resolve(`./src/pages/index.tsx`),
      context: {}
    })
  }

  createRedirect({
    fromPath: `/testpageold/`,
    toPath: `/testpagenew/`,
  })

  createRedirect({
    fromPath: `/permanentpageold/`,
    toPath: `/permanentpagenew/`,
    isPermanent: true
  })

  // this page still exists and therefore MUST be forced to redirect
  createRedirect({
    fromPath: `/retiredpage/`,
    toPath: `/`,
    force: true
  })  

  createRedirect({
    fromPath: `/forcepageold/`,
    toPath: `/forcepagenew/`,
    force: true
  })

  createRedirect({
    fromPath: `/conditionspageold/`,
    toPath: `/conditionspagenew/`,
    conditions: {
      language: ['en', 'fr'],
      country: ['us', 'ca']
    }
  })

  createRedirect({
    fromPath: `/redirectinbrowserpageold/`,
    toPath: `/redirectinbrowserpagenew/`,
    redirectInBrowser: true
  })

  createRedirect({
    fromPath: '/statuscodepageold/',
    toPath: '/statuscodepagenew/',
    statusCode: 303
  })

  createRedirect({
    fromPath: `/ignoreCasePageOld`,
    toPath: `/ignorecAsepAgenEw/`,
    ignoreCase: true
  })  

  createRedirect({
    fromPath: `https://www.gatsbyjs.org`,
    toPath: `https://www.netlify.com`,
    force: true,
    isPermanent: true
  })
}

export const onCreatePage: GatsbyNode["onCreatePage"] = async ({
  page,
  actions,
}) => {
  const { createPage } = actions

  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`
    createPage(page)
  }
}