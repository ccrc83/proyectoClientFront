export interface Clients {
  sharedKey: string;
  businessId: string;
  email: string;
  phone: string;
  dataAdded: string | null;
  dateCreation: string;
  dateUpdate: string;
}

export interface ClientDTO {
  
  businessId: string;
  email: string;
  phone: string;
  dataAdded: string | null;
}

export interface ClientsResponse {
  content: Clients[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}
