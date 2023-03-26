/* eslint-disable @typescript-eslint/naming-convention */
import {Entity, model, property} from '@loopback/repository';

@model()
export class Patient extends Entity {
  @property({
    jsonSchema: {
      type: 'string',
      generated: false,
      title: 'NHS Number',
      pattern: '[0-9]{10}',
      example: '0036400262'
    },
    id: true,
    required: true,
  })
  nhs_number: string;

  @property({
    jsonSchema: {
      minLength: 1,
      maxLength: 100,
      type: 'string',
      title: 'Person Name',
      example: 'Mr Wibble Wobble'
    },
    required: true,
  })
  name: string;

  @property({
    jsonSchema: {
      maxLength: 8,
      minLength: 5,
      nullable: false,
      pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$',
      title: 'Date of Birth',
      type: 'string',
      example: '1973-11-02'
    },
    required: true,
  })
  date_of_birth: string;

  @property({
    jsonSchema: {
      maxLength: 8,
      minLength: 5,
      nullable: false,
      pattern:
        '^([Gg][Ii][Rr] ?0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) ?[0-9][A-Za-z]{2})$',
      title: 'Postcode of patient address',
      type: 'string',
      example: 'LS1 4HT',
    },
    required: true
  })
  postcode: string;

  constructor(data?: Partial<Patient>) {
    super(data);
  }
}

export interface PatientRelations {
  // describe navigational properties here
}

export type PatientWithRelations = Patient & PatientRelations;
