import React, { ReactNode } from 'react'
import MuiAutocomplete from '@material-ui/lab/Autocomplete'
import { Checkbox, TextField, Box } from '@material-ui/core'

/**
 * Types
 */
export interface Option {
  id: string
  meta?: any
  name?: string | ReactNode
  title?: string | ReactNode
}

export interface OptionState {
  selected: boolean
}

export interface AutocompleteProps {
  placeholder?: string
  multiple?: boolean
  options: Option[]
  value?: Option | Option[]
  error?: boolean
  loading?: boolean
  optionDisabled?: (option: Option) => boolean
  renderTags?: (options: Option[]) => ReactNode[] | JSX.Element[] | JSX.Element
  renderInput?: (params: any) => ReactNode
  renderOption?: (option: Option, { selected }: OptionState) => ReactNode
  onChange: (
    event: React.ChangeEvent<Option>,
    options: Option[] | Option,
  ) => void
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  value,
  placeholder,
  options,
  multiple,
  error,
  loading,
  onChange,
  renderInput,
  renderOption,
  renderTags,
  optionDisabled,
  ...rest
}: AutocompleteProps) => {
  const chipProps = {
    color: 'primary',
  }

  const renderers = {
    label: (option: Option) => {
      return (option?.title ?? option?.name) as string
    },
    selected: (option: Option, current: Option) => {
      return option.id === current.id
    },
    input: (params: any) => {
      return (
        <TextField
          {...params}
          {...rest}
          placeholder={placeholder}
          error={error}
          variant="outlined"
        />
      )
    },
    option: (option: Option, { selected }: OptionState) => {
      return (
        <Box display="flex" alignItems="center">
          {multiple ? <Checkbox checked={selected} color="primary" /> : null}
          {option?.title ?? option.name}
        </Box>
      )
    },
  }

  return (
    <MuiAutocomplete
      disableListWrap
      disableCloseOnSelect={multiple}
      multiple={multiple}
      value={value}
      loading={loading}
      options={options}
      ChipProps={chipProps}
      getOptionSelected={renderers.selected}
      getOptionLabel={renderers.label}
      getOptionDisabled={optionDisabled}
      renderInput={renderInput ?? renderers.input}
      renderOption={renderOption ?? renderers.option}
      renderTags={renderTags}
      onChange={onChange}
    />
  )
}

export default Autocomplete
