import React, { ReactElement, useEffect, useState, useMemo, ReactNode, useCallback, SetStateAction } from 'react';

import { WrappedFieldProps } from 'redux-form';
import { FormControl, FormHelperText, InputLabel } from '@material-ui/core';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';


import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


import buildClassName from '../../utils/buildClassName';
import styles from './styles.module.scss';

interface IPlacesAutocomplete {
  label?: ReactNode;
  // inputRef: (ref: HTMLInputElement | null) => void;
  defaultValue?: string;
  required?: boolean;
  className?: string;
}

const DATE_FORMAT = 'dd.MM.yyyy';

const PlacesAutocompleteComponent = ({ className, defaultValue, required, label, ...rest }: IPlacesAutocomplete ): ReactElement => {
  // const [isFocused, setIsFocused] = useState<boolean>(false);
  // const [hasError, setHasError] = useState<boolean>(false);
  const [address, setAddress] = useState<boolean>(false);

  // const currentValue: Date | null = useMemo(
  //   () => input.value ? new Date(input.value) : null,
  //   [input.value],
  // );

  // useEffect(
  //   () => {
  //     if (typeof defaultValue !== 'undefined') {
  //       handleAsyncChange(defaultValue);
  //     }
  //   },
  //   [defaultValue],
  // );

  // const handleAsyncChange = (date: string) => {
  //   setIsFocused(false);
  //   setHasError(false);
  //
  //   input.onChange(date);
  // };

  // const handleChange = (date: Date | null) => {
  //   const stringDate = JSON.parse(JSON.stringify(date));
  //
  //   handleAsyncChange(stringDate);
  //   input.onBlur(stringDate);
  // };

  // const handleError = (error: ReactNode) => setHasError(!!error);
  //
  // const handleFocus = () => setIsFocused(true);
  // const handleBlur = () => setIsFocused(false);

  // const setInputRef = (ref: HTMLInputElement | null) => {
  //   if (typeof inputRef === 'function') {
  //     inputRef(ref && ref.children[0].children[0] as HTMLInputElement);
  //   }
  // };

  const handleChange = (addressValue: SetStateAction<boolean>) => {
    setAddress(addressValue);
  };

  const handleSelect = async (addressValue: SetStateAction<boolean>) => {
    setAddress(addressValue);
    console.log('address', addressValue)
    console.log('geocodeByAddress(address)', geocodeByAddress)
    if (geocodeByAddress) {
      const a = geocodeByAddress(addressValue, (res: any, res2: any, res3: any) => {
        console.log('res', res)
        console.log('res2', res2)
        console.log('res3', res3)
      });
      console.log('111a', a)
    }
    // return await geocodeByAddress(address)
    //   .then((results: any) => {
    //     console.log('results', results)
    //     // getLatLng(results[0])
    //
    //     return {}
    //   })
    //   .then((latLng: any) => console.log('Success', latLng))
    //   .catch((error: any) => console.error('Error', error));
    // await geocodeByAddress && geocodeByAddress(address)
    //   .then((results: any) => getLatLng(results[0]))
    //   .then((latLng: any) => console.log('Success', latLng))
    //   .catch((error: any) => console.error('Error', error));
  };

  const renderFunc = () => {

  };

  return (
    // <MuiPickersUtilsProvider utils={DateFnsUtils}>
    //   <FormControl
    //     className={
    //       buildClassName(
    //         styles.advancedDatePickerField,
    //         // {
    //         //   [styles.withoutError]: (!touched || !invalid) && !hasError,
    //         // },
    //       )
    //     }
    //     error={touched && !!error}
    //   >
    //
    //     {label && (
    //       <InputLabel
    //         className={styles.label}
    //         focused={isFocused}
    //         error={touched && invalid}
    //         required={required}
    //         shrink
    //       >
    //         {label}
    //       </InputLabel>
    //     )}
    //
    //     <KeyboardDatePicker
    //       variant='inline'
    //       format={DATE_FORMAT}
    //       value={currentValue || null}
    //       innerRef={setInputRef}
    //       onChange={handleChange}
    //       onBlur={handleBlur}
    //       onFocus={handleFocus}
    //       autoOk
    //       onError={handleError}
    //       FormHelperTextProps={{
    //         className: styles.errorHelper,
    //       }}
    //       shouldDisableDate={disabledDates}
    //       maxDate={'2027-01-01'}
    //       {...rest}
    //     />
    //
    //     {touched && error && (
    //       <FormHelperText className={styles.errorHelper}>{error}</FormHelperText>
    //     )}
    //   </FormControl>
    // </MuiPickersUtilsProvider>
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {
        ({ getInputProps, suggestions, getSuggestionItemProps, loading }: any) => {
          return (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className='autocomplete-dropdown-container'>
                {loading && <div>Loading...</div>}
                {
                  suggestions.map((suggestion: any) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';

                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };

                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          )
        }
      }
    </PlacesAutocomplete>
  )
};

export default PlacesAutocompleteComponent;
