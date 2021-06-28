import {Component, OnInit} from '@angular/core';
import {Documento} from 'src/app/model/Documento';
import {cpf, cnpj} from 'cpf-cnpj-validator';
import {DocumentoDataService} from 'src/app/service/data/documento-data.service';
import {Router} from '@angular/router';
import {OrderBy} from 'src/app/model/OrderBy';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-documentos',
  templateUrl: './list-documentos.component.html',
  styleUrls: ['./list-documentos.component.css']
})
export class ListDocumentosComponent implements OnInit {
  page = 0;
  documentos: Documento[] = [];
  pages = 0;
  numero = '';
  codigoTipo: number[] = [];
  documentoValidoConsulta = true;
  cssDocumentoValido = '';
  orderBy = new OrderBy('', true);

  constructor(private documentoService: DocumentoDataService, private router: Router, private toastService: ToastrService) {

  }

  ngOnInit(): void {

  }

  handlePagina(page: number): void {
    page -= 1;
    if (this.page === page) {
      return;
    }
    this.page = page;
    this.handleConsultar(this.orderBy);
  }

  handleConsultar(orderBy?: OrderBy): void {
    this.documentoService.getTodosDocumentos(this.numero, this.codigoTipo, this.page, orderBy).subscribe(
      response => {
        this.documentos = response.content;
        this.pages = response.totalPages;
        if (this.pages === 0) {
          this.toastService.warning('Não foram encontrados dados para pesquisa.');
        }
      },
      // tslint:disable-next-line:no-shadowed-variable
      error => {
        this.toastService.error(`Não foi possível consultar ${error.statusText}`);
      }
    );
  }

  handleDeletar(cdDocumento: number): void {
    this.documentoService.deletarDocumento(cdDocumento).subscribe(
      () => {
        this.toastService.success('Documento deletado com sucesso.');
        this.handleConsultar(this.orderBy);
      },
      // tslint:disable-next-line:no-shadowed-variable
      error => {
        this.toastService.error('Erro ao deletar documento.');
      }
    );
  }

  handleAtualizar(cdDocumento: number): void {
    this.router.navigate(['documento', cdDocumento]);
  }

  checkValue(event: any): void {
    const cdTipo: number = event.target.value;

    this.codigoTipo.includes(cdTipo) ?
      this.codigoTipo.splice(this.codigoTipo.indexOf(cdTipo), 1) :
      this.codigoTipo.push(cdTipo);
  }

  handleNovo(): void {
    this.router.navigate(['documento']);
  }

  handleValidaDocumento(): void {
    if (this.numero.length === 14) {
      this.documentoValidoConsulta = cpf.isValid(this.numero);
      this.cssDocumentoValido = this.documentoValidoConsulta ? 'is-valid' : 'is-invalid';
      return;
    } else if (this.numero.length === 18) {
      this.documentoValidoConsulta = cnpj.isValid(this.numero);
      this.cssDocumentoValido = this.documentoValidoConsulta ? 'is-valid' : 'is-invalid';
      return;
    }
    this.documentoValidoConsulta = true;
    this.cssDocumentoValido = '';
  }

  handleOrderBy(coluna: string): void {
    const orderBy = this.orderBy;
    if (orderBy.coluna !== coluna) {
      orderBy.coluna = coluna;
      orderBy.orderAsc = true;
      this.orderBy = orderBy;
    } else {
      orderBy.orderAsc = !this.orderBy.orderAsc;
      this.orderBy = orderBy;
    }
    this.handleConsultar(orderBy);
  }
}
