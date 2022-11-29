import { appRoutes } from '@config/routes/app-routes';
import { MenuItem } from '@sharedMd/menu-item.model';

export const menuItems: MenuItem[] = [
  {
    routerLink: appRoutes.HOME,
    icon: 'home',
    label: 'Início',
  },
  {
    routerLink: appRoutes.REGISTER,
    icon: 'insert_chart_outlined',
    label: 'Meu Cadastro',
  },
  {
    routerLink: appRoutes.MEMBERS_LIST,
    icon: 'table_chart',
    label: 'Membros',
  },
  {
    routerLink: appRoutes.STATISTICS,
    icon: 'bar_chart',
    label: 'Estatísticas',
  },
  {
    routerLink: appRoutes.EXPENSES,
    icon: 'account_balance',
    label: 'Despesas',
  },
];
