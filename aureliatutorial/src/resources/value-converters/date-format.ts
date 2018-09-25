import { I18N } from 'aurelia-i18n';
import * as moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/fr';
import { autoinject } from 'aurelia-framework';

@autoinject
export class DateFormatValueConverter {

  constructor(private i18n: I18N){

  }

  signals = ['locale-changed'];

  toView(value) {
    moment.locale(this.i18n.getLocale() == "en" ? "en-gb": this.i18n.getLocale());
    return moment(value).format('MMMM Do YYYY, h:mm a')
  }

  fromView(value) {

  }
}

