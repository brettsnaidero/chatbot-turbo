import { HttpException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class SuggestService {
  private readonly logger = new Logger(SuggestService.name);

  constructor(private httpService: HttpService) {}

  // Cerebro /suggest/category-fuzzy is used to get autocomplete category search options.
  // https://cerebro.k8s.hipages.com.au/suggest/category-fuzzy?keyword=Inst.
  async suggestCategoryFuzzy(keyword: string) {
    const { data } = await firstValueFrom(
      this.httpService
        .get('https://cerebro.k8s.hipages.com.au/suggest/category-fuzzy', {
          params: {
            keyword,
          },
        })
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
