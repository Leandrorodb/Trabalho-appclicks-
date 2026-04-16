export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
}

export interface Provider {
  id: string;
  categoryId: string;
  name: string;
  profession: string;
  rating: number;
  reviewsCount: number;
  avatarUrl: string;
  bio: string;
  services: Service[];
  availableDays: string[]; // e.g. ['Segunda', 'Terça', 'Quarta']
}

export interface Appointment {
  id: string;
  providerId: string;
  providerName: string;
  providerProfession: string;
  serviceName: string;
  date: string;
  time: string;
  price: number;
  status: 'Confirmado' | 'Pendente' | 'Cancelado';
}
