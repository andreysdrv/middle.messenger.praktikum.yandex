export const REG_EXPS: Record<'NAME' | 'LOGIN' | 'EMAIL' | 'PASSWORD' | 'PHONE', RegExp> = {
  NAME: /^(?=.*[A-ZА-Я])[A-Za-zА-Яа-яЁё-]+$/,
  LOGIN: /^(?=.*[A-Za-z])[A-Za-z0-9-_]{3,20}$/i,
  EMAIL: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g,
  PASSWORD: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,40})\S$/,
  PHONE: /^[+]?(\d{10,15})$/g,
};

export const validator = (inputElement: HTMLInputElement) => {
  const { name, value } = inputElement;

  const result: { isValid: boolean, error: string} = {
    error: '',
    isValid: true,
  };

  switch (name) {
    case 'first_name':
    case 'second_name':
      result.isValid = REG_EXPS.NAME.test(value);
      result.error = 'латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)';
      break;
    case 'login':
      result.isValid = REG_EXPS.LOGIN.test(value);
      result.error = 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них,без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)';
      break;
    case 'email':
      result.isValid = REG_EXPS.EMAIL.test(value);
      result.error = 'латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы';
      break;
    case 'password':
      result.isValid = REG_EXPS.PASSWORD.test(value);
      result.error = 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра';
      break;
    case 'phone':
      result.isValid = REG_EXPS.PHONE.test(value);
      result.error = 'от 10 до 15 символов, состоит из цифр, может начинается с плюса';
      break;
    default:
      result.isValid = true;
      result.error = '';
  }

  return result;
};

export const queryStringify = (data: any): string => {
  let queries = '?';
  for (const key in data) {
    if (data[key]) {
      queries += `${key}=${data[key]}&`;
    }
  }
  return queries.slice(0, -1);
};

export type Indexed<T = any> = {
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export const set = (object: Indexed | unknown, path: string, value: unknown): Indexed | unknown => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
    [key]: acc,
  }), value as any);

  return merge(object as Indexed, result);
};
