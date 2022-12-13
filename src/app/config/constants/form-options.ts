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

export const baptismOptions: Select[] = [
  { value: 'Sim', viewValue: 'Sim' },
  { value: 'Não', viewValue: 'Não' },
];

export const interestsOption: Select[] = [
  { value: 'Louvor', viewValue: 'Louvor' },
  { value: 'Ensino', viewValue: 'Ensino' },
  { value: 'Pregação', viewValue: 'Pregação' },
  { value: 'Limpeza', viewValue: 'Limpeza' },
  { value: 'Ação Social', viewValue: 'Ação Social' },
  { value: 'Cozinha', viewValue: 'Cozinha' },
  { value: 'Outro', viewValue: 'Outro' },
];

export const communitiesOption: Select[] = [
  { value: 'Nenhuma', viewValue: 'Nenhuma' },
  { value: 'Assembléia de Deus', viewValue: 'Assembléia de Deus' },
  { value: 'Congregação Cristã no Brasil', viewValue: 'Congregação Cristã no Brasil' },
  { value: 'Católica Apostólica Romana', viewValue: 'Católica Apostólica Romana' },
  { value: 'Universal do Reino de Deus', viewValue: 'Universal do Reino de Deus' },
  { value: 'Evangelho Quadrangular', viewValue: 'Evangelho Quadrangular' },
  { value: 'Convenção Batista Brasileira', viewValue: 'Convenção Batista Brasileira' },
  { value: 'Renascer em Cristo', viewValue: 'Renascer em Cristo' },
  { value: 'Adventista', viewValue: 'Adventista' },
  {
    value: 'Internacional da Graça de Deus',
    viewValue: 'Internacional da Graça de Deus',
  },
  { value: 'Pentecostal Deus é amor', viewValue: 'Pentecostal Deus é amor' },
  { value: 'Presbiteriana do Brasil', viewValue: 'Presbiteriana do Brasil' },
  {
    value: 'Evangélica de Confissão Luterana do Brasil',
    viewValue: 'Evangélica de Confissão Luterana do Brasil',
  },
  { value: 'Batista', viewValue: 'Batista' },
  { value: 'Cristã Maranata', viewValue: 'Cristã Maranata' },
  { value: 'Maná', viewValue: 'Maná' },
  { value: 'Mundial do Poder de Deus', viewValue: 'Mundial do Poder de Deus' },
  { value: 'Metodista do Brasil', viewValue: 'Metodista do Brasil' },
  { value: 'Evangélica Luterana do Brasil', viewValue: 'Evangélica Luterana do Brasil' },
  {
    value: 'Evangélica Pentecostal O Brasil para Cristo',
    viewValue: 'Evangélica Pentecostal O Brasil para Cristo',
  },
  {
    value: 'Comunidade Evangélica Sara nossa Terra',
    viewValue: 'Comunidade Evangélica Sara nossa Terra',
  },
  {
    value: 'Presbiteriana Renovada do Brasil',
    viewValue: 'Presbiteriana Renovada do Brasil',
  },
  { value: 'Nazareno', viewValue: 'Nazareno' },
  { value: 'Casa da Benção', viewValue: 'Casa da Benção' },
  { value: 'Metodista Wesleyana', viewValue: 'Metodista Wesleyana' },
  {
    value: 'Presbiteriana Independente do Brasil',
    viewValue: 'Presbiteriana Independente do Brasil',
  },
  {
    value: 'Aliança das igrejas Cristãs Nova Vida',
    viewValue: 'Aliança das igrejas Cristãs Nova Vida',
  },
  { value: 'Avivamento Bíblico', viewValue: 'Avivamento Bíblico' },
  { value: 'Adventista da Promessa', viewValue: 'Adventista da Promessa' },
  { value: 'Apostólica Fonte da Vida', viewValue: 'Apostólica Fonte da Vida' },
  { value: 'Batista da Lagoinha', viewValue: 'Batista da Lagoinha' },
  {
    value: 'Associação das Igrejas Batistas Regulares do Brasil',
    viewValue: 'Associação das Igrejas Batistas Regulares do Brasil',
  },
  { value: 'Igreja Unida', viewValue: 'Igreja Unida' },
  {
    value: 'Evangélica Congregacional do Brasil',
    viewValue: 'Evangélica Congregacional do Brasil',
  },
  { value: 'Cristã Evangélica', viewValue: 'Cristã Evangélica' },
  { value: 'Verbo da Vida', viewValue: 'Verbo da Vida' },
  { value: 'Videira', viewValue: 'Videira' },
  { value: 'Igreja de Deus no Brasil', viewValue: 'Igreja de Deus no Brasil' },
  {
    value: 'Cristã Pentecostal da Bíblia do Brasil',
    viewValue: 'Cristã Pentecostal da Bíblia do Brasil',
  },
  { value: 'Metodista Livre', viewValue: 'Metodista Livre' },
  { value: 'Cristã Presbiteriana', viewValue: 'Cristã Presbiteriana' },
  {
    value: 'Presbiteriana Conservadora do Brasil',
    viewValue: 'Presbiteriana Conservadora do Brasil',
  },
  { value: 'Presbiteriana Unida do Brasil', viewValue: 'Presbiteriana Unida do Brasil' },
  {
    value: 'Presbiteriana Fundamentalista do Brasil',
    viewValue: 'Presbiteriana Fundamentalista do Brasil',
  },
  {
    value: 'Presbiteriana Coreana Americana',
    viewValue: 'Presbiteriana Coreana Americana',
  },
  {
    value: 'Indígena Presbiteriana  do Brasil',
    viewValue: 'Indígena Presbiteriana  do Brasil',
  },
  {
    value: 'Cristã da Aliança',
    viewValue: 'Cristã da Aliança',
  },
];
