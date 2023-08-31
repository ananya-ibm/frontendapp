# @exo/frontend-features-events-logic

EXO Events Features

Currently supported services:

1. MQTT
2. Console logging

## How to set it up

1. Specify event configuration in `applications.js`, for instance:

```javascript
events: {
  provider: 'console';
}
```

This will set up the console package as the one that will be loaded and used for event dispatch

2. Use `createEvent` and other functionality from `@exo/frontend-features-events-logic`. This will
   then use the implementation specified in the configuration above, to dispatch events to the
   correct events broker

Some of the services will require additional configuration, and the format for these is a object
within the events configuration object, with the name of the provider, and then a flat level of all
configuration properties, e.g:

```javascript
 events: {
    provider: 'mqtt',
    mqtt: {
      topic: 'exo_auto_demo/global',
      broker: 'wss://mqtt.eclipseprojects.io/mqtt'
    }
  }
```

If required, the `EventConnector` and `EventContextProvider` should be imported in the `App.js` file
of the feature, similar to how it is done here:
`packages/features/content/content-app/client/App.js`.

## How it works

Uses `@loadable/component` to load only the required context provider (which is passed a context
from `@exo/frontend-features-events-logic`) meaning that you do not have to bundle event logic not
needed. It also means you can use `createEvent` functionality throughout the app, features and
component library as required, without worrying about running into conflicts/dependancies.

## How to create a new service package

The main thing to note is that when creating a new package the following functions are avaliable
(even if noop):

```javascript
createEvent: () =>
removeEventFromLog: () =>
getEventHistory: () =>
```

A connector should also be created.
