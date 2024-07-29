import { Module, forwardRef } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from 'src/columns/columns.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Project } from './projects.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User, ColumnEntity]), forwardRef(() => AuthModule)],
  exports: [ProjectsModule],
  providers: [ProjectsService],
  controllers: [ProjectsController]
})
export class ProjectsModule {}