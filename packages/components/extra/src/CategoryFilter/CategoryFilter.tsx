/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState, useEffect } from 'react';
import { Pagination, TextInput } from '@exo/frontend-components-base';
import * as S from './CategoryFilter.styles';

export const CategoryFilter = ({
  primaryCategoryList,
  heading = 'Primary category',
  onClick
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = React.useState<PrimaryCategoryList>([]);

  useEffect(() => {
    const results = primaryCategoryList.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, primaryCategoryList]);

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (e, id) => {
    if (onClick) {
      e.preventDefault();
      onClick(id);
    }
  };

  const totalItems = primaryCategoryList.length;
  return (
    <S.CategoryFilter>
      <TextInput
        type="search"
        placeholder=""
        id="search-category"
        size="lg"
        name="search-in-header"
        value={searchTerm}
        labelText="Search"
        onChange={handleChange}
      />
      <S.CategoryHeading className="category">{heading}</S.CategoryHeading>
      {searchResults.map(row => {
        return (
          <React.Fragment key={row.id}>
            {onClick ? (
              <S.Rows
                data-testid="openCategory"
                className={row.isActive ? 'isActive' : undefined}
                onClick={e => handleClick(e, row.id)}
              >
                {row.name}
              </S.Rows>
            ) : (
              <S.Rows className="isActive" id={row.id} onClick={e => handleClick(e, row.id)}>
                {row.name}
              </S.Rows>
            )}
          </React.Fragment>
        );
      })}
      <Pagination total={totalItems} onChange={() => {}} />
    </S.CategoryFilter>
  );
};

type Props = {
  primaryCategoryList: PrimaryCategoryList;
  heading?: string;
  onClick?: (id: string) => void;
};

type PrimaryCategoryList = {
  id: string;
  name: string;
  isActive?: boolean;
}[];
