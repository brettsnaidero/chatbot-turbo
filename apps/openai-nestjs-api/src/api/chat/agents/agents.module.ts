import { Module } from '@nestjs/common';
import { GetQuotesModule } from './post-job/post-job.module';

@Module({
  imports: [GetQuotesModule],
})
export class AgentsModule {}
