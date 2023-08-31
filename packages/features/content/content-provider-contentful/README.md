# Contentful integration

## Solution Overview

The Contentful integration assumes Contentful will provide content for 
`CmsSpot` component - and not complete pages, e.g.

```
<CmsContainer spec={{ type: 'content' }}>
  <CmsSpot spec={{ name: 'hero'}}>
  </CmsSpot>

  <h1>Content page</h1>

  <CmsSpot spec={{ name: 'article'}}>
  </CmsSpot>
</CmsContainer>
```

Here, Contentful would have the possibility to place a component in the hero 
spot and in the article spot.

From a React side of things, there are no restrictions on what components can 
be placed in what slots, this is controlled in Contentful by the way 
you design your content model.

The integration is based on a configuration provided by `ContentfulConfiguration`
- enabling a fully flexible mapping to your contentful content model.

When a `CmsContainer` is rendered a request is made to contentful. The response 
is then kept in a React context, which is later used when nested `CmsSpot` 
components are rendered. This somewhat constrains flexibility in how to match 
content to a spot as only container specs can be considered - however, it 
improves performance as only one Contentful request is made per page impression. 


### Default Mapping

For most simple cases, the default mapping can be used. It is used something 
like this

```
{
  components: [
    {
      name: 'someName',
      component: Text,
      contentful: {
        contentTypeId: 'componentArticle'
      }
    }
  ],
  contentful: {
    pageTypes: [
      {
        contentTypeId: 'pageCategory',
        matchFn: (spec) => spec.type === 'category', 
        queryFn: (spec) => ({ 'fields.categoryId': spec.categoryId })
      },
      {
        contentTypeId: 'pageContentPage',
        matchFn: (spec) => spec.type === 'content', 
        queryFn: (spec) => ({ 'fields.slug': spec.path })
      },
    ]
  }
}

This assumes a content model consisting of *pages* and *components*. 

A page consists of some identifying attributes (like category id, slug or 
similar) and *slots* which links to *components*. A page corresponds to a 
CmsContainer.

A component is a simple content type with attributes corresponding to React 
props. A component corresponds directly to a React component.

You add a page using the following attributes

* *id* is the content type name in Contentful
* *matchFn* is a function to determine which page definition a `CmsContainer` 
instance corresponds to
* *queryFn* is a function to specify the contentful query needed to find the 
corresponding page content item in contentful

You add a component by the following attributes

* *contentful.id* is the content tyep name in Contentful
* *component* is the React component that corresponds to this content type


### Advanced Mapping

To be written

### Preview Consideration

To be written
