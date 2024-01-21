import { HttpParams } from '@angular/common/http';

export const prepareParams = <T>(params: T | undefined, httpParams?: HttpParams): HttpParams => {
  if (!httpParams) {
    httpParams = new HttpParams();
  }

  for (const key in params) {
    if (params.hasOwnProperty(key) && params[key] != null) {
      if (Array.isArray(params[key])) {
        const paramsArray = params[key] as ParamArray;
        if (!paramsArray) {
          continue;
        }

        for (const item of paramsArray) {
          httpParams = httpParams?.append(key, item);
        }
      } else {
        const param = params[key] as ParamPrimitive;
        if (!param) {
          continue;
        }
        httpParams = httpParams.append(key, param);
      }
    }
  }

  return httpParams;
};

type ParamPrimitive = string | number | boolean | undefined;
type ParamArray = string[] | number[] | boolean[] | undefined;
