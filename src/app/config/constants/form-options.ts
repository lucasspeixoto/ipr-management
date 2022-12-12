export interface Select {
  value: number | string;
  viewValue: string;
}

export const sexOptions: Select[] = [
  { value: 'Masculino', viewValue: 'Masculino' },
  { value: 'Feminino', viewValue: 'Feminino' },
];

export const maritalOptions: Select[] = [
  { value: 'Solteiro', viewValue: 'Solteiro' },
  { value: 'Casado', viewValue: 'Casado' },
  { value: 'Separado', viewValue: 'Separado' },
  { value: 'Divorciado', viewValue: 'Divorciado' },
  { value: 'Viúvo', viewValue: 'Viúvo' },
];

export const schoolingOptions: Select[] = [
  { value: 'Médio - Incompleto', viewValue: 'Médio - Incompleto' },
  { value: 'Médio - Completo', viewValue: 'Médio - Completo' },
  { value: 'Superior - Incompleto', viewValue: 'Superior - Incompleto' },
  { value: 'Superior - Completo', viewValue: 'Superior - Completo' },
  { value: 'Pós-graduação - Incompleto', viewValue: 'Pós-graduação - Incompleto' },
  { value: 'Pós-graduação - Completo', viewValue: 'Pós-graduação - Completo' },
];

export const membershipOptions: Select[] = [
  { value: 'Membro Comungante', viewValue: 'Membro Comungante' },
  { value: 'Membro Afastado', viewValue: 'Membro Afastado' },
];

export const craftOptions: Select[] = [
  { value: 'Diácono', viewValue: 'Diácono' },
  { value: 'Pastor', viewValue: 'Pastor' },
  { value: 'Presbítero', viewValue: 'Presbítero' },
  { value: 'Líder de Pequeno Grupo', viewValue: 'Líder de Pequeno Grupo' },
  { value: 'Professor', viewValue: 'Professor' },
];
