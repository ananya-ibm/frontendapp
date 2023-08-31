# Providers and overrides

In order to customize EXO we provide two mechanisms that operate at the 
package level; providers and overrides

## Providers

Purpose: Declare extension points where the code expects there to be
multiple implementations - and that you, as a developer, will select
the *one* implementation applicable for you application.

Providers are defined extension points and in each project, you will
decide on one implementation for a given provider - examples include
selecting a theme or deciding which CMS/DXP integration to use

You declare a provider by including the following section in 
`package.json`

```json
  "exo": {
    "providers": {
      "@exo-provider/frontend-content-provider": 
        "packages/features/content/content-provider-noop/lib/index.ts"
    }
  }
```

This declares a provider called `@exo-provider/frontend-content-provider` with a default implementation found in 
`packages/features/content/content-provider-noop/lib/index.ts`.

You can then select the provider to use by setting the environment variable
`PROIVDERS_CONTENT_PROVIDER`. 


## Overrides

Purpose: Allow arbitrary packages to be overridden to allow for client
specific customization.

The other mechanism available is overrides. This is option is designed to
be used without designing an extension point. Overrides allows you to
replace any package with your own implementation.

You can declare an override by adding the following section in `package.json`

```json
  "name": "@exo/frontend-common-app-shell",
  ...
  "exo": {
    "overrides": "@exo/frontend-common-link"
  }
```

This means that the package defined by `package.json` is a potential override
for the package `@exo/frontend-common-link`

You then select which overrides to include by setting the environment
variable `OVERRIDES` to a regular expression matching the name of 
the overriding package - in this case `@exo/frontend-common-app-shell`


## Permanent configuration

The code assumes, by default, that no overrides are in place and that
all providers are using the fallback setting. This applies to running
JEST tests, storybook etc. You can change this by editing the file
`globalenv` or `client-packages/globalenv`. Please note that changing these
values may make all JEST snapshots invalid.
