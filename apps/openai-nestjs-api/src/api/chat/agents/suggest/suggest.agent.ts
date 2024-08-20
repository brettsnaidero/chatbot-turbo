import { Injectable } from '@nestjs/common';
import { FunctionTool } from 'openai/resources/beta';
import { AgentBase, AgentData, AgentService } from '@boldare/openai-assistant';
import { SuggestService } from './suggest.service';

@Injectable()
export class SuggestAgent extends AgentBase {
  // The "definition" property is an object that describes the function and its parameters.
  override definition: FunctionTool = {
    type: 'function',
    function: {
      name: this.constructor.name,
      description: `When a user has a job for hipages, we need to match the job to the most relevant category. 
        This function searches for hipages categories that might match the given text.`,
      parameters: {
        type: 'object',
        properties: {
          keyword: {
            type: 'string',
            description:
              'Text describing the job that we would like to find the most relevant hipages category for.',
          },
        },
        required: ['keyword'],
      },
    },
  };

  constructor(
    override readonly agentService: AgentService,
    private readonly suggestService: SuggestService,
  ) {
    super(agentService);
  }

  // The "output" method is the main method that will be called when the function is invoked.
  override async output(data: AgentData): Promise<string> {
    try {
      // Parse the parameters from the input data
      const params = JSON.parse(data.params);
      const keyword = params?.keyword;

      // Check if a keyword is provided
      if (!keyword) {
        return '';
      }

      const response = await this.suggestService.suggestCategoryFuzzy(keyword);

      // Return the result
      return JSON.stringify(response);
    } catch (errors) {
      // Handle the errors
      return `Invalid data: ${JSON.stringify(errors)}`;
    }
  }
}
