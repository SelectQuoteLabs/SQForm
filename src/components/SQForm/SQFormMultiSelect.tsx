import React, {ReactNode} from 'react';
import {
  FormControl,
  Select,
  Input,
  MenuItem,
  InputLabel,
  FormHelperText,
  Grid,
  Checkbox,
  Tooltip,
  makeStyles,
  ListItemText,
} from '@material-ui/core';
import {useFormikContext} from 'formik';
import {VariableSizeList} from 'react-window';
import {EMPTY_LABEL} from '../../utils/constants';
import {useForm} from './useForm';
import {
  getOutOfRangeValueWarning,
  getUndefinedChildrenWarning,
  getUndefinedValueWarning,
} from '../../utils/consoleWarnings';
import type {TooltipProps, SelectProps} from '@material-ui/core';
import type {ListChildComponentProps} from 'react-window';
import type {BaseFieldProps, SQFormOption} from '../../types';

export type SQFormMultiSelectProps<TVirtualized = boolean> = BaseFieldProps & {
  /** Multiselect options to select from */
  children: SQFormOption[];
  /** Whether the list menu items should be virtualized or not. Defaults false to ensure non-breaking changes. */
  isVirtualized: TVirtualized;
  /** Disabled property to disable the input if true */
  isDisabled?: boolean;
  /** This property will allow the end user to check a "Select All" box */
  useSelectAll?: boolean;
  /** Use MUI's Tooltip Position Values */
  toolTipPlacement?: TooltipProps['placement'];
  /** Any valid prop for material ui select child component - https://material-ui.com/api/select/#props  */
  muiFieldProps?: SelectProps;
  /** Whether or not to show the tooltip */
  showTooltip?: boolean;
  /** String to show as the tooltip.
   * Note: Default behavior is to show the selected value(s)
   */
  tooltipText?: TooltipProps['title'];
  /** Custom onChange handler */
  onChange?: (
    event: TVirtualized extends false
      ? React.ChangeEvent<{name?: string; value: unknown}>
      : React.MouseEvent<HTMLLIElement, MouseEvent>,
    value: SQFormOption['value'][]
  ) => void;
};

/**
 * Material UI has a jank issue with the multi select form,
 * requiring us to pass in these MenuProps
 * https://stackoverflow.com/questions/59785482/multiselect-box-popover-keeps-jumping-when-scroll-or-select-items
 */
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const selectedDisplayValue = (
  values: SQFormOption['value'][],
  options: SQFormMultiSelectProps['children'],
  name?: SQFormMultiSelectProps['name']
) => {
  const selectedValues = values
    .map((value) => {
      return options.find((option) => option.value === value)?.label;
    })
    .join(', ');

  if (!selectedValues) {
    if (name) {
      console.warn(
        getOutOfRangeValueWarning('SQFormMultiSelect', name, values.join(', '))
      );
    }
    return [];
  }

  return selectedValues;
};

const getToolTipTitle = (
  formikFieldValue: SQFormOption['value'][],
  options: SQFormMultiSelectProps['children']
) => {
  if (!formikFieldValue?.length) {
    return 'No value(s) selected';
  }

  return selectedDisplayValue(formikFieldValue, options);
};

const useStyles = makeStyles(
  (_selectProps: Partial<SQFormMultiSelectProps>) => {
    return {
      selectHeight: {
        '& .MuiSelect-selectMenu': {
          height: '1.1876em',
        },
      },
      paperList: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
      virtualizeListOverflow: {
        overflow: 'hidden',
        height: '100%',
        '& > ul': {
          height: `calc(100% + ${ITEM_PADDING_TOP * 1.5}px)`,
          '& > div': {
            height: `calc(100% - ${ITEM_HEIGHT}px - ${ITEM_PADDING_TOP}px) !important`, // Sigh, overriding inline style
          },
        },
      },
    };
  }
);

function SQFormMultiSelect({
  children,
  isDisabled = false,
  label,
  name,
  onChange,
  size = 'auto',
  useSelectAll = true,
  toolTipPlacement = 'bottom',
  muiFieldProps = {},
  showTooltip = true,
  tooltipText,
  isVirtualized = false,
}: SQFormMultiSelectProps): React.ReactElement {
  const classes = useStyles();

  const MenuProps = {
    PaperProps: {
      className: `${classes.paperList} ${
        isVirtualized ? classes.virtualizeListOverflow : ''
      }`,
    },
    variant: 'menu',
    getContentAnchorEl: null,
  } as SelectProps['MenuProps'];

  const {setFieldValue} = useFormikContext();
  const [toolTipEnabled, setToolTipEnabled] = React.useState(true);
  const {
    formikField: {field},
    fieldState: {isFieldError, isFieldRequired},
    fieldHelpers: {handleBlur, HelperTextComponent},
  } = useForm<SQFormOption['value'][], unknown>({name});

  React.useEffect(() => {
    if (!children) {
      console.warn(getUndefinedChildrenWarning('SQFormMultiSelect', name));
    }

    if (field.value === undefined || field.value === null) {
      console.warn(getUndefinedValueWarning('SQFormMultiSelect', name));
    }
  }, [children, field.value, name]);

  const labelID = label.toLowerCase();
  const toolTipTitle = getToolTipTitle(field.value, children);

  const getIsSelectAllChecked = (value: SQFormOption['value'][]) =>
    value.includes('ALL');
  const getIsSelectNoneChecked = (value: SQFormOption['value'][]) =>
    value.includes('NONE');

  const getValues = (
    children: SQFormMultiSelectProps['children'],
    isSelectAllChecked: boolean,
    isSelectNoneChecked: boolean,
    value: SQFormOption['value'][]
  ) => {
    if (isSelectAllChecked) {
      return children?.map((option) => option.value);
    }

    if (isSelectNoneChecked) {
      return [];
    }

    return value;
  };

  const handleMultiSelectChange = (
    event: React.ChangeEvent<{name?: string; value: unknown}>,
    _child: ReactNode
  ) => {
    const value = event.target.value as unknown as SQFormOption['value'][];
    const isSelectAllChecked = getIsSelectAllChecked(value);
    const isSelectNoneChecked = getIsSelectNoneChecked(value);
    const values = getValues(
      children,
      isSelectAllChecked,
      isSelectNoneChecked,
      value
    );

    setFieldValue(name, values);
    onChange && onChange(event, value);
  };

  const toggleTooltip = () => {
    setToolTipEnabled(!toolTipEnabled);
  };

  /**
   * this handles scenarios where label and value are not the same,
   * e.g., if value is an "ID"
   */
  const getRenderValue = (selected: unknown) => {
    const getValue = (selectedValues: SQFormOption['value'][]) => {
      if (!selectedValues?.length) {
        return EMPTY_LABEL;
      }

      return selectedDisplayValue(selectedValues, children, name);
    };

    return getValue(selected as SQFormOption['value'][]);
  };

  const renderTooltip = () => {
    if (!showTooltip || !toolTipEnabled) {
      return '';
    }

    return tooltipText || toolTipTitle;
  };

  const rowRenderer = (row: ListChildComponentProps<SQFormOption>) => {
    const {index, style} = row;
    const option = children[index];
    return (
      <MenuItem
        key={`${name}_${option.value}`}
        value={option.value}
        style={{
          ...style,
          paddingTop: 0,
          paddingBottom: 0,
        }}
        onClick={(event) => {
          const value = [...field.value] as unknown as SQFormOption['value'][];
          const indexToRemove = value.indexOf(option.value);

          if (indexToRemove > -1) {
            value.splice(indexToRemove, 1);
          } else {
            value.push(option.value);
          }

          const isSelectAllChecked = getIsSelectAllChecked(value);
          const isSelectNoneChecked = getIsSelectNoneChecked(value);
          const values = getValues(
            children,
            isSelectAllChecked,
            isSelectNoneChecked,
            value
          );

          setFieldValue(name, values);
          onChange && onChange(event, value);
        }}
      >
        <Checkbox checked={field.value?.includes(option.value)} />
        <ListItemText
          primary={option.label}
          primaryTypographyProps={{variant: 'body2'}}
        />
      </MenuItem>
    );
  };

  const listItems = () => {
    const LIST_MAX_VIEWABLE_ITEMS = 8;
    const LIST_OVERSCAN_COUNT = 7;

    const getHeight = () => {
      if (children.length > LIST_MAX_VIEWABLE_ITEMS) {
        return LIST_MAX_VIEWABLE_ITEMS * ITEM_HEIGHT;
      }
      return children.length * ITEM_HEIGHT + 2 * ITEM_PADDING_TOP;
    };

    return (
      <VariableSizeList
        itemSize={() => ITEM_HEIGHT}
        width={''}
        height={getHeight()}
        itemCount={children.length}
        overscanCount={LIST_OVERSCAN_COUNT}
      >
        {rowRenderer}
      </VariableSizeList>
    );
  };

  return (
    <Grid item sm={size}>
      <FormControl
        error={isFieldError}
        disabled={isDisabled}
        required={isFieldRequired}
        fullWidth={true}
      >
        <InputLabel shrink={true} id={labelID}>
          {label}
        </InputLabel>
        <Tooltip
          placement={toolTipPlacement}
          arrow={true}
          enterDelay={1000}
          leaveDelay={100}
          title={renderTooltip()}
        >
          <Select
            className={classes.selectHeight}
            multiple
            displayEmpty
            input={<Input disabled={isDisabled} name={name} />}
            value={(field.value as SQFormOption['value'][]) || []}
            onBlur={handleBlur}
            onChange={handleMultiSelectChange}
            fullWidth={true}
            labelId={labelID}
            renderValue={getRenderValue}
            MenuProps={MenuProps}
            onOpen={toggleTooltip}
            onClose={toggleTooltip}
            {...muiFieldProps}
          >
            {useSelectAll && (
              <MenuItem
                value={
                  children?.length === field.value?.length ? 'NONE' : 'ALL'
                }
              >
                <Checkbox checked={children?.length === field.value?.length} />
                <ListItemText
                  primary="Select All"
                  primaryTypographyProps={{variant: 'body2'}}
                />
              </MenuItem>
            )}
            {isVirtualized
              ? listItems()
              : children?.map((option) => {
                  return (
                    <MenuItem
                      key={`${name}_${option.value}`}
                      value={option.value}
                    >
                      <Checkbox checked={field.value?.includes(option.value)} />
                      <ListItemText
                        primary={option.label}
                        primaryTypographyProps={{variant: 'body2'}}
                      />
                    </MenuItem>
                  );
                })}
          </Select>
        </Tooltip>
        {!isDisabled && <FormHelperText>{HelperTextComponent}</FormHelperText>}
      </FormControl>
    </Grid>
  );
}

export default SQFormMultiSelect;
