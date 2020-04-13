import _ from 'lodash/fp'
import React from 'react'
import { FormField } from 'grommet'
import { Controller, useFormContext } from 'react-hook-form'

export default ({ as, name, label, ...props }) => {
  let { errors } = useFormContext()
  return (
    <FormField
      label={label || _.startCase(name)}
      error={_.get([name, 'message'], errors)}
    >
      <Controller as={as} name={name} {...props} />
    </FormField>
  )
}
