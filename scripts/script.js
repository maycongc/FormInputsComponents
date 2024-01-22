$(document).ready(function () {
  // Configurações padrão para todos os futuros componentes Bootstrap-datepicker
  jQuery.fn.datepicker.defaults.language = 'pt-BR';
  jQuery.fn.datepicker.defaults.minViewMode = 0;
  jQuery.fn.datepicker.defaults.maxViewMode = 3;
  jQuery.fn.datepicker.defaults.todayHighlight = true;
  jQuery.fn.datepicker.defaults.todayBtn = 'linked';
  jQuery.fn.datepicker.defaults.autoclose = true;
  jQuery.fn.datepicker.defaults.orientation = 'bottom';
  jQuery.fn.datepicker.defaults.templates.leftArrow =
    '<img src="./pages/images/icones/chevron_left.svg" />';
  jQuery.fn.datepicker.defaults.templates.rightArrow =
    '<img src="./pages/images/icones/chevron_right.svg" />';

  habilitarMascaraData();
});

function habilitarMascaraData() {
  jQuery('.data-completa:not([readonly])').datepicker();

  jQuery('.data-mesAno:not([readonly])').datepicker({
    minViewMode: 1,
    format: 'mm/yyyy',
  });

  jQuery('.data-noButton:not([readonly])').datepicker({
    todayBtn: false,
  });

  // abrir o componente sem problemas quando clicar no campo novamente com foco
  jQuery('.data-completa:not([readonly]), .data-mesAno:not([readonly])').on(
    'click',
    function () {
      jQuery(this).datepicker('show');
    },
  );

  // Inserir os botões customizados "hoje" e "limpar" em cada parte do
  // componente (dias, meses, anos, décadas...)
  jQuery('.data-completa, .data-mesAno, .data-buttonHoje').on(
    'show',
    function () {
      if (jQuery('.containerBotoesDatepicker').length <= 0) {
        const thBotoesDatepicker = document.createElement('th');
        jQuery(thBotoesDatepicker).prop('colspan', '7');

        const containerBotoesDatepicker = document.createElement('div');
        jQuery(containerBotoesDatepicker).prop(
          'class',
          'containerBotoesDatepicker',
        );
        thBotoesDatepicker.append(containerBotoesDatepicker);

        const botaoHoje = document.createElement('button');
        jQuery(botaoHoje)
          .prop('class', 'datepickerBotaoHoje today ghost')
          .text('Hoje');

        const botoesHoje = jQuery(
          '.table-condensed tfoot th.today:not([style*="display: none"])',
        );

        botoesHoje.toArray().forEach(btnHoje => {
          const copiaThBotoes = thBotoesDatepicker.cloneNode(true);

          btnHoje.insertAdjacentElement('beforebegin', copiaThBotoes);

          const container = jQuery(copiaThBotoes).find(
            '.containerBotoesDatepicker',
          );

          container.append(botaoHoje.cloneNode(true));
          btnHoje.remove();
        });
      }
    },
  );
}
