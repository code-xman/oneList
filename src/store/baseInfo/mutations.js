import { copy } from 'src/utils/index'

export function setList (state, list) {
  state.list = copy(list)
}
