export type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF';
export type EntityStatus = 'ACTIVE' | 'INACTIVE';
export type BudgetStatus = 'DRAFT' | 'SENT' | 'APPROVED' | 'REJECTED';
export type ProjectStatus = 'PLANNING' | 'ACTIVE' | 'PAUSED' | 'FINISHED';
export type PurchaseRequestStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
export type SupplierQuoteStatus = 'DRAFT' | 'SUBMITTED' | 'SELECTED' | 'REJECTED';
export type PurchaseOrderStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'ISSUED' | 'PARTIALLY_RECEIVED' | 'FULLY_RECEIVED' | 'CANCELLED' | 'CLOSED';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
