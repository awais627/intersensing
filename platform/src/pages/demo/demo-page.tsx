import { useAuth } from '../../hooks/useAuth';

export const DemoPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Welcome to the Demo Page
          </h1>
          
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Authentication Status: {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h3 className="text-lg font-medium text-blue-900 mb-2">LocalStorage Demo</h3>
              <p className="text-blue-700">
                This page demonstrates that you are successfully authenticated using localStorage.
                The authentication state is managed through the useAuth hook.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-md p-4">
              <h3 className="text-lg font-medium text-purple-900 mb-2">Protected Route</h3>
              <p className="text-purple-700">
                This page is only accessible to authenticated users. If you were not logged in,
                you would be redirected to the login page.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-medium text-gray-900 mb-2">How it works:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Login with any credentials (demo/demo123 recommended)</li>
              <li>Authentication state is stored in localStorage</li>
              <li>Protected routes check authentication before rendering</li>
              <li>Logout button in navbar clears localStorage and redirects to login</li>
              <li>Unauthenticated users are automatically redirected to login page</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
