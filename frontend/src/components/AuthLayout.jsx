const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-8">
        
        <h1 className="text-3xl font-bold text-white text-center">
          {title}
        </h1>

        <p className="text-gray-400 text-center mt-2">
          {subtitle}
        </p>

        <div className="mt-6">
          {children}
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          © 2025 MovieFlix. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
