/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-else-return */

import React from 'react';
import { Tab, Tabs } from '@exo/frontend-components-base';
import { Field as FieldWrapper } from '../../../layout/Field/Field';
import { FieldPanel } from '../../../layout/FieldPanel/FieldPanel';
import { SubformList } from '../../../layout/SubformList/SubformList';
import { FieldRow } from '../../../layout/FieldRow/FieldRow';
import { FieldPanelGroupStepByStep } from '../../../layout/FieldPanelGroupStepByStep/FieldPanelGroupStepByStep';
import { TextInput } from '../../../fields/TextInput/TextInput';
import { TextArea } from '../../../fields/TextArea/TextArea';
import { FieldArray } from '../../../layout/FieldArray/FieldArray';
import { Dropdown } from '../../../fields/Dropdown/Dropdown';
import { ComboBox } from '../../../fields/ComboBox/ComboBox';
import { RadioButtonGroup } from '../../../fields/RadioButtonGroup/RadioButtonGroup';
import { isRequired, requiredLabelText } from '../../../helpers/isRequired';
import { getData, makeIndexedId } from './idUtils';
import { checkRule } from './rules';
import { ComponentTreeOpts, Field } from '../types';
import { ViewOnly } from '../../../fields/ViewOnly/ViewOnly';

export const fieldBuilder = fieldFn => (f: Field, opts: ComponentTreeOpts) => {
  const { control, data, errors, intl, indexes, keys } = opts;

  if (f?.presentation?.visible) {
    if (!checkRule(opts, f, f.presentation.visible)) {
      return undefined;
    }
  }

  const props = f?.presentation?.reactProps ?? {};

  let disabled = false;
  if (f?.presentation?.enabled) {
    disabled = !checkRule(opts, f, f.presentation.enabled);
  }
  props.isDisabled = disabled;
  props.id = makeIndexedId(f.id, indexes);
  props.name = makeIndexedId(f.id, indexes);
  props.control = control;
  props.labelText = intl.msg(f.label_code, f.label ?? '');
  props.placeholderText = intl.msg(
    f.presentation?.placeholder_code ?? f.label_code,
    f.presentation?.placeholder ?? f.label ?? ''
  );
  props.isRequired = isRequired(opts.schema, f.id!, false);
  props.requiredLabelText = requiredLabelText(intl);
  props.errorText = intl.error(getData(errors, props.id));
  props.uniqueKey = makeIndexedId(f.id, keys);

  const v = getData(data, props.id);
  if (v) {
    props.value = v;
  }

  return fieldFn(f, opts, props);
};

const makeInputField = (_f: Field, opts: ComponentTreeOpts, commonProps: any) => {
  return (
    <FieldWrapper key={`field_${commonProps.uniqueKey}`}>
      <TextInput {...opts.register(commonProps.name)} {...commonProps} />
    </FieldWrapper>
  );
};

const makeViewOnlyField = (_f: Field, opts: ComponentTreeOpts, commonProps: any) => {
  return (
    <FieldWrapper key={`field_${commonProps.uniqueKey}`}>
      <ViewOnly {...opts.register(commonProps.name)} {...commonProps} />
    </FieldWrapper>
  );
}

const makeHiddenField = (_f: Field, opts: ComponentTreeOpts, commonProps: any) => {
  return (
    <input
      id={commonProps.id}
      key={`field_${commonProps.uniqueKey}`}
      type="hidden"
      {...opts.register(commonProps.name)}
    />
  );
};

const selectGetOptions = (f: Field, opts: ComponentTreeOpts) => {
  const { intl } = opts;

  return f.options
    ?.filter(
      o =>
        (o.enabled === undefined && o.visible === undefined) ||
        checkRule(opts, f, (o.enabled ?? o.visible)!)
    )
    .map(o => ({ name: intl.msg(o.label_code, o.label), value: o.value }));
};

const makeSelectField = (f: Field, opts: ComponentTreeOpts, commonProps: any) => {
  const items = selectGetOptions(f, opts);
  return (
    <FieldWrapper key={`field_${commonProps.uniqueKey}`}>
      <Dropdown
        {...opts.register(commonProps.name)}
        {...commonProps}
        items={items}
        isDisabled={commonProps.isDisabled || items?.length === 0}
      />
    </FieldWrapper>
  );
};

const makeSelectComboBoxField = (f: Field, opts: ComponentTreeOpts, commonProps: any) => {
  const items = selectGetOptions(f, opts);
  return (
    <FieldWrapper key={`field_${commonProps.uniqueKey}`}>
      <ComboBox
        {...opts.register(commonProps.name)}
        {...commonProps}
        items={items}
        isDisabled={commonProps.isDisabled || items?.length === 0}
      />
    </FieldWrapper>
  );
};

const makeSelectRadioButtonGroupField = (f: Field, opts: ComponentTreeOpts, commonProps: any) => {
  const items = selectGetOptions(f, opts);
  return (
    <FieldWrapper key={`field_${commonProps.uniqueKey}`}>
      <RadioButtonGroup
        {...opts.register(commonProps.name)}
        {...commonProps}
        items={items}
        isDisabled={commonProps.isDisabled || items?.length === 0}
      />
    </FieldWrapper>
  );
};

const makeTextareaField = (_f: Field, opts: ComponentTreeOpts, commonProps) => {
  return (
    <FieldWrapper key={`field_${commonProps.uniqueKey}`}>
      <TextArea {...opts.register(commonProps.name)} {...commonProps} />
    </FieldWrapper>
  );
};

const makeGroup = (f: Field, opts: ComponentTreeOpts, commonProps) => {
  return (
    <FieldPanel key={`fieldpanel_${commonProps.uniqueKey}`} title={f.label} helpText={f.helpText}>
      {opts.getComponentTree!(f, opts)}
    </FieldPanel>
  );
};

const makeFieldRow = (f: Field, opts: ComponentTreeOpts, commonProps) => {
  if (!f.fields) throw new Error();

  const widths = f.fields.map(ef => ef?.presentation?.width ?? 10);
  const totalWidth = widths.reduce((acc, c) => acc + c, 0);
  return (
    <FieldRow
      key={`fieldrow_${commonProps.uniqueKey}`}
      widths={widths.map(w => `${(100 * w) / totalWidth}%`)}
    >
      {opts.getComponentTree!(f, { ...opts })}
    </FieldRow>
  );
};

const makePanelGroup = (f: Field, opts: ComponentTreeOpts, commonProps) => {
  return (
    <div key={`fieldset_${commonProps.uniqueKey}`}>
      {f.label && <h2>{f.label}</h2>}
      {opts.getComponentTree!(f, opts)}
    </div>
  );
};

const makePanelGroupTabs = (f: Field, opts: ComponentTreeOpts, commonProps) => {
  if (!f.fields) throw new Error();

  return (
    <Tabs key={`panelgroup_${commonProps.uniqueKey}`}>
      {f.fields.map(sf => (
        <Tab key={sf.id} id={sf.id!} label={sf.label!}>
          {opts.getComponentTree!(sf, opts)}
        </Tab>
      ))}
    </Tabs>
  );
};

const makePanelGroupWizard = (f, opts: ComponentTreeOpts, commonProps) => {
  const isTopLevel = !f.id.includes('[]');
  const state = isTopLevel ? { selectedIndex: opts.dynamicFormState.idx ?? 0 } : {};
  return (
    <FieldPanelGroupStepByStep
      key={`panelgroup_${commonProps.uniqueKey}`}
      {...state}
      onChange={({ idx, isFirst, isLast }) => {
        if (isTopLevel) {
          opts.setDynamicFormState({
            ...(opts.dynamicFormState ?? {}),
            idx,
            isFirst,
            isLast
          });
        }
      }}
    >
      {f.fields.map(sf => (
        <FieldPanelGroupStepByStep.Step key={sf.id} labelText={sf.label}>
          {opts.getComponentTree!(sf, opts)}
        </FieldPanelGroupStepByStep.Step>
      ))}
    </FieldPanelGroupStepByStep>
  );
};

const Wrapper = ({ view, children }) => {
  if (view === 'list') return children;
  return <FieldRow>{children}</FieldRow>;
}

const makeArray = (f: Field, opts: ComponentTreeOpts, commonProps) => {
  const { getComponentTree, intl, data, control } = opts;

  return (
    <FieldArray
      key={`array_${commonProps.uniqueKey}`}
      titleText={f.label}
      isDisabled={commonProps.isDisabled}
      addButtonText={intl.msg('add.label', 'Add')}
      removeButtonText={intl.msg('remove.label', 'Remove')}
      name={commonProps.id}
      entryCount={Math.max(data?.[f.id!]?.length ?? 0, (opts.viewOnly ? 0 : f?.presentation?.numberOfItems) ?? 3)}
      variant={f?.presentation?.view === 'list' ? 'entry' : 'row'}
      control={control}
      newEntry={() => ({})}
      isViewOnly={opts.viewOnly}
      renderEntry={(item, index) =>
        <Wrapper view={f?.presentation?.view}>
          {getComponentTree!(f, {
            ...opts,
            indexes: [...(opts.indexes ?? []), index],
            keys: [...(opts.keys ?? []), item.id]
          })}
        </Wrapper>
      }
    />
  );
};

const makeList = (f: Field, opts: ComponentTreeOpts, commonProps) => {
  if (!f.fields) throw new Error();
  if (!f.discriminatorId) throw new Error();

  const { getComponentTree, intl, data, control } = opts;
  const discriminator = f.discriminatorId.slice(f.discriminatorId.lastIndexOf('.') + 1);
  return (
    <SubformList
      key={`list_${commonProps.uniqueKey}`}
      variant="row"
      titleText={f.label}
      addButtonText={intl.msg('add.label', 'Add')}
      removeButtonText={intl.msg('remove.label', 'Remove')}
      name={commonProps.id}
      entryCount={Math.max(getData(data, f.id)?.length ?? 0, 0)}
      control={control}
      typeSelectorLabel={intl.msg('typeSelector.label', 'Module')}
      typeSelectorPlaceholder={intl.msg('typeSelector.placeholder', 'Select')}
      newEntry={type => ({ [discriminator]: type })}
      types={f.fields.map(sf => ({
        name: intl.msg(sf.label_code, sf.label ?? '')?.toString()!,
        value: sf.id!
      }))}
      discriminatorId={(_item, index) =>
        makeIndexedId(f.discriminatorId, [...(opts.indexes ?? []), index])
      }
      discriminatorValue={item => item[discriminator]}
      renderEntry={(item, index) =>
        getComponentTree!(f.fields?.find(e => e.id === item[discriminator])!, {
          ...opts,
          indexes: [...(opts.indexes ?? []), index],
          keys: [...(opts.keys ?? []), item.index]
        })
      }
    />
  );
};

const WIDGETS = [
  { match: 'group.side-by-side', element: fieldBuilder(makeFieldRow) },

  { match: 'panel-group.tab', element: fieldBuilder(makePanelGroupTabs) },
  { match: 'panel-group.wizard', element: fieldBuilder(makePanelGroupWizard) },

  { match: 'select.combobox', element: fieldBuilder(makeSelectComboBoxField) },
  {
    match: 'select.radiobuttons',
    element: fieldBuilder(makeSelectRadioButtonGroupField)
  },

  { match: 'select.*', element: fieldBuilder(makeSelectField) },
  { match: 'input.*', element: fieldBuilder(makeInputField) },
  { match: 'hidden.*', element: fieldBuilder(makeHiddenField) },
  { match: 'textarea.*', element: fieldBuilder(makeTextareaField) },

  { match: 'array.*', element: fieldBuilder(makeArray) },
  { match: 'group.*', element: fieldBuilder(makeGroup) },
  { match: 'list.*', element: fieldBuilder(makeList) },
  { match: 'panel-group.*', element: fieldBuilder(makePanelGroup) }
];

const VIEW_ONLY_WIDGETS = [
  { match: 'group.side-by-side', element: fieldBuilder(makeFieldRow) },

  { match: 'panel-group.tab', element: fieldBuilder(makePanelGroupTabs) },
  { match: 'panel-group.wizard', element: fieldBuilder(makePanelGroupWizard) },

  { match: 'array.*', element: fieldBuilder(makeArray) },
  { match: 'group.*', element: fieldBuilder(makeGroup) },
  { match: 'list.*', element: fieldBuilder(makeList) },
  { match: 'panel-group.*', element: fieldBuilder(makePanelGroup) },

  { match: 'hidden.*', element: fieldBuilder(makeHiddenField) },
  { match: 'textarea.*', element: fieldBuilder(makeViewOnlyField) },
  { match: 'input.*', element: fieldBuilder(makeViewOnlyField) },
  { match: 'select.*', element: fieldBuilder(makeViewOnlyField) }
];

export const getComponentTree = (schema: Node, opts: ComponentTreeOpts): any => {
  if (!schema.fields) throw new Error();

  const widgets = opts.viewOnly ? 
    [...(opts.customFieldDefinitions?.viewOnlyWidgets ?? []), ...VIEW_ONLY_WIDGETS] : 
    [...(opts.customFieldDefinitions?.widgets ?? []), ...WIDGETS];

  return schema.fields.map(f => {
    for (const w of widgets) {
      if (typeof w === 'object') {
        const [type, view] = w.match.split('.');
        if (type === f.type && (view === '*' || view === f?.presentation?.view)) {
          return w.element(f, { ...opts, getComponentTree });
        }
      } else if (typeof w === 'function') {
        const ret = w(f, { ...opts, getComponentTree });
        if (ret) return ret;
      }
    }
    return (
      <div>
        Cannot find element {f.type}/{f.presentation?.view}
      </div>
    );
  });
};

type Node = { fields?: Field[] };
