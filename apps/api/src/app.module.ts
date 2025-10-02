import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TerminusModule } from '@nestjs/terminus';
import configuration from './modules/config/configuration';
import { AppConfig } from './modules/config/app.config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ToolsModule } from './modules/tools/tools.module';
import { CheckoutsModule } from './modules/checkouts/checkouts.module';
import { HistoryModule } from './modules/history/history.module';
import { CalibrationModule } from './modules/calibration/calibration.module';
import { TransfersModule } from './modules/transfers/transfers.module';
import { FilesModule } from './modules/files/files.module';
import { WarehousesModule } from './modules/warehouses/warehouses.module';
import { ReportsModule } from './modules/reports/reports.module';
import { RepairsModule } from './modules/repairs/repairs.module';
import { RolesModule } from './modules/roles/roles.module';
import { EventModule } from './modules/history/event.module';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env', '.env.local', '../../.env'],
    }),
    ThrottlerModule.forRoot([{ ttl: 60, limit: 120 }]),
    TerminusModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    ToolsModule,
    CheckoutsModule,
    HistoryModule,
    CalibrationModule,
    TransfersModule,
    FilesModule,
    WarehousesModule,
    ReportsModule,
    RepairsModule,
    RolesModule,
    EventModule,
    CommonModule,
  ],
  providers: [AppConfig],
})
export class AppModule {}
