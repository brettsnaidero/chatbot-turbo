import { HttpException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(private httpService: HttpService) {}

  // Example body
  // "get_quotes_question_59":213,
  // "get_quotes_question_207":937,
  // "get_quotes_question_208":943,
  // "get_quotes_question_204":924,
  // "get_quotes_question_69":256,
  // "w":"2038 - Annandale",
  // "start_by":"2",
  // "job_description":"[test][dna]",
  // "full_name":"[test][dna]",
  // "email":"brettsnaidero@hipagesgroup.com.au",
  // "phone":"0448444222",
  // "category_id":295,
  // "search_str":"Electrical Lighting",
  // "drilldown_cat_id":"",
  // "search_practice":"295|electricians_lighting",
  // "site_id":"",
  // "attachment_files":["20240606_f0f4a06676e6adb9045925bfe5981499"],
  // "project":""}

  async postJob(category: string) {
    const params = { category };
    console.log('Posting a job...', { category });

    return { success: true };

    // const { data } = await firstValueFrom(
    //   this.httpService
    //     .post(
    //       'https://master-opus.k8s.hipages.com.au/api/get-quotes/directory/post-job',
    //       { params },
    //     )
    //     .pipe(
    //       catchError((error: AxiosError) => {
    //         const message = error?.response?.data || {
    //           message: 'Unknown error',
    //         };
    //         this.logger.error(message);
    //         throw new HttpException(message, error?.response?.status || 500);
    //       }),
    //     ),
    // );

    // return data;
  }
}
