$(document).ready(function () {
  // Configurações padrão para todos os futuros componentes Bootstrap-datepicker
  jQuery.fn.datepicker.defaults.language = 'pt-BR';
  jQuery.fn.datepicker.defaults.minViewMode = 0;
  jQuery.fn.datepicker.defaults.maxViewMode = 3;
  jQuery.fn.datepicker.defaults.todayHighlight = true;
  jQuery.fn.datepicker.defaults.todayBtn = 'linked';
  jQuery.fn.datepicker.defaults.clearBtn = true;
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
    clearBtn: false,
    todayBtn: false,
  });

  jQuery('.data-buttonHoje:not([readonly])').datepicker({
    clearBtn: false,
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

        const botaoLimpar = document.createElement('button');
        jQuery(botaoLimpar)
          .prop('class', 'datepickerBotaoLimpar clear tipo3')
          .text('Limpar');

        const botaoHoje = document.createElement('button');
        jQuery(botaoHoje)
          .prop('class', 'datepickerBotaoHoje today tipo1')
          .text('Hoje');

        const botoesHoje = jQuery(
          '.table-condensed tfoot th.today:not([style*="display: none"])',
        );
        const botoesLimpar = jQuery(
          '.table-condensed tfoot th.clear:not([style*="display: none"])',
        );

        const botoes = {};

        botoesHoje?.toArray().forEach(botao => {
          const classeElementoPai =
            getClassDatePickerElementoPaiBotao(botao).prop('class');
          botoes[classeElementoPai] = [botao];
        });

        botoesLimpar?.toArray().forEach(botao => {
          const classeElementoPai =
            getClassDatePickerElementoPaiBotao(botao).prop('class');

          if (typeof botoes[classeElementoPai] === 'undefined') {
            botoes[classeElementoPai] = [botao];
          } else {
            botoes[classeElementoPai].push(botao);
          }
        });

        for (const [key, value] of Object.entries(botoes)) {
          const [btnHoje, btnLimpar] = value;

          const copiaThBotoes = thBotoesDatepicker.cloneNode(true);

          if (btnHoje && btnLimpar) {
            btnHoje.insertAdjacentElement('beforebegin', copiaThBotoes);

            const container = jQuery(copiaThBotoes).find(
              '.containerBotoesDatepicker',
            );

            container.append(botaoLimpar.cloneNode(true));
            container.append(botaoHoje.cloneNode(true));
            container.css('justify-content', 'space-between');

            btnHoje.remove();
            btnLimpar.remove();
            continue;
          }

          if (btnHoje) {
            btnHoje.insertAdjacentElement('beforebegin', copiaThBotoes);
            jQuery(copiaThBotoes)
              .find('.containerBotoesDatepicker')
              .append(botaoHoje.cloneNode(true));

            btnHoje.remove();
            continue;
          }

          if (btnLimpar) {
            btnLimpar.insertAdjacentElement('beforebegin', copiaThBotoes);
            jQuery(copiaThBotoes)
              .find('.containerBotoesDatepicker')
              .append(botaoLimpar.cloneNode(true));

            btnLimpar.remove();
            continue;
          }
        }
      }
    },
  );
}

function getClassDatePickerElementoPaiBotao(elemento) {
  return jQuery(elemento).closest(
    '.datepicker-days, .datepicker-months, .datepicker-years, .datepicker-decades, .datepicker-centuries',
    jQuery('.datepicker'),
  );
}
