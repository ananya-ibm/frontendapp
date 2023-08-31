/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Entity, EntityListDataContainer } from '@exo/frontend-features-studio-logic';
import React from 'react';
import { CrudView } from '../../../components/CrudView/CrudView';
import { buildFormFromEntity } from '../../../utils/form';
import startCase from 'lodash/startCase'

const cleanData = (d, entity: Entity) => {
  const clone = (src) => {
    const ret = src instanceof Array ? [] : {};
    for (var key in src) {
      if (key === '__typename') continue;
      if (!src.hasOwnProperty(key)) {
        continue;
      }
      let val = src[key];
      if (val && typeof val == 'object') {
        val = clone(val);
      }

      if (val === '') continue;

      ret[key] = val;
    }
    return ret;
  };

  const res = clone(d);

  // TODO: Maybe double check that there's an ID - or add to schema?
  const idAttribute = entity.attributes.find((a) => a.scalarType === 'ID')!.name;
  delete res[idAttribute];

  return res;
};

export const DataPanel = ({ entity }: Props) => {
  return (
    <>
      <EntityListDataContainer
        type={entity}
        render={(props) => {
          const idField = props.entity?.attributes.find((a) => a.scalarType === 'ID')!.name!;

          const headerData = props.entity.attributes
            .filter((a) => !!a.scalarType)
            .slice(0, 5)
            .map((a) => ({ label: startCase(a.name), id: a.name, defaultInclude: true }));

          headerData[0].defaultInclude = false;

          // TODO: Maybe we can do this a bit more elegantly
          if (props.totalResultsCount !== undefined) {
            headerData.splice(1, 0, {
              label: 'Last Updated',
              id: 'lastUpdated',
              defaultInclude: true
            });
          }

          return (
            <>
              <CrudView
                {...props}
                columns={headerData}
                canCreate={!!props.entity.create}
                canEdit={!!props.entity.update}
                canDelete={!!props.entity.delete}
                canView={true}
                form={buildFormFromEntity(props.entity)}
                onLoad={(id) => {
                  if (!props.entity.read) {
                    return props.data.find((d) => d[idField] === id);
                  } else {
                    return props.onGet(id);
                  }
                }}
                onSave={(data, id) => {
                  if (id) {
                    return props.onUpdate(id, cleanData(data, props.entity));
                  } else {
                    return props.onCreate(cleanData(data, props.entity));
                  }
                }}
                onDelete={(id) => props.onDelete(id)}
              />
            </>
          );
        }}
      />
    </>
  );
};

type Props = {
  entity: string;
};
