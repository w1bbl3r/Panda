import {Entity, model, property} from '@loopback/repository';

@model()
export class Appointment extends Entity {
  @property({
    jsonSchema: {
      title: 'Patient reference',
      pattern: '^[0-9]{10}$',
    },
    type: 'string',
    required: true,
  })
  patient: string;

  @property({
    jsonSchema: {
      nullable: false,
      pattern: '^(attended|cancelled|active|missed)$',
      title: 'Status of appointment',
      type: 'string',
    },
    required: true,
  })
  status: string;

  @property({
    jsonSchema: {
      nullable: false,
      pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\\+[0-9]{2}:[0-9]{2}$',
      title: 'Time of appointment',
      type: 'string',
    },
    required: true,
  })
  time: string;

  @property({
    jsonSchema: {
      nullable: false,
      pattern: '^(15m|30m|1h|1h30m|2h)$',
      title: 'Duration of appointment',
      type: 'string',
    },
    required: true,
  })
  duration: string;

  @property({
    minLength: 1,
    maxLength: 250,
    type: 'string',
    required: true,
  })
  clinitian: string;

  @property({
    minLength: 1,
    maxLength: 250,
    type: 'string',
    required: true,
  })
  department: string;

  @property({
    jsonSchema: {
      maxLength: 8,
      minLength: 5,
      nullable: false,
      pattern:
        '^([Gg][Ii][Rr] ?0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) ?[0-9][A-Za-z]{2})$',
      title: 'Postcode of appointment address',
      type: 'string',
    },
    required: true
  })
  postcode: string;

  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  constructor(data?: Partial<Appointment>) {
    super(data);
  }
}

export interface AppointmentRelations {
  // describe navigational properties here
}

export type AppointmentWithRelations = Appointment & AppointmentRelations;
