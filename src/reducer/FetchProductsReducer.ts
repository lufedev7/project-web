import {
  Content,
  ProductsTypes,
} from '@/components/products/ProductsTypes.type'

enum States {
  Loader = 'loader',
  noLoader = 'noLoader',
  wait = 'wait',
}
type Action =
  | { type: 'FETCH_SUCCESS'; data: ProductsTypes }
  | { type: 'FETCH_ERROR'; error: unknown }

interface State {
  requesFechsConcat: Content[]
  count: number
  batRequest: boolean
  isLatest: boolean
  loader: string | null
}

export const initialState: State = {
  requesFechsConcat: [],
  count: -1,
  batRequest: false,
  isLatest: true,
  loader: States.Loader,
}

export const reducer = (states: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      console.log(action.data)
      const dataFetch: Content[] = action.data.data.content

      return {
        ...states,
        loader: States.noLoader,
        requesFechsConcat: states.requesFechsConcat.concat(dataFetch),
        isLatest: action.data.data.last,
      }
    }
    case 'FETCH_ERROR':
      console.error('errores en el hook', action.error)
      return {
        ...states,
        requesFechsConcat: [],
        loader: States.wait,
        batRequest: true,
      }

    default:
      return states
  }
}
