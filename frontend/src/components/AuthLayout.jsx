export default function AuthLayout({
  title,
  subtitle,
  footer,
  children,
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 transition-colors dark:bg-slate-900">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl transition-colors dark:bg-slate-800">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            {title}
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        </div>

        {children}

        <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          {footer}
        </div>
      </div>
    </div>
  );
}