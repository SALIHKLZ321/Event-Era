export interface res {
    vendor: vendorProfile[],
  }

export interface vendorProfile{
  _id: string | null | undefined;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    isVerified: boolean,
    isBlocked:boolean,
    email: string | null | undefined;
    phone: string | null | undefined;
    password: string | null | undefined;
}