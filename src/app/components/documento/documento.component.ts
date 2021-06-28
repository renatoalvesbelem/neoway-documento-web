import { Component, OnInit } from '@angular/core';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { Documento } from 'src/app/model/Documento';
import { DocumentoDataService } from 'src/app/service/data/documento-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoDocumento } from 'src/app/model/TipoDocumento';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css']
})
export class DocumentoComponent implements OnInit {
  id = 0;
  nudocumento = '';
  tipo = 1;
  documentoValido = '';
  isBlacklist = false;
  constructor(private documentoService: DocumentoDataService,
    private route: ActivatedRoute, private router: Router,
    private toastService: ToastrService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.documentoService.getDocumento(this.id).subscribe(
        response => {
          this.nudocumento = response.numero;
          this.tipo = response.tipo.codigo;
          this.isBlacklist = response.blacklist;
        }
      );
    }
  }

  isDocumentoValido(): boolean {
    if (this.tipo === 1) {
      return cpf.isValid(this.nudocumento);
    }
    else {
      return cnpj.isValid(this.nudocumento);
    }
  }

  handleTipoDocumento(event: any): void {
    this.tipo = event.target.value;
    this.handleValidaDocumento();
  }

  handleValidaDocumento(): void {
    if (this.tipo == 1 && this.nudocumento.length === 14) {
      this.documentoValido = this.isDocumentoValido() ? 'is-valid' : 'is-invalid';
      return;
    }
    else if (this.tipo == 2 && this.nudocumento.length === 18) {
      this.documentoValido = this.isDocumentoValido() ? 'is-valid' : 'is-invalid';
      return;
    }
    this.documentoValido = '';
  }

  handleCadastrar(): void {
    if (this.isDocumentoValido()) {
      const documentoDao = new Documento(0, this.nudocumento, new TipoDocumento(this.tipo, null), this.isBlacklist);
      this.documentoService.cadastrarDocumento(documentoDao).subscribe(
        () => {
          this.nudocumento = '';
          this.tipo = 1;
          this.isBlacklist = false;
          this.documentoValido = '';
          this.toastService.success('Documento cadastrado com sucesso.');
        },
        // tslint:disable-next-line:no-shadowed-variable
        error => {
          this.toastService.error(`Erro ao cadastrar documento ${error.error}`);
        }
      );
    }
    else {
      this.toastService.warning('Verifique os dados informados.');
    }
  }

  handleAtualizar(): void {
    if (this.isDocumentoValido()) {
      const documentoDao = new Documento(this.id, this.nudocumento, new TipoDocumento(this.tipo, null), this.isBlacklist);
      this.documentoService.atualizarDocumento(documentoDao).subscribe(
        () => {
          this.toastService.success('Documento atualizado com sucesso.');
        },
        // tslint:disable-next-line:no-shadowed-variable
        error => {
          this.toastService.error('Erro ao atualizar o documento.');
        }
      );
    }
  }

  handleListar(): void {
    this.router.navigate(['']);
  }
}
