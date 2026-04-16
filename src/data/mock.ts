import { Provider, Appointment } from '../types';

export const CATEGORIES = [
  { id: '1', name: 'Beleza & Estética', icon: 'Scissors' },
  { id: '2', name: 'Manutenção', icon: 'Wrench' },
  { id: '3', name: 'Aulas Particulares', icon: 'BookOpen' },
  { id: '4', name: 'Tecnologia', icon: 'Monitor' },
  { id: '5', name: 'Saúde & Bem-Estar', icon: 'Heart' },
  { id: '6', name: 'Design & Foto', icon: 'Camera' },
];

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: 'p1',
    categoryId: '1', // Beleza
    name: 'Ana Souza',
    profession: 'Manicure & Pedicure',
    rating: 4.8,
    reviewsCount: 124,
    avatarUrl: 'https://picsum.photos/seed/ana/200/200',
    bio: 'Especialista em unhas decoradas e spa dos pés. Mais de 5 anos de experiência.',
    availableDays: ['Segunda', 'Terça', 'Quinta', 'Sexta', 'Sábado'],
    services: [
      { id: 's1', name: 'Manicure Simples', description: 'Cutilagem e esmaltação', price: 35, durationMinutes: 45 },
      { id: 's2', name: 'Pedicure', description: 'Cutilagem, esmaltação e hidratação', price: 40, durationMinutes: 50 },
      { id: 's3', name: 'Pé e Mão', description: 'Combo completo', price: 70, durationMinutes: 90 },
    ],
  },
  {
    id: 'p2',
    categoryId: '2', // Manutenção
    name: 'Carlos Oliveira',
    profession: 'Eletricista Residencial',
    rating: 4.9,
    reviewsCount: 89,
    avatarUrl: 'https://picsum.photos/seed/carlos/200/200',
    bio: 'Instalações, reparos e projetos elétricos residenciais com segurança e garantia.',
    availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    services: [
      { id: 's4', name: 'Visita Técnica', description: 'Orçamento e diagnóstico de falhas', price: 50, durationMinutes: 60 },
      { id: 's5', name: 'Instalação de Chuveiro', description: 'Instalação ou troca de chuveiro elétrico', price: 80, durationMinutes: 40 },
      { id: 's6', name: 'Troca de Fiação (Hora)', description: 'Serviço cobrado por hora', price: 120, durationMinutes: 60 },
    ],
  },
  {
    id: 'p3',
    categoryId: '3', // Aulas
    name: 'Mariana Lima',
    profession: 'Professora de Inglês',
    rating: 5.0,
    reviewsCount: 210,
    avatarUrl: 'https://picsum.photos/seed/mariana/200/200',
    bio: 'Aulas focadas em conversação para adultos e preparatório para intercâmbio.',
    availableDays: ['Terça', 'Quarta', 'Quinta'],
    services: [
      { id: 's7', name: 'Aula Experimental', description: 'Avaliação de nível e metodologia', price: 0, durationMinutes: 30 },
      { id: 's8', name: 'Aula Avulsa (Conversação)', description: '1 hora de prática focada', price: 90, durationMinutes: 60 },
    ],
  },
  {
    id: 'p4',
    categoryId: '4', // Tecnologia
    name: 'Roberto Diniz',
    profession: 'Técnico de Informática',
    rating: 4.7,
    reviewsCount: 56,
    avatarUrl: 'https://picsum.photos/seed/roberto/200/200',
    bio: 'Formatação, montagem de PC gamer, remoção de vírus e suporte técnico.',
    availableDays: ['Segunda', 'Quarta', 'Sexta', 'Sábado'],
    services: [
      { id: 's9', name: 'Formatação + Backup', description: 'Instalação do Windows e backup de até 100GB', price: 150, durationMinutes: 120 },
      { id: 's10', name: 'Limpeza Preventiva', description: 'Limpeza interna de notebook/desktop e troca de pasta térmica', price: 120, durationMinutes: 90 },
    ],
  }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    providerId: 'p1',
    providerName: 'Ana Souza',
    providerProfession: 'Manicure & Pedicure',
    serviceName: 'Pé e Mão',
    date: '2026-04-20',
    time: '14:00',
    price: 70,
    status: 'Confirmado',
  },
  {
    id: 'a2',
    providerId: 'p2',
    providerName: 'Carlos Oliveira',
    providerProfession: 'Eletricista Residencial',
    serviceName: 'Instalação de Chuveiro',
    date: '2026-04-22',
    time: '09:00',
    price: 80,
    status: 'Pendente',
  }
];
