// ============================================================================
// CORREIO DIGITAL ANGOLA - CANONICAL DOMAIN MODEL & TYPES
// ============================================================================

/**
 * Enums representing the specific states and categories of the platform.
 */

export enum UserRole {
  CITIZEN = 'citizen',
  WORKER = 'worker',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin'
}

export enum CorrespondenceStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
  ARCHIVED = 'archived',
  REJECTED = 'rejected'
}

export enum ProcessStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  PENDING_INFO = 'pending_info',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CLOSED = 'closed'
}

export enum NotificationChannel {
  PORTAL = 'portal',
  EMAIL = 'email',
  SMS = 'sms'
}

export enum NotificationType {
  INFO = 'info',
  WARNING = 'warning',
  ALERT = 'alert',
  CORRESPONDENCE = 'correspondence',
  PAYMENT = 'payment'
}

export enum InvoiceStatus {
  PENDING = 'pending',
  PAID = 'paid',
  EXPIRED = 'expired',
  CANCELED = 'canceled'
}

export enum PaymentMethod {
  MULTICAIXA_EXPRESS = 'multicaixa_express',
  MULTICAIXA_REFERENCE = 'multicaixa_reference',
  IBAN_TRANSFER = 'iban_transfer'
}

export enum AuditActionType {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  AUTHORIZE = 'authorize',
  DOWNLOAD = 'download'
}

// ============================================================================
// CORE ENTITIES & RELATIONS
// ============================================================================

/**
 * Instituição correspondente ao Governo ou Entidade Pública.
 * Ex: AGT, MAPTSS, SME, etc.
 */
export interface Institution {
  id: string; // PK
  name: string;
  nif: string; // Unique National Identifier
  acronym: string; // Short code, e.g., "AGT"
  logo: string;
  website?: string;
  morada: string;
  createdAt: string;
}

/**
 * Tabela Global de Autenticação e Configurações de Acesso.
 */
export interface User {
  id: string; // PK
  email: string; // Unique
  phone: string;
  role: UserRole;
  isActive: boolean;
  mfaEnabled: boolean;
  createdAt: string;
  lastLogin?: string;
}

/**
 * Cidadão Angolano. Relação (1:1) com Utilizador.
 */
export interface Citizen {
  id: string; // PK
  userId: string; // FK -> User.id (Unique, 1:1)
  fullName: string;
  biNumber: string; // Número do Bilhete de Identidade (Unique)
  nif: string; // Número de Identificação Fiscal (Unique)
  birthDate: string;
  municipioNascimento: string;
  provinciaNascimento: string;
  moradaOficial: string;
  avatar?: string;
  createdAt: string;
}

/**
 * Trabalhador de uma Instituição Pública. Relação (1:1) com Utilizador.
 * Relação (N:1) com Instituição.
 */
export interface Worker {
  id: string; // PK
  userId: string; // FK -> User.id (Unique, 1:1)
  institutionId: string; // FK -> Institution.id (N:1)
  fullName: string;
  department: string;
  jobTitle: string;
  permissions: string[]; // List of specific task strings
  createdAt: string;
}

/**
 * Correspondência Oficial emitida pela Plataforma.
 * Pode ser enviada por Instituições ou por Cidadãos.
 */
export interface Correspondence {
  id: string; // PK
  senderId: string; // FK -> User.id
  receiverId: string; // FK -> User.id
  subject: string;
  content: string;
  hashSecurity: string; // Blockchain / Crypto hash of metadata for authenticity
  status: CorrespondenceStatus;
  sentAt: string;
  deliveredAt?: string;
  readAt?: string;
  archivedAt?: string;
}

/**
 * Documentos anexados ou guardados no Cacifo Digital.
 */
export interface CitizenDocument {
  id: string; // PK
  userId: string; // FK -> User.id (Owner of document)
  title: string;
  fileUrl: string; // Path or storage bucket URL
  fileHash: string; // SHA-256 integrity checks
  fileType: string; // pdf, jpeg, etc.
  fileSize: number; // in bytes
  isOfficial: boolean; // Verified document
  createdAt: string;
  expiredAt?: string;
}

/**
 * Processos Administrativos submetidos pelos cidadãos.
 * Ex: Pedido de Licença, Renovação de BI, etc.
 */
export interface Process {
  id: string; // PK
  citizenId: string; // FK -> Citizen.id
  institutionId: string; // FK -> Institution.id
  title: string;
  description: string;
  status: ProcessStatus;
  assignedWorkerId?: string; // FK -> Worker.id
  createdAt: string;
  updatedAt: string;
}

/**
 * Notificações do Sistema.
 */
export interface CoreNotification {
  id: string; // PK
  userId: string; // FK -> User.id
  type: NotificationType;
  channel: NotificationChannel;
  title: string;
  message: string;
  isRead: boolean;
  entityType?: 'correspondence' | 'process' | 'invoice' | 'system';
  entityId?: string;
  createdAt: string;
}

/**
 * Contactos de Confiança (Delegação de Acesso Autorizado).
 * Permite que um Cidadão autorize outro a ver o seu correio digital.
 */
export interface TrustedContact {
  id: string; // PK
  grantorId: string; // FK -> Citizen.id (Owner authorizing access)
  delegateId: string; // FK -> Citizen.id (Receiver authorized to access)
  canReadMail: boolean;
  canManageProcesses: boolean;
  expiresAt: string;
  createdAt: string;
}

/**
 * Faturas Digitais associadas a processos, taxas ou serviços públicos.
 */
export interface Invoice {
  id: string; // PK
  userId: string; // FK -> User.id (Payer)
  institutionId: string; // FK -> Institution.id (Issuer)
  amount: number; // in Kwanza (AOA)
  rupeCode: string; // Unique Reference (RUPE - Referência Única de Pagamento ao Estado)
  description: string;
  status: InvoiceStatus;
  issuedAt: string;
  dueAt: string;
}

/**
 * Pagamento efetuado a uma Fatura.
 */
export interface PublicPayment {
  id: string; // PK
  invoiceId: string; // FK -> Invoice.id (Unique, 1:1 or 1:N)
  userId: string; // FK -> User.id (Payer)
  amountPaid: number;
  method: PaymentMethod;
  transactionReference: string; // Key reference from MCX
  receiptUrl?: string; // Official PDF receipt url
  status: 'pending' | 'completed' | 'failed';
  paidAt: string;
}

/**
 * Certidões Oficiais do Cidadão emitidas de forma digital.
 */
export interface Certificate {
  id: string; // PK
  citizenId: string; // FK -> Citizen.id
  institutionId: string; // FK -> Institution.id
  certificateType: string; // Ex: Registro Criminal, Casamento, etc.
  verificationCode: string; // Unique string/QR content for authenticity check
  pdfUrl: string;
  issuedAt: string;
  expiresAt?: string;
}

/**
 * Assistentes Virtuais Baseados em IA para ajudar cidadãos e trabalhadores.
 */
export interface AIAssistant {
  id: string; // PK
  institutionId?: string; // FK -> Institution.id (Optional, null means global assist)
  name: string;
  systemPrompt: string; // Core AI behavioral rules
  avatar: string;
  temperature: number;
  isActive: boolean;
}

/**
 * Bases de Conhecimento contextuais para os assistentes IA (RAG).
 */
export interface AIKnowledgeBase {
  id: string; // PK
  assistantId: string; // FK -> AIAssistant.id
  title: string;
  content: string; // Embedded rule, markdown guidelines, legislation reference text
  sourceDocument?: string; // Optional legal document title / link
  updatedAt: string;
}

/**
 * Immutable Audit Logs para segurança e transparência (Regulado pelo Estado).
 */
export interface AuditLog {
  id: string; // PK
  userId: string; // FK -> User.id
  action: AuditActionType;
  tableName: string; // DB Resource accessed
  recordId?: string; // Resource PK
  ipAddress: string;
  userAgent: string;
  details: string; // JSON with action context before/after or logs
  timestamp: string;
}
