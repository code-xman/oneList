import VXETable from 'vxe-table'

VXETable.setup({
  zIndex: 3000,
  emptyCell: '',
  select: { transfer: true },
  table: {
    showOverflow: true,
    border: true,
    fit: true,
    stripe: true,
    align: 'left',
    headerAlign: 'center',
    highlightCurrentRow: true,
    highlightHoverRow: true,
    autoResize: true,
    rowId: 'id',
    tooltipConfig: {
      enterable: true
    },
    editConfig: {
      mode: 'cell',
      showAsterisk: true
    },
    customConfig: {
      storage: true
    },
    checkboxConfig: {
      trigger: 'row'
    }
  }
})
