import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  AutocompleteChangeReason,
} from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {ListChildComponentProps, VariableSizeList} from 'react-window';
import {Typography} from '@material-ui/core';
import {getIn, useField, useFormikContext} from 'formik';
import {usePrevious} from '@selectquotelabs/sqhooks';
import {BaseFieldProps, Option, optionValue} from '../../types/';
import {useForm} from './useForm';

interface SQFormAutocompleteProps extends BaseFieldProps {
  /** Dropdown menu options to select from */
  children: Option[];
  /** Disabled property to disable the input if true */
  isDisabled?: boolean;
  /** Required property used to highlight input and label if not fulfilled */
  isRequired?: boolean;
  /** Whether to display empty option */
  displayEmpty?: boolean;
  /** Custom onBlur event callback */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Custom onChange event callback */
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    selectedValue: optionValue,
    reason: AutocompleteChangeReason
  ) => void;
  /** Custom onInputChange event callback (key pressed) */
  onInputChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: optionValue
  ) => void;
}

// MUI uses px, a numeric value is needed for calculations
const LISTBOX_PADDING = 8; // px

const EMPTY_OPTION = {label: '- -', value: ''};

const useStyles = makeStyles({
  listbox: {
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

const OuterElementContext = React.createContext({});
/*
function OuterElementType(props: HTMLAttributes<HTMLDivElement>) {
  const outerProps = React.useContext(OuterElementContext);
  const divRef = React.useRef(null);
  return <div ref={divRef} {...props} {...outerProps} />
}*/

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function renderRow({data, index, style}: ListChildComponentProps) {
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: (style.top as number) + LISTBOX_PADDING,
    },
  });
}

// Adapter for react-window
const ListboxVirtualizedComponent = React.forwardRef<HTMLDivElement>(
  function ListboxVirtualizedComponent(props, ref) {
    const {children, ...listboxProps} = props;
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
            itemData={children}
            height={height}
            width="100%"
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
  }
);

const getInitialValue = (
  children: Option[],
  value: optionValue,
  displayEmpty: boolean
) => {
  const optionInitialValue = children.find((option) => {
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

function SQFormAutocomplete({
  children,
  isDisabled = false,
  isRequired = false,
  displayEmpty = false,
  label,
  name,
  onBlur,
  onChange,
  onInputChange,
  size = 'auto',
}: SQFormAutocompleteProps): React.ReactElement {
  const classes = useStyles();
  const {setFieldValue, setTouched, values, touched} = useFormikContext();
  const [{value}] = useField(name);
  const {
    fieldState: {isFieldError},
    fieldHelpers: {HelperTextComponent},
  } = useForm({
    name,
    isRequired,
  });

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
    (_event, value) => {
      setInputValue(value);
      onInputChange && onInputChange(_event, value);
    },
    [onInputChange]
  );

  const options = displayEmpty ? [EMPTY_OPTION, ...children] : children;

  return (
    <Grid item sm={size}>
      <Autocomplete
        id={name}
        style={{width: '100%'}}
        disableListWrap
        classes={classes}
        // This type casting is how MUI handles the type issue https://material-ui.com/components/autocomplete/#virtualization, https://github.com/mui-org/material-ui/issues/26342
        ListboxComponent={
          ListboxVirtualizedComponent as React.ComponentType<
            React.HTMLAttributes<HTMLElement>
          >
        }
        options={options}
        onBlur={handleAutocompleteBlur}
        onChange={handleAutocompleteChange}
        onInputChange={handleInputChange}
        inputValue={inputValue}
        value={initialValue || null}
        disableClearable={isDisabled}
        disabled={isDisabled}
        getOptionLabel={(option) => option.label || ''}
        getOptionDisabled={(option: Option) => option.isDisabled || false}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
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
              FormHelperTextProps={{error: isFieldError}}
              name={name}
              label={label}
              helperText={!isDisabled && HelperTextComponent}
              required={isRequired}
            />
          );
        }}
        renderOption={(option) => (
          <Typography variant="body2" noWrap>
            {option.label}
          </Typography>
        )}
      />
    </Grid>
  );
}

export default SQFormAutocomplete;
