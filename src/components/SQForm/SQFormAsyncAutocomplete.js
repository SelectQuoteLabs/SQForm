import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {VariableSizeList} from 'react-window';
import {Typography} from '@material-ui/core';
import {getIn, useField, useFormikContext} from 'formik';
import {usePrevious} from '@selectquotelabs/sqhooks';
import {useForm} from './useForm';

// MUI uses px, a numeric value is needed for calculations
const LISTBOX_PADDING = 8; // px

const useStyles = makeStyles({
  listbox: {
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function renderRow({data, index, style}) {
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

// Adapter for react-window
const ListboxVirtualizedComponent = React.forwardRef(
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
}) {
  const classes = useStyles();
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
    (_event, value) => {
      setInputValue(value);
      handleAsyncInputChange(value);
      onInputChange && onInputChange();
    },
    [handleAsyncInputChange, onInputChange]
  );

  return (
    <Grid item sm={size}>
      <Autocomplete
        id={name}
        name={name}
        style={{width: '100%'}}
        disableListWrap
        classes={classes}
        ListboxComponent={ListboxVirtualizedComponent}
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
        getOptionDisabled={(option) => option.isDisabled}
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
        renderOption={(option) => (
          <Typography variant="body2" noWrap>
            {option.label}
          </Typography>
        )}
      />
    </Grid>
  );
}

SQFormAsyncAutocomplete.propTypes = {
  /** Dropdown menu options to select from */
  children: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  /** updates consumer's local state value for the input, which is passed to a useQuery hook */
  handleAsyncInputChange: PropTypes.func.isRequired,
  /** Disabled property to disable the input if true */
  isDisabled: PropTypes.bool,
  /** Whether the component is loading */
  loading: PropTypes.bool,
  /** Label text */
  label: PropTypes.string.isRequired,
  /** Name identifier of the input field */
  name: PropTypes.string.isRequired,
  /** Custom onBlur event callback */
  onBlur: PropTypes.func,
  /** Custom onChange event callback */
  onChange: PropTypes.func,
  /** Custom onInputChange event callback (key pressed)*/
  onInputChange: PropTypes.func,
  /** Whether the popup is open */
  open: PropTypes.bool,
  /** Callback for when the popup requests to be opened */
  onOpen: PropTypes.func,
  /** Callback for when the popup requests to be closed */
  onClose: PropTypes.func,
  /** Size of the input given full-width is 12. */
  size: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
};

export default SQFormAsyncAutocomplete;
