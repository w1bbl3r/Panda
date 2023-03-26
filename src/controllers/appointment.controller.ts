import {
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, requestBody,
  response
} from '@loopback/rest';
import {v4 as uuidv4} from 'uuid';
import {Appointment} from '../models';
import {AppointmentRepository, PatientRepository} from '../repositories';

const INVALID_PATIENT = 'Patient not found';

export class AppointmentController {
  constructor(
    @repository(AppointmentRepository)
    public appointmentRepository : AppointmentRepository,

    @repository(PatientRepository)
    public patientRepository : PatientRepository,
  ) {}

  @post('/appointments')
  @response(200, {
    description: 'Appointment model instance',
    content: {'application/json': {schema: getModelSchemaRef(Appointment)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Appointment, {
            title: 'NewAppointment',
            exclude: ['id'],
          }),
        },
      },
    })
    appointment: Omit<Appointment, 'id'>,
  ): Promise<Appointment> {
    const patient = await this.patientRepository.findById(appointment.patient);
    if (!patient) {
      throw new HttpErrors.BadRequest(INVALID_PATIENT);
    }

    const newAppointment = new Appointment(appointment);
    newAppointment.id = uuidv4();

    return this.appointmentRepository.create(newAppointment);
  }

  @get('/appointments/{id}')
  @response(200, {
    description: 'Appointment model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Appointment, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Appointment, {exclude: 'where'}) filter?: FilterExcludingWhere<Appointment>
  ): Promise<Appointment> {
    return this.appointmentRepository.findById(id, filter);
  }

  @patch('/appointments/{id}')
  @response(204, {
    description: 'Appointment PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Appointment, {partial: true}),
        },
      },
    })
    appointment: Appointment,
  ): Promise<void> {
    const patient = await this.patientRepository.findById(appointment.patient);
    if (!patient) {
      throw new HttpErrors.BadRequest(INVALID_PATIENT);
    }

    await this.appointmentRepository.updateById(id, appointment);
  }

  @del('/appointments/{id}')
  @response(204, {
    description: 'Appointment DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.appointmentRepository.deleteById(id);
  }
}
