import VXETable from 'vxe-table'

VXETable.renderer.add('renderToggle', {
  // 默认显示模板
  renderDefault (h, renderOpts, { row, column }) {
    // const text = row[column.property] === '1' ? '启用' : '禁用'
    const { props } = renderOpts

    function handlerInput (val) {
      renderOpts.events.change(val, row.id)
    }

    return [
      <q-toggle
        class='full-width justify-center'
        falseValue={props.falseValue}
        trueValue={props.trueValue}
        value={row[column.property]}
        disable={props.disable}
        checked-icon='check'
        unchecked-icon='clear'
        onInput={handlerInput}
      />
    ]
  }
})
