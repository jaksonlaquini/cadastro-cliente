import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

const config: Partial<IndividualConfig> = {
  timeOut: 5000,
  enableHtml: true,
  positionClass: 'toast-top-right',
  closeButton: true,
};

@Injectable()
export class MessageService {
  constructor(private toastr: ToastrService) {}

  // tslint:disable-next-line:typedef
  showMessage(
    message: string,
    alerta: 'info' | 'warning' | 'success' | 'error' = 'success',
    duration: number = 5000
  ) {
    switch (alerta) {
      case 'info':
        this.toastr.info(message, 'Informação', config);
        break;
      case 'warning':
        this.toastr.warning(message, 'Alerta', config);
        break;
      case 'success':
        this.toastr.success(message, 'Sucesso', config);
        break;
      case 'error':
        this.toastr.error(message, 'Erro', config);
        break;
      default:
        this.toastr.info(message, 'Informação', config);
        break;
    }
  }
}
