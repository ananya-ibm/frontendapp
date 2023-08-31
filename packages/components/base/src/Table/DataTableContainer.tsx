/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ReactElement, useEffect, useMemo, useState } from 'react';
import {
  ColumnInstance,
  Row,
  useGlobalFilter,
  UseGlobalFiltersInstanceProps,
  usePagination,
  useSortBy,
  useTable,
  UseTableInstanceProps
} from 'react-table';


type SortBy = {
  id: string;
  desc?: boolean;
}

export const DataTableContainer = (props: Props) => {
  const columns = useMemo(() => props.headerData.map(a => ({ 
    Header: a.header, 
    accessor: a.key,
    disableSortBy: !!props.canSort ? !props.canSort(a.header) : false
  })), [
    props.headerData
  ]);
  const [sort, setSort] = useState<SortBy | undefined>(undefined);
  const data = useMemo(() => props.rowData, [props.rowData]);

  const table = useTable(
    {
      columns: columns as any,
      data,
      manualGlobalFilter: !!props.setGlobalFilter,
      manualSortBy: !!props.onSort,
      manualPagination: !!props.nextPage || !!props.gotoPage
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // There's no event in react-table for manual sorting changes, so need to 
  // detect this manually
  useEffect(() => {
    const newSort = table.state.sortBy?.[0];
    if (newSort?.id === sort?.id && newSort?.desc === sort?.desc) return;
    setSort(newSort);
    props.onSort?.(newSort?.id, !!newSort?.desc ? 'descending' : 'ascending');
  }, [table.state.sortBy]);

  return props.render({
    getTableProps: table.getTableProps,
    headers: table.headers,
    rows: table.page,
    prepareRow: r => {
      table.prepareRow(r);
      return r;
    },
    setGlobalFilter: (f: any) => (props.setGlobalFilter ?? table.setGlobalFilter)(f),
    setPageSize: props.setPageSize ?? table.setPageSize,
    gotoPage: props.gotoPage ?? table.gotoPage,
    nextPage: props.nextPage,
    previousPage: props.previousPage,

    totalItems: props.totalItems ?? table.rows.length,
    pageSize: table.state.pageSize
  });
};

type Props = {
  headerData: { header: string; key: string | ((e: any) => string) }[];
  rowData: any[];

  // Optional callbacks for manual handling
  setGlobalFilter?: (q: string) => void;
  canSort?: (field: string) => boolean;
  onSort?: (field?: string, direction?: 'ascending' | 'descending') => void;
  nextPage?: () => void;
  previousPage?: () => void;
  gotoPage?: (n: number) => void;
  setPageSize?: (n: number) => void;
  totalItems?: number;

  render: (renderProps: DataTableRenderProps) => ReactElement | null;
};

type DataTableRenderProps = {
  setGlobalFilter: UseGlobalFiltersInstanceProps<any>['setGlobalFilter'];
  getTableProps: UseTableInstanceProps<any>['getTableProps'];
  headers: ColumnInstance<any>[];
  rows: Row<any>[];
  prepareRow: (row: Row<any>) => Row<any>;
  setPageSize: (size: number) => void;
  gotoPage: (size: number) => void;
  nextPage?: () => void;
  previousPage?: () => void;
  totalItems: number;
  pageSize: number;
};
