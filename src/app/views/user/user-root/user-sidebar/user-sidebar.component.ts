// app.component.ts

import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Perfil } from 'src/app/models/perfil';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
})
export class UserSidebarComponent {
  actualRoute: string = '';

  public menu: Array<NgbdCollapseBasic> = [];

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

  constructor(private location: Location, private authService: AuthService) {
    this.actualRoute = this.location.path();

    this.authService.me().subscribe((usuario) => {
      if (usuario && usuario.perfil) {
        this.buildMenu(usuario.perfil);
      }
    });
  }

  buildMenu(perfil: Perfil) {
    this.menu = [
      ...this.buildCadastrosMenu(perfil),
      ...this.buildLancamentosMenu(perfil),
      ...this.buildImpressosMenu(perfil),
      ...this.buildRelatoriosMenu(perfil),
    ];
  }

  buildCadastrosMenu(perfil: Perfil): NgbdCollapseBasic[] {
    if (
      !perfil?.cadastro_usuario &&
      !perfil?.cadastro_perfil &&
      !perfil?.cadastro_principais &&
      !perfil?.cadastro_tabelas_base
    ) {
      return [];
    }

    const subMenuGestaoDeUsuarios =
      perfil?.cadastro_usuario || perfil?.cadastro_perfil
        ? [
            {
              id: 'sub-menu-cadastros-gestaodeusuarios',
              title: 'Gestão de Usuários',
              classIcon: 'fa fa-chevron-right',
              isCollapsed: true,
              active: true,
              subMenu: [
                perfil?.cadastro_perfil
                  ? {
                      id: 'sub-menu-secundario-perfis',
                      title: '- Perfis',
                      active: true,
                      routerLink: 'cadastros/perfis',
                    }
                  : {},
                perfil?.cadastro_usuario
                  ? {
                      id: 'sub-menu-secundario-usuarios',
                      title: '- Usuários',
                      active: true,
                      routerLink: 'cadastros/usuarios',
                    }
                  : {},
              ],
            },
          ]
        : [];

    const subMenuCadastrosPrincipais = perfil?.cadastro_principais
      ? [
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
        ]
      : [];

    const subMenuCadastrosTabelasBasicas = perfil?.cadastro_tabelas_base
      ? [
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
        ]
      : [];

    return [
      {
        id: 'menu-cadastros',
        isCollapsed: true,
        title: 'Cadastros',
        classIcon: 'fa fa-list',
        active: true,
        subMenu: [
          ...subMenuGestaoDeUsuarios,
          ...subMenuCadastrosPrincipais,
          ...subMenuCadastrosTabelasBasicas,
        ],
      },
    ];
  }

  buildLancamentosMenu(perfil: Perfil) {
    return !perfil?.lancamentos
      ? []
      : [
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
        ];
  }

  buildImpressosMenu(perfil: Perfil) {
    return !perfil?.impressos
      ? []
      : [
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
                id: 'sub-menu-impressos-requerimentoparasubstituicaodeveiculo',
                title: '- Anexo 05 - Requerimento para Substituição de Veículo',
                active: true,
                routerLink: 'impressos/requerimentoparasubstituicaodeveiculo',
              },
              {
                id: 'sub-menu-impressos-requerimentoparasubstituicaodeveiculo',
                title:
                  '- Anexo 06 - Requerimento para Prorrogação de Substituição de Veículo',
                active: true,
                routerLink:
                  'impressos/requerimentoparaprorrogacaodesubstituicaodeveiculo',
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
                id: 'sub-menu-impressos-declaracaoatendimentodisposto',
                title: '- Anexo 09 - Declaração de Atendimento ao Disposto',
                active: true,
                routerLink: 'impressos/declaracaoatendimentodisposto',
              },
              {
                id: 'sub-menu-impressos-solicitacaoderessarcimento',
                title: '- Anexo 16 - Solicitação de Ressarcimento',
                active: true,
                routerLink: 'impressos/solicitacaoderessarcimento',
              },
              {
                id: 'sub-menu-impressos-solicitacaodebaixadecondutorauxiliar',
                title: '- Anexo 17 - Solicitação de Baixa de Condutor',
                active: true,
                routerLink: 'impressos/solicitacaodebaixadecondutorauxiliar',
              },
              {
                id: 'sub-menu-impressos-solicitacaotransporteescolar',
                title: '- Anexo 18 - Solicitação de Transporte Escolar',
                active: true,
                routerLink: 'impressos/solicitacaotransporteescolar',
              },
              //119
              {
                id: 'sub-menu-impressos-autorizacaoadesivacaocusteada',
                title:
                  '- Autorização para Adesivação Custeada pelo Permissionário',
                active: true,
                routerLink: 'impressos/autorizacaoadesivacaocusteada',
              },
              //120
              {
                id: 'sub-menu-impressos-solicitacaoafericaotaximetro',
                title: '- Solicitação de Aferição de Taxímetro',
                active: true,
                routerLink: 'impressos/solicitacaoafericaotaximetro',
              },
              //121
              {
                id: 'sub-menu-impressos-solicitacaodeautorizacaoprovisoria',
                title: '- Solicitação de Autorização Provisória',
                active: true,
                routerLink: 'impressos/solicitacaodeautorizacaoprovisoria',
              },
              //122
              {
                id: 'sub-menu-impressos-solicitacaodeautorizacaoprovisoriaescolar',
                title: '- Solicitação de Autorização Provisória Escolar',
                active: true,
                routerLink:
                  'impressos/solicitacaodeautorizacaoprovisoriaescolar',
              },
              //123
              //124
              //125
              //126
              {
                id: 'sub-menu-impressos-declaracaoparataxista',
                title: '- Declaração para Taxista',
                active: true,
                routerLink: 'impressos/declaracaoparataxista',
              },
              //127
              {
                id: 'sub-menu-impressos-declaracaoparatransporteescolar',
                title: '- Declaração para Transporte Escolar',
                active: true,
                routerLink: 'impressos/declaracaoparatransporteescolar',
              },
              //128
              {
                id: 'sub-menu-impressos-formularioderequerimento',
                title: '- Formulário de Requerimento',
                active: true,
                routerLink: 'impressos/formularioderequerimento',
              },
              //129
              {
                id: 'sub-menu-impressos-laudodevistoriatransportesespeciais',
                title: '- Laudo de Vistoria Transportes Especiais',
                active: true,
                routerLink: 'impressos/laudodevistoriatransportesespeciais',
              },
              //130
              {
                id: 'sub-menu-impressos-notificacao',
                title: '- Notificação',
                active: true,
                routerLink: 'impressos/notificacao',
              },
              //131
              {
                id: 'sub-menu-substituicaodeveiculo',
                title: '- Substituição de Veículo',
                active: true,
                routerLink: 'impressos/substituicaodeveiculo',
              },
              //132
              {
                id: 'sub-menu-termodecredenciamento',
                title: '- Termo de Credenciamento',
                active: true,
                routerLink: 'impressos/termodecredenciamento',
              },
              //133
              {
                id: 'sub-menu-termodecredenciamentotransporteescolar',
                title: '- Termo de Credecenciamento - Transporte Escolar',
                active: true,
                routerLink: 'impressos/termodecredenciamentotransporteescolar',
              },
              //134
              {
                id: 'sub-menu-aip',
                title: '- AIP - Auto de Imposição de Penalidade',
                active: true,
                routerLink: 'impressos/aip',
              },
              //135
              {
                id: 'sub-menu-alvara-permissao',
                title: '- Alvará de Permissão',
                active: true,
                routerLink: 'impressos/alvarapermissao',
              },
            ],
          },
        ];
  }

  buildRelatoriosMenu(perfil: Perfil) {
    return !perfil?.relatorios
      ? []
      : [
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
              {
                id: 'sub-menu-relatorios-relatoriodealvarasexpirados',
                title: '- Alvarás Vencidos',
                active: true,
                routerLink: 'relatorios/relatoriodealvarasexpirados',
              },
              {
                id: 'sub-menu-relatorios-relatoriodecursosdepermissionariosvencidos',
                title: '- Cursos de Permissionários Vencidos',
                active: true,
                routerLink:
                  'relatorios/relatoriodecursospermissionariovencidos',
              },
              {
                id: 'sub-menu-relatorios-relatoriodecursosdecondutoresvencidos',
                title: '- Cursos de Condutores Vencidos',
                active: true,
                routerLink: 'relatorios/relatoriodecursoscondutorvencidos',
              },
              {
                id: 'sub-menu-relatorios-relatoriodecursosdemonitoresvencidos',
                title: '- Cursos de Monitores Vencidos',
                active: true,
                routerLink: 'relatorios/relatoriodecursosmonitorvencidos',
              },
              {
                id: 'sub-menu-relatorios-relatoriodocumentospermissionarioexpirados',
                title: '- Documentos de Permissionários Expirados',
                active: true,
                routerLink:
                  'relatorios/relatoriodocumentospermissionarioexpirados',
              },
            ],
          },
        ];
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
