import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AgentModule } from '@boldare/openai-assistant';

import { QuestionsService } from './questions.service';
import { QuestionsAgent } from './questions.agent';

@Module({
  imports: [AgentModule, HttpModule],
  providers: [QuestionsService, QuestionsAgent],
})
export class GetQuotesModule {}
