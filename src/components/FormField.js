import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';

const FormField = ({
  name,
  label,
  inputType,
  errorMessage,
  isInvalid,
  isRequired,
  fieldValue,
  changeHandler,
}) => {
  return (
    <>
      <FormControl isInvalid={isInvalid} isRequired={isRequired}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Input
          placeholder={name}
          type={inputType}
          value={fieldValue}
          onChange={changeHandler}
        />
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default FormField;
