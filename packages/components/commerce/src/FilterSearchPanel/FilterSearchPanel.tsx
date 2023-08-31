/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useForm } from 'react-hook-form';
import { BaseForm, TextInput } from '@exo/frontend-components-forms';
import { Button, ButtonGroup } from '@exo/frontend-components-base';
import * as S from './FilterSearchPanel.styles';

export const FilterSearchPanel = ({
  searchText = 'Search parts',
  title = 'Find the parts for your vehicle',
  onSubmit = () => {},
  mainSearchTitle = 'Search by VIN',
  searchTitle = 'Search by model',
  searchFields,
  mainSearchField
}: Props) => {
  const { register, handleSubmit, formState, control, reset } = useForm({
    mode: 'onChange'
  });

  return (
    <S.FilterSearchPanel>
      <S.PanelTop>
        <S.PanelTitle>{title}</S.PanelTitle>
      </S.PanelTop>
      <S.PanelContent>
        <BaseForm
          onSubmit={onSubmit}
          renderFooter={() => (
            <ButtonGroup>
              <Button type="submit" label={searchText} />
            </ButtonGroup>
          )}
          form={{ handleSubmit, formState, reset }}
        >
          {mainSearchField && (
            <S.Search key="main-search-field">
              <S.SearchTitle>{mainSearchTitle}</S.SearchTitle>
              <S.SearchField key={mainSearchField.id}>
                <TextInput
                  id={mainSearchField.id}
                  {...register(mainSearchField!.id, { required: true })}
                  isRequired={true}
                  control={control}
                  errorText={formState.errors[mainSearchField!.id] && 'Error'}
                  labelText={mainSearchField.label}
                  placeholderText={mainSearchField.placeholder}
                />
              </S.SearchField>
            </S.Search>
          )}

          {searchFields && (
            <S.Search key="search-fields">
              <S.SearchTitle>{searchTitle}</S.SearchTitle>
              <S.SearchFields>
                {searchFields.map(input => (
                  <S.SearchField key={input.id}>
                    <TextInput
                      id={input.id}
                      {...register(input.id, {})}
                      isRequired={false}
                      control={control}
                      errorText={formState.errors[input.id] && 'Error'}
                      labelText={input.label}
                      placeholderText={input.placeholder}
                    />
                  </S.SearchField>
                ))}
              </S.SearchFields>
            </S.Search>
          )}
        </BaseForm>
      </S.PanelContent>
    </S.FilterSearchPanel>
  );
};

type Props = {
  searchText?: string;
  title?: string;
  mainSearchTitle?: string;
  searchTitle?: string;
  onSubmit: (data: any) => void;
  searchFields?: {
    id: string;
    placeholder?: string;
    label?: string;
  }[];
  mainSearchField?: {
    id: string;
    placeholder?: string;
    label?: string;
  };
};
