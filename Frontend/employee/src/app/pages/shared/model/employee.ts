export interface ApiResponse<T> {
    status?: String,
    msg?: string;
    data?: T;
  }
  
  export interface IEmployee {
    _id?: string;
    name?: string;
    email?: string;
    mobile?: string;
    dob?: string;
    doj?: string;
    createdAt?: String,
    updatedAt?: String,
    __v?: 0
  }