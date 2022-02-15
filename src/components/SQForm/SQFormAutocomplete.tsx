import React from 'react';
import {
  TextField,
  Grid,
  Typography,
  Tooltip,
  makeStyles,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import type {AutocompleteChangeReason} from '@material-ui/lab/Autocomplete';
import {VariableSizeList} from 'react-window';
import type {ListChildComponentProps} from 'react-window';
import {getIn, useField, useFormikContext} from 'formik';
import {usePrevious} from '@selectquotelabs/sqhooks';
import type {BaseFieldProps, SQFormOption} from '../../types';
import {useForm} from './useForm';

export interface SQFormAutocompleteProps extends BaseFieldProps {
  /** Dropdown menu options to select from */
  children: SQFormOption[];
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
}

export interface OuterElementTypeProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface ListboxVirtualizedComponentProps {
  children?: React.ReactNode;
  basewidth: number;
  left: number;
  lockWidthToField: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface OuterElementContextInterface {
  className?: string;
  style?: React.CSSProperties;
}

// MUI uses px, a numeric value is needed for calculations
const LISTBOX_PADDING = 8; // px

const EMPTY_OPTION = {label: '- -', value: ''};

const OuterElementContext =
  React.createContext<OuterElementContextInterface | null>({});

const OuterElementType = React.forwardRef<HTMLDivElement>(
  (props: OuterElementTypeProps, ref) => {
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

const useListStyles = makeStyles({
  list: {
    '& > ul': {
      width: ({
        baseWidth,
        left,
        lockWidthToField,
      }: {
        baseWidth: number;
        left: number;
        lockWidthToField: boolean;
      }) =>
        lockWidthToField
          ? `${baseWidth}px !important`
          : calculateWidth(baseWidth, left),
      overflowX: 'hidden !important',
    },
  },
});

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
    const classes = useListStyles({
      baseWidth: basewidth,
      left,
      lockWidthToField,
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
      return items.length * ITEM_SIZE + 2 * LISTBOX_PADDING;
    }, [ITEM_COUNT, items]);

    const getItemSize = React.useCallback(() => ITEM_SIZE, []);

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={listboxProps}>
          <VariableSizeList
            className={classes.list}
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

const useStyles = makeStyles({
  grid: {
    position: 'relative',
  },
});

const useAutocompleteStyles = makeStyles({
  listbox: {
    overflowX: 'hidden !important' as 'hidden',

    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
  popper: {
    borderRadius: '4px',
    boxShadow: '0px 3px 4px 0px rgb(100 100 100)',
    width: ({lockWidthToField}: {lockWidthToField: boolean}) =>
      !lockWidthToField ? 'auto !important' : undefined,
    overflowX: 'hidden !important' as 'hidden',
  },
  paper: {
    margin: 0,
  },
});

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
  const classes = useStyles();
  const autocompleteClasses = useAutocompleteStyles({lockWidthToField});

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

  return (
    <Grid item xs={size} ref={gridContainerRef} className={classes.grid}>
      <Autocomplete
        id={name}
        style={{width: '100%'}}
        disableListWrap
        disablePortal={!lockWidthToField}
        classes={autocompleteClasses}
        ListboxComponent={
          ListboxVirtualizedComponent as React.ComponentType<
            React.HTMLAttributes<HTMLElement>
          >
        }
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
        getOptionLabel={(option) => option.label || ''}
        getOptionDisabled={(option: SQFormOption) =>
          option?.isDisabled || false
        }
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

export default SQFormAutocomplete;
