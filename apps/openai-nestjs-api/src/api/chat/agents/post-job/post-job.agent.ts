import { Injectable } from '@nestjs/common';
import { FunctionTool } from 'openai/resources/beta';
import { AgentBase, AgentData, AgentService } from '@boldare/openai-assistant';
import { JobsService } from './post-job.service';

@Injectable()
export class JobsServiceAgent extends AgentBase {
  // The "definition" property is an object that describes the function and its parameters.
  override definition: FunctionTool = {
    type: 'function',
    function: {
      name: this.constructor.name,
      description: 'Post a job for tradies.',
      parameters: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description: 'Job category',
          },
        },
        required: ['category'],
      },
    },
  };

  constructor(
    override readonly agentService: AgentService,
    private readonly jobsService: JobsService,
  ) {
    super(agentService);
  }

  // The "output" method is the main method that will be called when the function is invoked.
  override async output(data: AgentData): Promise<string> {
    try {
      // Parse the parameters from the input data
      const params = JSON.parse(data.params);
      const category = params?.category;

      // Check if the currency is provided
      if (!category) {
        return '';
      }

      // Post a hipages job
      const response = await this.jobsService.postJob(category);

      console.log(JSON.stringify(response));

      // Return the result
      return `Succesfully submitted job.`;
    } catch (errors) {
      // Handle the errors
      return `Invalid data: ${JSON.stringify(errors)}`;
    }
  }
}
