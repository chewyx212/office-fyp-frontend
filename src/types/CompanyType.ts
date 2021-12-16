export interface CreateCompanyType {
  category_id: number;
  country_id: number;
  type_id: number;
  name: string;
  phone_number: number;
  email: string;
  whats_app?: string;
  facebook?: string;
  instagram?: string;
}
export interface CompanyState {
  category_id: string;
  id: string;
  country_id: string;
  email: string;
  facebook: string;
  whats_app: string;
  instagram: string;
  name: string;
  phone_number: string;
}