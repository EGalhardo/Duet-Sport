import React from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

// Constantes de estilo centralizadas para cores do Duet Desportivo
export const COLOR_TOKENS = {
  primaryGold: '#FFB10A',
  primaryGoldHover: '#E59F08',
  textDarkBlue: '#091747',
  textDarkBlueHover: '#03081e',
  bgLightBlue: '#f4f6fc',
};

// ==========================================
// 1. PAGEHEADER COMPONENT
// ==========================================
export interface PageHeaderProps {
  title: string;
  to?: string; // Caminho para link voltar
  onBack?: () => void; // Callback para voltar customizado
  rightAction?: React.ReactNode; // Ação opcional à direita
  className?: string;
}

export function PageHeader({ title, to, onBack, rightAction, className }: PageHeaderProps) {
  const navigate = useNavigate();

  const handleBackClick = (e: React.MouseEvent) => {
    if (onBack) {
      e.preventDefault();
      onBack();
    } else if (!to && window.history.length > 1) {
      e.preventDefault();
      navigate(-1);
    }
  };

  return (
    <div className={cn("h-[46px] bg-white border-b border-gray-200 px-4 md:px-8 shrink-0 select-none", className)}>
      <div className="h-full flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center min-w-[28px] md:min-w-[32px]">
          {onBack || !to ? (
            <button
              type="button"
              onClick={handleBackClick}
              className="text-[#091747] hover:text-[#FFB10A] transition-colors duration-350 cursor-pointer p-1 active:scale-90"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
            </button>
          ) : (
            <Link
              to={to}
              className="text-[#091747] hover:text-[#FFB10A] transition-colors duration-350 p-1 active:scale-90"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
            </Link>
          )}
        </div>

        <h2 className="text-sm md:text-base lg:text-lg font-black text-[#091747] text-center uppercase tracking-tight truncate max-w-[65%]">
          {title}
        </h2>

        <div className="flex items-center min-w-[28px] md:min-w-[32px] justify-end">
          {rightAction || <div className="w-5 h-5 md:w-6 md:h-6" />}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. PANEL (CARD) COMPONENT
// ==========================================
export interface PanelProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  variant?: 'solid' | 'bordered' | 'gradient' | 'primary' | 'ghost';
  className?: string;
  bodyClassName?: string;
  id?: string;
}

export function Panel({
  title,
  subtitle,
  headerAction,
  children,
  variant = 'bordered',
  className,
  bodyClassName,
  id,
}: PanelProps) {
  return (
    <div
      id={id}
      className={cn(
        "rounded-3xl overflow-hidden shadow-xs border transition-all duration-300",
        variant === 'bordered' && "bg-white border-gray-200",
        variant === 'solid' && "bg-slate-50 border-transparent",
        variant === 'gradient' && "bg-gradient-to-br from-white to-slate-50/50 border-gray-200",
        variant === 'primary' && "bg-[#FFB10A] border-transparent text-white",
        variant === 'ghost' && "bg-transparent border-transparent shadow-none",
        className
      )}
    >
      {(title || subtitle || headerAction) && (
        <div
          className={cn(
            "p-5 flex items-center justify-between border-b",
            variant === 'primary' ? "border-white/10" : "border-slate-100"
          )}
        >
          <div>
            {title && (
              <h3
                className={cn(
                  "text-base md:text-lg font-black uppercase tracking-tight",
                  variant === 'primary' ? "text-white" : "text-[#091747]"
                )}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p
                className={cn(
                  "text-xs font-bold leading-tight mt-1",
                  variant === 'primary' ? "text-white/80" : "text-slate-400"
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>
      )}
      <div className={cn("p-5", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}

// ==========================================
// 3. BUTTON COMPONENT
// ==========================================
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  children,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  const isCurrentlyDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isCurrentlyDisabled}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl font-black text-center uppercase tracking-wider transition-all duration-200 cursor-pointer select-none border-2 border-transparent active:scale-[0.98]",
        // Variants
        variant === 'primary' && "bg-[#FFB10A] text-[#091747] hover:bg-[#E59F08] active:bg-[#CC8E07]",
        variant === 'secondary' && "bg-[#091747] text-white hover:bg-[#03081e] active:bg-black",
        variant === 'outline' && "bg-transparent border-slate-300 text-[#091747] hover:bg-slate-50 hover:border-slate-400",
        variant === 'ghost' && "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-[#091747]",
        variant === 'danger' && "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
        // Sizes
        size === 'sm' && "px-3.5 py-2 text-[10px] rounded-xl",
        size === 'md' && "px-5 py-3 text-xs",
        size === 'lg' && "px-6 py-4 text-xs md:text-sm rounded-[20px]",
        // Width
        fullWidth ? "w-full" : "w-auto",
        // Disabled / Loading
        isCurrentlyDisabled && "opacity-60 cursor-not-allowed active:scale-100 pointer-events-none",
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0 mr-1.5" />
      ) : leftIcon ? (
        <span className="shrink-0 mr-1.5">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {!loading && rightIcon && <span className="shrink-0 ml-1.5">{rightIcon}</span>}
    </button>
  );
}

// ==========================================
// 4. EMPTYSTATE COMPONENT
// ==========================================
export interface EmptyStateProps {
  title: string;
  description?: string;
  emojiOrIcon?: string | React.ComponentType<{ className?: string }>;
  iconClassName?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  emojiOrIcon,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const IconComponent = typeof emojiOrIcon !== 'string' ? emojiOrIcon : null;

  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8 md:p-12", className)}>
      <div className="mb-4">
        {IconComponent ? (
          <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
            <IconComponent className="w-8 h-8" />
          </div>
        ) : typeof emojiOrIcon === 'string' ? (
          <span className="text-4xl md:text-5xl select-none leading-none animate-bounce" role="img" aria-label="emoji">
            {emojiOrIcon}
          </span>
        ) : (
          <span className="text-4xl md:text-5xl select-none leading-none animate-bounce" role="img" aria-label="sad face">
            📭
          </span>
        )}
      </div>

      <h4 className="text-sm md:text-base font-black text-[#091747] uppercase tracking-tight max-w-sm">
        {title}
      </h4>

      {description && (
        <p className="text-xs text-slate-400 font-bold leading-relaxed max-w-xs mt-2">
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <Button
          variant="primary"
          size="sm"
          onClick={onAction}
          className="mt-6 shadow-xs"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
