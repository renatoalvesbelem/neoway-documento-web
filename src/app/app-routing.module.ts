import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentoComponent } from './components/documento/documento.component';
import { ListDocumentosComponent } from './components/list-documentos/list-documentos.component';


const routes: Routes = [
  { path: '', component: ListDocumentosComponent },
  { path: 'documento', component: DocumentoComponent },
  { path: 'documento/:id', component: DocumentoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
