import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PandaDataSource} from '../datasources';
import {Appointment, AppointmentRelations} from '../models';

export class AppointmentRepository extends DefaultCrudRepository<
  Appointment,
  typeof Appointment.prototype.id,
  AppointmentRelations
> {
  constructor(
    @inject('datasources.panda') dataSource: PandaDataSource,
  ) {
    super(Appointment, dataSource);
  }
}
