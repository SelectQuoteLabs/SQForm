import React from 'react';
import {
  Autocomplete,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import {VariableSizeList} from 'react-window';
import {getIn, useField, useFormikContext} from 'formik';
import {usePrevious} from '@selectquotelabs/sqhooks';
import {useForm} from './useForm';
import type {ListChildComponentProps} from 'react-window';
import type {AutocompleteProps} from '@mui/material';
import type {
  ListboxVirtualizedComponentProps,
  OuterElementContextType,
  OuterElementTypeProps,
  SQFormAutocompleteProps,
} from './SQFormAutocomplete';
import type {SQFormOption, SQFormOptionValue} from '../../types';

export type SQFormAsyncAutocompleteProps = SQFormAutocompleteProps & {
  /** updates consumer's local state value for the input, which is passed to a useQuery hook */
  handleAsyncInputChange: (value: SQFormOptionValue) => void;
  /** Whether the component is loading */
  loading?: boolean;
  /** Whether the popup is open */
  open?: boolean;
  /** Callback for when the popup requests to be opened */
  onOpen?: AutocompleteProps<SQFormOptionValue, false, false, false>['onOpen'];
  /** Callback for when the popup requests to be closed */
  onClose?: AutocompleteProps<
    SQFormOptionValue,
    false,
    false,
    false
  >['onClose'];
};

// MUI uses px, a numeric value is needed for calculations
const LISTBOX_PADDING = 8; // px

const OuterElementContext = React.createContext<OuterElementContextType | null>(
  {}
);

const OuterElementType = React.forwardRef<HTMLDivElement>(
  (props: OuterElementTypeProps, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
  }
);

function renderRow({data, index, style}: ListChildComponentProps) {
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: (style.top as number) + LISTBOX_PADDING,
    },
  });
}

// Adapter for react-window
const ListboxVirtualizedComponent: React.ForwardRefExoticComponent<
  React.RefAttributes<HTMLDivElement>
> = React.forwardRef<HTMLDivElement>(function ListboxVirtualizedComponent(
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

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={listboxProps}>
        <VariableSizeList
          itemData={items}
          height={height}
          width="100%"
          style={{
            overflowY: 'hidden',
            margin: 0,
            padding: 0,
          }}
          key={ITEM_COUNT}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={getItemSize}
          overscanCount={LIST_OVERSCAN_COUNT}
          itemCount={ITEM_COUNT}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
} as React.ForwardRefRenderFunction<HTMLDivElement>);

function SQFormAsyncAutocomplete({
  children,
  isDisabled = false,
  label,
  name,
  onBlur,
  onChange,
  onInputChange,
  handleAsyncInputChange,
  loading = false,
  open,
  onOpen,
  onClose,
  size = 'auto',
}: SQFormAsyncAutocompleteProps): React.ReactElement {
  const {setFieldValue, setTouched, values} = useFormikContext();
  const [{value}] = useField(name);
  const {
    fieldState: {isFieldError, isFieldRequired},
    fieldHelpers: {HelperTextComponent},
  } = useForm({name});

  const initialValue = React.useMemo(() => {
    const optionInitialValue = children.find((option) => {
      if (option.value === value) {
        return option;
      }

      return null;
    });

    return optionInitialValue;
  }, [children, value]);

  const [inputValue, setInputValue] = React.useState('');
  const prevValue = usePrevious(value);

  React.useEffect(() => {
    setInputValue(initialValue?.label || '');
  }, [initialValue]);

  React.useEffect(() => {
    // Form Reset
    if (prevValue && inputValue && !value) {
      setInputValue('');
    }
  }, [value, inputValue, name, prevValue, values]);

  const handleAutocompleteBlur = React.useCallback(
    (event) => {
      setTouched({[name]: true});
      onBlur && onBlur(event);
    },
    [name, onBlur, setTouched]
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
      handleAsyncInputChange(value);
      onInputChange && onInputChange(event, value);
    },
    [handleAsyncInputChange, onInputChange]
  );

  return (
    <Grid item={true} sm={size}>
      <Autocomplete
        id={name}
        sx={{
          '& label': {
            overflow: 'initial',
            lineHeight: 1,
            whiteSpace: 'normal',
          },
        }}
        disableListWrap={true}
        ListboxComponent={
          ListboxVirtualizedComponent as React.ComponentType<
            React.HTMLAttributes<HTMLElement>
          >
        }
        options={children}
        onBlur={handleAutocompleteBlur}
        onChange={handleAutocompleteChange}
        onInputChange={handleInputChange}
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        inputValue={inputValue}
        disabled={isDisabled}
        getOptionLabel={(option) => option.label}
        getOptionDisabled={(option: SQFormOption) => option.isDisabled || false}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              variant="standard"
              color="primary"
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
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              FormHelperTextProps={{error: isFieldError}}
              name={name}
              label={label}
              helperText={!isDisabled && HelperTextComponent}
              required={isFieldRequired}
            />
          );
        }}
        renderOption={(props, option) => {
          return (
            <li {...props}>
              <Typography variant="body2" noWrap={true}>
                {option.label}
              </Typography>
            </li>
          );
        }}
      />
    </Grid>
  );
}

export default SQFormAsyncAutocomplete;
