#!/bin/bash

# ./node_modules/.bin/nodemon -w ./generator -e "hbs js" --exec ''

# rm -rf client-packages/* && git checkout .storybook/stories.json && git checkout tsconfig.json && git checkout jest.paths.json

npm run generate -- "New App" -force --force-bypass --args \
  --isClientSpecific true \
  --name banking

npm run generate -- "New Feature" -foce --force-bypass --args \
  --isClientSpecific true \
  --featureName banking \
  --includeLogic true \
  --featureUi banking-ui \
  --featureLogic banking-logic \
  --apps client-packages/apps/banking

npm run generate -- "Scaffold feature from GQL" -force --force-bypass --args \
  --endpoint "http://localhost:4002/graphql" \
  --feature "client-packages/features/banking" \
  --featureUi "banking-ui" \
  --featureLogic "banking-logic" \
  --queries "bnkAccount,bnkAccounts" \
  --mutations "customerAddAddress,customerUpdateAddress" \
  --forms "CusAddressInput" \
  --generate "query-hooks,smart-components,ui-components,pages"

