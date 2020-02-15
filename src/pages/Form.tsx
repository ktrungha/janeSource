import styled from '@emotion/styled';
import { Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, FormHelperText, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Header from '../components/Header';
import { totallyValid } from '../utils';
import { PendingPerson, Country, PendingPersonValidation, Person, defaultPerson, Animal, validatePendingPerson } from '../model/person';

const FieldWrapper = styled.div`
  margin-bottom: 25px;
`;

const Form: React.FC = () => {

  // NOTE: using redux store to keep form info is a terrible idea. We should not use redux-form library
  // MORE NOTE: using form wrapper library like formik is also a bad idea. You will have problem with locale-sensitive date field
  // For example: when you allow a date field to be typeable, the user enters 12/20/2020 and then clicks
  // to change locale to say French, now the date field needs to be changed to 20/12/2020.
  // This will be much easier to change if we can actually touch the form data ourselves
  // which is not possible (as far as I know) with formik.
  // Therefore, let's roll the form ourselves

  const [person, setPerson] = React.useState<PendingPerson>(defaultPerson);
  const [personValidation, setPersonValidation] = React.useState<PendingPersonValidation>({});

  const intl = useIntl();

  return <div>
    <Header />
    <Container>
      <form onSubmit={e => {
        e.preventDefault();
        const validation = validatePendingPerson(person);
        setPersonValidation(validation);
        const valid = totallyValid(validation);
        if (valid) {
          console.log(person as Person);
          setPerson(defaultPerson);
          setPersonValidation({});
        }
      }}>
        <div style={{ margin: '10px auto', width: '600px' }}>
          <FieldWrapper>
            <TextField
              fullWidth
              value={person.name}
              label={intl.formatMessage({ id: 'person.name' })}
              onChange={(e) => {
                e.persist();
                setPerson(old => ({ ...old, name: e.target.value }))
              }}
              error={!!personValidation.name}
              helperText={personValidation.name ? intl.formatMessage({ id: personValidation.name }) : ' '} />
          </FieldWrapper>
          <FieldWrapper>
            <FormControl error={!!personValidation.gender} fullWidth>
              <FormLabel component="legend">
                <FormattedMessage id="person.gender" />
              </FormLabel>
              <RadioGroup
                row
                value={person.gender || null}
                onChange={(e, value) => setPerson(old => ({ ...old, gender: value as any }))}>
                <FormControlLabel control={<Radio />} value='female' label={intl.formatMessage({ id: 'female' })} />
                <FormControlLabel control={<Radio />} value='male' label={intl.formatMessage({ id: 'male' })} />
              </RadioGroup>
              <FormHelperText>
                {personValidation.gender ? <FormattedMessage id={personValidation.gender} /> : ' '}
              </FormHelperText>
            </FormControl>
          </FieldWrapper>
          <FieldWrapper>
            <FormControl error={!!personValidation.nationalities} fullWidth>
              <FormLabel component="legend">
                <FormattedMessage id="person.nationality" />
              </FormLabel>
              <FormGroup row>
                {
                  Object.values(Country).map(one =>
                    <FormControlLabel key={one}
                      onChange={() => setPerson(old => {
                        const nationalities = new Set(old.nationalities);
                        if (nationalities.has(one)) {
                          nationalities.delete(one)
                        } else {
                          nationalities.add(one);
                        }
                        return {
                          ...old,
                          nationalities
                        }
                      })}
                      control={<Checkbox />} value={one} label={one} checked={person.nationalities.has(one)} />)
                }
              </FormGroup>
              <FormHelperText>
                {personValidation.nationalities ? <FormattedMessage id={personValidation.nationalities} /> : ' '}
              </FormHelperText>
            </FormControl>
          </FieldWrapper>
          <FieldWrapper>
            <FormControl error={!!personValidation.favoriteAnimal} fullWidth>
              <FormLabel component="legend">
                <FormattedMessage id="person.favoriteAnimal" />
              </FormLabel>
              <Select
                style={{ textTransform: 'capitalize' }}
                fullWidth
                value={person.favoriteAnimal || ''}
                onChange={(e) => setPerson(old => ({ ...old, favoriteAnimal: e.target.value as any }))}>
                <MenuItem key='' value='' style={{ display: 'none' }} />
                {
                  Object.values(Animal).map(one =>
                    <MenuItem key={one} value={one} style={{ textTransform: 'capitalize' }}>{one}</MenuItem>)
                }
              </Select>
              <FormHelperText>
                {personValidation.favoriteAnimal ? <FormattedMessage id={personValidation.favoriteAnimal} /> : ' '}
              </FormHelperText>
            </FormControl>
          </FieldWrapper>
          <Button fullWidth variant='contained' color='primary' type="submit" >
            <Typography variant='body2'>
              <FormattedMessage id="submit" />
            </Typography>
          </Button>
        </div>
      </form>
    </Container>
  </div>
}

export default Form;
