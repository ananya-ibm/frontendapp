# App Shell

The App Shell is the framework that allows multiple features to be brought together and form an application. The features may run within the same runtime, but may also be deployed in different runtimes - thus providing a micro-frontend style architecture.

The app shell thus provides the following capabilities:

 1. Top-level application routing - each feature is designated an URL prefix and the app shell, through `AppShellSwitch` routes a request to the correct feature

 2. Linking between features - as features may run in different runtimes, linking between features requires a link to sometimes behave as an `A`-tag - and sometimes as a `history` push

 3. Feature configuration - configuring which features belong to an app

 4. Session storage - session storage must span features and is thus handled by the app shell

 5. Ability to run features standalone


## Rewrites

We support five types of rewrite rules

### Simple

```
{ type: 'simple', seo: '/search', exo: '/catalog/search'}
```

This maps `/search` to `/catalog/search` - and also the other way around, i.e.
any links pointing to `/catalog/search` will be rewritten to `/search`

Supports variables and wildcards just like React Router

### Inbound

```
{ type: 'inbound', from: '/search', to: '/catalog/search'}
```

This maps `/search` to `/catalog/search` - but *not* the other way around, i.e.
any links pointing to `/catalog/search` will remain.

Supports variables and wildcards just like React Router

### Outbound

```
{ type: 'outbound', from: '/catalog/search', to: '/search'}
```

This does not have any effect on incoming request, but *only* changes any links pointing to `/catalog/search` to `/search`

Supports variables and wildcards just like React Router

### Function

```
{ 
  type: 'function', 
  inbound: (args) => ...,
  outbound: (args) => ...
}
```

Allows arbitrary code to map inbound and outbound URLs. See 
`rewriteEngine.test.ts` for an example

### Legacy

This is mostly used for AEM, the exact format is not yet documented


See `rewriteEngine.test.ts` for more examples