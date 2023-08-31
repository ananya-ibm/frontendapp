# iXl CMS Integration - WIP

## Solution Overview

This repository contains an experiment to try to bring all CMS integration into a similar framework.
The initial aim is to integrate AEM, Bloomreach and Contentful into one common framework.

A key design criteria for this integration is to allow it to run fully functional _without_ a CMS
present.

The CMS integration typically follows one or both of the following patterns:

1. The CMS provides all React components that goes onto a page/container - this is the way AEM works
2. The CMS provides content/components for a number of small areas (spots) on the page - this is the
   way Contentful works

Bloomreach supports both patterns.

### Components

The idea is to have four different React components - all delegating to CMS specific
implementations - allowing applications to be built without a static dependency on CMS integration
code:

#### CmsContext

This is the outermost React components and should be placed at the application level - much as
`ThemeProvider` or `ApolloClient`. It provides a place to specify CMS configuration and also to
provide this configuration to all CMS related components.

Each CMS integration will provide a mechanism to simplify configuration and register any needed
React components.

It is used like

```
<CmsContext configuration={{configuration}}>
  ...
</CmsContext>
```

#### CmsContainer

The `CmsContainer` represents a page/container. It allows supporting CMS to override the complete
content/components on a page. In case the CMS does not contain a definition for the page, no CMS is
present, or the CMS does not support the page model, the children as rendered as is.

`CmsContainer` cannot be nested.

Typical usage is thus to wrap each container in your application with `CmsContainer`.

It takes an optional `spec` prop, that allows the CMS to identify the page being used. Regardless of
the `spec` prop, the current `URL` will always be sent to the CMS to find a matching page

```
<CmsContainer name="category" spec={{ categoryId: 1256 }}>
   <Title />

   <Breadcrumb />

   <CmsSpot name="hero" spec={{ categoryId: 1256 }}>
     <Hero />
   </CmsSpot>

   <ProductGrid />
</CmsContainer>
```

#### CmsSpot

The `CmsSpot` represent a small area on the page that is controlled by the CMS. It works similarly
to the `CmsContainer` but is supposed to be placed within a `CmsContainer`.

Example

```
<CmsContainer name="category" spec={{ categoryId: 1256 }}>
   <Title />

   <Breadcrumb />

   <CmsSpot name="hero" spec={{ categoryId: 1256 }}>
     <Hero />
   </CmsSpot>

   <ProductGrid />
</CmsContainer>
```

#### Redirects

Some CMSs, e.g. AEM, requires special redirects to be added to your application when running in
preview mode. They are configured in the configuration object.

It should be added to your router configuration at the top (but after any application redirects),
something like

```
<BrowserRouter>
  <Header />

  <div>
    <Route path="/" exact render={() => (
        <Redirect to="/home" />
      )} />

    { cfg?.redirects?.map(r => (
      <Route
        path={r.path}
        render={({ match }) => <Redirect to={r.redirect(match)} />}
      />
    )) }

    <Route path="/category/:id" render={({match}) => (
        <CategoryPage />
      )} />

    <Route path="/content/:id*" render={({match}) => (
        <ContentPage id={match.params.id} />
      )} />

    <Route path="/home" render={() => (
        <ContentPage />
      )} />
  </div>
</BrowserRouter>
```

### Hooks

The integration also provides one hook

#### useContent

To be written

### Content Model Tools

Most CMS products requires a content model to be defined. This model should correspond to the React
components and containers used - in simple terms, a React prop should be exposed in the CMS for
editing.

The way this is done depends on the CMS, sometimes it is just configuration and sometimes it
includes code - and in many cases some level of tuning is needed to have a good editing experience.

This CMS integration will provide a ETL style tool-chain to support this process - with separate
UNIX style tools using files as intermediaries.

There will be a tool to extract as much meta-data as possible from the React components - i.e. which
props are there, data types, required/not required etc. Then there will be CMS specific tools to
transform and load this data into the CMS.

Something like

```
                                                     ╔════════════╗         ╔════════════╗
                                                     ║            ║         ║            ║
                                                     ║    AEM     ║ ┌────┐  ║  AEM Load  ║
                                            ┌───────▶║ Transform  ║─┤File├─▶║            ║
                                            │        ║            ║ └────┘  ║            ║
                                            │        ╚════════════╝         ╚════════════╝
┌─────────────┐        ╔═══════════╗        │        ╔════════════╗         ╔════════════╗
│             ├─┐      ║           ║ ┌────┐ │        ║            ║         ║            ║
│    React    │ │      ║           ║ │YML/│ │        ║ Bloomreach ║ ┌────┐  ║ Bloomreach ║
│ Components  │─┼─────▶║  Extract  ║─┤JSON├─┼───────▶║ Transform  ║─┤File├─▶║    Load    ║
│             │ │      ║           ║ │File│ │        ║            ║ └────┘  ║            ║
│             │ │      ║           ║ └────┘ │        ╚════════════╝         ╚════════════╝
└─┬───────────┘ │      ╚═══════════╝        │        ╔════════════╗         ╔════════════╗
  └─────────────┘                           │        ║            ║         ║            ║
                                            │        ║ Contentful ║ ┌────┐  ║ Contentful ║
                                            └───────▶║ Transform  ║─┤File├─▶║    Load    ║
                                                     ║            ║ └────┘  ║            ║
                                                     ╚════════════╝         ╚════════════╝
```

## Integration with B2C Commerce App - AEM

This Content feature is currently only utilised in the B2C Commerce App, and is set up to integrate
with AEM. You must duplicate the example `env` files into their corresponding `env` files. (Please
note there are variables specific for AEM in this integration, just as there will be for Contentful
once this is complete).

Until the page mapping for the home page is set up in AEM, you will see a static hero on the home
page of the B2C app. The hero will explain this, and you should see text explaining that the content
is default.

When the page mapping is set up, you will see an empty page.

When the page mapping is set up and components are added, you will see those components.

To deploy the app to your local AEM instance, you should complete the following steps:

```
cd packages/apps/commerce
./deploy-to-aem.sh .env.aem.development
```

Please note: a session must be active to successfully complete this! Simply having AEM running is
not enough, you must actually sign in. To set up AEM, please follow the instructions below.

### Setting up AEM for integration with the B2C Commerce App

#### Installing AEM integration (if not already completed)

1. Install AEM Quickstart 6.5 and use the license key you have to complete the set up

   ```
   java -jar AEM_6.5_Quickstart.jar
   ```

   Choose `admin` as password for the admin user

2. Clone `ixl-am` repo
   ```
   git@github.ibm.com:ixliberty/ixl-aem.git
   ```
3. Bootstrap AEM with data

   1. Make sure AEM is running
   2. Follow instructions at https://github.ibm.com/ixliberty/ixl-aem, or below

      ```
      mvn clean install -Padobe-public -PautoInstallPackage
      ```

      Please note: to use the latest integration with the `b2c-commerce`, please checkout branch
      `feature/custom-components` before you follow the step called "Bootstrap AEM with content"

4. Post bootstrap adjustments

   1. Go to http://localhost:4502/system/console/configMgr and search for a configuration named
      `Remote Content Renderer - Configuration Factory`
   2. Click the + button next to the Factory to create a new configuration and set the content path
      input to `/content/carbon-commerce-ssr/en/react(.*)`
   3. Go to http://localhost:4502/crx/de/index.jsp

      1. Under
         `/conf/carbon-commerce-ssr/settings/wcm/policies/carbon-commerce-ssr/components/structure/page/policy_1591530708074`,
         add three properties

         1. `isRoot`, type=Boolean, value=`true`
         2. `structureDepth`, type=String, value=`2`
         3. `structurePatterns`, type=String, value=`.*`

#### Configuration at an app-level

There are a number of specific files now included in the app directory:

```
.env.aem.development
aem-packager.config.yml
deploy-to-aem.sh
clientlib.config.js
```

The plan is for these to be migrated in to the `content` feature long term, to prevent any
unecessary complexity in `commerce` (or any other app) when it is not running with AEM/a CMS system.

All of these files are used to manage the packaging and deployment of the react app for AEM.

The configuration and integration with the `content` feature is drive through `applications.js`,
just as any other app-level config would do.

Here, there is a `cms` object within `config`, which contains two things.

First is a script to load in CSS, and this too eventually will need to be removed from this repo and
have a more dynamic inclusion, but for now it has been pushed to the app level, via an automatic
inclusion of scripts, as this may be needed for tag managers in future.

Secondly, is an array of components. These components
are the components that will be avaliable for the editor, and have to be set up carefully to ensure
the naming follows the same conventions as in the sling models of AEM.

#### Avaliable Content Spots in the B2C Commerce Front End

1. Home Page

   The entire body of the homepage is controlled by CMS once the page mapping is completed, as
   indicated above

2. Seach Page

   There is a space in between the heading of the search page, and the input field and subsequent
   results, where content can be dropped by the authorer, once the page mapping has been completed
   in AEM

3. Category Page

   There is a space in between the heading of the category page, and the listings, where content can
   be dropped by the authorer, once the page mapping has been completed in AEM

4. Pure Content Pages

   Any number of pure content pages can be created, as long as they reside under
   `content/MY_PAGE_NAME`, with full control over the body of the page to the author

#### Adding support for CMS integration in a feature that is used in the app

You will see from the content spots above, that we have integration cross-feature, between this (the
`content` feature) and the `catalog` feature, specifically, the `catalog-app`. It's worth having a
quick explanation of how this is achieved:

Firstly, let's take a look at `catalog-app/clients/Routes.js`. This includes a number of things, and
it's easy to see where the CMS config is introduced by looking at the imports, specifically
`@exo/frontend-content-api`.

However, there is also now an additional import of `useAppShellContext` required, which allows
access of the whole app `config`. This is needed because it contains the `config` variables for the
CMS from the application level.

This config is then used to create `CmsConfig`, and this is used to instaniate a
`CmsContextProvider` which wraps all routes of the app, allowing specific components to access the
`CmsConfig`, and components related to that.

Indeed, if you then look at `catalog-app/containers/Search.js` you can see it is as simple as adding
a `CmsContainer` and `CmsSpot` from `@exo/frontend-content-api` to enable authoring in that position
on the page. These are dependant on the context, as outlined above, so it is essential that the
first step is completed.

The behaviour of these is such that anything inside the `CmsContainer` will be replaced when a page
mapping is created inside the CMS (i.e. when the content is driven by the CMS).

### Known Issues:

- The AEM CSS content currently included MUST be recognised as temporary (it cannot be left
  permentaly inside this repo, instead should be included in the project fork, due to licensing
  issues)
- Some times corrupted builds can cause an error `Require is not defined` inside AEM editor
  environment. To get round this, please clear the `dist` of this app, and then attempt to redeploy.
  If problem persists, you may need to reclone the monorepo.
- The video component does not support live editing, it requires a refresh to see changes
- You cannot yet use an app integrated with the Content Feature, with server side rendering due to a
  dependancy on the `window` vairable
