import React from 'react'
import { Box, Text, TextInput, Button, Grommet } from 'grommet'
import ReactDOM from 'react-dom'
import { useForm, FormContext, useFormContext } from 'react-hook-form'
import FormField from './component/FormField'
import theme from './theme'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let Form = () => {
  let { errors, handleSubmit, reset, clearError, formState } = useFormContext()

  let { dirty, touched, isSubmitting } = formState
  let onSubmit = async (data) => {
    if (dirty) {
      await sleep(1000)
      console.log(touched)
      reset(data)
    } else {
      console.log('nothing is updated')
    }
  }
  return (
    <form>
      <FormField
        name="email"
        s
        placeholder="asmith@matrix.com"
        as={<TextInput disabled={isSubmitting} plain />}
        rules={{
          required: 'Please provide email',
        }}
      />
      <FormField
        name="lastName"
        as={<TextInput disabled={isSubmitting} plain />}
        placeholder="Smith"
        rules={{
          async validate(value) {
            await sleep(1)
            let isValid = /stella/i.test(value)
            return isValid || `Last Name has to be Stella ${new Date()}`
          },
        }}
      />
      <Box gap="small" pad="small">
        <Text color="status-critical">
          {Object.keys(errors).length > 0 &&
            'There are errors, check your console.'}
        </Text>
      </Box>
      <Box direction="row" gap="small" pad="small">
        <Button
          primary
          label="Submit"
          disabled={isSubmitting}
          onClick={() => {
            clearError()
            handleSubmit(onSubmit)()
          }}
        />
        <Button onClick={() => reset()} label="Reset" disabled={isSubmitting} />
      </Box>
    </form>
  )
}

export default function App() {
  const form = useForm({
    reValidateMode: 'onSubmit',
    defaultValues: {
      lastName: '',
      email: '',
    },
  })

  // let theWatch = watch(['username', 'lastName'])
  // console.log(theWatch)
  //console.log(touched)

  return (
    <Grommet theme={theme}>
      <Box>
        <FormContext {...form}>
          <Form />
        </FormContext>
      </Box>
    </Grommet>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
