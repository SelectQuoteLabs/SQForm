import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Chip, TextField, makeStyles} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {VariableSizeList} from 'react-window';
import {useField, useFormikContext} from 'formik';
import {useForm} from './useForm';
import {usePrevious} from '@selectquotelabs/sqhooks';

// MUI uses px, a numeric value is needed for calculations
const LISTBOX_PADDING = 8; // px

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function renderRow({data, index, style}) {
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING
    }
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
      return (
        items.reduce((acc, _item) => acc + ITEM_SIZE, 0) + 2 * LISTBOX_PADDING
      );
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
  }
);

const useStyles = makeStyles({
  listbox: {
    '& ul': {
      padding: 0,
      margin: 0
    }
  }
});

const clearButtonStyles = makeStyles({
  clearButton: {
    top: 'auto',
    bottom: '8px'
  }
});

function SQFormMultiValue({
  children,
  name,
  label,
  size = 'auto',
  isRequired = false,
  isDisabled = false,
  onInputChange,
  onChange,
  onBlur
}) {
  const classes = useStyles();
  const clearButtonClasses = clearButtonStyles();
  const [{value: fieldValue}, {initialValue}] = useField(name);
  const {setFieldValue, setTouched, touched} = useFormikContext();
  const {
    fieldState: {isFieldError},
    fieldHelpers: {HelperTextComponent}
  } = useForm({
    name,
    isRequired
  });

  const [inputValue, setInputValue] = React.useState('');
  const [customOptions, setCustomOptions] = React.useState([]);
  const displayOptions = React.useMemo(() => [...children, ...customOptions], [
    children,
    customOptions
  ]);
  const previousInitialValue = usePrevious(initialValue);

  React.useEffect(() => {
    // Don't run this effect every time displayOptions changes
    // This also prevents infinite rerenders
    if (JSON.stringify(previousInitialValue) === JSON.stringify(initialValue)) {
      return;
    }

    const displayValues = displayOptions.reduce((acc, option) => {
      acc.push(option.value);
      return acc;
    }, []);

    const newCustomOptions = initialValue.reduce((acc, value) => {
      if (displayValues.includes(value)) {
        return acc;
      }

      acc.push({
        label: value,
        value
      });

      return acc;
    }, []);

    setCustomOptions(previousCustomOptions => {
      return [...previousCustomOptions, ...newCustomOptions];
    });
  }, [initialValue, displayOptions, previousInitialValue]);

  const handleAutocompleteBlur = React.useCallback(
    event => {
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
        const newCustomOption = {
          label: value[value.length - 1],
          value: value[value.length - 1]
        };
        const isCustomOptionNew = customOptions.every(customOption => {
          return customOption.value !== newCustomOption.value;
        });

        if (isCustomOptionNew) {
          setCustomOptions(prevCustomOptions => [
            ...prevCustomOptions,
            newCustomOption
          ]);
        }

        setFieldValue(name, value);
        setInputValue('');
        onChange && onChange(event, newCustomOption, reason);
        return;
      }

      if (reason === 'remove-option') {
        const currentFieldOptions = [...value];

        const newCustomOptions = customOptions.filter(customOption => {
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
        newFieldValue = currentFieldOptions.filter(option => {
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
            const tagOption = displayOptions.find(autocompleteOption => {
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
        ListboxComponent={ListboxVirtualizedComponent}
        getOptionLabel={option => option.label || ''}
        value={fieldValue || []}
        inputValue={inputValue}
        onBlur={handleAutocompleteBlur}
        onChange={handleAutocompleteChange}
        onInputChange={handleInputChange}
        getOptionDisabled={option => option.isDisabled}
        disabled={isDisabled}
        disableClearable={isDisabled}
        renderInput={params => (
          <TextField
            {...params}
            name={name}
            color="primary"
            disabled={isDisabled}
            fullWidth={true}
            label={label}
            InputProps={{
              ...params.InputProps,
              endAdornment: {
                ...params.InputProps.endAdornment,
                props: {
                  ...params.InputProps.endAdornment.props,
                  className: `${params.InputProps.endAdornment.props.className} ${clearButtonClasses.clearButton}`
                }
              }
            }}
            InputLabelProps={{
              ...params.InputLabelProps,
              shrink: true
            }}
            inputProps={{
              ...params.inputProps,
              disabled: isDisabled
            }}
            FormHelperTextProps={{error: isFieldError}}
            helperText={!isDisabled && HelperTextComponent}
          />
        )}
      />
    </Grid>
  );
}

SQFormMultiValue.propTypes = {
  /** options to select from */
  children: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      isDisabled: PropTypes.bool
    })
  ),
  /** Name of the form field */
  name: PropTypes.string.isRequired,
  /** Label to display with the form field */
  label: PropTypes.string.isRequired,
  /** Size of the input given full-width is 12. */
  size: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /** Whether the field is required */
  isRequired: PropTypes.bool,
  /** Whether the field is disabled */
  isDisabled: PropTypes.bool,
  /** Custom handler for input value change */
  onInputChange: PropTypes.func,
  /** Custom handler for autocomplete value change */
  onChange: PropTypes.func,
  /** Custom handler for field blur */
  onBlur: PropTypes.func
};

export default SQFormMultiValue;
