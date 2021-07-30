import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  Grid,
  Typography,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {VariableSizeList} from 'react-window';
import {getIn, useField, useFormikContext} from 'formik';
import {usePrevious} from '@selectquotelabs/sqhooks';
import {useForm} from './useForm';

// MUI uses px, a numeric value is needed for calculations
const LISTBOX_PADDING = 8; // px

const EMPTY_OPTION = {label: '- -', value: ''};

const useStyles = makeStyles({
  listbox: {
    width: 'initial !important',
    overflowX: 'hidden !important',

    '& ul': {
      padding: 0,
      margin: 0
    }
  },
  popper: {
    borderRadius: '4px',
    boxShadow: '0px 3px 4px 0px rgb(100 100 100)',
    width: 'initial !important',
    overflowX: 'hidden !important'
  },
  paper: {
    margin: 0
  }
});

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return (
    <div
      ref={ref}
      {...props}
      {...outerProps}
      className={`${props?.className || ''} ${outerProps?.className || ''}`}
      style={{...props?.style, ...outerProps?.style}}
    />
  );
});

function renderRow({data, index, style}) {
  const elToClone = data[index];
  const value = elToClone.props.children.props.children;
  const clone = React.cloneElement(elToClone, {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING
    }
  });

  return (
    <Tooltip
      title={value || ''}
      id={`FINDME-${index}`}
      key={`${value}-${index}-with-tooltip`}
      placement="bottom-start"
    >
      {clone}
    </Tooltip>
  );
}

const calculateWidth = (baseWidth, left) => {
  if (baseWidth) {
    return `min(${baseWidth * 2}px, ${
      window.innerWidth
    }px - ${left}px - 24px) !important`;
  }

  return 'initial !important';
};

const useListStyles = makeStyles({
  list: {
    '& > ul': {
      width: ({baseWidth, left, lockWidthToField}) =>
        lockWidthToField
          ? `${baseWidth}px !important`
          : calculateWidth(baseWidth, left),
      overflowX: 'hidden !important'
    }
  }
});

// Adapter for react-window
const ListboxVirtualizedComponent = React.forwardRef(
  function ListboxVirtualizedComponent(
    {basewidth, left, lockWidthToField, ...restProps},
    ref
  ) {
    const classes = useListStyles({
      baseWidth: basewidth,
      left,
      lockWidthToField
    });
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
      return (
        items.reduce((acc, _item) => acc + ITEM_SIZE, 0) + 2 * LISTBOX_PADDING
      );
    }, [ITEM_COUNT, items]);

    const getItemSize = React.useCallback(() => ITEM_SIZE, []);

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={listboxProps}>
          <VariableSizeList
            className={classes.list}
            itemData={items}
            height={height}
            width="auto"
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

const getInitialValue = (children, value, displayEmpty) => {
  const optionInitialValue = children.find(option => {
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

const calculateBaseWidth = ref => {
  if (!ref) {
    return;
  }

  const {
    marginLeft,
    paddingLeft,
    width,
    paddingRight,
    marginRight
  } = window.getComputedStyle(ref);

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
  isRequired = false,
  displayEmpty = false,
  label,
  name,
  onBlur,
  onChange,
  onInputChange,
  size = 'auto',
  lockWidthToField
}) {
  const classes = useStyles();
  const gridContainerRef = React.useRef();
  const baseWidth = calculateBaseWidth(gridContainerRef.current);
  const left = gridContainerRef.current?.getBoundingClientRect().left;
  const {setFieldValue, setTouched, values, touched} = useFormikContext();
  const [{value}] = useField(name);
  const {
    fieldState: {isFieldError},
    fieldHelpers: {HelperTextComponent}
  } = useForm({
    name,
    isRequired
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
    event => {
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
    <Grid item sm={size} ref={gridContainerRef}>
      <Autocomplete
        id={name}
        name={name}
        style={{width: '100%'}}
        disableListWrap
        disablePortal
        classes={classes}
        ListboxComponent={ListboxVirtualizedComponent}
        // Note: basewidth is not camel cased because React doesn't like it here
        ListboxProps={{basewidth: baseWidth, left, lockWidthToField}}
        options={options}
        onBlur={handleAutocompleteBlur}
        onChange={handleAutocompleteChange}
        onInputChange={handleInputChange}
        inputValue={inputValue}
        value={initialValue || null}
        disableClearable={isDisabled}
        disabled={isDisabled}
        getOptionLabel={option => option.label || ''}
        getOptionDisabled={option => option.isDisabled}
        renderInput={params => {
          return (
            <TextField
              {...params}
              color="primary"
              disabled={isDisabled}
              error={isFieldError}
              fullWidth={true}
              InputLabelProps={{
                ...params.InputLabelProps,
                shrink: true
              }}
              inputProps={{
                ...params.inputProps,
                disabled: isDisabled
              }}
              FormHelperTextProps={{error: isFieldError}}
              name={name}
              label={label}
              helperText={!isDisabled && HelperTextComponent}
              required={isRequired}
            />
          );
        }}
        renderOption={option => (
          <Typography variant="body2" noWrap>
            {option.label}
          </Typography>
        )}
      />
    </Grid>
  );
}

SQFormAutocomplete.propTypes = {
  /** Dropdown menu options to select from */
  children: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      isDisabled: PropTypes.bool
    })
  ),
  /** Disabled property to disable the input if true */
  isDisabled: PropTypes.bool,
  /** Required property used to highlight input and label if not fulfilled */
  isRequired: PropTypes.bool,
  /** Whether to display empty option */
  displayEmpty: PropTypes.bool,
  /** Label text */
  label: PropTypes.string.isRequired,
  /** Name identifier of the input field */
  name: PropTypes.string.isRequired,
  /** Custom onBlur event callback */
  onBlur: PropTypes.func,
  /** Custom onChange event callback */
  onChange: PropTypes.func,
  /** Custom onInputChange event callback (key pressed) */
  onInputChange: PropTypes.func,
  /** Size of the input given full-width is 12. */
  size: PropTypes.oneOf(['auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  /** Lock width to the width of the field in the form */
  lockWidthToField: PropTypes.bool
};

export default SQFormAutocomplete;
