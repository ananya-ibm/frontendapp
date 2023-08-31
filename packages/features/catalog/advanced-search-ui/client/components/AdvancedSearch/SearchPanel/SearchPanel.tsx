/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Button, ButtonGroup } from '@exo/frontend-components-base';
import { BaseForm, Field, TextInput } from '@exo/frontend-components-forms';
import { useForm } from 'react-hook-form';
import * as S from './SearchPanel.styles';

const SearchPanel = ({
  searchText = 'Search',
  title = 'Begin your search...',
  basicPlaceholder = 'Search term',
  basicLabel = 'Search:',
  onSubmit = () => {},
  advancedTitle = 'Advanced search:',
  advancedInputs
}: Props) => {
  const { register, handleSubmit, formState, control, reset } = useForm({
    mode: 'onChange'
  });

  return (
    <S.SearchPanel>
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
          <S.Search>
            <S.Basic>
              <TextInput
                id="searchTerm"
                {...register('searchTerm', { required: true })}
                isRequired={true}
                control={control}
                errorText={formState.errors.searchTerm && 'Error'}
                labelText={basicLabel}
                placeholderText={basicPlaceholder}
              />
            </S.Basic>
          </S.Search>
          {advancedInputs && (
            <S.Search>
              <S.SearchTitle>{advancedTitle}</S.SearchTitle>
              {advancedInputs.map(input => (
                <Field key={input.id}>
                  <TextInput
                    id={input.id}
                    {...register(input.id, {})}
                    isRequired={false}
                    control={control}
                    errorText={formState.errors[input.id] && 'Error'}
                    labelText={input.label}
                    placeholderText={input.placeholder}
                  />
                </Field>
              ))}
            </S.Search>
          )}
        </BaseForm>
      </S.PanelContent>
    </S.SearchPanel>
  );
};


type Props = {
  searchText?: string;
  title?: string;
  basicTitle?: string;
  advancedTitle?: string;
  basicPlaceholder?: string;
  basicLabel?: string;
  onSubmit?: (inputs: any) => void;
  advancedInputs?: {
    id: string;
    placeholder: string;
    label: string;
  }[];
};

export default SearchPanel;
