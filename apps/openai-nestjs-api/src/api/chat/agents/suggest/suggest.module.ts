import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AgentModule } from '@boldare/openai-assistant';

import { SuggestService } from './suggest.service';
import { SuggestAgent } from './suggest.agent';

@Module({
  imports: [AgentModule, HttpModule],
  providers: [SuggestService, SuggestAgent],
})
export class GetQuotesModule {}
