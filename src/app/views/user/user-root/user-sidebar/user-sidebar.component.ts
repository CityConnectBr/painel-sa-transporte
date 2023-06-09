// app.component.ts

import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
})
export class UserSidebarComponent {
  actualRoute: string = '';

  public menu: Array<NgbdCollapseBasic> = [
    {
      id: 'menu-cadastros',
      isCollapsed: true,
      title: 'Cadastros',
      classIcon: 'fa fa-list',
      active: true,
      subMenu: [
        {
          id: 'sub-menu-cadastros-gestaodeusuarios',
          title: 'Gestão de Usuários',
          classIcon: 'fa fa-chevron-right',
          isCollapsed: true,
          active: true,
          subMenu: [
            {
              id: 'sub-menu-secundario-perfis',
              title: '- Perfis',
              active: true,
              routerLink: 'cadastros/perfis',
            },
            {
              id: 'sub-menu-secundario-usuarios',
              title: '- Usuários',
              active: true,
              routerLink: 'cadastros/usuarios',
            },
          ],
        },
        {
          id: 'sub-menu-cadastros-principais',
          title: 'Principais',
          classIcon: 'fa fa-chevron-right',
          isCollapsed: true,
          active: true,
          subMenu: [
            {
              id: 'sub-menu-principal-permissionarios',
              title: '- Permissionários',
              active: true,
              routerLink: 'cadastros/permissionarios',
            },
            {
              id: 'sub-menu-principal-condutores',
              title: '- Condutores',
              active: true,
              routerLink: 'cadastros/condutores',
            },
            {
              id: 'sub-menu-principal-monitores',
              title: '- Monitores',
              active: true,
              routerLink: 'cadastros/monitores',
            },
            {
              id: 'sub-menu-principal-veiculos',
              title: '- Veículos',
              active: true,
              routerLink: 'cadastros/veiculos',
            },
            {
              id: 'sub-menu-principal-fiscais',
              title: '- Agentes de Fiscalização',
              active: true,
              routerLink: 'cadastros/fiscais',
            },
            {
              id: 'sub-menu-principal-solicitacoes',
              title: '- Solicitações',
              active: true,
              routerLink: 'cadastros/solicitacoes',
            },
          ],
        },
        {
          id: 'sub-menu-cadastros-tabelas-basicas',
          title: 'Tabelas Básicas',
          classIcon: 'fa fa-chevron-right',
          isCollapsed: true,
          active: true,
          subMenu: [
            {
              id: 'sub-menu-principal-vistoriadores',
              title: '- Vistoriadores',
              active: true,
              routerLink: 'cadastros/vistoriadores',
            },
            {
              id: 'sub-menu-secundario-empresas',
              title: '- Empresas',
              active: true,
              routerLink: 'cadastros/empresas',
            },
            {
              id: 'sub-menu-outros-pontos',
              title: '- Ponto/Trecho',
              active: true,
              routerLink: 'cadastros/pontos',
            },
            {
              id: 'sub-menu-outros-entidadesassociativas',
              title: '- Entidade Associativa',
              active: true,
              routerLink: 'cadastros/entidadesassociativas',
            },
            {
              id: 'sub-menu-outros-marcasmodelosdeveiculos',
              title: '- Marca/Modelo de Veículo',
              active: true,
              routerLink: 'cadastros/marcasmodelosdeveiculos',
            },
            {
              id: 'sub-menu-outros-marcasmodelosdecarroceria',
              title: '- Marca/Modelo de Carroceria',
              active: true,
              routerLink: 'cadastros/marcasmodelosdecarroceria',
            },
            {
              id: 'sub-menu-outros-marcasmodelosdechassi',
              title: '- Marca/Modelo de Chassi',
              active: true,
              routerLink: 'cadastros/marcasmodelosdechassi',
            },
            {
              id: 'sub-menu-outros-tiposdeveiculo',
              title: '- Tipos de Veículo',
              active: true,
              routerLink: 'cadastros/tiposdeveiculo',
            },
            {
              id: 'sub-menu-outros-coresdeveiculos',
              title: '- Cores de Veículo',
              active: true,
              routerLink: 'cadastros/coresdeveiculos',
            },
            {
              id: 'sub-menu-outros-tiposdecombustivel',
              title: '- Tipos de Combustivel',
              active: true,
              routerLink: 'cadastros/tiposdecombustivel',
            },
            {
              id: 'sub-menu-outros-aplicativos',
              title: '- Aplicativos',
              active: true,
              routerLink: 'cadastros/aplicativos',
            },
            {
              id: 'sub-menu-outros-empresasvistoriadoras',
              title: '- Empresa Vistoriadora',
              active: true,
              routerLink: 'cadastros/empresasvistoriadoras',
            },
            {
              id: 'sub-menu-outros-tiposdecertidao',
              title: '- Tipo de Certidão',
              active: true,
              routerLink: 'cadastros/tiposdecertidao',
            },
            {
              id: 'sub-menu-outros-entidadecurso',
              title: '- Entidade Minitrantes de Cursos',
              active: true,
              routerLink: 'cadastros/entidadecurso',
            },
            {
              id: 'sub-menu-outros-tiposdecurso',
              title: '- Tipos de Curso',
              active: true,
              routerLink: 'cadastros/tiposdecurso',
            },
            {
              id: 'sub-menu-outros-quadrodeinfracoes',
              title: '- Quadro de Infrações',
              active: true,
              routerLink: 'cadastros/quadrodeinfracoes',
            },
            {
              id: 'sub-menu-outros-tiposdemoeda',
              title: '- Tipos de Moeda',
              active: true,
              routerLink: 'cadastros/tiposdemoeda',
            },
            {
              id: 'sub-menu-outros-valoresdainfracao',
              title: '- Valores da Infração',
              active: true,
              routerLink: 'cadastros/valoresdainfracao',
            },
            {
              id: 'sub-menu-outros-taloesdofiscal',
              title: '- Talão do Fiscal',
              active: true,
              routerLink: 'cadastros/taloesdofiscal',
            },
            {
              id: 'sub-menu-outros-fmp',
              title: '- Fator Monetário Padrão',
              active: true,
              routerLink: 'cadastros/fmp',
            },
          ],
        },
      ],
    },
    {
      id: 'menu-lançamentos',
      isCollapsed: true,
      title: 'Lançamentos',
      classIcon: 'fa fa-pencil-square-o',
      active: true,
      subMenu: [
        {
          id: 'sub-menu-lancamentos-certidoes',
          title: '- Certidões',
          active: true,
          routerLink: 'lancamentos/certidoes',
        },
        {
          id: 'sub-menu-lancamentos-infracoes',
          title: '- Infrações',
          active: true,
          routerLink: 'lancamentos/infracoes',
        },
        {
          id: 'sub-menu-alvara-pagamento',
          title: '- Pagamento de Alvará',
          active: true,
          routerLink: 'lancamentos/alvarapagamento',
        },
        {
          id: 'sub-menu-lancamentos-vistoriasdepontos',
          title: '- Vistoria de Pontos',
          active: true,
          routerLink: 'lancamentos/vistoriasdepontos',
        },
      ],
    },
    {
      id: 'menu-impressos',
      isCollapsed: true,
      title: 'Impressos',
      classIcon: 'fa fa-print',
      active: true,
      subMenu: [
        {
          id: 'sub-menu-impressos-formulariorenovacaopermissao',
          title: '- Anexo 01 - Requerimento de Renovação de Permissão',
          active: true,
          routerLink: 'impressos/formulariorenovacaopermissao',
        },
        {
          id: 'sub-menu-impressos-formulariotransferencia',
          title: '- Anexo 02 - Requerimento de Transferência',
          active: true,
          routerLink: 'impressos/formulariotransferencia',
        },
        {
          id: 'sub-menu-impressos-transferenciadepermissaodetransporte',
          title: '- Anexo 03 - Transferência de Permissão de Transporte',
          active: true,
          routerLink: 'impressos/transferenciadepermissaodetransporte',
        },
        {
          id: 'sub-menu-impressos-transferenciadepermissaodetaxi',
          title: '- Anexo 04 - Transferência de Permissão de Táxi',
          active: true,
          routerLink: 'impressos/transferenciadepermissaodetaxi',
        },
        {
          id: 'sub-menu-impressos-formulariodeclaracaomonitor',
          title: '- Anexo 07 - Declaração de Monitor',
          active: true,
          routerLink: 'impressos/formulariodeclaracaomonitor',
        },
        {
          id: 'sub-menu-impressos-condutorauxiliar',
          title: '- Anexo 08 - Condutor Auxiliar',
          active: true,
          routerLink: 'impressos/condutorauxiliar',
        },
        {
          id: 'sub-menu-impressos-solicitacaodebaixadecondutorauxiliar',
          title: '- Anexo 17 - Solicitação de Baixa de Condutor',
          active: true,
          routerLink: 'impressos/solicitacaodebaixadecondutorauxiliar',
        },
      ],
    },
    {
      id: 'menu-relatorios',
      isCollapsed: true,
      title: 'Relatórios',
      classIcon: 'fa fa-file-text',
      active: true,
      subMenu: [
        {
          id: 'sub-menu-relatorios-entradasaidadeveiculos',
          title: '- Entrada e Saída de Veículos',
          active: true,
          routerLink: 'relatorios/entradasaidadeveiculos',
        },
      ],
    },
  ];

  collapseMenu(menuId: string): void {
    this.menu.forEach((menu) => {
      if (menu.id === menuId) {
        menu.isCollapsed = !menu.isCollapsed;
        return;
      }
      if (menu.subMenu) {
        menu.subMenu.forEach((subMenu) => {
          if (subMenu.id === menuId) {
            subMenu.isCollapsed = !subMenu.isCollapsed;
            return;
          }
        });
      }
    });
  }

  constructor(private location: Location) {
    this.actualRoute = this.location.path();
  }
}

export interface NgbdCollapseBasic {
  id?: string;
  isCollapsed?: boolean;
  title: string;
  classIcon?: string;
  active: boolean;
  routerLink?: string;
  subMenu?: any[];
}
