import { copy } from 'src/utils/index'

export function setList (state, list) {
  state.list = copy(list)
}

export function setSetting (state, Obj) {
  state.setting = copy(Obj)
}
