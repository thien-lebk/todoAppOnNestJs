import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhaseRepository } from './repository/phase.repository';
import { ProjectModule } from 'src/project/project.module';
import { PhaseController } from './phase.controller';
import { PhaseService } from './service/phase.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhaseRepository]), ProjectModule],
  controllers: [PhaseController],
  providers: [PhaseService],
})
export class PhaseModule {}
