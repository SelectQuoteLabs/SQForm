import React from 'react';
import {
  Autocomplete,
  Box,
  TextField,
  Grid,
  Typography,
  Tooltip,
} from '@mui/material';
import {VariableSizeList} from 'react-window';
import {getIn, useField, useFormikContext} from 'formik';
import {usePrevious} from '@selectquotelabs/sqhooks';
import {useForm} from './useForm';
import type {AutocompleteChangeReason} from '@mui/base';
import type {ListChildComponentProps} from 'react-window';
import type {BaseFieldProps, SQFormOption} from '../../types';

export type SQFormAutocompleteProps = BaseFieldProps & {
  /** Dropdown menu options to select from */
  children: SQFormOption[];
  /** Disabled property to disable the input if true */
  isDisabled?: boolean;
  /** Whether to display empty option */
  displayEmpty?: boolean;
  /** Custom onBlur event callback */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Custom onChange event callback */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    selectedValue: SQFormOption['value'],
    reason: AutocompleteChangeReason
  ) => void;
  /** Custom onInputChange event callback (key pressed) */
  onInputChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: SQFormOption['value']
  ) => void;
  /** Lock width of the dropdown to the width of the field in the form */
  lockWidthToField?: boolean;
};

export type OuterElementTypeProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export type ListboxVirtualizedComponentProps = {
  children?: React.ReactNode;
  basewidth: number;
  left: number;
  lockWidthToField: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export type OuterElementContextType = {
  className?: string;
  style?: React.CSSProperties;
};

// MUI uses px, a numeric value is needed for calculations
const LISTBOX_PADDING = 8; // px

const EMPTY_OPTION = {label: '- -', value: ''};

const OuterElementContext = React.createContext<OuterElementContextType | null>(
  {}
);

const OuterElementType = React.forwardRef<HTMLDivElement>(
  (props: OuterElementTypeProps, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return (
      <Box
        ref={ref}
        {...props}
        {...outerProps}
        className={`${props?.className || ''} ${outerProps?.className || ''}`}
        sx={{...[props?.style || {}], ...[outerProps?.style || {}]}}
      />
    );
  }
);

function renderRow({data, index, style}: ListChildComponentProps) {
  const elToClone = data[index];
  const value = elToClone.props.children.props.children;
  const clone = React.cloneElement(elToClone, {
    style: {
      ...style,
      top: (style.top as number) + LISTBOX_PADDING,
    },
  });

  return (
    <Tooltip
      title={value || ''}
      key={`${value}-${index}-with-tooltip`}
      disableInteractive={true}
      placement="bottom-start"
    >
      {clone}
    </Tooltip>
  );
}

const calculateWidth = (baseWidth: number, left: number) => {
  if (baseWidth) {
    return `min(${baseWidth * 2}px, ${
      window.innerWidth
    }px - ${left}px - 24px) !important`;
  }

  return 'initial !important';
};

// Adapter for react-window
const ListboxVirtualizedComponent = React.forwardRef<HTMLDivElement>(
  function ListboxVirtualizedComponent(
    {
      basewidth,
      left,
      lockWidthToField,
      ...restProps
    }: ListboxVirtualizedComponentProps,
    ref
  ): React.ReactElement {
    const {children, ...listboxProps} = restProps;
    const LIST_MAX_VIEWABLE_ITEMS = 8;
    const LIST_OVERSCAN_COUNT = 5;
    const items = React.Children.toArray(children);
    const ITEM_COUNT = items.length;
    const ITEM_SIZE = 36;

    const height = React.useMemo(() => {
      if (ITEM_COUNT > LIST_MAX_VIEWABLE_ITEMS) {
        return LIST_MAX_VIEWABLE_ITEMS * ITEM_SIZE;
      }
      return items.length * ITEM_SIZE + 2 * LISTBOX_PADDING;
    }, [ITEM_COUNT, items]);

    const getItemSize = React.useCallback(() => ITEM_SIZE, []);
    const getItemWidth = () => {
      return lockWidthToField
        ? `${basewidth}px !important`
        : calculateWidth(basewidth, left);
    };

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={listboxProps}>
          <Box
            sx={{
              '& ul': {
                width: getItemWidth(),
              },
            }}
          >
            <VariableSizeList
              style={{
                overflow: 'hidden',
                margin: 0,
                padding: 0,
              }}
              itemData={items}
              height={height}
              key={ITEM_COUNT}
              outerElementType={OuterElementType}
              innerElementType="ul"
              itemSize={getItemSize}
              overscanCount={LIST_OVERSCAN_COUNT}
              itemCount={ITEM_COUNT}
              width=""
            >
              {renderRow}
            </VariableSizeList>
          </Box>
        </OuterElementContext.Provider>
      </div>
    );
  } as React.ForwardRefRenderFunction<HTMLDivElement>
);

const getInitialValue = (
  children: SQFormOption[],
  value: SQFormOption['value'],
  displayEmpty: boolean
) => {
  const optionInitialValue = children?.find((option) => {
    if (option.value === value) {
      return option;
    }

    return null;
  });

  if (!optionInitialValue && displayEmpty) {
    return EMPTY_OPTION;
  }

  return optionInitialValue;
};

const calculateBaseWidth = (ref: HTMLDivElement | null) => {
  if (!ref) {
    return;
  }

  const {marginLeft, paddingLeft, width, paddingRight, marginRight} =
    window.getComputedStyle(ref);

  const baseWidth =
    parseFloat(width) -
    parseFloat(marginLeft) -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight) -
    parseFloat(marginRight) -
    // Note: 8px is the amount of padding inside the dropdown
    8;

  return baseWidth;
};

function SQFormAutocomplete({
  children,
  isDisabled = false,
  displayEmpty = false,
  label,
  name,
  onBlur,
  onChange,
  onInputChange,
  size = 'auto',
  lockWidthToField = true,
}: SQFormAutocompleteProps): React.ReactElement {
  const gridContainerRef = React.useRef<HTMLDivElement>(null);
  const baseWidth = calculateBaseWidth(gridContainerRef.current);
  const left = gridContainerRef.current?.getBoundingClientRect().left;
  const {setFieldValue, setTouched, values, touched} = useFormikContext();
  const [{value}] = useField(name);
  const {
    fieldState: {isFieldError, isFieldRequired},
    fieldHelpers: {HelperTextComponent},
  } = useForm({name});

  const initialValue = getInitialValue(children, value, displayEmpty);

  const [inputValue, setInputValue] = React.useState('');
  const prevValue = usePrevious(value);

  React.useEffect(() => {
    setInputValue(initialValue?.label || '');
  }, [initialValue]);

  React.useEffect(() => {
    // Form Reset
    if (prevValue && inputValue && !value) {
      setInputValue(displayEmpty ? EMPTY_OPTION.label : '');
    }
  }, [value, inputValue, name, prevValue, values, displayEmpty]);

  const handleAutocompleteBlur = React.useCallback(
    (event) => {
      setTouched({...touched, ...{[name]: true}});
      onBlur && onBlur(event);
    },
    [name, onBlur, setTouched, touched]
  );

  const handleAutocompleteChange = React.useCallback(
    (event, value, reason) => {
      const selectedValue = getIn(value, 'value');
      onChange && onChange(event, selectedValue, reason);
      if (reason === 'clear') {
        return setFieldValue(name, '');
      }
      return setFieldValue(name, selectedValue);
    },
    [name, onChange, setFieldValue]
  );

  const handleInputChange = React.useCallback(
    (event, value) => {
      setInputValue(value);
      onInputChange && onInputChange(event, value);
    },
    [onInputChange]
  );

  const options = children ? [...children] : [];
  displayEmpty && options.unshift(EMPTY_OPTION);

  const listboxProps = {
    basewidth: baseWidth,
    left,
    lockWidthToField,
  } as React.HTMLAttributes<HTMLElement>;
  return (
    <Grid
      item={true}
      xs={size}
      ref={gridContainerRef}
      sx={{
        position: 'relative',
        '& .MuiAutocomplete-listbox': {
          '& ul': {
            p: 0,
            m: 0,
          },
        },
        '& .MuiAutocomplete-paper': {
          m: 0,
        },
        '& .MuiAutocomplete-popper': {
          borderRadius: '4px',
          boxShadow: '0px 3px 4px 0px rgb(100 100 100)',
          width: !lockWidthToField ? 'auto !important' : undefined,
          // This makes sure the autocomplete options list width is never less than the input field width
          minWidth: `${Number(baseWidth ?? 0) + LISTBOX_PADDING}px !important`,
        },
        '& .MuiInputBase-root.Mui-error:before': {
          borderColor: 'var(--color-textWarningYellow)',
        },
        '& .Mui-error': {
          color: 'var(--color-textWarningYellow)',
        },
        '& .MuiFormHelperText-root > .MuiSvgIcon-colorError': {
          color: 'var(--color-textWarningYellow)',
        },
        '& .MuiFormHelperText-root > .MuiSvgIcon-root:not(.MuiSvgIcon-colorDisabled):not(.MuiSvgIcon-colorError)':
          {
            color: 'var(--color-textSuccessGreen)',
          },
        '& .MuiInputBase-root.Mui-error': {
          borderColor: 'var(--color-textWarningYellow)',
        },
      }}
    >
      <Autocomplete
        id={name}
        style={{width: '100%'}}
        disableListWrap={true}
        disablePortal={!lockWidthToField}
        ListboxComponent={
          ListboxVirtualizedComponent as React.ComponentType<
            React.HTMLAttributes<HTMLElement>
          >
        }
        // Note: basewidth is not camel cased because React doesn't like it here
        ListboxProps={listboxProps}
        componentsProps={{
          popper: {
            popperOptions: {
              placement: 'bottom-start',
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: !lockWidthToField ? [0, 20] : [0, 0],
                  },
                },
              ],
            },
          },
        }}
        options={options}
        onBlur={handleAutocompleteBlur}
        onChange={handleAutocompleteChange}
        onInputChange={handleInputChange}
        inputValue={inputValue}
        value={initialValue || null}
        disableClearable={isDisabled}
        disabled={isDisabled}
        getOptionLabel={(option) => option.label || ''}
        getOptionDisabled={(option: SQFormOption) =>
          option?.isDisabled || false
        }
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              color="primary"
              variant="standard"
              disabled={isDisabled}
              error={isFieldError}
              fullWidth={true}
              InputLabelProps={{
                ...params.InputLabelProps,
                shrink: true,
              }}
              inputProps={{
                ...params.inputProps,
                disabled: isDisabled,
              }}
              FormHelperTextProps={{error: isFieldError}}
              name={name}
              label={label}
              helperText={!isDisabled && HelperTextComponent}
              required={isFieldRequired}
            />
          );
        }}
        renderOption={(props, option) => (
          <li {...props}>
            <Typography variant="body2" sx={{fontWeight: 600}} noWrap={true}>
              {option.label}
            </Typography>
          </li>
        )}
      />
    </Grid>
  );
}

export default SQFormAutocomplete;
