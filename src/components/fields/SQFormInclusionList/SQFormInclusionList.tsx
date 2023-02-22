import React from 'react';
import {Grid} from '@mui/material';
import {useFormikContext, FieldArray} from 'formik';
import SQFormInclusionListItem from './SQFormInclusionListItem';
import type {FieldArrayRenderProps} from 'formik';
import type {GridProps} from '@mui/material';
import type {SQFormInclusionListItemProps} from './SQFormInclusionListItem';
import type {SQFormOption} from '../../../types';

export type SQFormInclusionListProps = {
  /** the `name` must match the name of the desired array in `initialValues` */
  name: string;
  /** boolean flag to trigger usage of Select All functionality */
  useSelectAll?: boolean;
  /** array of items to put in the `name` array on 'select all' click */
  selectAllData?: SQFormOption['value'][];
  /** props for the Grid container wrapping the select all checkbox */
  selectAllContainerProps?: GridProps;
  /** props for the 'select all' SQFormInclusionListItem component */
  selectAllProps?: Partial<
    Omit<SQFormInclusionListItemProps, 'name' | 'isChecked' | 'onChange'>
  >;
  /** Children must be a function that accepts one param of type FieldArrayRenderProps and returns a single, or array of, SQFormInclusionListItems*/
  children: (props: FieldArrayRenderProps) => JSX.Element | Array<JSX.Element>;
};

function SQFormInclusionList({
  name,
  children,
  useSelectAll = false,
  selectAllData = [],
  selectAllContainerProps = {},
  selectAllProps = {},
}: SQFormInclusionListProps): React.ReactElement {
  const {values, setFieldValue} = useFormikContext<{selectAll: boolean}>();

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setFieldValue(name, selectAllData);
    } else {
      setFieldValue(name, []);
    }
    setFieldValue('selectAll', !values?.selectAll);
  };

  if (!useSelectAll) {
    return <FieldArray name={name}>{children}</FieldArray>;
  }

  return (
    <>
      <Grid container={true} {...selectAllContainerProps}>
        <SQFormInclusionListItem
          label="Select All"
          {...selectAllProps}
          name="selectAll"
          isChecked={values.selectAll}
          onChange={handleSelectAllChange}
        />
      </Grid>
      <FieldArray name={name}>{children}</FieldArray>
    </>
  );
}

export default SQFormInclusionList;
