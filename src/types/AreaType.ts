export interface CreateAreaType {
  data: { name: string };
  floorplan: File;
}

export interface AreaState {
  id: string;
  name: string;
  address: string;
}
