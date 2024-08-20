import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AgentModule } from '@boldare/openai-assistant';

import { JobsService } from './post-job.service';
import { JobsServiceAgent } from './post-job.agent';

@Module({
  imports: [AgentModule, HttpModule],
  providers: [JobsService, JobsServiceAgent],
})
export class GetQuotesModule {}
