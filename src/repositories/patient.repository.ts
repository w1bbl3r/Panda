import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PandaDataSource} from '../datasources';
import {Patient, PatientRelations} from '../models';

export class PatientRepository extends DefaultCrudRepository<
  Patient,
  typeof Patient.prototype.nhs_number,
  PatientRelations
> {
  constructor(
    @inject('datasources.panda') dataSource: PandaDataSource,
  ) {
    super(Patient, dataSource);
  }
}
