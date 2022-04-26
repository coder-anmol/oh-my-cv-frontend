import { Grid, Container, Heading, Button, Flex } from '@chakra-ui/react';
import { useReducer } from 'react';
import Validator from 'validator';
import FormField from './FormField';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  validationStatus: {
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FIRST_NAME':
      return { ...state, firstName: action.payload };

    case 'LAST_NAME':
      return { ...state, lastName: action.payload };

    case 'EMAIL':
      return { ...state, email: action.payload };

    case 'PHONE':
      return { ...state, phone: action.payload };

    case 'VALIDATE_FIRST_NAME':
      return {
        ...state,
        validationStatus: {
          ...state.validationStatus,
          firstName: action.payload,
        },
      };

    case 'VALIDATE_LAST_NAME':
      return {
        ...state,
        validationStatus: {
          ...state.validationStatus,
          lastName: action.payload,
        },
      };

    case 'VALIDATE_EMAIL':
      return {
        ...state,
        validationStatus: { ...state.validationStatus, email: action.payload },
      };

    case 'VALIDATE_PHONE':
      return {
        ...state,
        validationStatus: { ...state.validationStatus, phone: action.payload },
      };

    default:
      throw new Error('Invalid action');
  }
};

function Questions() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const generateValidator = name => {
    switch (name) {
      case 'FIRST_NAME':
        return value => Validator.isLength(value, { min: 3, max: 20 });

      case 'LAST_NAME':
        return value => Validator.isLength(value, { min: 3, max: 20 });

      case 'EMAIL':
        return value => Validator.isEmail(value);

      case 'PHONE':
        return value => Validator.isMobilePhone(value, 'en-IN');

      default:
        throw new Error('Invalid field for validation');
    }
  };

  const generateHandler = name => {
    return e => {
      const value = e.target.value;
      const result = generateValidator(name)(value);

      dispatch({ type: `VALIDATE_${name}`, payload: result });
      dispatch({ type: name, payload: value });
    };
  };

  const createValidationStatus = (name, value) => {
    const result = generateValidator(name)(value);
    dispatch({ type: `VALIDATE_${name}`, payload: result });
    return result;
  };

  const validateAllFields = () => {
    const status = {
      firstName: createValidationStatus('FIRST_NAME', state.firstName),
      lastName: createValidationStatus('LAST_NAME', state.lastName),
      email: createValidationStatus('EMAIL', state.email),
      phone: createValidationStatus('PHONE', state.phone),
    };

    return Object.values(status).every(item => item === true);
  };

  return (
    <>
      <Container maxW={'container.xl'}>
        <Heading as={'h1'} textAlign={'center'} my={4}>
          Generate Resume
        </Heading>
        <Grid
          p={2}
          templateColumns={{ base: '1fr', md: 'repeat(2,1fr)' }}
          gap={{ base: 5, md: 4 }}
        >
          {/* First Name */}
          <FormField
            name={'First Name'}
            label={'First Name'}
            inputType={'text'}
            errorMessage={'First Name must be in a range of 3-10 characters'}
            isInvalid={!state.validationStatus.firstName}
            isRequired={true}
            fieldValue={state.firstName}
            changeHandler={generateHandler('FIRST_NAME')}
          />

          {/* Last Name */}
          <FormField
            name={'Last Name'}
            label={'Last Name'}
            inputType={'text'}
            errorMessage={'Name must be at least 3 characters'}
            isInvalid={!state.validationStatus.lastName}
            isRequired={true}
            fieldValue={state.lastName}
            changeHandler={generateHandler('LAST_NAME')}
          />

          {/* Email */}
          <FormField
            name={'Email'}
            label={'Email'}
            inputType={'email'}
            errorMessage={'Email must be valid'}
            isInvalid={!state.validationStatus.email}
            isRequired={true}
            fieldValue={state.email}
            changeHandler={generateHandler('EMAIL')}
          />

          {/* Phone */}
          <FormField
            name={'Phone'}
            label={'Phone'}
            inputType={'number'}
            errorMessage={'Phone number must be valid'}
            isInvalid={!state.validationStatus.phone}
            isRequired={true}
            fieldValue={state.phone}
            changeHandler={generateHandler('PHONE')}
          />
        </Grid>

        {/* Generate Button */}
        <Flex my={4} justify={'center'}>
          <Button
            colorScheme="linkedin"
            size="md"
            onClick={() => {
              const result = validateAllFields();
              if (result) {
                console.log('Ready for post request');
              } else {
                console.log('Not ready for post request, validation errors');
              }
            }}
          >
            Generate
          </Button>
        </Flex>
      </Container>
    </>
  );
}

export default Questions;
