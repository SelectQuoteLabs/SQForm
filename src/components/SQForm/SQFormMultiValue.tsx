import React from 'react';
import {Grid, Chip, TextField, makeStyles} from '@material-ui/core';
import Autocomplete, {
  AutocompleteChangeReason,
  AutocompleteRenderInputParams,
} from '@material-ui/lab/Autocomplete';
import {VariableSizeList} from 'react-window';
import type {ListChildComponentProps} from 'react-window';
import {useField, useFormikContext} from 'formik';
import {usePrevious} from '@selectquotelabs/sqhooks';
import {useForm} from './useForm';
import type {BaseFieldProps, Option, optionValue} from 'types';
import type {
  OuterElementContextInterface,
  OuterElementTypeProps,
} from './SQFormAutocomplete';

interface SQFormMultiValueProps extends BaseFieldProps {
  /** options to select from */
  children: Option[];
  /** Whether the field is required */
  isRequired?: boolean;
  /** Whether the field is disabled */
  isDisabled?: boolean;
  /** Custom handler for input value change */
  onInputChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: optionValue
  ) => void;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: (string | Option)[],
    reason: AutocompleteChangeReason,
    detail?: string | Option
  ) => void;
  /** Custom onBlur event callback */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

// MUI uses px, a numeric value is needed for calculations
const LISTBOX_PADDING = 8; // px

const OuterElementContext =
  React.createContext<OuterElementContextInterface | null>({});

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
const ListboxVirtualizedComponent = React.forwardRef(
  function ListboxVirtualizedComponent(props, ref) {
    const {children, ...listboxProps} = props;
    const LIST_MAX_VIEWABLE_ITEMS = 8;
    const LIST_OVERSCAN_COUNT = 5;
    const ITEM_SIZE = 36;
    const items = React.Children.toArray(children);
    const ITEM_COUNT = items.length;

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
  } as React.ForwardRefRenderFunction<HTMLDivElement>
);

const useStyles = makeStyles({
  listbox: {
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

const clearButtonStyles = makeStyles({
  endAdornment: {
    top: 'auto',
    bottom: '8px',
  },
});

function SQFormMultiValue({
  children,
  name,
  label,
  size = 'auto',
  isDisabled = false,
  onInputChange,
  onChange,
  onBlur,
}: SQFormMultiValueProps): React.ReactElement {
  const classes = useStyles();
  const clearButtonClasses = clearButtonStyles();
  const [{value: fieldValue}, {initialValue}] = useField(name);
  const {setFieldValue, setTouched, touched} = useFormikContext();
  const {
    fieldState: {isFieldError},
    fieldHelpers: {HelperTextComponent},
  } = useForm({
    name,
  });

  const [inputValue, setInputValue] = React.useState('');
  const [customOptions, setCustomOptions] = React.useState<Option[]>([]);
  const displayOptions = React.useMemo(
    () => [...children, ...customOptions],
    [children, customOptions]
  );
  const previousInitialValue = usePrevious(initialValue);

  React.useEffect(() => {
    // Don't run this effect every time displayOptions changes
    // This also prevents infinite rerenders
    // Maybe use deep-equal? This won't work if key order changes
    if (JSON.stringify(previousInitialValue) === JSON.stringify(initialValue)) {
      return;
    }

    const displayValues = displayOptions.map((option) => {
      return option.value;
    });

    const newCustomOptions: Option[] = initialValue.reduce(
      (acc: Option[], value: optionValue): Option[] => {
        if (displayValues.includes(value)) {
          return acc;
        }

        acc.push({
          label: value.toString(),
          value,
        });

        return acc;
      },
      []
    );

    setCustomOptions((previousCustomOptions) => {
      return [...previousCustomOptions, ...newCustomOptions];
    });
  }, [initialValue, displayOptions, previousInitialValue]);

  const handleAutocompleteBlur = React.useCallback(
    (event) => {
      setTouched({...touched, ...{[name]: true}});
      onBlur && onBlur(event);
    },
    [onBlur, name, setTouched, touched]
  );

  const handleAutocompleteChange = React.useCallback(
    (event, value, reason, detail) => {
      if (reason === 'clear') {
        setFieldValue(name, []);
        setInputValue('');
        onChange && onChange(event, value, reason, detail);
        return;
      }

      if (reason === 'create-option') {
        /* Creating an option we always know that the last value
         * in the `value` array is a string
         */
        const newCustomOption: Option = {
          label: value[value.length - 1],
          value: value[value.length - 1],
        };
        const isCustomOptionNew = customOptions.every((customOption) => {
          return customOption.value !== newCustomOption.value;
        });

        if (isCustomOptionNew) {
          setCustomOptions((prevCustomOptions) => [
            ...prevCustomOptions,
            newCustomOption,
          ]);
        }

        setFieldValue(name, value);
        setInputValue('');
        onChange && onChange(event, value, reason, newCustomOption);
        return;
      }

      if (reason === 'remove-option') {
        const currentFieldOptions: string[] = [...value];

        const newCustomOptions = customOptions.filter((customOption) => {
          return customOption.value !== detail.option;
        });
        setCustomOptions(newCustomOptions);
        setFieldValue(name, currentFieldOptions);
        onChange && onChange(event, currentFieldOptions, reason);
        return;
      }

      const currentFieldOptions = [...value];
      const newlyAddedOption = currentFieldOptions.pop();
      let newFieldValue;
      if (currentFieldOptions.includes(newlyAddedOption.value)) {
        newFieldValue = currentFieldOptions.filter((option) => {
          return option !== newlyAddedOption.value;
        });
      } else {
        newFieldValue = [...currentFieldOptions, newlyAddedOption.value];
      }

      setFieldValue(name, newFieldValue);
      onChange && onChange(event, value, reason);
    },
    [onChange, customOptions, name, setFieldValue]
  );

  const handleInputChange = React.useCallback(
    (event, value, reason) => {
      if (reason === 'input') {
        setInputValue(value);
        onInputChange && onInputChange(event, value);
      }
    },
    [onInputChange]
  );

  const getInputElement = (params: AutocompleteRenderInputParams) => {
    const endAdornment = params.InputProps.endAdornment;

    // if `endAdornment` exists, it's not primitive, has the props key exists and its value isn't undefined
    if (
      endAdornment &&
      typeof endAdornment === 'object' &&
      'props' in endAdornment &&
      endAdornment.props
    ) {
      const newEndAdornment = {
        ...endAdornment,
        props: {
          ...endAdornment.props,
          className: `${endAdornment.props.className} ${clearButtonClasses.endAdornment}`,
        },
      };

      return (
        <TextField
          {...params}
          name={name}
          color="primary"
          disabled={isDisabled}
          fullWidth={true}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: newEndAdornment,
          }}
          InputLabelProps={{
            ...params.InputLabelProps,
            shrink: true,
          }}
          inputProps={{
            ...params.inputProps,
            disabled: isDisabled,
          }}
          FormHelperTextProps={{error: isFieldError}}
          helperText={!isDisabled && HelperTextComponent}
        />
      );
    }

    return null;
  };

  return (
    <Grid item sm={size}>
      <Autocomplete
        classes={classes}
        multiple={true}
        id={name}
        options={children}
        freeSolo={true}
        renderTags={(value, getTagProps) => {
          return value.map((optionValue, index) => {
            const tagOption = displayOptions.find((autocompleteOption) => {
              return autocompleteOption.value === optionValue;
            });

            if (!tagOption) {
              return null;
            }

            return (
              <Chip
                variant="outlined"
                label={tagOption.label}
                {...getTagProps({index})}
              />
            );
          });
        }}
        ListboxComponent={
          ListboxVirtualizedComponent as React.ComponentType<
            React.HTMLAttributes<HTMLElement>
          >
        }
        getOptionLabel={(option) => option.label || ''}
        value={fieldValue || []}
        inputValue={inputValue}
        onBlur={handleAutocompleteBlur}
        onChange={handleAutocompleteChange}
        onInputChange={handleInputChange}
        getOptionDisabled={(option) => option.isDisabled}
        disabled={isDisabled}
        disableClearable={isDisabled}
        renderInput={getInputElement}
      />
    </Grid>
  );
}

export default SQFormMultiValue;
