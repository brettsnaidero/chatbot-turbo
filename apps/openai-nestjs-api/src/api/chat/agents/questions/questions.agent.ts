import { Injectable } from '@nestjs/common';
import { FunctionTool } from 'openai/resources/beta';
import { AgentBase, AgentData, AgentService } from '@boldare/openai-assistant';
import { QuestionsService } from './questions.service';

@Injectable()
export class QuestionsAgent extends AgentBase {
  // The "definition" property is an object that describes the function and its parameters.
  override definition: FunctionTool = {
    type: 'function',
    function: {
      name: this.constructor.name,
      description:
        'Get the follow up questions to ask the user, based on the category of their job.',
      parameters: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description: 'Hipages category.',
          },
        },
        required: ['category'],
      },
    },
  };

  constructor(
    override readonly agentService: AgentService,
    private readonly questionsService: QuestionsService,
  ) {
    super(agentService);
  }

  // The "output" method is the main method that will be called when the function is invoked.
  override async output(data: AgentData): Promise<string> {
    try {
      // Parse the parameters from the input data
      const params = JSON.parse(data.params);
      const category = params?.category;

      // Check if a category is provided
      if (!category) {
        // ?
        return '';
      }

      const response = await this.questionsService.getQuestions(category);

      // Return the result
      return JSON.stringify(response);
    } catch (errors) {
      // Handle the errors
      return `Invalid data: ${JSON.stringify(errors)}`;
    }
  }
}
