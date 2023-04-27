import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorCustom extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Itens por página: ';
  override nextPageLabel = 'Próximo';
  override previousPageLabel = 'Anterior';
  override lastPageLabel = 'Última página';
  override firstPageLabel = 'Primeira página';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    return page * pageSize + pageSize < length
      ? page * pageSize +
          1 +
          ' - ' +
          (page * pageSize + pageSize) +
          ' de ' +
          length
      : page * pageSize + 1 + ' - ' + length + ' de ' + length;
  };
}
