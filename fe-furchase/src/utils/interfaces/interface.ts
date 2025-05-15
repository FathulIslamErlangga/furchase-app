import { IUser } from "../../../../be-furchase/src/utils/interface";

export interface IUsers {
  id: string;
  email: string;
  password?: string;
  slug: string;
  role: Role;
  googleId?: string;
  profiles?: IProfile;
  stores: IStore;
  registerStores: IRegisterStore;
  carts: ICart;
  shipments: IShipment;
  wishlists: IWishlist[];
  transactions: ITransaction[];
  transactionsCustomer: ITransaction[];
  notifications: INotification[];
  vouchers: IVoucher[];
  reviews: IReview[];
  createdAt: Date;
  updatedAt: Date;
}
export enum Role {
  Admin = "Admin",
  Seller = "Seller",
  Customer = "Customer",
}
export interface IProfile {
  id: string;
  firstName: string;
  lastName: string;
  addresses: IAddresses[];
  phone: string;
  userId: IUsers;
  images: IGallery[];
  createdAt: Date;
  updatedAt: Date;
}
export enum addressLabel {
  Home = "Home",
  Office = "Office",
}
export interface IAddresses {
  id: string;
  address: string;
  city: string;
  label: addressLabel;
  province: string;
  postalCode: number;
  isDefault: boolean;
  profileId: IProfile;
}

export interface IGallery {
  id: string;
  productId?: IProducts;
  profileId?: IProfile;
  storeId?: IStore;
  registerStore?: IRegisterStore;
  url: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProducts {
  id: string;
  name: string;
  sku: string;
  price: number;
  slug: string;
  description: string;
  totalStock: number;
  categoryId?: ICategory;
  storeId?: IStore;
  wishlistItems?: IWishlistItem;
  cartItems?: ICartItem;
  discounts?: IDiscount[];
  images: IGallery[];
  variants: IVariant;
  transactionDetails: ITransactionDetail[];
  reviews: IReview[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview {
  id: string;
  comment: String;
  rating: number;
  customerId: IUsers;
  productId: IProducts;
}

export interface IVariant {
  id: string;
  type: string;
  value: string;
  priceAdjust: number;
  stock: number;
  productId: IProducts;
  cartItems: ICartItem;
  createdAt: Date;
  updatedAt: Date;
}

export interface INotification {
  id: string;
  userId: IUsers;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface ICategory {
  id: string;
  products: IProducts[];
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVoucher {
  id: string;
  code: string;
  usageLimit: number;
  discountId: IDiscount;
  isActive: boolean;
  userId: IUsers;
  transactions: ITransaction[];
}

export interface IDiscount {
  id: string;
  name: string;
  percent: number;
  startDate: Date;
  endDate: Date;
  products: IProducts[];
  vouchers?: IVoucher;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWishlist {
  id: string;
  userId: IUsers;
  items: IWishlistItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IWishlistItem {
  id: string;
  wishlistId: IWishlist;
  productId: IProducts;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICart {
  id: string;
  userId: IUser;
  items: ICartItem[];
  totalPriceCart: number;
}

export interface ICartItem {
  id: string;
  cartId: ICart;
  variantId: IVariant;
  productId: IProducts;
  totalPrice: number;
  quantity: number;
}

export interface IStore {
  id: string;
  name: string;
  slug: string;
  status: Status;
  userId: IUser;
  products: IProducts[];
  images: IGallery[];
}

export enum Status {
  Active = "Active",
  Inactive = "Inactive",
  Approve = "Approve",
  Reject = "Reject",
  Pending = "Pending",
}

export interface IRegisterStore {
  id: string;
  name: string;
  noKtp: string;
  status: Status;
  userId: IUser;
  imagesKtpId: IGallery;
}
enum TransactionStatus {
  PAID = "PAID",
  PENDIND = "PENDIND",
  REJECT = "REJECT",
}

export interface ITransaction {
  id: string;
  status: TransactionStatus;
  noInvoice: string;
  totalPrice: number;
  paymentProof: Boolean;
  shippingCost: number;
  customerId: IUser;
  sellerId: IUser;
  voucherId: IVoucher;
  shipmentId: IShipment;
  transactionDetails: ITransactionDetail[];
}

export interface ITransactionDetail {
  id: string;
  transactionId: ITransaction;
  productId: IProducts;
  qty: number;
  price: number;
}

export enum ShipmentStatus {
  Sent = "Sent",
  Packed = "Packed",
  Arrived = "Arrived",
}
export enum ShipingMethod {
  Standard = "Standard",
  Express = "Express",
}
export interface IShipment {
  id: string;
  status: ShipmentStatus;
  shipingMethod: ShipingMethod;
  trackingNumber: string;
  estimatedDelivery: Date;
  actualDelivery: Date;
  volume: number;
  shipingRateId?: IShippingRate;
  userId: IUser;
  transaction: ITransaction[];
}
export interface IShippingRate {
  id: string;
  minVolume: number;
  maxVolume: number;
  price: number;
  shipments: IShipment[];
}
