export type some = { [key: string]: any }

export const backableToResultKey = 'backableToResult';

export const ROUTES = {
  detail: {
    gen: (id: string) => `/detail/${id}`,
    value: "/detail/:id"
  },
  form: '/form'
}