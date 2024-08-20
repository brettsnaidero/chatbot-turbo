import { HttpException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class QuestionsService {
  private readonly logger = new Logger(QuestionsService.name);

  constructor(private httpService: HttpService) {}

  async getQuestions(category: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `https://master-supo.k8s.hipages.com.au/api/supo/form/questions/${category}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            const message = error?.response?.data || {
              message: 'Unknown error',
            };
            this.logger.error(message);
            throw new HttpException(message, error?.response?.status || 500);
          }),
        ),
    );

    return data;
  }
}
