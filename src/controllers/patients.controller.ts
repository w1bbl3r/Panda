/* eslint-disable @typescript-eslint/naming-convention */
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Patient} from '../models';
import {PatientRepository} from '../repositories';

const INVALID_NHS_NUMBER = 'An invalid NHS number has been provided';
const WEIGHTING_FACTOR = 10;
const MODULUS_11 = 11;
const INVALID_CHECK_DIGIT = 10;

export class PatientsController {
  constructor(
    @repository(PatientRepository)
    public patientRepository : PatientRepository,
  ) {}

  @post('/patients')
  @response(200, {
    description: 'Patient model instance',
    content: {'application/json': {schema: getModelSchemaRef(Patient)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Patient, {
            title: 'NewPatient',

          }),
        },
      },
    })
    patient: Patient,
  ): Promise<Patient> {
    return this.patientRepository.create(patient);
  }

  @get('/patients')
  @response(200, {
    description: 'Array of Patient model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Patient, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Patient, {exclude: 'where'}) filter?: Filter<Patient>,
  ): Promise<Patient[]> {
    return this.patientRepository.find(filter);
  }

  @patch('/patients')
  @response(200, {
    description: 'Patient PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Patient, {partial: true}),
        },
      },
    })
    patient: Patient,
    @param.where(Patient) where?: Where<Patient>,
  ): Promise<Count> {
    return this.patientRepository.updateAll(patient, where);
  }

  @get('/patients/{nhs_number}')
  @response(200, {
    description: 'Patient model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Patient, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('nhs_number') nhs_number: string,
    @param.filter(Patient, {exclude: 'where'}) filter?: FilterExcludingWhere<Patient>
  ): Promise<Patient> {

    if (!this.checkDigit(nhs_number)) {
      throw new HttpErrors.BadRequest(INVALID_NHS_NUMBER);
    }

    return this.patientRepository.findById(nhs_number, filter);
  }

  @patch('/patients/{nhs_number}')
  @response(204, {
    description: 'Patient PATCH success',
  })
  async updateById(
    @param.path.string('nhs_number') nhs_number: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Patient, {partial: true}),
        },
      },
    })
    patient: Patient,
  ): Promise<void> {
    if (!this.checkDigit(nhs_number)) {
      throw new HttpErrors.BadRequest(INVALID_NHS_NUMBER);
    }

    await this.patientRepository.updateById(nhs_number, patient);
  }

  @put('/patients/{nhs_number}')
  @response(204, {
    description: 'Patient PUT success',
  })
  async replaceById(
    @param.path.string('nhs_number') nhs_number: string,
    @requestBody() patient: Patient,
  ): Promise<void> {
    if (!this.checkDigit(nhs_number)) {
      throw new HttpErrors.BadRequest(INVALID_NHS_NUMBER);
    }

    await this.patientRepository.replaceById(nhs_number, patient);
  }

  @del('/patients/{nhs_number}')
  @response(204, {
    description: 'Patient DELETE success',
  })
  async deleteById(@param.path.string('nhs_number') nhs_number: string): Promise<void> {
    if (!this.checkDigit(nhs_number)) {
      throw new HttpErrors.BadRequest(INVALID_NHS_NUMBER);
    }

    await this.patientRepository.deleteById(nhs_number);
  }

  private checkDigit(nhs_number: String): Boolean {
    // Multiply first 9 elements by a weighting factor and add them together
    let total = 0;
    let weightingFactor = WEIGHTING_FACTOR;
    for (let i = 0; i < nhs_number.length - 1; i++) {
      total = total + ((parseInt(nhs_number[i], 10)) * weightingFactor);
      weightingFactor = weightingFactor - 1;
    }

    // Divide the total by 11 and grab the remainder
    const remainder = total % MODULUS_11;

    // If the remainder is 0 then use 11 else use the remainder
    const checkDigit = remainder === MODULUS_11 ? 0 : MODULUS_11 - remainder;

    // If the checkdigit is 10, we must fail it
    if (checkDigit === INVALID_CHECK_DIGIT) {
      return false;
    }

    // Return if the check digit is the same as the one in the NHS number
    return parseInt(nhs_number[nhs_number.length - 1], 10) === checkDigit;
  }
}
