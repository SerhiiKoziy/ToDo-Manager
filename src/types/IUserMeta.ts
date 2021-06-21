export default interface IUserMeta {
  uid: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  providerData: any[];
  photoURL: string;
  phoneNumber: string | null;
}
