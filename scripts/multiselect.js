$('#exampleSelect').val(['1', '2']);

$(document).ready(function () {
  $('#exampleSelect').multiselect({
    nonSelectedText: 'Selecione',
    includeSelectAllOption: true,
    selectAllText: 'Selecionar todos',
    allSelectedText: 'Todos selecionados',
    nSelectedText: 'Selecionados',
    // enableFiltering: true,

    onDropdownShow: () => {
      $('#exampleSelect + .btn-group + .labelContainer').addClass('open');
    },

    onDropdownHide: () => {
      $('#exampleSelect + .btn-group + .labelContainer').removeClass('open');
    },
  });
});
