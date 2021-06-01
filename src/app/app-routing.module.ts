import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'minhas-evolucoes',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  // {
  //   path: 'minhas-evolucoes',
  //   loadChildren: () => import('./page/minhas-evolucoes/minhas-evolucoes.module').then( m => m.MinhasEvolucoesPageModule)
  // },
  {
    path: 'usuario',
    loadChildren: () => import('./page/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'prestador',
    loadChildren: () => import('./page/prestador/prestador.module').then( m => m.PrestadorPageModule)
  },
  {
    path: 'empresa',
    loadChildren: () => import('./page/empresa/empresa.module').then( m => m.EmpresaPageModule)
  },
 
  {
    path: 'prescricao',
    loadChildren: () => import('./page/prescricao/prescricao.module').then( m => m.PrescricaoPageModule)
  },
  {
    path: 'historico-solicitacoes',
    loadChildren: () => import('./page/historico-solicitacoes/historico-solicitacoes.module').then( m => m.HistoricoSolicitacoesPageModule)
  },
  // {
  //   path: 'minhas-evolucoes',
  //   loadChildren: () => import('./folder/minhas-evolucoes/minhas-evolucoes.module').then( m => m.MinhasEvolucoesPageModule)
  // },
 
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
