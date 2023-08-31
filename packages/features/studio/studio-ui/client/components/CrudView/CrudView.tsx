/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  ActionMenu,
  ActionMenuItem,
  Button,
  DataTableContainer,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderRow,
  TablePagination,
  TableRow,
  TableSection,
  TableToolbar
} from '@exo/frontend-components-base';
import React, { useMemo, useRef, useState } from 'react';
import { Add } from '@carbon/react/icons';
import { DynamicForm, DynamicFormDefinition } from '@exo/frontend-components-forms';

const evaluate = (fn: undefined | ((id: string) => boolean) | boolean, id: string) => {
  if (fn === undefined) return false;
  if (typeof fn === 'function') return fn(id);
  return fn;
}

type DeleteConfirmationProps = {
  onClose: () => void;
  onDelete: () => Promise<void>;
};

const DeleteConfirm = (props: DeleteConfirmationProps) => {
  return (
    <Modal
      title="Confirm delete"
      isOpen={true}
      onClose={() => props.onClose()}
      isDanger
      buttons={[
        {
          label: 'Delete',
          onClick: async () => {
            await props.onDelete();
            props.onClose();
          }
        },
        { label: 'Cancel', onClick: () => props.onClose() }
      ]}
    >
      Are you sure you want to delete this item?
    </Modal>
  );
};

type EditViewProps<T> = {
  onClose: () => void;
  onSave?: (data: T) => Promise<void>;
  data: Partial<T>;
  form: DynamicFormDefinition;
  isLoading?: boolean;
};

function EditView<T>(props: EditViewProps<T>) {
  const editFormRef = useRef<HTMLFormElement>(null);
  return (
    <Modal
      title={!props.onSave ? 'View' : 'Edit'}
      isOpen={true}
      isScrollable
      onClose={() => props.onClose()}
      buttons={
        !props.onSave
          ? [{ label: 'Ok', onClick: () => props.onClose() }]
          : [
              {
                label: 'Save',
                onClick: () => editFormRef.current!.requestSubmit()
              },
              { label: 'Cancel', onClick: () => props.onClose() }
            ]
      }
    >
      {!props.isLoading && 
        <DynamicForm
          renderFooter={() => <div></div>}
          data={props.data ?? {}}
          form={props.form}
          onSubmit={props.onSave}
          viewOnly={!props.onSave}
          ref={editFormRef}
        />
      }
    </Modal>
  );
}

type TableViewProps<T> = Pick<
  Props<T>,
  | 'columns'
  | 'data'
  | 'onSearch'
  | 'canSort'
  | 'onSort'
  | 'nextPage'
  | 'previousPage'
  | 'setPageSize'
  | 'totalResultsCount'
  | 'canCreate'
  | 'canDelete'
> & {
  onCreate: () => void;
  onDelete: (id: string) => void;
  onRowClick: (id: string) => void;
};

function TableView<T>(props: TableViewProps<T>) {
  const headerData = useMemo(
    () => props.columns
      .filter((c, idx) => idx === 0 || c.defaultInclude)
      .map((c) => ({ header: c.label, key: c.id })),
    [props.columns]
  );

  const includeId = props.columns[0].defaultInclude;

  return (
    <DataTableContainer
      rowData={props.data}
      headerData={headerData}
      setGlobalFilter={props.onSearch}
      setPageSize={props.setPageSize}
      nextPage={props.nextPage}
      previousPage={props.previousPage}
      totalItems={props.totalResultsCount ?? props.data.length}
      canSort={props.canSort}
      onSort={props.onSort}
      render={({
        setPageSize,
        gotoPage,
        nextPage,
        previousPage,
        getTableProps,
        setGlobalFilter,
        prepareRow,
        pageSize,
        headers,
        rows,
        totalItems
      }) => (
        <TableSection>
          <TableToolbar
            hasSearch
            onSearch={setGlobalFilter}
            onClearSearch={() => setGlobalFilter('')}
          >
            {props.canCreate && (
              <Button
                onClick={props.onCreate!}
                label="Add"
                size="field"
                icon={<Add size={20} aria-label="Add" />}
              />
            )}
          </TableToolbar>
          <Table {...getTableProps()}>
            <TableHeaderRow>
              {headers.slice(includeId ? 0 : 1).map((header) => (
                <TableHeader
                  isSorted={header.isSorted}
                  isSortable={header.canSort}
                  sortDirection={header.isSortedDesc ? 'DESC' : 'ASC'}
                  {...header.getHeaderProps(header.getSortByToggleProps())}
                >
                  {header.render('Header')}
                </TableHeader>
              ))}
              <TableHeader />
            </TableHeaderRow>
            <TableBody>
              {rows.map(prepareRow).map((row) => (
                <TableRow
                  {...row.getRowProps()}
                  onClick={() => props.onRowClick(row.cells[0].value)}
                >
                  {row.cells.slice(includeId ? 0 : 1).map((cell) => (
                    <TableCell key={cell.column.id}>{cell.render('Cell')}</TableCell>
                  ))}

                  {/* TODO: Maybe add this as an option to TableCell component */}
                  <TableCell className="cds--table-column-menu">
                    {evaluate(props.canDelete, row.cells[0].value) && 
                      <ActionMenu direction="left">
                        <ActionMenuItem
                          label="Delete"
                          onClick={() => props.onDelete!(row.cells[0].value)}
                        />
                      </ActionMenu>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            pageSize={pageSize}
            pageInputDisabled
            total={totalItems}
            onChange={(arg) => {
              setPageSize(arg.pageSize);
              if (arg.direction === 'forwards' && nextPage) {
                nextPage();
              } else if (arg.direction === 'backwards' && previousPage) {
                previousPage();
              } else if (!!arg.direction) {
                gotoPage(arg.page - 1);
              }
            }}
          />
        </TableSection>
      )}
    />
  );
}

type State<T> =
  | { type: 'table.loading' }
  | { type: 'table' }
  | { type: 'delete-confirm'; id: string }
  | { type: 'create' }
  | { type: 'edit.loading'; id: string }
  | { type: 'edit'; id: string; data: T };

export function CrudView<T>({
  onDelete = () => Promise.resolve(),
  renderEditView = (p) => <EditView {...p} />,
  renderDeleteConfirmation = (p) => <DeleteConfirm {...p} />,
  columns,
  data,
  onSearch,
  canSort,
  onSort,
  nextPage,
  previousPage,
  setPageSize,
  totalResultsCount,
  canCreate,
  onLoad,
  onSave,
  canEdit,
  canView,
  canDelete,
  form={fields: []}
}: Props<T>) {
  const [state, setState] = useState<State<T>>({ type: 'table.loading' });

  return (
    <>
      <TableView
        columns={columns}
        data={data}
        onSearch={onSearch}
        canDelete={canDelete}
        canSort={canSort}
        onSort={onSort}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        onDelete={(id) => setState({ type: 'delete-confirm', id })}
        totalResultsCount={totalResultsCount}
        canCreate={canCreate}
        onCreate={() => setState({ type: 'create' })}
        onRowClick={async (id) => {
          if (!(evaluate(canEdit, id) || evaluate(canView, id))) return;
          setState({ type: 'edit.loading', id });

          const d = await onLoad!(id);
          setState({ type: 'edit', id, data: d });
        }}
      />

      {(state.type.startsWith('edit') || state.type === 'create') &&
        renderEditView({
          onClose: () => setState({ type: 'table' }),
          onSave: (() => {
            if (state.type === 'edit' && evaluate(canEdit, state.id)) {
              return async (d) => {
                await onSave!(d, state.id);
                setState({ type: 'table' });
              }
            }
            if (state.type === 'create' && canCreate) {
              return async (d) => {
                await onSave!(d);
                setState({ type: 'table' });
              }
            }
            return undefined
          })(),
          data: state.type === 'edit' ? state.data : {},
          isLoading: state.type === 'edit.loading',
          form
        })}

      {state.type === 'delete-confirm' &&
        renderDeleteConfirmation({
          onClose: () => setState({ type: 'table' }),
          onDelete: async () => {
            await onDelete(state.id);
            setState({ type: 'table' });
          }
        })}
    </>
  );
}

type Column = { 
  id: string | ((a: any) => string); 
  label: string; 
  defaultInclude?: boolean; 
};

type Props<T> = {
  canCreate?: boolean;
  canDelete?: boolean | ((id: string) => boolean);
  canEdit?: boolean | ((id: string) => boolean);
  canView?: boolean | ((id: string) => boolean);
  canSort?: (field: string) => boolean;

  // TODO: Add canSearch

  // TODO: Add toolbar buttons
  // TODO: Add row menu items

  onSort?: (field?: string, direction?: 'ascending' | 'descending') => void;
  onSearch?: (q: string) => void;
  onDelete?: (id: string) => Promise<void>;
  onSave?: (data: T, id?: string) => Promise<void>;
  onLoad?: (id: string) => Promise<T> | T;

  // TODO: Should we pick from useRelay
  nextPage?: () => void;
  previousPage?: () => void;
  setPageSize?: (size: number) => void;

  renderDeleteConfirmation?: (props: DeleteConfirmationProps) => React.ReactElement;
  renderEditView?: (props: EditViewProps<T>) => React.ReactElement;

  data: T[];
  columns: Column[];

  form?: DynamicFormDefinition;

  totalResultsCount?: number;

  isLoading?: boolean;
};
